/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import '../../Style/Transfers/Transfers.css';
import TransfersForm from './TransfersForm';
import TransfersTableBody from './TransfersTableBody';
import Pitch from '../Team/PitchLayout/Pitch';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import '../../Style/Transfers/PitchValue.css';
import { Button } from 'reactstrap';
import { UpdatePlayers } from '../../Models/Interfaces/UpdatePlayers';
import { updateTeam } from '../../Services/Weeks/WeeksService';
import TeamData from '../../Containers/Team/TeamData';
import { getTeamForUserInWeek } from '../../Services/Player/PlayerService';
import { getUserBudget } from '../../Services/User/UserService';
import ResponseMessage from '../common/ResponseMessage';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import { noop } from 'lodash';
import Media from 'react-media';

interface TransfersProps {
  accountId: string;
  remainingBudget: { user: { id: string; budget: number } }
  setBudget: (user: string, budget:number) => void;
  setFilteredPlayers: (filteredTeam: PlayerDTO[]) => void;

  allCollegeTeams: CollegeTeam[];
  filteredPlayers: PlayerDTO[];

  playersBeingAdded: PlayerDTO[];
  playersBeingRemoved: PlayerDTO[];

  setTransferMarket: (transferMarket: boolean) => void;
  transfersMarketOpen: boolean;

  team: { user: { weeks: { id: string; team: PlayerDTO[] } } }
  setTeam: (user: string, week: number, team: PlayerDTO[]) => void;

  setCurrentTransferTeam: (currentTransferTeam: PlayerDTO[]) => void;
  setOriginalTransferTeam: (originalTransferTeam: PlayerDTO[]) => void;

  currentTransferTeam: PlayerDTO[];
  originalTransferTeam: PlayerDTO[];

  playersToAdd: PlayerDTO[];
  playersToRemove: PlayerDTO[];

  removePlayer: (playerToRemove: PlayerDTO) => void;
  addPlayer: (playerToRemove: PlayerDTO) => void;

  clearPlayersBeingAddedAndRemoved: () => void;
}

interface TransfersState {
  errorMessage: string;
  isError: boolean;
  searchingByPercentage: boolean;
}

