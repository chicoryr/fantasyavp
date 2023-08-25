"use client";
import useFetchTeams from "../hooks/fetchTeams"


export default function Home() {
  const {loading, error, teams} = useFetchTeams();
  return (
    <h1 className="text-3xl font-bold underline">
      {(teams && !loading) && (<>
        {teams.Player1}
      </>)}
    </h1>
  )
}