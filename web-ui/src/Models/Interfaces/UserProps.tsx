import { Account } from './Account';

export interface UserProps {
  setAccount: (account: Account) => void;
  setRemainingBudget: (budget: number) => void;
}
