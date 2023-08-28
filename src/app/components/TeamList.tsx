"use client"
import {normalizeTeams} from "@/helpers/values";
import useFetchTournament from "../../hooks/fetchTeams";
import TeamRow from "./TeamRow";
import { useEffect, useState } from "react";
const moneyAvailable = 1000000;

export default function TeamList() {
    const { loading, error, teams } = useFetchTournament('chicago-test');
    const [prices, setPrices] = useState<number[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<Record<number, boolean>>({});
    const [gender, setGender] = useState<'Male' | 'Female'>('Male');

    useEffect(() => {
      if (teams) {
        setPrices(normalizeTeams(teams))
      }
    }, [teams]);

    const [selectedCountMale, setSelectedCountMale] = useState(0);
    const [selectedCountFemale, setSelectedCountFemale] = useState(0);
    const [selectedTotalPrice, setSelectedTotalPrice] = useState(0);

    const handleTeamClick = (index: number, price: number, gender: 'Male' | 'Female') => {
        const currentSelected = !!selectedTeams[index];

        setSelectedTeams(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle selected state for the team
        }));
        gender == 'Male' ? setSelectedCountMale(prevCount => currentSelected ? prevCount - 1 : prevCount + 1) :
        setSelectedCountFemale(prevCount => currentSelected ? prevCount - 1 : prevCount + 1);

        setSelectedTotalPrice(prevTotal => currentSelected ? prevTotal - price : prevTotal + price);
    };
    if(loading){
        return(
            <>
            LOADING...
            </>
        )
    }
    return (
        <div className="text-xl font-bold p-2 md:p-0">
            <button className="mx-auto justify-center flex m-4 border-2 rounded-lg p-2 hover:bg-slate-200"
            onClick={() => {
                setGender(gender == 'Male' ? 'Female' : 'Male');
            }}>
                Show {gender == 'Male' ? 'Women' : 'Men'
                }</button>
          <span className="`border-2 rounded-lg flex justify-between items-center w-2/3 mx-auto">Total: ${selectedTotalPrice > 0 ? Math.round(selectedTotalPrice).toLocaleString() : 0} <span>Remaining: ${Math.round(moneyAvailable - selectedTotalPrice).toLocaleString()}</span></span>
            {(teams && !loading && !error) && (
                teams.map((team, i) => (
                    <TeamRow
                        Team={team}
                        key={i}
                        price={prices[i]}
                        gender={gender}
                        selected={!!selectedTeams[i]}
                        canSelect={(gender == 'Male' ? selectedCountMale < 4 : selectedCountFemale < 4) && selectedTotalPrice + prices[i] <= moneyAvailable}
                        onClick={() => handleTeamClick(i, prices[i], gender)}
                    />
                ))
            )}
        </div>
    );
}