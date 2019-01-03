import { reducer, initialState } from '../../Reducers/Account';
import { latestTransactionsSuccess } from '../../Actions/TransactionActions';

const transaction1 = {
  amount: 5000,
  category: {
    description: 'General',
    id: 'general'
  },
  date: new Date(),
  description: 'Weekly shop',
  id: '1',
  payee: {
    id: 'tesco',
    name: 'Tesco'
  }
};
const transaction2 = {
  amount: -8000,
  category: {
    description: 'General',
    id: 'general'
  },
  date: new Date(),
  description: 'Weekly shop',
  id: '2',
  payee: {
    id: 'tesco',
    name: 'Tesco'
  }
};

describe('Account reducer', () => {
  it("should add the correct amount to the user's balance on update", () => {
    expect(reducer(initialState, latestTransactionsSuccess([transaction1, transaction2]))).toEqual({
      ...initialState,
      balance: -3000
    });
  });
});
