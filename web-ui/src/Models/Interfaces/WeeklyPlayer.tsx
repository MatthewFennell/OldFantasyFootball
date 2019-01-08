import { CollegeTeam } from './CollegeTeam';

export interface WeeklyPlayer {
  id: string;
  firstName: string;
  surname: string;
  price: number;
  position: String;
  team: CollegeTeam;
  points: number;
  goals: number;
  assists: number;
}
