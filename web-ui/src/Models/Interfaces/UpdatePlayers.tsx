import { WeeklyPlayer } from '../Interfaces/WeeklyPlayer';

export interface UpdatePlayers {
  playersBeingAdded: WeeklyPlayer[];
  playersBeingRemoved: WeeklyPlayer[];
}
