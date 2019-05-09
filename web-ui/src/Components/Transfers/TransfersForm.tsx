import * as React from 'react';
import '../../Style/Transfers/TransfersForm.css';
import TeamDropDown from './TeamDropdown';
import { filterPlayers } from '../../Services/Player/PlayerService';
import { FilterPlayers } from '../../Models/Interfaces/FilterPlayers';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import TextInputForm from '../common/TexInputForm';
import CustomDropdown from '../common/CustomDropdown';
import Media from 'react-media';

interface TransfersFormProps {
  setSearchingByPercentage: (searchingByPercentage: boolean) => void;
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
		this._checkIfActive = this._checkIfActive.bind(this);
		this.state = {
			positionValue: 'All',
			teamValue: 'All teams',
			sortByValue: 'Total score',
			minimumPriceValue: 'No limit',
			maximumPriceValue: 'No limit',
			searchByNameValue: ''
		};

		this._getResults();
	}

	_getResults () {
		const { minimumPriceValue, maximumPriceValue, positionValue, sortByValue, searchByNameValue, teamValue } = this.state;
		const { setFilteredPlayers } = this.props;
		let minPrice: number =
      minimumPriceValue === 'No limit' ? 0 : Number(minimumPriceValue);
		let maxPrice: number =
      maximumPriceValue === 'No limit' ? 100 : Number(maximumPriceValue);

		// Makes it return ALL, GOALKEEPER, DEFENDER, MIDFIELDER, ATTACKER
		let position: string =
      positionValue === 'All'
      	? 'ALL'
      	: positionValue.toUpperCase().substr(0, positionValue.length - 1);

		// Formats the correct response
		let sortBy: string =
      sortByValue === 'Total score'
      	? 'TOTAL_POINTS'
		  : sortByValue.toUpperCase();

		if (sortBy === '% SELECTED') {
			sortBy = 'PERCENTAGE';
			this.props.setSearchingByPercentage(true);
		} else {
			this.props.setSearchingByPercentage(false);
		}

		let searchName: string =
      searchByNameValue.length === 0 ? 'null' : searchByNameValue;

		let data: FilterPlayers = {
			position: position,
			team: teamValue,
			sortBy: sortBy,
			minimum: minPrice,
			maximum: maxPrice,
			name: searchName
		};

		filterPlayers(data).then(response => {
			setFilteredPlayers(response);
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

	_checkIfActive () {

	}

	render () {
		const { searchByNameValue } = this.state;
		const { allCollegeTeams } = this.props;
		return (
			<Media query="(max-width: 599px)">
				{matches =>
					matches ? (
						<div className="transfer-filter-rows">
							<div className="transfer-form-row-one">
								<div className={this.state.positionValue === 'All' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this._handlePositionChange}
										title="Position"
										values={['All', 'Goalkeepers', 'Defenders', 'Midfielders', 'Attackers']}
									/>
								</div>
								<div className={this.state.teamValue === 'All teams' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<TeamDropDown
										allCollegeTeams={allCollegeTeams}
										setTeam={this._handleTeamChange}
									/>
								</div>

							</div>
							<div className="transfer-form-row-two">
								<div className={this.state.sortByValue === 'Total score' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this._handleSortByChange}
										title="Sort by"
										values={['Total score', 'Goals', 'Assists', 'Price', '% selected']}
									/>
								</div>
								<div className={this.state.searchByNameValue === '' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<TextInputForm
										currentValue={searchByNameValue}
										setValue={this._handleSearchByNameValue}
										title="Player name"
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="transfer-filter-rows">
							<div className="transfer-form-row-one">
								<div className={this.state.positionValue === 'All' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this._handlePositionChange}
										title="Position"
										values={['All', 'Goalkeepers', 'Defenders', 'Midfielders', 'Attackers']}
									/>
								</div>
								<div className={this.state.teamValue === 'All teams' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<TeamDropDown
										allCollegeTeams={allCollegeTeams}
										setTeam={this._handleTeamChange}
									/>
								</div>
								<div className={this.state.sortByValue === 'Total score' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this._handleSortByChange}
										title="Sort by"
										values={['Total score', 'Goals', 'Assists', 'Price', '% selected']}
									/>
								</div>
							</div>
							<div className="transfer-form-row-two">
								<div className={this.state.minimumPriceValue === 'No limit' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this._handleMinimumPriceChange}
										title="Min Price"
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
								</div>
								<div className={this.state.maximumPriceValue === 'No limit' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this._handleMaximumPriceChange}
										title="Max Price"
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
								</div>
								<div className={this.state.searchByNameValue === '' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<TextInputForm
										currentValue={searchByNameValue}
										setValue={this._handleSearchByNameValue}
										title="Player name"
									/>
								</div>
							</div>
						</div>
					)
				}
			</Media>

		);
	}
}
export default TransfersForm;
