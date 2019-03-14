import * as React from 'react';
import '../../Style/Transfers/Transfers.css';
import TransfersForm from '../../Containers/Transfers/TransfersForm';
import TransfersTableBody from '../../Containers/Transfers/TransfersTableBody';
import Pitch from '../Team/PitchLayout/Pitch';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import '../../Style/Transfers/PitchValue.css';
import { Button } from 'reactstrap';
import { UpdatePlayers } from '../../Models/Interfaces/UpdatePlayers';
import { updateTeam } from '../../Services/Weeks/WeeksService';

interface TransfersProps {
  remainingBudget: number;
  setRemainingBudget: (remainingBudget: number) => void;

  remainingTransfers: number;

  clearPlayersBeingAddedAndRemoved: () => void;

  filteredPlayers: PlayerDTO[];
  activeTeam: PlayerDTO[];

  playersBeingAdded: PlayerDTO[];
  playersBeingRemoved: PlayerDTO[];

  setTransferMarket: (transferMarket: boolean) => void;
  transfersMarketOpen: boolean;

  removeIndex: (indexToRemove: number) => void;

  addToPlayerBeingRemoved: (playerBeingAdded: PlayerDTO) => void;
  removeFromActiveTeam: (id: string) => void;
  removeFromPlayersBeingAdded: (index: number) => void;
}

interface TransfersState {
  teamUpdated: boolean;
  errorMessage: string;
}

class Transfers extends React.Component<TransfersProps, TransfersState> {
	constructor (props: TransfersProps) {
		super(props);
		this.handleUpdateTeam = this.handleUpdateTeam.bind(this);
		this.onRemoveFromActiveTeam = this.onRemoveFromActiveTeam.bind(this);
		this.onAddOrRemovePlayer = this.onAddOrRemovePlayer.bind(this);
		this.state = {
			teamUpdated: false,
			errorMessage: '',
		};
	}

	onRemoveFromActiveTeam (id: string) {
		this.props.activeTeam.forEach((element, index) => {
			if (element.id === id) {
				this.props.removeIndex(index);
			}
		});
	}

	onAddOrRemovePlayer (id: string, price: number, player: PlayerDTO) {
		let removed: boolean = false;
		this.props.playersBeingAdded.forEach((element, index) => {
			if (element.id === id) {
				removed = true;
				this.props.removeFromPlayersBeingAdded(index);
			}
		});

		if (!removed) {
			this.props.addToPlayerBeingRemoved(player);
		}
		this.props.setRemainingBudget(this.props.remainingBudget + price);
	}

	handleUpdateTeam () {
		const { playersBeingAdded, playersBeingRemoved, clearPlayersBeingAddedAndRemoved } = this.props;
		console.log('Adding players ' + JSON.stringify(playersBeingAdded));
		let data: UpdatePlayers = {
			playersBeingAdded: playersBeingAdded,
			playersBeingRemoved: playersBeingRemoved
		};

		updateTeam(data)
			.then(response => {
				clearPlayersBeingAddedAndRemoved();
				this.setState({ teamUpdated: true });
				this.setState({ errorMessage: '' });
			})
			.catch(error => {
				this.setState({ errorMessage: error });
				this.setState({ teamUpdated: false });
			});
	}

	render () {
		const { remainingBudget, transfersMarketOpen, activeTeam } = this.props;
		const { teamUpdated, errorMessage } = this.state;
		return (
			<div className="outer-transfer-columns">
				<div className="left-rows">
					<div className="transfer-info-row">
						<div className="info">
              Remaining Budget: £{remainingBudget.toFixed(1)} mil
						</div>
						{transfersMarketOpen ? (
							<div className="info">Transfer Market: Open</div>
						) : (
							<div className="info">Transfer Market: Closed</div>
						)}
						<div className="save-changes">
							<Button
								className="btn btn-default btn-round-lg btn-lg first"
								id="transfers-save-team"
								onClick={this.handleUpdateTeam}
								type="submit"
							>
                			SAVE TEAM
							</Button>
						</div>
					</div>

					{teamUpdated ? <div>Team updated successfully </div> : null}
					{errorMessage.length > 0 ? (
						<div>Error : {errorMessage} </div>
					) : null}
					<div className="pitch-value">
						<Pitch
							activeWeeklyTeam={activeTeam}
							addOrRemovePlayer={this.onAddOrRemovePlayer}
							removeFromActiveTeam={this.onRemoveFromActiveTeam}
							transfer
						/>
					</div>
				</div>
				<div className="right-rows">
					<div className="flex-container">
						<div>
							<TransfersForm />
						</div>
						<div>
							<div className="transfers-table">
								<TransfersTableBody />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Transfers;
