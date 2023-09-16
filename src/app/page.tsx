"use client"
import ExplainModal from "@/components/ExplainModal";
import Loader from "@/components/Loader";
import { UserAuth } from "@/context/AuthContext"
import { useThemeContext } from "@/context/ThemeContext";


export default function Home() {
  const {user, loading} = UserAuth();
  const {theme} = useThemeContext();
  return loading ? 
  <Loader/>
: (user ? <div className={`grid h-screen place-items-center 
${theme == 'light' ? 'bg-white' : 'bg-black'}`}>
Logged in as {user.displayName}</div> : <ExplainModal/>)
}
