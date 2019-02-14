import * as React from 'react';
import { Button } from 'reactstrap';
// import CollegeName from '../CreateCollegeTeam/CollegeName';
import { deleteCollegeTeam } from '../../../Services/CollegeTeam/CollegeTeamService';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import { CollegeTeam as CT } from '../../../Models/Interfaces/CollegeTeam';
import '../../../Style/Admin/ErrorMessage.css';

interface TransfersFormProps {
  allCollegeTeams: CT[];
  removeCollegeTeam: (teamName: string) => void;
}

interface TransfersFormState {
  collegeNameValue: string;
  collegeTeamDeleted: boolean;
  previousCollegeName: string;
  errorMessage: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handleCollegeName = this._handleCollegeName.bind(this);
    this._getResults = this._getResults.bind(this);
    this._removeErrorMessage = this._removeErrorMessage.bind(this);

    if (this.props.allCollegeTeams.length > 0) {
      this.state = {
        collegeNameValue: this.props.allCollegeTeams[0].name,
        collegeTeamDeleted: false,
        previousCollegeName: '',
        errorMessage: ''
      };
    } else {
      this.state = {
        collegeNameValue: '',
        collegeTeamDeleted: false,
        previousCollegeName: '',
        errorMessage: ''
      };
    }
  }

  _getResults() {}

  _handleCollegeName(collegeName: string) {
    this.setState({ collegeNameValue: collegeName }, this._getResults);
  }

  _onSubmit() {
    // createPlayer(data).catch(error => {
    //   console.log('error = ' + JSON.stringify(error));
    // });
    deleteCollegeTeam(this.state.collegeNameValue)
      .then(response => {
        console.log('response to deleting college team = ' + response);
        this.setState({ collegeTeamDeleted: true });
        this.setState({ previousCollegeName: this.state.collegeNameValue });
        this.setState({ errorMessage: '' });
        this.props.removeCollegeTeam(this.state.collegeNameValue);
        setTimeout(this._removeErrorMessage, 10000);
      })
      .catch(error => {
        console.log('error message : ' + error);
        this.setState({ errorMessage: error });
        this.setState({ collegeTeamDeleted: false });
        setTimeout(this._removeErrorMessage, 10000);
      });
  }

  _removeErrorMessage() {
    console.log('error message set');
    this.setState({ collegeTeamDeleted: false });
    this.setState({ errorMessage: '' });
  }

  render() {
    let collegeName = this._handleCollegeName;

    return (
      <div className="transfer-filter-rows">
        <div className="transfer-form-row-one">
          <div className="position-dropdown">
            <CollegeTeam setTeam={collegeName} />
          </div>
        </div>
        <div className="transfer-form-row-two">
          <div>
            <Button
              className="btn btn-default btn-round-lg btn-lg second"
              id="btnRegister"
              onClick={() => this._onSubmit()}
            >
              Delete College Team
            </Button>
          </div>
        </div>
        {this.state.collegeTeamDeleted ? (
          <div className="error-message-animation">
            Deleted college team successfully : {this.state.previousCollegeName}{' '}
          </div>
        ) : null}
        {this.state.errorMessage.length > 0 ? (
          <div className="error-message-animation">Error : {this.state.errorMessage} </div>
        ) : null}
      </div>
    );
  }
}
export default TransfersForm;
