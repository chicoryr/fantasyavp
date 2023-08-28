export interface Tournament {
    Team_ID: string[];
  }

 export interface Team {
    Player1: string;
    Player2: string;
    Player1Rating: number;
    Player2Rating: number;
    gender: 'Male' | 'Female'
  }