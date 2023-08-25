import { Team } from "../../types/types";

interface TeamDisplayProps {
    Team: Team;
  }

export default function TeamRow(Team: TeamDisplayProps) {
    return(
        <>
        <div>{Team.Team.Player1}/{Team.Team.Player1}</div>
        </>
    )
}

