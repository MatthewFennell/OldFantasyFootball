import * as React from 'react';
import '../../Style/Transfers/Transfers.css';
import { getRemainingBudgetAndTransfers, updateTeam } from '../../Services/UserService';
import TransfersForm from '../../Containers/Transfers/TransfersForm';
import TransfersTableBody from './TransfersTableBody';
import { FilteredPlayer } from '../../Models/Interfaces/FilteredPlayer';
import Pitch from '../Team/PitchLayout/Pitch';
import { WeeklyPlayer } from '../../Models/Interfaces/WeeklyPlayer';
import '../../Style/Transfers/PitchValue.css';
import { Button } from 'reactstrap';
import { UpdatePlayers } from '../../Models/Interfaces/UpdatePlayers';

interface TransfersProps {
  remainingBudget: number;
  setRemainingBudget: (remainingBudget: number) => void;

  remainingTransfers: number;
  setRemainingTransfers: (remainingTransfers: number) => void;

  clearPlayersBeingAddedAndRemoved: () => void;

  filteredPlayers: FilteredPlayer[];
  activeTeam: WeeklyPlayer[];

  playersBeingAdded: WeeklyPlayer[];
  playersBeingRemoved: WeeklyPlayer[];
}

class Transfers extends React.Component<TransfersProps, {}> {
  componentDidMount() {
    // TO:DO Convert this to a DTO server side (not indexing by just 1 and 0)
    getRemainingBudgetAndTransfers().then(remainingBudget => {
      this.props.setRemainingBudget(remainingBudget[0]);
      this.props.setRemainingTransfers(remainingBudget[1]);
    });
  }

  _updateTeam() {
    let data: UpdatePlayers = {
      playersBeingAdded: this.props.playersBeingAdded,
      playersBeingRemoved: this.props.playersBeingRemoved
    };

    updateTeam(data)
      .then(response => {
        console.log('Valid transfer request = ' + JSON.stringify(response));
        this.props.clearPlayersBeingAddedAndRemoved();
      })
      .catch(error => {
        console.log('error = ' + JSON.stringify(error));
      });
  }

  render() {
    return (
      <div className="outer-transfer-columns">
        <div className="left-rows">
          <div className="transfer-info-row">
            <div>Remaining Budget: £{this.props.remainingBudget.toFixed(1)} mil</div>
            <div>Remaining Transfers: {this.props.remainingTransfers}</div>
            <div>Transfer Deadline</div>
          </div>
          <div className="save-changes">
            <Button
              id="btnLogin"
              type="submit"
              className="btn btn-default btn-round-lg btn-lg first"
              onClick={(e: any) => this._updateTeam()}
            >
              SAVE TEAM
            </Button>
          </div>
          <div className="pitch-value">
            <Pitch transfer={true} activeWeeklyTeam={this.props.activeTeam} />
          </div>
        </div>
        <div className="right-rows">
          <div className="flex-container">
            <div>
              <TransfersForm />
            </div>
            <div>
              <div className="transfers-table">
                <TransfersTableBody filteredPlayers={this.props.filteredPlayers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Transfers;
