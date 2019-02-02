export interface Account {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  username: string;
  totalPoints: number;
  remainingBudget: number;
  remainingTransfers: number;
  roles: string[];
}
