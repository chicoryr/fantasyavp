import { auth, db } from "../firebase/config";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import { Team } from "@/types/types";


export default function useFetchPicks(){
    const [picks, setPicks] = useState<Team[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    var unsubscribe = auth.onAuthStateChanged(async (user) =>{
        if(user){
            let pickIDs: string[] = []
            let pickTeams: Team[] = []
            try{
                if (auth.currentUser) {
                    const docRef = doc(db, 'user-picks', auth.currentUser.uid);
                    const docData = await getDoc(docRef);
                    if(docData.exists()){
                        pickIDs = docData.data().selectedTeams as string[];
                    }
                    for(const x in pickIDs){
                        const docRef = doc(db, 'chicago-test', pickIDs[x]);
                        const docData = await getDoc(docRef);
                        if(docData.exists()){
                            pickTeams.push(docData.data() as Team);
                        }
                    }
                    setPicks(pickTeams);
                }
            }catch{
                setError(true);
            }finally{
                setLoading(false);
            }
    }else{
        console.log("Test");
    }
})
    if(picks){
        unsubscribe();
    }
    return {loading, picks, error};
}