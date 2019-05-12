import { Account } from './Account';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { MostValuable } from '../../Models/Interfaces/MostValuable';

export interface UserProps {
  setAccount: (account: Account) => void;
  setRemainingBudget: (budget: number) => void;
  setUserBeingViewed: (user: string) => void;
  setTeam: (user: string, week: number, team: PlayerDTO[]) => void;
  setMostValuable: (user: string, mostValuable: MostValuable) => void;
}
