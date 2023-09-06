"use client"
import {normalizeTeams} from "@/helpers/values";
import useFetchTournament from "../hooks/fetchTeams";
import TeamRow from "./TeamRow";
import { useEffect, useState } from "react";
import { Audio } from  'react-loader-spinner'
import { auth, db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore"; 
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
const moneyAvailable = 1000000;
let selectedTeamIDs: string[] = [];
dayjs.extend(utc);
dayjs.extend(timezone);

export default function TeamList() {
    const { loading, error, teams } = useFetchTournament('chicago-test');
    const [prices, setPrices] = useState<number[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<Record<number, boolean>>({});
    const [gender, setGender] = useState<'Male' | 'Female'>('Male');
    const [canSave, setCanSave] = useState<boolean>(false);
    const [selectedCountMale, setSelectedCountMale] = useState(0);
    const [selectedCountFemale, setSelectedCountFemale] = useState(0);
    const [selectedTotalPrice, setSelectedTotalPrice] = useState(0);
    const [showBothGenders, setShowBothGenders] = useState(false);

    useEffect(() => {
      if (teams) {
        teams.sort((a, b) => (a.seed) - (b.seed));
        setPrices(normalizeTeams(teams))
      }

    }, [teams]);

    useEffect(() => {
        if(selectedCountFemale == 4 && selectedCountMale == 4 && selectedTotalPrice <= moneyAvailable){
          setCanSave(true);
          
      }else{
          setCanSave(false);
      }
      }, [selectedCountFemale, selectedCountMale, selectedTotalPrice]);    

    const handleTeamClick = (index: number, price: number, gender: 'Male' | 'Female', Team_ID: string) => {
        const currentSelected = !!selectedTeams[index];

        setSelectedTeams(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle selected state for the team
        }));
        gender == 'Male' ? setSelectedCountMale(prevCount => currentSelected ? prevCount - 1 : prevCount + 1) :
        setSelectedCountFemale(prevCount => currentSelected ? prevCount - 1 : prevCount + 1);
        setSelectedTotalPrice(prevTotal => currentSelected ? prevTotal - price : prevTotal + price);
        if(selectedTeamIDs.includes(Team_ID)){
            selectedTeamIDs = selectedTeamIDs.filter(item => item !== Team_ID);
        }else{
            selectedTeamIDs.push(Team_ID);
        }

    };

    const currentTime = dayjs().tz("America/Chicago");
    const cutOffTime = dayjs.tz("2023-09-01 08:30:00", "America/Chicago");
    if (currentTime.isAfter(cutOffTime)) {
        return (
            <>The tournament has started, you can no longer change or make picks!</>
        )
    }
    if(loading){
        return(
            <div className="flex items-center justify-center h-screen">
            <Audio
    height = "180"
    width = "180"
    color = 'green'
    ariaLabel = 'three-dots-loading' 
  />
            </div>
        )
    }
    return (
        <div className="text-xl font-bold p-2 md:p-0">
            <div className="group relative m-1 flex justify-center">
            <button 
            className={`mx-auto justify-center flex m-4 border-2 rounded-lg p-2 w-1/2 
            ${canSave ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"}`}
            onClick={async () => {
                const userId = auth.currentUser?.uid;
                if (userId) {
                    const teamDocRef = doc(db, 'user-picks', userId);
                    await setDoc(teamDocRef, { selectedTeams: selectedTeamIDs });
                    alert("Picks saved!");
                }else{
                    alert("There was an error saving your picks");
                }
                
            }}>
                SAVE PICKS
                </button>
                {!canSave && <span className="absolute bottom-10 scale-0 rounded bg-gray-800 p-2 text-lg text-white group-hover:scale-100">
                    You must pick 4 teams from each gender before you can save teams!
                    </span>}
                </div>
          <span className="`border-2 rounded-lg flex justify-between items-center w-2/3 mx-auto">Total: ${selectedTotalPrice > 0 ? Math.round(selectedTotalPrice).toLocaleString() : 0}
          <button className="mx-auto justify-center flex m-0 border-2 rounded-lg p-2 w-11/12 hover:bg-slate-200"
            onClick={() => {
                setGender(gender == 'Male' ? 'Female' : 'Male');
            }}>
                Show {gender == 'Male' ? 'Women' : 'Men'
                }</button>
          <span>Remaining: ${Math.round(moneyAvailable - selectedTotalPrice).toLocaleString()}</span></span>
            {(teams && !loading && !error) && (
                teams.map((team, i) => (
                    <TeamRow
                        Team={team}
                        key={i}
                        price={prices[i]}
                        gender={gender}
                        selected={!!selectedTeams[i]}
                        canSelect={(gender == 'Male' ? selectedCountMale < 4 : selectedCountFemale < 4) && selectedTotalPrice + prices[i] <= moneyAvailable}
                        onClick={() => handleTeamClick(i, prices[i], gender, team.id)}
                    />
                ))
            )}
            
        </div>
    );
}