import {normalizeTeams} from "@/helpers/values";
import useFetchTournament from "../../hooks/fetchTeams";
import TeamRow from "./TeamRow";
import { useEffect, useState } from "react";
const moneyAvailable = 500000;

export default function TeamList() {
    const { loading, error, teams } = useFetchTournament('chicago-test');
    const [prices, setPrices] = useState<number[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<Record<number, boolean>>({});  // Track selected teams by index

    useEffect(() => {
      if (teams) {
        setPrices(normalizeTeams(teams))
      }
    }, [teams]);

    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedTotalPrice, setSelectedTotalPrice] = useState(0);

    const handleTeamClick = (index: number, price: number) => {
        const currentSelected = !!selectedTeams[index];

        setSelectedTeams(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle selected state for the team
        }));

        setSelectedCount(prevCount => currentSelected ? prevCount - 1 : prevCount + 1);
        setSelectedTotalPrice(prevTotal => currentSelected ? prevTotal - price : prevTotal + price);
    };

    return (
        <div className="text-lg font-bold p-2 md:p-0">
          <span className="`border-2 rounded-lg flex justify-between items-center w-2/3 mx-auto">Total: ${selectedTotalPrice > 0 ? Math.round(selectedTotalPrice).toLocaleString() : 0} <span>Remaining: ${Math.round(moneyAvailable - selectedTotalPrice).toLocaleString()}</span></span>
            {(teams && !loading && !error) && (
                teams.map((team, i) => (
                    <TeamRow
                        seed={i + 1}
                        Team={team}
                        key={i}
                        price={prices[i]}
                        selected={!!selectedTeams[i]}
                        canSelect={selectedCount < 4 && selectedTotalPrice + prices[i] <= moneyAvailable}
                        onClick={() => handleTeamClick(i, prices[i])}
                    />
                ))
            )}
        </div>
    );
}