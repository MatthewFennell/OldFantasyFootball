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
  constructor(props: TransfersTableBodyProps) {
    super(props);
    this._sortByPrice = this._sortByPrice.bind(this);
    this._sortByGoals = this._sortByGoals.bind(this);
    this._sortByAssists = this._sortByAssists.bind(this);
    this._sortByTotalScore = this._sortByTotalScore.bind(this);
    this._sortByTeamName = this._sortByTeamName.bind(this);
    this._sortByName = this._sortByName.bind(this);
  }

  _sortByPrice() {
    let alreadySortedByPrice: boolean = true;
    for (let x = 0; x < this.props.filteredPlayers.length; x++) {
      if (x !== 0) {
        if (this.props.filteredPlayers[x].price > this.props.filteredPlayers[x - 1].price) {
          alreadySortedByPrice = false;
        }
      }
    }

    if (alreadySortedByPrice) {
      this.props.reverseFilteredPlayers();
    } else {
      let newList: PlayerDTO[] = this.props.filteredPlayers.sort(
        (obj1, obj2) => obj2.price - obj1.price
      );
      this.props.setFilteredPlayers(newList);
    }
    // Wasn't rerendering without this??
    this.forceUpdate();
  }

  _sortByTeamName() {
    let alreadySortedByTeamName: boolean = true;
    for (let x = 0; x < this.props.filteredPlayers.length; x++) {
      if (x !== 0) {
        if (
          this.props.filteredPlayers[x].collegeTeam > this.props.filteredPlayers[x - 1].collegeTeam
        ) {
          alreadySortedByTeamName = false;
        }
      }
    }

    if (alreadySortedByTeamName) {
      this.props.reverseFilteredPlayers();
    } else {
      let newList: PlayerDTO[] = this.props.filteredPlayers.sort((obj1, obj2) =>
        obj2.collegeTeam.localeCompare(obj1.collegeTeam)
      );
      this.props.setFilteredPlayers(newList);
    }
    // Wasn't rerendering without this??
    this.forceUpdate();
  }

  _sortByPosition() {
    let alreadySortedByPosition: boolean = true;
    for (let x = 0; x < this.props.filteredPlayers.length; x++) {
      if (x !== 0) {
        if (this.props.filteredPlayers[x].position > this.props.filteredPlayers[x - 1].position) {
          alreadySortedByPosition = false;
        }
      }
    }

    if (alreadySortedByPosition) {
      this.props.reverseFilteredPlayers();
    } else {
      let newList: PlayerDTO[] = this.props.filteredPlayers.sort((obj1, obj2) =>
        obj2.position.localeCompare(obj1.position)
      );
      this.props.setFilteredPlayers(newList);
    }
    // Wasn't rerendering without this??
    this.forceUpdate();
  }

  _sortByGoals() {
    let alreadySortedByGoals: boolean = true;
    for (let x = 0; x < this.props.filteredPlayers.length; x++) {
      if (x !== 0) {
        if (
          this.props.filteredPlayers[x].totalGoals > this.props.filteredPlayers[x - 1].totalGoals
        ) {
          alreadySortedByGoals = false;
        }
      }
    }

    if (alreadySortedByGoals) {
      this.props.reverseFilteredPlayers();
    } else {
      let newList: PlayerDTO[] = this.props.filteredPlayers.sort(
        (obj1, obj2) => obj2.totalGoals - obj1.totalGoals
      );
      this.props.setFilteredPlayers(newList);
    }
    // Wasn't rerendering without this??
    this.forceUpdate();
  }

  _sortByAssists() {
    let alreadySortedByAssists: boolean = true;
    for (let x = 0; x < this.props.filteredPlayers.length; x++) {
      if (x !== 0) {
        if (
          this.props.filteredPlayers[x].totalAssists >
          this.props.filteredPlayers[x - 1].totalAssists
        ) {
          alreadySortedByAssists = false;
        }
      }
    }

    if (alreadySortedByAssists) {
      this.props.reverseFilteredPlayers();
    } else {
      let newList: PlayerDTO[] = this.props.filteredPlayers.sort(
        (obj1, obj2) => obj2.totalAssists - obj1.totalAssists
      );
      this.props.setFilteredPlayers(newList);
    }
    // Wasn't rerendering without this??
    this.forceUpdate();
  }

  _sortByTotalScore() {
    let alreadySortedByTotalScore: boolean = true;
    for (let x = 0; x < this.props.filteredPlayers.length; x++) {
      if (x !== 0) {
        if (
          this.props.filteredPlayers[x].totalScore > this.props.filteredPlayers[x - 1].totalScore
        ) {
          alreadySortedByTotalScore = false;
        }
      }
    }

    if (alreadySortedByTotalScore) {
      this.props.reverseFilteredPlayers();
    } else {
      let newList: PlayerDTO[] = this.props.filteredPlayers.sort(
        (obj1, obj2) => obj2.totalScore - obj1.totalScore
      );
      this.props.setFilteredPlayers(newList);
    }
    // Wasn't rerendering without this??
    this.forceUpdate();
  }

  _sortByName() {
    let alreadySortedByName: boolean = true;
    for (let x = 0; x < this.props.filteredPlayers.length; x++) {
      if (x !== 0) {
        if (this.props.filteredPlayers[x].surname > this.props.filteredPlayers[x - 1].surname) {
          alreadySortedByName = false;
        }
      }
    }

    if (alreadySortedByName) {
      this.props.reverseFilteredPlayers();
    } else {
      let newList: PlayerDTO[] = this.props.filteredPlayers.sort((obj1, obj2) =>
        obj2.surname.localeCompare(obj1.surname)
      );
      this.props.setFilteredPlayers(newList);
    }
    // Wasn't rerendering without this??
    this.forceUpdate();
  }

  render() {
    console.log('mapping stuff now');
    return (
      <tbody className="my-active-transfers">
        <tr className="transfers-header" key={'header'}>
          <td className="name" onClick={() => this._sortByName()}>
            {'Name'}
          </td>
          <td className="position" onClick={() => this._sortByPosition()}>
            {'Position'}
          </td>
          <td className="team" onClick={() => this._sortByTeamName()}>
            {'Team'}
          </td>
          <td className="price" onClick={() => this._sortByPrice()}>
            {'Price'}
          </td>
          <td className="goals" onClick={() => this._sortByGoals()}>
            {'Total Goals'}
          </td>
          <td className="assists" onClick={() => this._sortByAssists()}>
            {'Total Assists'}
          </td>
          <td className="score" onClick={() => this._sortByTotalScore()}>
            {'Total Score'}{' '}
          </td>
        </tr>
        {this.props.filteredPlayers.map(datum => (
          <TransfersRow key={datum.firstName + datum.surname} element={datum} />
        ))}
      </tbody>
    );
  }
}
export default TransfersTableBody;
