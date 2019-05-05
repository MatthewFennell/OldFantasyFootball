import { Account } from './Account';

export interface UserProps {
  setAccount: (account: Account) => void;
  setRemainingBudget: (budget: number) => void;
  setUserBeingViewed: (user: string) => void;
}