class Transfers extends React.Component<TransfersProps, TransfersState> {
	constructor (props: TransfersProps) {
		super(props);
		this.handleUpdateTeam = this.handleUpdateTeam.bind(this);
		this.onRemovePlayer = this.onRemovePlayer.bind(this);
		this.canAdd = this.canAdd.bind(this);
		this.findTeam = this.findTeam.bind(this);
		this.setInitialBudget = this.setInitialBudget.bind(this);
		this.state = {
			errorMessage: '',
			isError: false,
			searchingByPercentage: false
		};

		this.findTeam();
		this.setInitialBudget();
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.accountId !== this.props.accountId) {
			this.findTeam();
		}
	}

	findTeam () {
		if (this.props.accountId !== '' && Object.entries(this.props.originalTransferTeam).length === 0) {
			getTeamForUserInWeek(this.props.accountId, -1).then(response => {
				this.props.setOriginalTransferTeam(response);
				this.props.setCurrentTransferTeam(response);

				if (Object.entries(this.props.team).length === 0) {
					this.props.setTeam(this.props.accountId, -1, response);
				}
			}).catch(error => {
				console.log('error = ' + error);
			});
		}
	}

	setInitialBudget () {
		if (this.props.accountId !== '') {
			getUserBudget(this.props.accountId).then(response => {
				this.props.setBudget(this.props.accountId, response);
			}).catch(error => {
				console.log('error = ' + error);
			});
		}
	}

	canAdd (player: PlayerDTO): boolean {
		let numberOfGoalkeepers: number = 0;
		let numberOfDefenders: number = 0;
		let numberOfMidfielders: number = 0;
		let numberOfAttackers: number = 0;
		let playerExists: boolean = false;
		let currentTeam: PlayerDTO[] = this.props.currentTransferTeam;
		currentTeam.forEach(element => {
			if (element.position === 'DEFENDER' && element.firstName !== 'REMOVED') {
				numberOfDefenders += 1;
			} else if (element.position === 'MIDFIELDER' && element.firstName !== 'REMOVED') {
				numberOfMidfielders += 1;
			} else if (element.position === 'ATTACKER' && element.firstName !== 'REMOVED') {
				numberOfAttackers += 1;
			} else if (element.position === 'GOALKEEPER' && element.firstName !== 'REMOVED') {
				numberOfGoalkeepers += 1;
			}
			if (element.id === player.id && element.firstName === player.firstName) {
				playerExists = true;
			}
		});
		if (playerExists) {
			this.setState({ errorMessage: 'Cannot have the same player twice!', isError: true });
			return false;
		}
		if (player.price !== undefined && player.price > this.props.remainingBudget[this.props.accountId]) {
			this.setState({ errorMessage: 'Not enough money available', isError: true });
			return false;
		}

		if (player.position !== 'GOALKEEPER' && numberOfDefenders + numberOfMidfielders + numberOfAttackers === 10 && numberOfGoalkeepers === 0) {
			this.setState({ errorMessage: 'You must have a keeper', isError: true });
			return false;
		}

		if (player.position === 'GOALKEEPER') {
			if (numberOfGoalkeepers > 0) {
				this.setState({ errorMessage: 'You can only have a single keeper', isError: true });
				return false;
			}
		} else if (player.position === 'DEFENDER') {
			if (numberOfDefenders > 4) {
				this.setState({ errorMessage: 'Cannot have more than 5 defenders', isError: true });
				return false;
			} else if (numberOfDefenders === 4 && numberOfMidfielders === 5) {
				this.setState({ errorMessage: 'Cannot have 5 defenders and 5 midfielders', isError: true });
				return false;
			}
		} else if (player.position === 'MIDFIELDER') {
			if (numberOfMidfielders > 4) {
				this.setState({ errorMessage: 'Cannot have more than 5 midfielders', isError: true });
				return false;
			} else if (numberOfMidfielders === 4 && numberOfAttackers > 2) {
				this.setState({ errorMessage: 'Cannot have more 5 attackers and more than 2 strikers', isError: true });
				return false;
			} else if (numberOfDefenders === 5 && numberOfMidfielders === 4) {
				this.setState({ errorMessage: 'Cannot have 5 midfielders and 5 defenders', isError: true });
				return false;
			}
		} else if (player.position === 'ATTACKER') {
			if (numberOfAttackers > 2) {
				this.setState({ errorMessage: 'Cannot have more than 3 attackers', isError: true });
				return false;
			} else if (numberOfAttackers === 2 && numberOfMidfielders === 5) {
				this.setState({ errorMessage: 'Cannot have more 3 attackers and 5 midfielders', isError: true });
				return false;
			}
		}
		if (currentTeam.filter(player => player.firstName !== 'REMOVED').length === 11) {
			this.setState({ errorMessage: 'Cannot have more than 11 players', isError: true });
			return false;
		}
		return true;
	}

	onRemovePlayer (id: string, price: number, player: PlayerDTO) {
		this.props.removePlayer(player);
		this.props.setBudget(this.props.accountId, this.props.remainingBudget[this.props.accountId] + price);
	}

	handleUpdateTeam () {
		let data: UpdatePlayers = {
			playersBeingAdded: this.props.playersToAdd,
			playersBeingRemoved: this.props.playersToRemove
		};

		updateTeam(data)
			.then(response => {
				this.props.setOriginalTransferTeam(this.props.currentTransferTeam);
				this.props.clearPlayersBeingAddedAndRemoved();
				this.props.setTeam(this.props.accountId, -1, this.props.currentTransferTeam);
				this.setState({
					errorMessage: 'Team updated successfully',
					isError: false });
			})
			.catch(error => {
				this.setState({ errorMessage: error, isError: true });
			});
	}

	onRowClick = (element: PlayerDTO) => {
		const { remainingBudget } = this.props;
		if (this.canAdd(element)) {
			this.props.addPlayer(element);
			if (element.price !== undefined) {
				this.props.setBudget(this.props.accountId, remainingBudget[this.props.accountId] - element.price);
			}
		}
	};

	render () {
		const { remainingBudget, transfersMarketOpen } = this.props;
		return (
			<Media query="(max-width: 599px)">
				{matches =>
					matches ? (
						<div className="outer-transfer-columns">
							<TeamData />
							<div className="transfer-info-row">
								<div className="info">
									{remainingBudget[this.props.accountId] !== undefined
										? 'Remaining Budget £' + remainingBudget[this.props.accountId].toFixed(1) + 'mil'
										: 'Remaining Budget £0 mil' }
								</div>
								{transfersMarketOpen ? (
									<div className="info">Transfer Market Open</div>
								) : (
									<div className="info">Transfer Market Closed</div>
								)}
								<div className="save-changes">
									<Button
										className="btn btn-default btn-round-lg btn-lg first"
										id="transfers-save-team"
										onClick={this.handleUpdateTeam}
										type="submit"
									>
                				Save Team
									</Button>
								</div>
							</div>

							<div className="pitch-value">
								<Pitch
									activeWeeklyTeam={this.props.currentTransferTeam}
									handleClickOnPlayer={noop}
									noPoints={false}
									removePlayer={this.onRemovePlayer}
									transfer

								/>
							</div>
							<TransfersForm
								allCollegeTeams={this.props.allCollegeTeams}
								filteredPlayers={this.props.filteredPlayers}
								setFilteredPlayers={this.props.setFilteredPlayers}
								setSearchingByPercentage={(e:boolean) => this.setState({ searchingByPercentage: e })}
							/>
							<ResponseMessage
								isError={this.state.isError}
								responseMessage={this.state.errorMessage}
								shouldDisplay
							/>
							<div className="transfers-table-wrapper">
								<div className="transfers-table">
									<TransfersTableBody
										filteredPlayers={this.props.filteredPlayers}
										handleRowClick={this.onRowClick}
										searchingByPercentage={this.state.searchingByPercentage}
									/>
								</div>
							</div>
						</div>
					) : (
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
                				Save Team
										</Button>
									</div>
								</div>
								<div className="pitch-value">
									<Pitch
										activeWeeklyTeam={this.props.currentTransferTeam}
										handleClickOnPlayer={noop}
										noPoints={false}
										removePlayer={this.onRemovePlayer}
										transfer
									/>
								</div>
							</div>
							<div className="right-rows">
								<div className="flex-container">
									<div>
										<TransfersForm
											allCollegeTeams={this.props.allCollegeTeams}
											filteredPlayers={this.props.filteredPlayers}
											setFilteredPlayers={this.props.setFilteredPlayers}
											setSearchingByPercentage={(e:boolean) => this.setState({ searchingByPercentage: e })}
										/>
									</div>
									<ResponseMessage
										isError={this.state.isError}
										responseMessage={this.state.errorMessage}
										shouldDisplay
									/>
									<div className="transfers-table-wrapper">
										<div className="transfers-table">
											<TransfersTableBody
												filteredPlayers={this.props.filteredPlayers}
												handleRowClick={this.onRowClick}
												searchingByPercentage={this.state.searchingByPercentage}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				}
			</Media>
		);
	}
}
export default Transfers;
