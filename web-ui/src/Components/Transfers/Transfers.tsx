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
}

interface TransfersState {
  errorMessage: string;
  playersToAdd: PlayerDTO[];
  playersToRemove: PlayerDTO[];
  isError: boolean;
  searchingByPercentage: boolean;
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
			errorMessage: '',
			playersToAdd: [],
			playersToRemove: [],
			isError: false,
			searchingByPercentage: false
		};

		this.findTeam();
		this.setInitialBudget();
	}

	componentDidUpdate (prevProps:any) {
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
			try {
				if (this.props.team[this.props.accountId][-1] === undefined) {
					getTeamForUserInWeek(this.props.accountId, -1).then(response => {
						this.props.setTeam(this.props.accountId, -1, response);
					}).catch(error => {
						console.log('error = ' + error);
					});
				}
			} catch (error) {
				getTeamForUserInWeek(this.props.accountId, -1).then(response => {
					this.props.setTeam(this.props.accountId, -1, response);
				}).catch(error => {
					console.log('error = ' + error);
				});
			}
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
		if (this.props.accountId !== '') {
			getUserBudget(this.props.accountId).then(response => {
				this.props.setBudget(this.props.accountId, response);
			}).catch(error => {
				console.log('error = ' + error);
			});
		}
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
			this.setState({ errorMessage: 'Cannot have the same player twice!', isError: true });
			return false;
		}
		if (player.price !== undefined && player.price > this.props.remainingBudget[this.props.accountId]) {
			this.setState({ errorMessage: 'Not enough money available', isError: true });
			return false;
		}

		if (player.position === 'GOALKEEPER') {
			if (numberInThatPosition > 0) {
				this.setState({ errorMessage: 'You can only have a single keeper', isError: true });
				return false;
			}
		} else if (player.position === 'DEFENDER') {
			if (numberInThatPosition > 4) {
				this.setState({ errorMessage: 'Cannot have more than 5 defenders', isError: true });
				return false;
			}
		} else if (player.position === 'MIDFIELDER') {
			if (numberInThatPosition > 4) {
				this.setState({ errorMessage: 'Cannot have more than 5 midfielders', isError: true });
				return false;
			}
		} else if (player.position === 'ATTACKER') {
			if (numberInThatPosition > 2) {
				this.setState({ errorMessage: 'Cannot have more than 3 attackers', isError: true });
				return false;
			}
		}
		if (currentTeam.length === 11) {
			this.setState({ errorMessage: 'Cannot have more than 11 players', isError: true });
			return false;
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
				this.setState({
					playersToAdd: [],
					playersToRemove: [],
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
									activeWeeklyTeam={teamToRender}
									addOrRemovePlayer={this.onAddOrRemovePlayer}
									handleClickOnPlayer={noop}
									noPoints={false}
									removeFromActiveTeam={this.onRemoveFromActiveTeam}
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

								<ResponseMessage
									isError={this.state.isError}
									responseMessage={this.state.errorMessage}
									shouldDisplay={this.state.errorMessage.length > 0}
								/>
								<div className="pitch-value">
									<Pitch
										activeWeeklyTeam={teamToRender}
										addOrRemovePlayer={this.onAddOrRemovePlayer}
										handleClickOnPlayer={noop}
										noPoints={false}
										removeFromActiveTeam={this.onRemoveFromActiveTeam}
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
