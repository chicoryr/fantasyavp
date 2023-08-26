import { auth } from "../../firebase/config";
import useFetchTournament from "../../hooks/fetchTeams";
import TeamRow from "./TeamRow";

export default function TeamList() {
    const {loading, error, teams} = useFetchTournament('chicago-test');
    return (
      <div className="text-2xl font-bold">
        {(teams && !loading && !error) && (<>
          {teams.map((team, i) => {
            return <TeamRow Team={team} key={i} />
          })}
        </>)}
      </div>
    )
  }