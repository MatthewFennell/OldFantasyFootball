import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import TransfersRow from './TransfersRow';
import '../../Style/Transfers/TransfersFilter.css';

interface TransfersTableBodyProps {
  filteredPlayers: PlayerDTO[];
  handleRowClick: (player: PlayerDTO) => void;
  setFilteredPlayers: (filteredTeam: PlayerDTO[]) => void;
  reverseFilteredPlayers: () => void;
}

class TransfersTableBody extends React.Component<TransfersTableBodyProps> {
	constructor (props: TransfersTableBodyProps) {
		super(props);
		this.handleSortByPrice = this.handleSortByPrice.bind(this);
		this.handleSortByGoals = this.handleSortByGoals.bind(this);
		this.handleSortByAssists = this.handleSortByAssists.bind(this);
		this.handleSortByTotalScore = this.handleSortByTotalScore.bind(this);
		this.handleSortByTeamName = this.handleSortByTeamName.bind(this);
		this.handleSortByName = this.handleSortByName.bind(this);
	}

	handleSortByPrice () {
		const { filteredPlayers, reverseFilteredPlayers, setFilteredPlayers } = this.props;
		let alreadySortedByPrice: boolean = true;
		for (let x = 0; x < filteredPlayers.length; x++) {
			if (x !== 0) {
				if (filteredPlayers[x].price > filteredPlayers[x - 1].price) {
					alreadySortedByPrice = false;
				}
			}
		}

		if (alreadySortedByPrice) {
			reverseFilteredPlayers();
		} else {
			let newList: PlayerDTO[] = filteredPlayers.sort(
				(obj1, obj2) => obj2.price - obj1.price
			);
			setFilteredPlayers(newList);
		}
		// Wasn't rerendering without this??
		this.forceUpdate();
	}

	handleSortByTeamName () {
		const { filteredPlayers, reverseFilteredPlayers, setFilteredPlayers } = this.props;
		let alreadySortedByTeamName: boolean = true;
		for (let x = 0; x < filteredPlayers.length; x++) {
			if (x !== 0) {
				if (
					filteredPlayers[x].collegeTeam > filteredPlayers[x - 1].collegeTeam
				) {
					alreadySortedByTeamName = false;
				}
			}
		}

		if (alreadySortedByTeamName) {
			reverseFilteredPlayers();
		} else {
			let newList: PlayerDTO[] = filteredPlayers.sort((obj1, obj2) =>
				obj2.collegeTeam.localeCompare(obj1.collegeTeam)
			);
			setFilteredPlayers(newList);
		}
		// Wasn't rerendering without this??
		this.forceUpdate();
	}

	handleSortByPosition () {
		const { filteredPlayers, reverseFilteredPlayers, setFilteredPlayers } = this.props;
		let alreadySortedByPosition: boolean = true;
		for (let x = 0; x < filteredPlayers.length; x++) {
			if (x !== 0) {
				if (filteredPlayers[x].position > filteredPlayers[x - 1].position) {
					alreadySortedByPosition = false;
				}
			}
		}

		if (alreadySortedByPosition) {
			reverseFilteredPlayers();
		} else {
			let newList: PlayerDTO[] = filteredPlayers.sort((obj1, obj2) =>
				obj2.position.localeCompare(obj1.position)
			);
			setFilteredPlayers(newList);
		}
		// Wasn't rerendering without this??
		this.forceUpdate();
	}

	handleSortByGoals () {
		const { filteredPlayers, reverseFilteredPlayers, setFilteredPlayers } = this.props;
		let alreadySortedByGoals: boolean = true;
		for (let x = 0; x < filteredPlayers.length; x++) {
			if (x !== 0) {
				if (
					filteredPlayers[x].totalGoals > filteredPlayers[x - 1].totalGoals
				) {
					alreadySortedByGoals = false;
				}
			}
		}

		if (alreadySortedByGoals) {
			reverseFilteredPlayers();
		} else {
			let newList: PlayerDTO[] = filteredPlayers.sort(
				(obj1, obj2) => obj2.totalGoals - obj1.totalGoals
			);
			setFilteredPlayers(newList);
		}
		// Wasn't rerendering without this??
		this.forceUpdate();
	}

