import * as React from 'react';
import { createPlayer } from '../../../Services/Player/PlayerService';
import { CreatePlayer } from '../../../Models/Interfaces/CreatePlayer';
import FirstName from './FirstName';
import Surname from './Surname';
import PositionsDropDown from './PositionsDropdown';
import Price from './Price';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import { Button } from 'reactstrap';
import { CollegeTeam as CT } from '../../../Models/Interfaces/CollegeTeam';

interface TransfersFormProps {
  allCollegeTeams: CT[];
}

interface TransfersFormState {
  positionValue: string;
  teamValue: string;
  firstNameValue: string;
  surnameValue: string;
  priceValue: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handlePositionChange = this._handlePositionChange.bind(this);
    this._handleTeamChange = this._handleTeamChange.bind(this);
    this._handleSurname = this._handleSurname.bind(this);
    this._handleFirstName = this._handleFirstName.bind(this);
    this._handlePrice = this._handlePrice.bind(this);
    this._getResults = this._getResults.bind(this);
    if (this.props.allCollegeTeams.length > 0) {
      this.state = {
        positionValue: 'Goalkeeper',
        teamValue: this.props.allCollegeTeams[0].name,
        firstNameValue: '',
        surnameValue: '',
        priceValue: ''
      };
    } else {
      this.state = {
        positionValue: 'Goalkeeper',
        teamValue: 'A',
        firstNameValue: '',
        surnameValue: '',
        priceValue: ''
      };
    }
  }

  _getResults() {
    // Makes it return ALL, GOALKEEPER, DEFENDER, MIDFIELDER, ATTACKER
    // let position: string = this.state.positionValue
    //   .toUpperCase()
    //   .substr(0, this.state.positionValue.length - 1);
    // let data: CreatePlayer = {
    //   position: position,
    //   collegeTeam: this.state.teamValue,
    //   price: parseInt(this.state.priceValue),
    //   firstName: this.state.firstNameValue,
    //   surname: this.state.surnameValue
    // };
    // createPlayer(data).then(response => {
    //   this.props.setFilteredPlayers(response);
    // });
  }

  _handlePositionChange(position: string) {
    this.setState({ positionValue: position }, this._getResults);
  }

  _handleTeamChange(team: string) {
    this.setState({ teamValue: team }, this._getResults);
  }

  _handleFirstName(firstname: string) {
    this.setState({ firstNameValue: firstname }, this._getResults);
  }

  _handleSurname(surname: string) {
    this.setState({ surnameValue: surname }, this._getResults);
  }

  _handlePrice(price: string) {
    this.setState({ priceValue: price }, this._getResults);
  }

  _onSubmit() {
    let position: string = this.state.positionValue.toUpperCase();

    let data: CreatePlayer = {
      position: position,
      collegeTeam: this.state.teamValue,
      price: parseFloat(this.state.priceValue),
      firstName: this.state.firstNameValue,
      surname: this.state.surnameValue
    };
    createPlayer(data).catch(error => {
      console.log('error = ' + JSON.stringify(error));
    });
  }

  render() {
    let positionChange = this._handlePositionChange;
    let teamChange = this._handleTeamChange;
    let price = this._handlePrice;
    let firstName = this._handleFirstName;
    let surname = this._handleSurname;

    return (
      <div className="transfer-filter-rows">
        <div className="transfer-form-row-one">
          <div className="position-dropdown">
            <FirstName firstName={firstName} />
            {/*  */}
          </div>
          <div>
            <Surname surname={surname} />
          </div>
          <div>
            <PositionsDropDown setPosition={positionChange} />
          </div>
        </div>
        <div className="transfer-form-row-two">
          <div>
            <Price price={price} />
          </div>
          <div>
            <CollegeTeam setTeam={teamChange} />
          </div>
          <div>
            <Button
              className="btn btn-default btn-round-lg btn-lg second"
              id="btnRegister"
              onClick={() => this._onSubmit()}
            >
              Create Player
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default TransfersForm;
