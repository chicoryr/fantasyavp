"use client";
import TeamRow from "../components/TeamRow";
import useFetchTournament from "../hooks/fetchTeams"


export default function Home() {
  const {loading, error, teams} = useFetchTournament('chicago-test');
  return (
    <h1 className="text-3xl font-bold underline">
      {(teams && !loading) && (<>
        {teams.map((team) => {
          return <TeamRow Team={team}  />
        })}
      </>)}
    </h1>
  )
}