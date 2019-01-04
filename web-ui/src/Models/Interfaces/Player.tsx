import { CollegeTeam } from './CollegeTeam';

export interface Player {
  id: string;
  firstName: string;
  surname: string;
  price: Number;
  position: String;
  team: CollegeTeam;
}
