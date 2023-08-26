"use client";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar(){
    const [user, setUser] = useState(auth.currentUser);
    const router = useRouter();
    auth.onAuthStateChanged(function(user) {
        if (user) {
            setUser(user);
        }else{
            setUser(null);
        }
      });
    return (
        <div className="bg-gray-300 w-full border-b-2 flex items-center justify-between p-2">
            <ul className="flex p-4">
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800" href="/">Home</Link>
                </li>
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800" href="/tournaments/chicago-test">chicago-test</Link>
                </li>
            </ul>
            <Link className="text-3xl" href="/">Fantasy AVP</Link>
            <ul className="flex p-4">
                {user ? <li className="mr-6">
                    <div className="text-blue-500 hover:text-blue-800 h-full hover:cursor-pointer" onClick={() =>{
                        signOut(auth).then(() => {
                            setUser(null);
                            router.push("/");
                            alert("You have been signed out.");
                          }).catch((error) => {
                            console.log(error);
                          })
                    }}>Sign out</div>
                </li> : <>
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800 h-full" href="/signup">Sign up</Link>
                </li>
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800 h-full" href="/signin">Sign in</Link>
                </li>
                </>}
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800 h-full" href="/about">About</Link>
                </li>
            </ul>
        </div>
    )
}