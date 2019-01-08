import { CollegeTeam } from './CollegeTeam';

export interface TopWeeklyPlayer {
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
