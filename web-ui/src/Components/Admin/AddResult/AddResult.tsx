import * as React from 'react';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import { Button } from 'reactstrap';
import Goals from './Goals';
import Week from '../AddPoints/Week';
import SelectPlayer from '../../../Containers/Admin/SelectPlayer';
import { SubmitResults } from '../../../Models/Interfaces/SubmitResults';
import { submitResult } from '../../../Services/Player/PlayerService';
import '../../../Style/Admin/ErrorMessage.css';

interface TransfersFormProps {
  setTeamAddingPoints: (team: string) => void;
}

interface TransfersFormState {
  goalsFor: string;
  goalsAgainst: string;
  week: string;
  playerIDGoals: string[];
  playerIDAssists: string[];
  playerIDCleanSheets: string[];
  teamName: string;
  resultAdded: boolean;
  previousTeamName: string;
  previousWeek: string;
  errorMessage: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
    this._handleGoalsFor = this._handleGoalsFor.bind(this);
    this._handleGoalsAgainst = this._handleGoalsAgainst.bind(this);
    this._handleWeek = this._handleWeek.bind(this);
    this._handlePlayerIDGoalscorers = this._handlePlayerIDGoalscorers.bind(this);
    this._handlePlayerIDAssists = this._handlePlayerIDAssists.bind(this);
    this._handlePlayerIDCleanSheets = this._handlePlayerIDCleanSheets.bind(this);
    this._getResults = this._getResults.bind(this);
    this._removeErrorMessage = this._removeErrorMessage.bind(this);
    this.state = {
      goalsFor: '0',
      goalsAgainst: '-1',
      week: '',
      playerIDGoals: [],
      playerIDAssists: [],
      playerIDCleanSheets: [],
      teamName: 'A',
      resultAdded: false,
      previousTeamName: '',
      previousWeek: '',
      errorMessage: ''
    };
  }

  _getResults() {
    console.log('New goalscorers = ' + JSON.stringify(this.state.playerIDGoals));
    console.log('');
    console.log('New assists = ' + JSON.stringify(this.state.playerIDAssists));
    console.log('');
    console.log('New clean sheets = ' + JSON.stringify(this.state.playerIDCleanSheets));

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

  // TO:DO improve later -> not loop through, preferably just exchange
  // for goals, assists and clean sheets
  _handlePlayerIDGoalscorers(playerID: string, previousID: string) {
    let newState: string[] = [];
    for (let x = 0; x < this.state.playerIDGoals.length; x++) {
      if (this.state.playerIDGoals[x] !== previousID) {
        newState.push(this.state.playerIDGoals[x]);
      }
    }
    newState.push(playerID);
    this.setState({ playerIDGoals: newState }, this._getResults);

    // this.setState({ playerIDGoals: [...this.state.playerIDGoals, playerID] }, this._getResults);
  }

  _removeErrorMessage() {
    console.log('error message set');
    this.setState({ resultAdded: false });
    this.setState({ errorMessage: '' });
  }

  _handlePlayerIDAssists(playerID: string, previousID: string) {
    let newState: string[] = [];
    for (let x = 0; x < this.state.playerIDAssists.length; x++) {
      if (this.state.playerIDAssists[x] !== previousID) {
        newState.push(this.state.playerIDAssists[x]);
      }
    }
    newState.push(playerID);
    this.setState({ playerIDAssists: newState }, this._getResults);
  }

  _handlePlayerIDCleanSheets(playerID: string, previousID: string) {
    let newState: string[] = [];
    for (let x = 0; x < this.state.playerIDCleanSheets.length; x++) {
      if (this.state.playerIDCleanSheets[x] !== previousID) {
        newState.push(this.state.playerIDCleanSheets[x]);
      }
    }
    newState.push(playerID);
    this.setState({ playerIDCleanSheets: newState }, this._getResults);
  }

  _handleCollegeTeam(teamName: string) {
    this.props.setTeamAddingPoints(teamName);
    this.setState({ teamName });
  }

  _handleGoalsFor(goalsFor: string) {
    this.setState({ goalsFor }, this._getResults);
  }

  _handleGoalsAgainst(goalsAgainst: string) {
    this.setState({ goalsAgainst }, this._getResults);
  }

  _handleWeek(week: string) {
    console.log('set week to ' + week);
    this.setState({ week }, this._getResults);
  }

  _onSubmit() {
    let data: SubmitResults = {
      goalsFor: parseInt(this.state.goalsFor),
      goalsAgainst: parseInt(this.state.goalsAgainst),
      week: parseInt(this.state.week),
      goalScorers: this.state.playerIDGoals,
      assists: this.state.playerIDAssists,
      cleanSheets: this.state.playerIDCleanSheets,
      teamName: this.state.teamName
    };

    if (this.state.week === '') {
      this.setState({ errorMessage: 'Please provide a week' });
      this.setState({ resultAdded: false });
      setTimeout(this._removeErrorMessage, 10000);
    } else {
      submitResult(data).then(response => {
        console.log('response = ' + JSON.stringify(response));
        this.setState({ resultAdded: true });
        this.setState({ previousTeamName: this.state.teamName });
        this.setState({ previousWeek: this.state.week });
        this.setState({ errorMessage: '' });
        setTimeout(this._removeErrorMessage, 10000);
      });
    }
  }

  render() {
    // let positionChange = this._handlePositionChange;
    let teamChange = this._handleCollegeTeam;
    // let price = this._handlePrice;
    // let firstName = this._handleFirstName;
    // let surname = this._handleSurname;
    let goalsFor = this._handleGoalsFor;
    let setWeek = this._handleWeek;
    let goalsAgainst = this._handleGoalsAgainst;
    let setPlayerIDGoalscorers = this._handlePlayerIDGoalscorers;
    let setPlayerIDAssists = this._handlePlayerIDAssists;
    let setPlayerIDCleanSheets = this._handlePlayerIDCleanSheets;

    let goalScorers = [];
    let assists = [];
    let defenders = [];
    for (let i = 0; i < parseInt(this.state.goalsFor); i++) {
      goalScorers.push(<SelectPlayer setPlayerID={setPlayerIDGoalscorers} />);
      assists.push(<SelectPlayer setPlayerID={setPlayerIDAssists} />);
    }

    if (this.state.goalsAgainst === '0') {
      for (let i = 0; i < 7; i++) {
        defenders.push(<SelectPlayer setPlayerID={setPlayerIDCleanSheets} onlyDefenders={true} />);
      }
    }

    return (
      <div className="transfer-filter-rows">
        <div className="transfer-form-row-one">
          <div className="position-dropdown">
            <CollegeTeam setTeam={teamChange} />
          </div>
          <div>
            <Goals goals={goalsFor} wording={'for'} />
            <Goals goals={goalsAgainst} wording={'against'} />
          </div>
          <div>
            <Week week={setWeek} />
          </div>
        </div>
        <div className="transfer-form-row-two">
          <div>
            Goalscorers:
            {goalScorers}
          </div>
          <div>
            Assists:
            {assists}
          </div>
          {this.state.goalsAgainst === '0' ? <div>Clean Sheets: {defenders} </div> : null}
          <div>
            <Button
              className="btn btn-default btn-round-lg btn-lg second"
              id="btnRegister"
              onClick={() => this._onSubmit()}
            >
              Create result
            </Button>
          </div>
        </div>
        {this.state.resultAdded ? (
          <div className="error-message-animation">
            Result added to team {this.state.previousTeamName} in week {this.state.previousWeek}
          </div>
        ) : null}

        {this.state.errorMessage.length > 0 ? (
          <div className="error-message-animation">Error : {this.state.errorMessage}</div>
        ) : null}
      </div>
    );
  }
}
export default TransfersForm;
