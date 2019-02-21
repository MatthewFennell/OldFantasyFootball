import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../../Containers/Admin/SelectPlayer';
import Week from './Week';
import Goals from './Goals';
import Assists from './Assists';
import MinutesPlayed from './MinutesPlayed';
import ManOfTheMatch from './ManOfTheMatch';
import RedCard from './RedCard';
import CleanSheet from './CleanSheet';
import YellowCard from './YellowCard';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import { AddPoints } from '../../../Models/Interfaces/AddPoints';
import { addPlayerPoints } from '../../../Services/Player/PlayerService';
import '../../../Style/Admin/ErrorMessage.css';

interface AddPointsFormProps {
  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

interface AddPointsFormState {
  goals: string;
  assists: string;
  minutesPlayed: string;
  manOfTheMatch: boolean;
  yellowCards: string;
  cleanSheet: boolean;
  redCard: boolean;
  playerID: string;
  week: string;
  viewingDefender: boolean;
  pointsAdded: boolean;
  errorMessage: string;
}

class AddPointsForm extends React.Component<AddPointsFormProps, AddPointsFormState> {
  constructor(props: AddPointsFormProps) {
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
    this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
    this._removeErrorMessage = this._removeErrorMessage.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onValidate = this._onValidate.bind(this);
    this.state = {
      goals: '',
      assists: '',
      minutesPlayed: '',
      manOfTheMatch: false,
      yellowCards: '0',
      cleanSheet: false,
      redCard: false,
      playerID: '',
      week: '',
      viewingDefender: true,
      pointsAdded: false,
      errorMessage: ''
    };
  }

  _handleGoals(goals: string) {
    this.setState({ goals });
  }

  _handlePlayerID(playerID: string) {
    this.setState({ playerID });

    let haveSet: boolean = false;

    for (let x = 0; x < this.props.playersInFilteredTeam.length; x++) {
      if (playerID === this.props.playersInFilteredTeam[x].id) {
        if (
          this.props.playersInFilteredTeam[x].position === 'DEFENDER' ||
          this.props.playersInFilteredTeam[x].position === 'GOALKEEPER'
        ) {
          haveSet = true;
          this.setState({ viewingDefender: true });
        }
      }
    }
    if (!haveSet) {
      this.setState({ viewingDefender: false });
      this.setState({ cleanSheet: false });
    }
  }

  _handleCollegeTeam(team: string) {
    this.props.setTeamAddingPoints(team);
  }

  _handleAssists(assists: string) {
    this.setState({ assists });
  }

  _handleMinutesPlayed(minutesPlayed: string) {
    this.setState({ minutesPlayed });
  }

  _handleManOfTheMatch(manOfTheMatch: boolean) {
    this.setState({ manOfTheMatch });
  }

  _handleYellowCards(yellowCards: string) {
    this.setState({ yellowCards });
  }

  _handleCleanSheet(cleanSheet: boolean) {
    this.setState({ cleanSheet });
  }

  _handleRedCard(redCard: boolean) {
    this.setState({ redCard });
  }

  _handleWeek(week: string) {
    this.setState({ week });
  }

  _onValidate() {
    let error: boolean = false;
    let message: string = 'Please select a value for : ';

    if (this.state.playerID === '') {
      error = true;
      message += 'Player, ';
    }
    if (this.state.week === '' || isNaN(parseFloat(this.state.week))) {
      error = true;
      message += 'Week, ';
    }
    if (this.state.goals === '' || isNaN(parseFloat(this.state.goals))) {
      error = true;
      message += 'Goals, ';
    }
    if (this.state.assists === '' || isNaN(parseFloat(this.state.assists))) {
      error = true;
      message += 'Assists, ';
    }
    if (this.state.minutesPlayed === '' || isNaN(parseFloat(this.state.minutesPlayed))) {
      error = true;
      message += 'Minutes Played, ';
    }

    if (error) {
      this.setState({ errorMessage: message.substring(0, message.length - 2) });
      this.setState({ pointsAdded: false });
      setTimeout(this._removeErrorMessage, 10000);
    } else {
      this._onSubmit();
    }
  }

  _onSubmit() {
    let data: AddPoints = {
      goals: this.state.goals,
      assists: this.state.assists,
      minutesPlayed: this.state.minutesPlayed,
      manOfTheMatch: this.state.manOfTheMatch,
      yellowCards: this.state.yellowCards,
      cleanSheet: this.state.cleanSheet,
      redCard: this.state.redCard,
      playerID: this.state.playerID,
      week: this.state.week
    };

    addPlayerPoints(data)
      .then(response => {
        this.setState({ pointsAdded: true });
        this.setState({ errorMessage: '' });
        setTimeout(this._removeErrorMessage, 10000);
      })
      .catch(error => {
        this.setState({ errorMessage: error });
        this.setState({ pointsAdded: false });
        setTimeout(this._removeErrorMessage, 10000);
      });
  }

  _removeErrorMessage() {
    this.setState({ pointsAdded: false });
    this.setState({ errorMessage: '' });
  }

  render() {
    let setTeam = this._handleCollegeTeam;
    let setPlayerID = this._handlePlayerID;
    let setWeek = this._handleWeek;
    let setGoals = this._handleGoals;
    let assists = this._handleAssists;
    let minutesPlayed = this._handleMinutesPlayed;
    let manOfTheMatch = this._handleManOfTheMatch;
    let redCard = this._handleRedCard;
    let cleanSheet = this._handleCleanSheet;
    let yellowCards = this._handleYellowCards;

    return (
      <div className="admin-form">
        <div className="admin-form-row-one">
          <CollegeTeam setTeam={setTeam} />
          <SelectPlayer setPlayerID={setPlayerID} />
          <Week week={setWeek} />
        </div>
        <div className="admin-form-row-two">
          <Goals goals={setGoals} />
          <Assists assists={assists} />
          <MinutesPlayed minutesPlayed={minutesPlayed} />
          <YellowCard yellowCards={yellowCards} />
          <ManOfTheMatch setManOfTheMatch={manOfTheMatch} />
          <RedCard setRedCard={redCard} />

          {this.state.viewingDefender ? <CleanSheet setCleanSheet={cleanSheet} /> : null}
        </div>
        <div>
          <Button
            className="btn btn-default btn-round-lg btn-lg second"
            id="btnRegister"
            onClick={() => this._onValidate()}
          >
            Add Points
          </Button>
        </div>
        {this.state.pointsAdded ? (
          <div className="error-message-animation"> Points added successfully </div>
        ) : null}
        {this.state.errorMessage.length > 0 ? (
          <div className="error-message-animation"> Error : {this.state.errorMessage} </div>
        ) : null}
      </div>
    );
  }
}
export default AddPointsForm;
