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
import TeamData from '../../Containers/Team/TeamData';

interface TransfersProps {
  remainingBudget: number;
  setRemainingBudget: (remainingBudget: number) => void;
  addPlayer: (player: PlayerDTO) => void;

  filteredPlayers: PlayerDTO[];
  activeTeam: PlayerDTO[];

  playersBeingAdded: PlayerDTO[];
  playersBeingRemoved: PlayerDTO[];

  setTransferMarket: (transferMarket: boolean) => void;
  transfersMarketOpen: boolean;

  removeIndex: (indexToRemove: number) => void;
  removeFromActiveTeam: (id: string) => void;
  removeFromPlayersBeingAdded: (index: number) => void;
}

interface TransfersState {
  teamUpdated: boolean;
  errorMessage: string;
  playersToAdd: PlayerDTO[];
  playersToRemove: PlayerDTO[];
}

class Transfers extends React.Component<TransfersProps, TransfersState> {
	constructor (props: TransfersProps) {
		super(props);
		this.handleUpdateTeam = this.handleUpdateTeam.bind(this);
		this.onRemoveFromActiveTeam = this.onRemoveFromActiveTeam.bind(this);
		this.onAddOrRemovePlayer = this.onAddOrRemovePlayer.bind(this);
		this.canAdd = this.canAdd.bind(this);
		this.removeFromPlayersBeingAdded = this.removeFromPlayersBeingAdded.bind(this);
		this.state = {
			teamUpdated: false,
			errorMessage: '',
			playersToAdd: [],
			playersToRemove: []
		};
	}

	addToPlayerBeingRemoved (player: PlayerDTO) {
		this.setState(prevState => ({
			playersToRemove: prevState.playersToRemove.concat(player)
		}));
	}

	addToPlayerBeingAdded (player: PlayerDTO) {
		this.setState(prevState => ({
			playersToAdd: prevState.playersToAdd.concat(player)
		}));
	}

	removeFromPlayersBeingAdded (indexToRemove: number) {
		this.setState(prevState => ({
			playersToAdd: prevState.playersToAdd.filter(
				(item, index) => indexToRemove !== index)
		}));
	}

	removeFromPlayersBeingRemoved (indexToRemove: number) {
		this.setState(prevState => ({
			playersToRemove: prevState.playersToRemove.filter(
				(item, index) => indexToRemove !== index
			)
		}));
	}

	canAdd (player: PlayerDTO): boolean {
		let numberInThatPosition: number = 0;
		let playerExists: boolean = false;
		const { activeTeam, remainingBudget } = this.props;
		activeTeam.forEach(element => {
			if (element.position === player.position) {
				numberInThatPosition += 1;
			}
			if (element.id === player.id) {
				playerExists = true;
			}
		});

		if (playerExists) {
			return false;
		}
		if (player.price !== undefined && player.price > remainingBudget) {
			return false;
		}

		if (player.position === 'GOALKEEPER') {
			if (numberInThatPosition > 0) {
				return false;
			}
		} else if (player.position === 'DEFENDER') {
			if (numberInThatPosition > 3) {
				return false;
			}
		} else if (player.position === 'MIDFIELDER') {
			if (numberInThatPosition > 3) {
				return false;
			}
		} else if (player.position === 'ATTACKER') {
			if (numberInThatPosition > 1) {
				return false;
			}
		}
		return true;
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
		this.state.playersToAdd.forEach((element, index) => {
			if (element.id === id) {
				removed = true;
				this.removeFromPlayersBeingAdded(index);
			}
		});

		if (!removed) {
			this.addToPlayerBeingRemoved(player);
		}
		this.props.setRemainingBudget(this.props.remainingBudget + price);
	}

	handleUpdateTeam () {
		let data: UpdatePlayers = {
			playersBeingAdded: this.state.playersToAdd,
			playersBeingRemoved: this.state.playersToRemove
		};

		updateTeam(data)
			.then(response => {
				this.setState({ playersToAdd: [],
					 			playersToRemove: [],
					  			teamUpdated: true,
					   			errorMessage: '' });
			})
			.catch(error => {
				this.setState({ errorMessage: error, teamUpdated: false });
			});
	}

	onRowClick = (element: PlayerDTO) => {
		const { addPlayer, setRemainingBudget, remainingBudget } = this.props;
		if (this.canAdd(element)) {
			addPlayer(element);

			let removed: boolean = false;
			this.state.playersToRemove.forEach((ele, index) => {
				if (ele.id === element.id) {
					removed = true;
					this.removeFromPlayersBeingRemoved(index);
				}
			});

			if (!removed) {
				this.addToPlayerBeingAdded(element);
			}
			if (element.price !== undefined) {
				setRemainingBudget(remainingBudget - element.price);
			}
		}
	};

	render () {
		const { remainingBudget, transfersMarketOpen, activeTeam } = this.props;
		const { teamUpdated, errorMessage } = this.state;
		return (
			<div className="outer-transfer-columns">
				<TeamData />
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
							handleClickOnPlayer={() => {}}
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
						<div className="transfers-table-wrapper">
							<div className="transfers-table">
								<TransfersTableBody
									handleRowClick={this.onRowClick}
									index={0}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Transfers;
