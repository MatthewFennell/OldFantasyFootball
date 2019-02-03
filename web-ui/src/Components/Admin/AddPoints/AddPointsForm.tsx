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
import YellowCards from './YellowCards';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import { AddPoints } from '../../../Models/Interfaces/AddPoints';
import { addPlayerPoints } from '../../../Services/Player/PlayerService';

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
    this._getResults = this._getResults.bind(this);
    this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
    this.state = {
      goals: '0',
      assists: '0',
      minutesPlayed: '0',
      manOfTheMatch: false,
      yellowCards: '0',
      cleanSheet: false,
      redCard: false,
      playerID: '',
      week: '0',
      viewingDefender: true
    };
  }

  _getResults() {}

  _handleGoals(goals: string) {
    this.setState({ goals }, this._getResults);
  }

  _handlePlayerID(playerID: string) {
    this.setState({ playerID }, this._getResults);

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

    addPlayerPoints(data).catch(error => {
      console.log('error = ' + JSON.stringify(error));
    });
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
            <Goals goals={setGoals} />
          </div>
          <div>
            <Assists assists={assists} />
          </div>
          <div>
            <MinutesPlayed minutesPlayed={minutesPlayed} />
          </div>
          <div>
            <YellowCards yellowCards={yellowCards} />
          </div>
          <div>
            <ManOfTheMatch setManOfTheMatch={manOfTheMatch} />
          </div>
          <div>
            <RedCard setRedCard={redCard} />
          </div>

          {this.state.viewingDefender ? (
            <div>
              <CleanSheet setCleanSheet={cleanSheet} />
            </div>
          ) : null}
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
    );
  }
}
export default AddPointsForm;
