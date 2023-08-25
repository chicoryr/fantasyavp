import { db } from "../firebase/config";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Team {
    Player1: string;
    Player2: string;
    Player1Rating: number;
    Player2Rating: number;
  }

export default function useFetchTeams(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [teams, setTeams] = useState<Team>();

    useEffect(() => {
        async function fetchData(){
            try {
                const docRef = doc(db, 'chicago-test', 'tueNZRr4lWECfwH23h8M');
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    setTeams(docSnap.data() as Team)
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