import { Team, Tournament } from "../types/types";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";



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