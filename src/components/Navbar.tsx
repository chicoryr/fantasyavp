
"use client";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar(){
    const {user} = UserAuth();

      return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-2 border-b-2 border-gray-700">
            <Link className="text-3xl mb-2 md:mb-0 text-teal-800 hover:text-teal-400" href="/">Fantasy AVP</Link>
            <div className="flex flex-wrap justify-around md:justify-start mb-2 md:mb-0 p-4">
                
                {user ? <>
                    <Link className="text-teal-800 hover:text-teal-400 mr-4 mb-2 md:mb-0" href="/tournaments/chicago-test">Chicago</Link>
                    <Link className="text-teal-800 hover:text-teal-400 mr-4 mb-2 md:mb-0" href="/profile">Profile</Link>
                    </>
                : 
                <>
                    <Link className="text-teal-800 hover:text-teal-400 mr-4 mb-2 md:mb-0" href="/signup">Sign up</Link>
                    <Link className="text-teal-800 hover:text-teal-400 mr-4 mb-2 md:mb-0" href="/signin">Sign in</Link>
                </>
                }
            </div>
        </div>
    )
}