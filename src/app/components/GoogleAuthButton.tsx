import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config"
import { useRouter } from "next/navigation";

export default function GoogleAuthButton(props: { text: string; }){
    const provider = new GoogleAuthProvider();
    const router = useRouter();
    return (
        <button onClick={() =>{
            signInWithPopup(auth, provider)
            .then((result) => {
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential?.accessToken;
              const user = result.user;
              router.push("/");
            }).catch((error) => {
              const errorMessage = error.message;
              console.log(errorMessage);
              const credential = GoogleAuthProvider.credentialFromError(error);
            });
        }}>{props.text}</button>
    )
}