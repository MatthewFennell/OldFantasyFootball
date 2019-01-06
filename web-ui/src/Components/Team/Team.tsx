import * as React from 'react';
import '../../Style/Team/Team.css';

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
      <div className="outer-rows">
        <div className="row-1-info">Total points / Week N</div>
        <div className="row-2-stats">Average points / Player with most / User with most</div>
        <div className="row-3-squad">Squad</div>
        <div className="row-4-bench">Bench</div>
      </div>
    );
  }
}

export default Transactions;
