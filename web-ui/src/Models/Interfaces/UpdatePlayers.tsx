import { PlayerDTO } from '../Interfaces/Player';

export interface UpdatePlayers {
  playersBeingAdded: PlayerDTO[];
  playersBeingRemoved: PlayerDTO[];
}
