import { PlayerDTO } from './Player';
import { CollegeTeam } from './CollegeTeam';

export interface MostValuable {
  mostValuablePlayer: PlayerDTO;
  mostValuablePlayerScore: number;

  mostValuableCollegeTeam: CollegeTeam;
  mostValuableCollegeTeamScore: number;
}
