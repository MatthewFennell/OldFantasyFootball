import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../../Containers/Admin/SelectPlayer';
import Week from './Week';
// import Goals from './Goals';
import Assists from './Assists';
import MinutesPlayed from './MinutesPlayed';
import Generic from './GenericInput';

interface TransfersFormProps {
  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
}

interface TransfersFormState {
  goals: string;
  assists: string;
  minutesPlayed: string;
  manOfTheMatch: boolean;
  yellowCards: string;
  cleanSheet: boolean;
  redCard: boolean;
  playerID: string;
  week: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handleGoals = this._handleGoals.bind(this);
    this._handleAssists = this._handleAssists.bind(this);
    this._handleMinutesPlayed = this._handleMinutesPlayed.bind(this);
    this._handleManOfTheMatch = this._handleManOfTheMatch.bind(this);
    this._handleYellowCards = this._handleYellowCards.bind(this);
    this._handleCleanSheet = this._handleCleanSheet.bind(this);
    this._handleRedCard = this._handleRedCard.bind(this);
    this._handlePlayerID = this._handlePlayerID.bind(this);
    this._handleWeek = this._handleWeek.bind(this);
    this._getResults = this._getResults.bind(this);
    this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
    this.state = {
      goals: '',
      assists: '',
      minutesPlayed: '',
      manOfTheMatch: false,
      yellowCards: '',
      cleanSheet: false,
      redCard: false,
      playerID: '',
      week: ''
    };
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

  _handleGoals(goals: string) {
    this.setState({ goals }, this._getResults);
    console.log('setting goals to ' + goals);
  }

  _handlePlayerID(playerID: string) {
    this.setState({ playerID }, this._getResults);
  }

  _handleCollegeTeam(team: string) {
    this.props.setTeamAddingPoints(team);
  }

  _handleAssists(assists: string) {
    this.setState({ assists }, this._getResults);
  }

  _handleMinutesPlayed(minutesPlayed: string) {
    this.setState({ minutesPlayed }, this._getResults);
  }

  _handleManOfTheMatch(manOfTheMatch: boolean) {
    this.setState({ manOfTheMatch }, this._getResults);
  }

  _handleYellowCards(yellowCards: string) {
    this.setState({ yellowCards }, this._getResults);
  }

  _handleCleanSheet(cleanSheet: boolean) {
    this.setState({ cleanSheet }, this._getResults);
  }

  _handleRedCard(redCard: boolean) {
    this.setState({ redCard }, this._getResults);
  }

  _handleWeek(week: string) {
    this.setState({ week }, this._getResults);
  }

  _onSubmit() {
    // let position: string = this.state.positionValue.toUpperCase();
    // let data: CreatePlayer = {
    //   position: position,
    //   collegeTeam: this.state.teamValue,
    //   price: parseInt(this.state.priceValue),
    //   firstName: this.state.firstNameValue,
    //   surname: this.state.surnameValue
    // };
    // createPlayer(data).catch(error => {
    //   console.log('error = ' + JSON.stringify(error));
    // });
  }

  render() {
    let setTeam = this._handleCollegeTeam;
    let setPlayerID = this._handlePlayerID;
    let setWeek = this._handleWeek;
    let setGoals = this._handleGoals;
    let assists = this._handleAssists;
    let minutesPlayed = this._handleMinutesPlayed;

    return (
      <div className="transfer-filter-rows">
        <div className="transfer-form-row-one">
          <div className="position-dropdown">
            <CollegeTeam setTeam={setTeam} />
          </div>
          <div>
            <SelectPlayer setPlayerID={setPlayerID} />
          </div>
          <div>
            <Week week={setWeek} />
          </div>
        </div>
        <div className="transfer-form-row-two">
          <div>
            <Generic inputFunction={setGoals} title={'Number of Goals'} />
          </div>
          <div>
            <Assists assists={assists} />
          </div>
          <div>
            <MinutesPlayed minutesPlayed={minutesPlayed} />
          </div>
          <div>
            <Button
              className="btn btn-default btn-round-lg btn-lg second"
              id="btnRegister"
              onClick={() => this._onSubmit()}
            >
              Add Points
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default TransfersForm;
