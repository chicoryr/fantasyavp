import { Team } from "../types/types";

function normalize(value: number, srcMin: number, srcMax: number, destMin = 12000, destMax = 250000): number {
    return destMin + ((value - srcMin) / (srcMax - srcMin)) * (destMax - destMin);
}

export function normalizeTeams(teams: Team[]): number[] {
    const teamSums = teams.map(team => team.Player1Rating + team.Player2Rating);

    const srcMin = Math.min(...teamSums) -1;
    const srcMax = Math.max(...teamSums);

    return teamSums.map(sum => normalize(sum, srcMin, srcMax));
}

