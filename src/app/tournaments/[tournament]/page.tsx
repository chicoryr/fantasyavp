"use client"
import { useState } from "react";
import TeamList from "../../components/TeamList";
import Picks from "@/app/components/Picks";
import { auth } from "@/firebase/config";

export default function Home() {
  const [changePicks, setChangePicks] = useState(!auth.currentUser);

  return (
      <div className="bg-gray-100 h-screen">
          <button 
              onClick={() => {
                  setChangePicks(!changePicks);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
              {changePicks ? "View " : "Change "}Picks
          </button>
          {changePicks ? <TeamList/> : <Picks/>}
      </div>
  )
}
