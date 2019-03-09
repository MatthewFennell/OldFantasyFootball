import * as React from 'react';
import '../../Style/Transfers/TransfersForm.css';
import TeamDropDown from './TeamDropdown';
import { filterPlayers } from '../../Services/Player/PlayerService';
import { FilterPlayers } from '../../Models/Interfaces/FilterPlayers';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import TextInputForm from '../common/TexInputForm';
import CustomDropdown from '../common/CustomDropdown';

interface TransfersFormProps {
  setFilteredPlayers: (filteredTeam: PlayerDTO[]) => void;
  filteredPlayers: PlayerDTO[];
  allCollegeTeams: CollegeTeam[];
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
	constructor (props: TransfersFormProps) {
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
			teamValue: 'All teams',
			sortByValue: 'TOTAL_POINTS',
			minimumPriceValue: 'No limit',
			maximumPriceValue: 'No limit',
			searchByNameValue: ''
		};

		this._getResults();
	}

	_getResults () {
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

		filterPlayers(data).then(response => {
			this.props.setFilteredPlayers(response);
		});
	}

	_handlePositionChange (position: string) {
		this.setState({ positionValue: position }, this._getResults);
	}

	_handleTeamChange (team: string) {
		this.setState({ teamValue: team }, this._getResults);
	}

	_handleSortByChange (sortBy: string) {
		this.setState({ sortByValue: sortBy }, this._getResults);
	}

	_handleMinimumPriceChange (minimumPrice: string) {
		this.setState({ minimumPriceValue: minimumPrice }, this._getResults);
	}

	_handleMaximumPriceChange (maximumPrice: string) {
		this.setState({ maximumPriceValue: maximumPrice }, this._getResults);
	}

	_handleSearchByNameValue (searchByName: string) {
		this.setState({ searchByNameValue: searchByName }, this._getResults);
	}

	render () {
		let teamChange = this._handleTeamChange;

		return (
			<div className="transfer-filter-rows">
				<div className="transfer-form-row-one">
					<CustomDropdown
						setData={this._handlePositionChange}
						title="Position"
						values={['All', 'Goalkeepers', 'Defenders', 'Midfielders', 'Attackers']}
					/>
					<TeamDropDown
						allCollegeTeams={this.props.allCollegeTeams}
						setTeam={teamChange}
					/>
					<CustomDropdown
						setData={this._handleSortByChange}
						title="Sort by"
						values={['Total score', 'Goals', 'Assists', 'Price']}
					/>
				</div>
				<div className="transfer-form-row-two">
					<CustomDropdown
						setData={this._handleMinimumPriceChange}
						title="Minimum Price"
						values={[
							'No limit',
							'5.0',
							'6.0',
							'7.0',
							'8.0',
							'9.0',
							'10.0',
							'11.0',
							'12.0'
						]}
					/>
					<CustomDropdown
						setData={this._handleMaximumPriceChange}
						title="Maximum Price"
						values={[
							'No limit',
							'5.0',
							'6.0',
							'7.0',
							'8.0',
							'9.0',
							'10.0',
							'11.0',
							'12.0',
							'13.0',
							'14.0'

						]}
					/>
					<TextInputForm
						currentValue={this.state.searchByNameValue}
						setValue={this._handleSearchByNameValue}
						title="Player name"
					/>
				</div>
			</div>
		);
	}
}
export default TransfersForm;
