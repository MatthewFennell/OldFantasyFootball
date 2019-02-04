import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../../Containers/Admin/SelectPlayer';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import { deletePlayer } from '../../../Services/Player/PlayerService';

interface AddPointsFormProps {
  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

interface AddPointsFormState {
  playerID: string;
}

class AddPointsForm extends React.Component<AddPointsFormProps, AddPointsFormState> {
  constructor(props: AddPointsFormProps) {
    super(props);
    this._handlePlayerID = this._handlePlayerID.bind(this);
    this._getResults = this._getResults.bind(this);
    this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
  }

  _getResults() {}

  _handlePlayerID(playerID: string) {
    this.setState({ playerID }, this._getResults);
  }

  _handleCollegeTeam(team: string) {
    this.props.setTeamAddingPoints(team);
  }

  _onSubmit() {
    console.log('This state = ' + JSON.stringify(this.state));
    deletePlayer(this.state.playerID).catch(error => {
      console.log('error = ' + JSON.stringify(error));
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
            <SelectPlayer setPlayerID={setPlayerID} />
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
      </div>
    );
  }
}
export default AddPointsForm;
