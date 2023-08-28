"use client";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config"
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <>
        Name: {auth.currentUser?.displayName}<br/>
        Email: {auth.currentUser?.email}
        <div className="text-blue-500 hover:text-blue-800 h-full hover:cursor-pointer" onClick={() =>{
                        signOut(auth).then(() => {
                            router.push("/");
                            alert("You have been signed out.");
                          }).catch((error) => {
                            console.log(error);
                          })
                    }}>Sign out</div>
        </>
    )
}