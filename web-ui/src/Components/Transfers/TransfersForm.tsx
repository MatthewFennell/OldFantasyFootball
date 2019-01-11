import * as React from 'react';
import '../../Style/Transfers/TransfersForm.css';
import PositionDropDown from './PositionDropdown';
import TeamDropDown from './TeamDropdown';
import SortByDropdown from './SortByDropdown';
import MinimumPriceDropdown from './MinimumPriceDropdown';
import MaximumPriceDropdown from './MaximumPriceDropdown';

interface TransfersFormProps {}

interface TransfersFormState {
  positionValue: string;
  teamValue: string;
  sortByValue: string;
  minimumPriceValue: string;
  maximumPriceValue: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handlePositionChange = this._handlePositionChange.bind(this);
    this._handleTeamChange = this._handleTeamChange.bind(this);
    this._handleSortByChange = this._handleSortByChange.bind(this);
    this._handleMinimumPriceChange = this._handleMinimumPriceChange.bind(this);
    this._handleMaximumPriceChange = this._handleMaximumPriceChange.bind(this);
    this.state = {
      positionValue: 'All',
      teamValue: 'A',
      sortByValue: 'Points',
      minimumPriceValue: 'No limit',
      maximumPriceValue: 'No limit'
    };
  }

  _handlePositionChange(position: string) {
    this.setState({ positionValue: position });
    console.log('Top tier position state set to ' + position);
  }

  _handleTeamChange(team: string) {
    this.setState({ teamValue: team });
    console.log('Top tier state team set to ' + team);
  }

  _handleSortByChange(sortBy: string) {
    this.setState({ sortByValue: sortBy });
    console.log('Top tier state SortBy set to ' + sortBy);
  }

  _handleMinimumPriceChange(minimumPrice: string) {
    this.setState({ minimumPriceValue: minimumPrice });
    console.log('Top tier state minimum price set to ' + minimumPrice);
  }

  _handleMaximumPriceChange(maximumPrice: string) {
    this.setState({ maximumPriceValue: maximumPrice });
    console.log('Top tier state maximum price set to ' + maximumPrice);
  }

  render() {
    let positionChange = this._handlePositionChange;
    let teamChange = this._handleTeamChange;
    let sortByChange = this._handleSortByChange;
    let minimumPriceChange = this._handleMinimumPriceChange;
    let maximumPriceChange = this._handleMaximumPriceChange;

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
          <div>3</div>
        </div>
      </div>
    );
  }
}
export default TransfersForm;
