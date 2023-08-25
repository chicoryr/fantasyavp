"use client";
import useFetchTournament from "../hooks/fetchTeams"


export default function Home() {
  const {loading, error, teams} = useFetchTournament('chicago-test');
  return (
    <h1 className="text-3xl font-bold underline">
      {(teams && !loading) && (<>
        teams now fetched correctly
      </>)}
    </h1>
  )
}