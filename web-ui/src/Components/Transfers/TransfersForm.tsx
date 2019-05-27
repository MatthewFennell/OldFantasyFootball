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
  setPositionValue: (position: string) => void;
  setTeamValue: (team: string) => void;
  setSortByValue: (sortBy: string) => void;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
  setSearchByName: (name: string) => void;
  filters: { positionValue: string, teamValue: string, sortByValue: string, minimumPriceValue: string,
	maximumPriceValue: string, searchByNameValue: string};
}

interface TransfersFormState {
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
	constructor (props: TransfersFormProps) {
		super(props);
		this._getResults = this._getResults.bind(this);

		this._getResults();
	}

	componentDidUpdate (prevProps:any) {
		if (prevProps.filters !== this.props.filters) {
			this._getResults();
		}
	}

	_getResults () {
		const { minimumPriceValue, maximumPriceValue, positionValue, sortByValue, searchByNameValue, teamValue } = this.props.filters;

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

	render () {
		const { allCollegeTeams } = this.props;
		return (
			<Media query="(max-width: 599px)">
				{matches =>
					matches ? (
						<div className="transfer-filter-rows">
							<div className="transfer-form-row-one">
								<div className={this.props.filters.positionValue === 'All' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this.props.setPositionValue}
										title="Position"
										updatePosition={this.props.filters.positionValue}
										values={['All', 'Goalkeepers', 'Defenders', 'Midfielders', 'Attackers']}
									/>
								</div>
								<div className={this.props.filters.teamValue === 'All teams' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<TeamDropDown
										allCollegeTeams={allCollegeTeams}
										setTeam={this.props.setTeamValue}
									/>
								</div>

							</div>
							<div className="transfer-form-row-two">
								<div className={this.props.filters.sortByValue === 'Total score' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this.props.setSortByValue}
										title="Sort by"
										values={['Total score', 'Goals', 'Assists', 'Price', '% selected']}
									/>
								</div>
								<div className={this.props.filters.searchByNameValue === '' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<TextInputForm
										currentValue={this.props.filters.searchByNameValue}
										setValue={this.props.setSearchByName}
										title="Player name"
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="transfer-filter-rows">
							<div className="transfer-form-row-one">
								<div className={this.props.filters.positionValue === 'All' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this.props.setPositionValue}
										title="Position"
										updatePosition={this.props.filters.positionValue}
										values={['All', 'Goalkeepers', 'Defenders', 'Midfielders', 'Attackers']}
									/>
								</div>
								<div className={this.props.filters.teamValue === 'All teams' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<TeamDropDown
										allCollegeTeams={allCollegeTeams}
										setTeam={this.props.setTeamValue}
									/>
								</div>
								<div className={this.props.filters.sortByValue === 'Total score' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this.props.setSortByValue}
										title="Sort by"
										values={['Total score', 'Goals', 'Assists', 'Price', '% selected']}
									/>
								</div>
							</div>
							<div className="transfer-form-row-two">
								<div className={this.props.filters.minimumPriceValue === 'No limit' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this.props.setMinPrice}
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
								<div className={this.props.filters.maximumPriceValue === 'No limit' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<CustomDropdown
										setData={this.props.setMaxPrice}
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
								<div className={this.props.filters.searchByNameValue === '' ? 'raise-transfers' : 'raise-transfers-selected'}>
									<TextInputForm
										currentValue={this.props.filters.searchByNameValue}
										setValue={this.props.setSearchByName}
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
