import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config"
import { Redirect } from "@/helpers";
import { useEffect } from "react";

export default function GoogleAuthButton(props: { text: string; }){
    const provider = new GoogleAuthProvider();
    useEffect(() => { 
      if(auth.currentUser){
        Redirect("/");
      }})
    return (
        <button onClick={() =>{
            signInWithPopup(auth, provider)
            .then((result) => {
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential?.accessToken;
              const user = result.user;
              Redirect("/");
            }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
              // The email of the user's account used.
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        }}>{props.text}</button>
    )
}