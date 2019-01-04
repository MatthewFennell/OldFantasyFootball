import * as React from 'react';
import ActiveTeam from '../../Containers/ActiveTeam';

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
      <div id="my-team">
        <ActiveTeam />
        <div />
      </div>
    );
  }
}

export default Transactions;
