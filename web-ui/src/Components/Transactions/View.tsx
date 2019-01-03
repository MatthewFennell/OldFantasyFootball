import * as React from 'react';
import '../../Style/Transactions.css';

interface TransactionsProps {}

interface TransactionsState {}

class Transactions extends React.Component<TransactionsProps, TransactionsState> {
  constructor(props: TransactionsProps) {
    super(props);
    // Overestimate the max rows per page (better to load too many than too few)
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div id="outer-account-balance">
        HI THERE
        <div />
      </div>
    );
  }
}

export default Transactions;
