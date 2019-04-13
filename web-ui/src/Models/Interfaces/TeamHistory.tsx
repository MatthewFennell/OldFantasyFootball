import { SingleHistory } from './SingleHistory';

export interface TeamHistory {
    teamName: string;
    goalScorers: SingleHistory[];
    assists: SingleHistory[];
  }
