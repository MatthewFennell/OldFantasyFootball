import * as React from 'react';
import '../../Style/Transfers/TransfersForm.css';
import PositionDropDown from './PositionDropdown';
import TeamDropDown from './TeamDropdown';
import SortByDropdown from './SortByDropdown';
import MinimumPriceDropdown from './MinimumPriceDropdown';
import MaximumPriceDropdown from './MaximumPriceDropdown';
import SearchByName from './SearchByName';
import { filterPlayers } from '../../Services/UserService';
import { FilterPlayers } from '../../Models/Interfaces/FilterPlayers';
import { FilteredPlayer } from '../../Models/Interfaces/FilteredPlayer';

interface TransfersFormProps {
  setFilteredPlayers: (filteredTeam: FilteredPlayer[]) => void;
  filteredPlayers: FilteredPlayer[];
}

interface TransfersFormState {
  positionValue: string;
  teamValue: string;
  sortByValue: string;
  minimumPriceValue: string;
  maximumPriceValue: string;
  searchByNameValue: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handlePositionChange = this._handlePositionChange.bind(this);
    this._handleTeamChange = this._handleTeamChange.bind(this);
    this._handleSortByChange = this._handleSortByChange.bind(this);
    this._handleMinimumPriceChange = this._handleMinimumPriceChange.bind(this);
    this._handleMaximumPriceChange = this._handleMaximumPriceChange.bind(this);
    this._handleSearchByNameValue = this._handleSearchByNameValue.bind(this);
    this._getResults = this._getResults.bind(this);
    this.state = {
      positionValue: 'All',
      teamValue: 'A',
      sortByValue: 'TOTAL_POINTS',
      minimumPriceValue: 'No limit',
      maximumPriceValue: 'No limit',
      searchByNameValue: ''
    };
  }

  _getResults() {
    let minPrice: number =
      this.state.minimumPriceValue === 'No limit' ? 0 : Number(this.state.minimumPriceValue);
    let maxPrice: number =
      this.state.maximumPriceValue === 'No limit' ? 100 : Number(this.state.maximumPriceValue);

    // Makes it return ALL, GOALKEEPER, DEFENDER, MIDFIELDER, ATTACKER
    let position: string =
      this.state.positionValue === 'All'
        ? 'ALL'
        : this.state.positionValue.toUpperCase().substr(0, this.state.positionValue.length - 1);

    // Formats the correct response
    let sortBy: string =
      this.state.sortByValue === 'Total score'
        ? 'TOTAL_POINTS'
        : this.state.sortByValue.toUpperCase();

    let searchName: string =
      this.state.searchByNameValue.length === 0 ? 'null' : this.state.searchByNameValue;

    let data: FilterPlayers = {
      position: position,
      team: this.state.teamValue,
      sortBy: sortBy,
      minimum: minPrice,
      maximum: maxPrice,
      name: searchName
    };

    console.log('Data = ' + JSON.stringify(data));

    filterPlayers(data).then(response => {
      console.log('response = ' + JSON.stringify(response));
      this.props.setFilteredPlayers(response);
    });
  }

  _handlePositionChange(position: string) {
    this.setState({ positionValue: position }, this._getResults);
    console.log('Top tier position state set to ' + position);
  }

  _handleTeamChange(team: string) {
    this.setState({ teamValue: team }, this._getResults);
    console.log('Top tier state team set to ' + team);
  }

  _handleSortByChange(sortBy: string) {
    this.setState({ sortByValue: sortBy }, this._getResults);
    console.log('Top tier state SortBy set to ' + sortBy);
  }

  _handleMinimumPriceChange(minimumPrice: string) {
    this.setState({ minimumPriceValue: minimumPrice }, this._getResults);
    console.log('Top tier state minimum price set to ' + minimumPrice);
  }

  _handleMaximumPriceChange(maximumPrice: string) {
    this.setState({ maximumPriceValue: maximumPrice }, this._getResults);
    console.log('Top tier state maximum price set to ' + maximumPrice);
  }

  _handleSearchByNameValue(searchByName: string) {
    this.setState({ searchByNameValue: searchByName }, this._getResults);
    console.log('Top tier state search by name set to ' + searchByName);
  }

  render() {
    let positionChange = this._handlePositionChange;
    let teamChange = this._handleTeamChange;
    let sortByChange = this._handleSortByChange;
    let minimumPriceChange = this._handleMinimumPriceChange;
    let maximumPriceChange = this._handleMaximumPriceChange;
    let searchByName = this._handleSearchByNameValue;

    return (
      <div className="transfer-filter-rows">
        <div className="transfer-form-row-one">
          <div className="position-dropdown">
            <PositionDropDown setPosition={positionChange} />
          </div>
          <div>
            <TeamDropDown setTeam={teamChange} />
          </div>
          <div>
            <SortByDropdown setSortBy={sortByChange} />
          </div>
        </div>
        <div className="transfer-form-row-two">
          <div>
            <MinimumPriceDropdown setMinimumPrice={minimumPriceChange} />
          </div>
          <div>
            <MaximumPriceDropdown setMaximumPrice={maximumPriceChange} />
          </div>
          <div>
            <SearchByName setSearchByName={searchByName} />
          </div>
        </div>
      </div>
    );
  }
}
export default TransfersForm;
