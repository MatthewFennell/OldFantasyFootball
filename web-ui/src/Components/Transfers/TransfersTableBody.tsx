import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import TransfersRow from '../../Containers/Transfers/TransfersRow';
import '../../Style/Transfers/TransfersFilter.css';

interface TransfersTableBodyProps {
  filteredPlayers: PlayerDTO[];
  setFilteredPlayers: (filteredTeam: PlayerDTO[]) => void;
  reverseFilteredPlayers: () => void;
}

class TransfersTableBody extends React.Component<TransfersTableBodyProps> {
	constructor (props: TransfersTableBodyProps) {
		super(props);
		this._sortByPrice = this._sortByPrice.bind(this);
		this._sortByGoals = this._sortByGoals.bind(this);
		this._sortByAssists = this._sortByAssists.bind(this);
		this._sortByTotalScore = this._sortByTotalScore.bind(this);
		this._sortByTeamName = this._sortByTeamName.bind(this);
		this._sortByName = this._sortByName.bind(this);
	}

	_sortByPrice () {
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

	_sortByTeamName () {
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

	_sortByPosition () {
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

	_sortByGoals () {
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

	_sortByAssists () {
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

	_sortByTotalScore () {
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

	_sortByName () {
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
		console.log('mapping stuff now');
		return (
			<tbody className="my-active-transfers">
				<tr
					className="transfers-header"
					key="header"
				>
					<td
						className="name"
						onClick={() => this._sortByName()}
					>
						{'Name'}
					</td>
					<td
						className="position"
						onClick={() => this._sortByPosition()}
					>
						{'Position'}
					</td>
					<td
						className="team"
						onClick={() => this._sortByTeamName()}
					>
						{'Team'}
					</td>
					<td
						className="price"
						onClick={() => this._sortByPrice()}
					>
						{'Price'}
					</td>
					<td
						className="goals"
						onClick={() => this._sortByGoals()}
					>
						{'Total Goals'}
					</td>
					<td
						className="assists"
						onClick={() => this._sortByAssists()}
					>
						{'Total Assists'}
					</td>
					<td
						className="score"
						onClick={() => this._sortByTotalScore()}
					>
						{'Total Score'}{' '}
					</td>
				</tr>
				{this.props.filteredPlayers.map(datum => (
					<TransfersRow
						element={datum}
						key={datum.firstName + datum.surname}
					/>
				))}
			</tbody>
		);
	}
}
export default TransfersTableBody;
