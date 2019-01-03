import { reducer, initialState } from '../../Reducers/Transactions';
import {
  addTransactionsAbove,
  addTransactionsBelow,
  removeTransactionsAbove,
  removeTransactionsBelow,
  setTransactionBeingViewed,
  latestTransactionsSuccess,
  ActionTypes
} from '../../Actions/TransactionActions';

const oneDay = 86400000;
const transaction1 = {
  amount: 0,
  category: {
    description: 'General',
    id: 'general'
  },
  date: new Date(Date.now() + oneDay),
  description: 'Weekly shop',
  id: '1',
  payee: {
    id: 'tesco',
    name: 'Tesco'
  }
};
const transaction2 = {
  amount: 0,
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
const transaction3 = {
  amount: 0,
  category: {
    description: 'General',
    id: 'general'
  },
  date: new Date(Date.now() - oneDay),
  description: 'Weekly shop',
  id: '3',
  payee: {
    id: 'tesco',
    name: 'Tesco'
  }
};
const transaction4 = {
  amount: 0,
  category: {
    description: 'General',
    id: 'general'
  },
  date: new Date(),
  description: 'Weekly shop',
  id: '4',
  payee: {
    id: 'tesco',
    name: 'Tesco'
  }
};
const transaction5 = {
  amount: 0,
  category: {
    description: 'General',
    id: 'general'
  },
  date: new Date(),
  description: 'Weekly shop',
  id: '5',
  payee: {
    id: 'tesco',
    name: 'Tesco'
  }
};

const storeWithTransactions = {
  ...initialState,
  transactionBeingViewed: transaction1,
  transactions: [transaction1, transaction2, transaction3],
  transactionNotesMeta: {
    error: '',
    isRequesting: {
      [transaction1.id]: {
        isRequestingAddNotes: false,
        isRequestingDeleteNotes: false
      },
      [transaction2.id]: {
        isRequestingAddNotes: false,
        isRequestingDeleteNotes: false
      },
      [transaction3.id]: {
        isRequestingAddNotes: false,
        isRequestingDeleteNotes: false
      }
    }
  }
};

describe('Transactions reducer', () => {
  it('should add correct transactions above', () => {
    expect(
      reducer(storeWithTransactions, addTransactionsAbove([transaction4, transaction5]))
    ).toEqual({
      ...storeWithTransactions,
      transactions: [transaction4, transaction5, transaction1, transaction2, transaction3],
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        isRequesting: {
          ...storeWithTransactions.transactionNotesMeta.isRequesting,
          [transaction4.id]: {
            isRequestingAddNotes: false,
            isRequestingDeleteNotes: false
          },
          [transaction5.id]: {
            isRequestingAddNotes: false,
            isRequestingDeleteNotes: false
          }
        }
      }
    });
  });

  it('should add correct transactions below', () => {
    expect(
      reducer(storeWithTransactions, addTransactionsBelow([transaction4, transaction5]))
    ).toEqual({
      ...storeWithTransactions,
      transactions: [transaction1, transaction2, transaction3, transaction4, transaction5],
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        isRequesting: {
          ...storeWithTransactions.transactionNotesMeta.isRequesting,
          [transaction4.id]: {
            isRequestingAddNotes: false,
            isRequestingDeleteNotes: false
          },
          [transaction5.id]: {
            isRequestingAddNotes: false,
            isRequestingDeleteNotes: false
          }
        }
      }
    });
  });

  it('should remove correct transactions above', () => {
    expect(reducer(storeWithTransactions, removeTransactionsAbove(1))).toEqual({
      ...storeWithTransactions,
      transactions: [transaction2, transaction3],
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        isRequesting: {
          [transaction2.id]:
            storeWithTransactions.transactionNotesMeta.isRequesting[transaction2.id],
          [transaction3.id]:
            storeWithTransactions.transactionNotesMeta.isRequesting[transaction3.id]
        }
      }
    });
  });

  it('should remove correct transactions below', () => {
    expect(reducer(storeWithTransactions, removeTransactionsBelow(1))).toEqual({
      ...storeWithTransactions,
      transactions: [transaction1, transaction2],
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        isRequesting: {
          [transaction1.id]:
            storeWithTransactions.transactionNotesMeta.isRequesting[transaction1.id],
          [transaction2.id]:
            storeWithTransactions.transactionNotesMeta.isRequesting[transaction2.id]
        }
      }
    });
  });

  it('should reset error message when transaction being viewed changes', () => {
    const storeWithError = {
      ...storeWithTransactions,
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        error: 'Error'
      }
    };
    expect(reducer(storeWithError, setTransactionBeingViewed(transaction2))).toEqual({
      ...storeWithTransactions,
      transactionBeingViewed: transaction2,
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        error: ''
      }
    });
  });

  it('should not add error message after add description failure if transaction is not currently viewed', () => {
    const storeWithRequestingAddNote = {
      ...storeWithTransactions,
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        isRequesting: {
          ...storeWithTransactions.transactionNotesMeta.isRequesting,
          [transaction2.id]: {
            ...storeWithTransactions.transactionNotesMeta.isRequesting[transaction2.id],
            isRequestingAddNotes: true
          }
        }
      }
    };
    expect(
      reducer(storeWithRequestingAddNote, {
        type: ActionTypes.ADD_TRANSACTION_DESCRIPTION_FAILURE,
        payload: {
          id: transaction2.id,
          errorMessage: 'Error'
        }
      })
    ).toEqual(storeWithTransactions);
  });

  it('should add error message after add description failure if transaction is currently viewed', () => {
    const storeWithRequestingAddNote = {
      ...storeWithTransactions,
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        isRequesting: {
          ...storeWithTransactions.transactionNotesMeta.isRequesting,
          [transaction1.id]: {
            ...storeWithTransactions.transactionNotesMeta.isRequesting[transaction1.id],
            isRequestingAddNotes: true
          }
        }
      }
    };
    expect(
      reducer(storeWithRequestingAddNote, {
        type: ActionTypes.ADD_TRANSACTION_DESCRIPTION_FAILURE,
        payload: {
          id: transaction1.id,
          errorMessage: 'Error'
        }
      })
    ).toEqual({
      ...storeWithTransactions,
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        error: 'Error'
      }
    });
  });

  it('should not add error message after delete description failure if transaction is not currently viewed', () => {
    const storeWithRequestingDeleteNote = {
      ...storeWithTransactions,
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        isRequesting: {
          ...storeWithTransactions.transactionNotesMeta.isRequesting,
          [transaction2.id]: {
            ...storeWithTransactions.transactionNotesMeta.isRequesting[transaction2.id],
            isRequestingDeleteNotes: true
          }
        }
      }
    };
    expect(
      reducer(storeWithRequestingDeleteNote, {
        type: ActionTypes.DELETE_TRANSACTION_DESCRIPTION_FAILURE,
        payload: {
          id: transaction2.id,
          errorMessage: 'Error'
        }
      })
    ).toEqual(storeWithTransactions);
  });

  it('should add error message after delete description failure if transaction is currently viewed', () => {
    const storeWithRequestingDeleteNote = {
      ...storeWithTransactions,
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        isRequesting: {
          ...storeWithTransactions.transactionNotesMeta.isRequesting,
          [transaction1.id]: {
            ...storeWithTransactions.transactionNotesMeta.isRequesting[transaction1.id],
            isRequestingDeleteNotes: true
          }
        }
      }
    };
    expect(
      reducer(storeWithRequestingDeleteNote, {
        type: ActionTypes.DELETE_TRANSACTION_DESCRIPTION_FAILURE,
        payload: {
          id: transaction1.id,
          errorMessage: 'Error'
        }
      })
    ).toEqual({
      ...storeWithTransactions,
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        error: 'Error'
      }
    });
  });

  it('should add a new transaction if number of transactions is below page limit', () => {
    const transactionFromTomorrow = {
      ...transaction4,
      date: new Date(Date.now() + 2 * oneDay)
    };
    expect(
      reducer(storeWithTransactions, latestTransactionsSuccess([transactionFromTomorrow]))
    ).toEqual({
      ...storeWithTransactions,
      transactions: [transactionFromTomorrow, ...storeWithTransactions.transactions],
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        [transactionFromTomorrow.id]: {
          isRequestingAddNotes: false,
          isRequestingDeleteNotes: false
        }
      }
    });
  });

  it('should not add a new transaction if it is from before current earliest date and transactions is above page limit', () => {
    const transactionFromYesterday = {
      ...transaction4,
      date: new Date(Date.now() - 2 * oneDay)
    };
    const storeWithLowPageLimit = {
      ...storeWithTransactions,
      transactionsPerPage: 3
    };
    expect(
      reducer(storeWithLowPageLimit, latestTransactionsSuccess([transactionFromYesterday]))
    ).toEqual(storeWithLowPageLimit);
  });

  it('should not add a new transaction if it is from after current latest date and transactions is above page limit', () => {
    const transactionFromTomorrow = {
      ...transaction4,
      date: new Date(Date.now() + 2 * oneDay)
    };
    const storeWithLowPageLimit = {
      ...storeWithTransactions,
      transactionsPerPage: 3
    };
    expect(
      reducer(storeWithLowPageLimit, latestTransactionsSuccess([transactionFromTomorrow]))
    ).toEqual(storeWithLowPageLimit);
  });

  it('should add a new transaction in the correct order', () => {
    const transactionFromYesterday = {
      ...transaction4,
      date: new Date(Date.now() - oneDay / 2)
    };
    expect(
      reducer(storeWithTransactions, latestTransactionsSuccess([transactionFromYesterday]))
    ).toEqual({
      ...storeWithTransactions,
      transactions: [transaction1, transaction2, transactionFromYesterday, transaction3],
      transactionNotesMeta: {
        ...storeWithTransactions.transactionNotesMeta,
        [transactionFromYesterday.id]: {
          isRequestingAddNotes: false,
          isRequestingDeleteNotes: false
        }
      }
    });
  });
});
