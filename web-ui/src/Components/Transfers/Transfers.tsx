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
import { getTeamForUserInWeek } from '../../Services/Player/PlayerService';
import { getUserBudget } from '../../Services/User/UserService';

interface TransfersProps {
  accountId: string;
  remainingBudget: { user: { id: string; budget: number } }
  setBudget: (user: string, budget:number) => void;

  filteredPlayers: PlayerDTO[];

  playersBeingAdded: PlayerDTO[];
  playersBeingRemoved: PlayerDTO[];

  setTransferMarket: (transferMarket: boolean) => void;
  transfersMarketOpen: boolean;

  team: { user: { weeks: { id: string; team: PlayerDTO[] } } }
  setTeam: (user: string, week: number, team: PlayerDTO[]) => void;
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
		this.findTeam = this.findTeam.bind(this);
		this.setInitialBudget = this.setInitialBudget.bind(this);
		this.state = {
			teamUpdated: false,
			errorMessage: '',
			playersToAdd: [],
			playersToRemove: []
		};

		this.findTeam();
		this.setInitialBudget();
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.accountId !== this.props.accountId) {
			this.findTeam();
			this.setInitialBudget();
		}
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

	findTeam () {
		if (this.props.accountId !== '') {
			getTeamForUserInWeek(this.props.accountId, -1).then(response => {
				this.props.setTeam(this.props.accountId, -1, response);
			}).catch(error => {
				console.log('error = ' + error);
			});
		}
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

	setInitialBudget () {
		getUserBudget(this.props.accountId).then(response => {
			this.props.setBudget(this.props.accountId, response);
		}).catch(error => {
			console.log('error = ' + error);
		});
	}

	canAdd (player: PlayerDTO): boolean {
		let numberInThatPosition: number = 0;
		let playerExists: boolean = false;
		let currentTeam: PlayerDTO[] = this.props.team[this.props.accountId]['-1'];
		currentTeam.forEach(element => {
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
		if (player.price !== undefined && player.price > this.props.remainingBudget[this.props.accountId]) {
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
		let currentTeam: PlayerDTO[] = this.props.team[this.props.accountId]['-1'];

		let newTeam = currentTeam.filter(x => x.id !== id);

		this.props.setTeam(this.props.accountId, -1, newTeam);
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
		this.props.setBudget(this.props.accountId, this.props.remainingBudget[this.props.accountId] + price);
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
		const { remainingBudget } = this.props;
		if (this.canAdd(element)) {
			let currentTeam: PlayerDTO[] = this.props.team[this.props.accountId]['-1'].concat(element);
			this.props.setTeam(this.props.accountId, -1, currentTeam);

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
				this.props.setBudget(this.props.accountId, remainingBudget[this.props.accountId] - element.price);
			}
		}
	};

	render () {
		let teamToRender = this.props.team[this.props.accountId] !== undefined &&
		this.props.team[this.props.accountId][-1] !== undefined
			? this.props.team[this.props.accountId][-1] : [];

		const { remainingBudget, transfersMarketOpen } = this.props;
		const { teamUpdated, errorMessage } = this.state;
		return (
			<div className="outer-transfer-columns">
				<TeamData />
				<div className="left-rows">
					<div className="transfer-info-row">
						<div className="info">
							{remainingBudget[this.props.accountId] !== undefined
								? 'Remaining Budget: £' + remainingBudget[this.props.accountId].toFixed(1) + 'mil'
								: 'Remaining Budget: £0 mil' }
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
							activeWeeklyTeam={teamToRender}
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
