import * as React from 'react';
import '../../Style/Team/Team.css';
import Info from '../../Containers/Team/Info';
import Stats from '../../Containers/Team/Stats';

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
        <div className="row-1-info">
          <Info />
        </div>
        <div className="row-2-stats">
          <Stats />
        </div>
        <div className="row-3-squad">Squad</div>
        <div className="row-4-bench">Bench</div>
      </div>
    );
  }
}

export default Transactions;
