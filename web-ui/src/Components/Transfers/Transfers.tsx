import * as React from 'react';
import '../../Style/Transfers/Transfers.css';
import { getRemainingBudgetAndTransfers } from '../../Services/UserService';
import TransfersForm from './TransfersForm';

interface TransfersProps {
  remainingBudget: number;
  setRemainingBudget: (remainingBudget: number) => void;

  remainingTransfers: number;
  setRemainingTransfers: (remainingTransfers: number) => void;
}

class Transfers extends React.Component<TransfersProps, {}> {
  componentDidMount() {
    // TO:DO Convert this to a DTO server side (not indexing by just 1 and 0)
    getRemainingBudgetAndTransfers().then(remainingBudget => {
      this.props.setRemainingBudget(remainingBudget[0]);
      this.props.setRemainingTransfers(remainingBudget[1]);
    });
  }

  render() {
    return (
      <div className="outer-transfer-columns">
        <div className="left-rows">
          <div className="transfer-info-row">
            <div>Budget: £{this.props.remainingBudget} mil</div>
            <div>Remaining Transfers: {this.props.remainingTransfers}</div>
            <div>Transfer Deadline</div>
          </div>
          <div>2</div>
        </div>
        <div className="right-rows">
          <div className="flex-container">
            <div>
              <TransfersForm />
            </div>
            <div>2</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Transfers;
