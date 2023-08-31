import { Team } from "../types/types";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; 



export default function useFetchTournament(tournament: string){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [teams, setTeams] = useState<Team[]>();
    
    useEffect(() => {
        let newTeams: Team[] = [];
        async function fetchData(){
            try {
                const querySnapshot = await getDocs(collection(db, "chicago-test"));
                querySnapshot.forEach((doc) => {
                    if(doc.exists()){
                        newTeams.push(doc.data() as Team);
                    }
                  });
                  setTeams(newTeams);
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