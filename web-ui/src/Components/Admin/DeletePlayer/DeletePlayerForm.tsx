import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../../Containers/Admin/SelectPlayer';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import { deletePlayer } from '../../../Services/Player/PlayerService';
import '../../../Style/Admin/ErrorMessage.css';

interface AddPointsFormProps {
  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

interface AddPointsFormState {
  playerID: string;
  playerDeleted: boolean;
  errorMessage: string;
}

class AddPointsForm extends React.Component<AddPointsFormProps, AddPointsFormState> {
  constructor(props: AddPointsFormProps) {
    super(props);
    this._handlePlayerID = this._handlePlayerID.bind(this);
    this._getResults = this._getResults.bind(this);
    this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
    this._removeErrorMessage = this._removeErrorMessage.bind(this);
    this.state = {
      playerID: 'No player selected',
      playerDeleted: false,
      errorMessage: ''
    };
  }

  _getResults() {}

  _handlePlayerID(playerID: string) {
    this.setState({ playerID }, this._getResults);
  }

  _handleCollegeTeam(team: string) {
    this.props.setTeamAddingPoints(team);
  }

  _removeErrorMessage() {
    console.log('error message set');
    this.setState({ playerDeleted: false });
    this.setState({ errorMessage: '' });
  }

  _onSubmit() {
    console.log('This state = ' + JSON.stringify(this.state));
    deletePlayer(this.state.playerID)
      .then(response => {
        console.log('response to deleting player = ' + response);
        this.setState({ playerDeleted: true });
        this.setState({ errorMessage: '' });
        setTimeout(this._removeErrorMessage, 10000);
      })
      .catch(error => {
        console.log('error = ' + JSON.stringify(error));
        this.setState({ errorMessage: error });
        this.setState({ playerDeleted: false });
        setTimeout(this._removeErrorMessage, 10000);
      });
  }

  render() {
    let setTeam = this._handleCollegeTeam;
    let setPlayerID = this._handlePlayerID;

    return (
      <div className="transfer-filter-rows">
        <div className="transfer-form-row-one">
          <div className="position-dropdown">
            <CollegeTeam setTeam={setTeam} />
          </div>
          <div>
            <SelectPlayer setPlayerID={setPlayerID} onlyDefendwrs={false} />
          </div>
        </div>
        <div className="transfer-form-row-two" />
        <div>
          <Button
            className="btn btn-default btn-round-lg btn-lg second"
            id="btnRegister"
            onClick={() => this._onSubmit()}
          >
            Delete player
          </Button>
        </div>
        {this.state.playerDeleted ? (
          <div className="error-message-animation"> Player deleted successfully! </div>
        ) : null}
        {this.state.errorMessage ? (
          <div className="error-message-animation"> Error : {this.state.errorMessage} </div>
        ) : null}
      </div>
    );
  }
}
export default AddPointsForm;
