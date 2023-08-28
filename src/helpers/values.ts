import { Team } from "../types/types";

function normalize(value: number, srcMin: number, srcMax: number, destMin = 12000, destMax = 250000, power = 1.5): number {
    const normalized = (value - srcMin) / (srcMax - srcMin);
    const powered = Math.pow(normalized, power);

    return destMin + powered * (destMax - destMin);
}

export function normalizeTeams(teams: Team[]): number[] {
    const teamSums = teams.map(team => team.Player1Rating + team.Player2Rating);

    const srcMin = Math.min(...teamSums) - 1;
    const srcMax = Math.max(...teamSums);

    return teamSums.map(sum => normalize(sum, srcMin, srcMax));
}
