import { db } from "../firebase/config";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Tournament {
    Team_ID: string[];
  }

  interface Team {
    Player1: string;
    Player2: string;
    Player1Rating: number;
    Player2Rating: number;
  }

export default function useFetchTournament(tournament: string){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [teams, setTeams] = useState<Team[]>();

    useEffect(() => {
        async function fetchData(){
            try {
                const docRef = doc(db, 'Tournaments', tournament);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    let teamList = [];
                    for (const i in ((docSnap.data() as Tournament).Team_ID)){
                        teamList.push((docSnap.data() as Tournament).Team_ID[i]);
                    }
                    let teamsToAdd = [];
                    for(const i in teamList){
                        const docRef = doc(db, tournament, teamList[i]);
                        const docSnap = await getDoc(docRef);
                        if(docSnap.exists()){
                            teamsToAdd.push(docSnap.data() as Team)
                        }else{
                            setError(true);
                        }
                    }
                    setTeams(teamsToAdd);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return {loading, error, teams};
}