	handleSortByAssists () {
		const { filteredPlayers, reverseFilteredPlayers, setFilteredPlayers } = this.props;
		let alreadySortedByAssists: boolean = true;
		for (let x = 0; x < filteredPlayers.length; x++) {
			if (x !== 0) {
				if (
					filteredPlayers[x].totalAssists >
          filteredPlayers[x - 1].totalAssists
				) {
					alreadySortedByAssists = false;
				}
			}
		}

		if (alreadySortedByAssists) {
			reverseFilteredPlayers();
		} else {
			let newList: PlayerDTO[] = filteredPlayers.sort(
				(obj1, obj2) => obj2.totalAssists - obj1.totalAssists
			);
			setFilteredPlayers(newList);
		}
		// Wasn't rerendering without this??
		this.forceUpdate();
	}

	handleSortByTotalScore () {
		const { filteredPlayers, reverseFilteredPlayers, setFilteredPlayers } = this.props;
		let alreadySortedByTotalScore: boolean = true;
		for (let x = 0; x < filteredPlayers.length; x++) {
			if (x !== 0) {
				if (
					filteredPlayers[x].totalScore > filteredPlayers[x - 1].totalScore
				) {
					alreadySortedByTotalScore = false;
				}
			}
		}

		if (alreadySortedByTotalScore) {
			reverseFilteredPlayers();
		} else {
			let newList: PlayerDTO[] = filteredPlayers.sort(
				(obj1, obj2) => obj2.totalScore - obj1.totalScore
			);
			setFilteredPlayers(newList);
		}
		// Wasn't rerendering without this??
		this.forceUpdate();
	}

	handleSortByName () {
		const { filteredPlayers, reverseFilteredPlayers, setFilteredPlayers } = this.props;
		let alreadySortedByName: boolean = true;
		for (let x = 0; x < filteredPlayers.length; x++) {
			if (x !== 0) {
				if (filteredPlayers[x].surname > filteredPlayers[x - 1].surname) {
					alreadySortedByName = false;
				}
			}
		}

		if (alreadySortedByName) {
			reverseFilteredPlayers();
		} else {
			let newList: PlayerDTO[] = filteredPlayers.sort((obj1, obj2) =>
				obj2.surname.localeCompare(obj1.surname)
			);
			setFilteredPlayers(newList);
		}
		// Wasn't rerendering without this??
		this.forceUpdate();
	}

	render () {
		const { filteredPlayers } = this.props;
		return (
			<div>
				<table>
					<thead>
						<tr
							className="transfers-header"
							key="header"
						>
							<td
								className="name"
								onClick={this.handleSortByName}
							>
								{'Name'}
							</td>
							<td
								className="position"
								onClick={this.handleSortByPosition}
							>
								{'Position'}
							</td>
							<td
								className="team"
								onClick={this.handleSortByTeamName}
							>
								{'Team'}
							</td>
							<td
								className="price"
								onClick={this.handleSortByPrice}
							>
								{'Price'}
							</td>
							<td
								className="goals"
								onClick={this.handleSortByGoals}
							>
								{'Goals'}
							</td>
							<td
								className="assists"
								onClick={this.handleSortByAssists}
							>
								{'Assists'}
							</td>
							<td
								className="score"
								onClick={this.handleSortByTotalScore}
							>
								{'Score'}{' '}
							</td>
						</tr>
					</thead>
					<tbody>
						{filteredPlayers.map(datum => (
							<TransfersRow
								element={datum}
								handleRowClick={this.props.handleRowClick}
								key={datum.firstName + datum.surname}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
export default TransfersTableBody;
