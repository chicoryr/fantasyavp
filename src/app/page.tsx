"use client"
import ExplainModal from "@/components/ExplainModal";
import Loader from "@/components/Loader";
import { UserAuth } from "@/context/AuthContext"


export default function Home() {
  const {user, loading} = UserAuth();
  return loading ? 
  <Loader/>
: (user ? <div className="grid h-screen place-items-center">Logged in as {user.displayName}</div> : <ExplainModal/>)
}
