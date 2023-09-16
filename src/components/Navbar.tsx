"use client";
import { UserAuth } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import Toggle from "react-toggle";

export default function Navbar(){
    const {user, loading} = UserAuth();
    const {theme, setTheme} = useThemeContext();
    if(loading){
        return (<></>)
    }
    return (
        <div className={`relative w-full flex flex-col md:flex-row items-center justify-between p-2 ${theme == 'light' ? 'bg-white' : 'bg-black'}`}>
            <Link className="text-3xl mb-2 md:mb-0 text-teal-800 hover:text-teal-400" href="/">Fantasy AVP</Link>
            <div className="flex flex-wrap items-center justify-around md:justify-start mb-2 md:mb-0 p-4">
                
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
            
            {/* Theme Toggle Button */}
            <button
                onClick={() => {
                    setTheme(theme == 'dark' ? 'light' : 'dark')
                }}
                className="absolute top-4 right-4 md:relative md:top-1 md:right-3 text-3xl"
            >
                {theme == 'dark' ? '☀️' : '🌑'}
            </button>
        </div>
    )
}
