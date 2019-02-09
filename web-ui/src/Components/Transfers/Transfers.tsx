import * as React from 'react';
import '../../Style/Transfers/Transfers.css';
import TransfersForm from '../../Containers/Transfers/TransfersForm';
import TransfersTableBody from './TransfersTableBody';
import Pitch from '../Team/PitchLayout/Pitch';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import '../../Style/Transfers/PitchValue.css';
import { Button } from 'reactstrap';
import { UpdatePlayers } from '../../Models/Interfaces/UpdatePlayers';
import { updateTeam, getTransferStatus } from '../../Services/Weeks/WeeksService';

interface TransfersProps {
  remainingBudget: number;

  remainingTransfers: number;

  clearPlayersBeingAddedAndRemoved: () => void;

  filteredPlayers: PlayerDTO[];
  activeTeam: PlayerDTO[];

  playersBeingAdded: PlayerDTO[];
  playersBeingRemoved: PlayerDTO[];

  setTransferMarket: (transferMarket: boolean) => void;
  transfersMarketOpen: boolean;
}

class Transfers extends React.Component<TransfersProps, {}> {
  constructor(props: TransfersProps) {
    super(props);
    getTransferStatus().then(response => {
      this.props.setTransferMarket(response);
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
            {this.props.transfersMarketOpen ? (
              <div>Transfer Market: Open</div>
            ) : (
              <div>Transfer Market: Closed</div>
            )}
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
