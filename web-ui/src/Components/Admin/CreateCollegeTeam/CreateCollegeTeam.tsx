import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeName from './CollegeName';
import { makeCollegeTeam } from '../../../Services/CollegeTeam/CollegeTeamService';
import { CollegeTeam } from '../../../Models/Interfaces/CollegeTeam';
import '../../../Style/Admin/ErrorMessage.css';
import { validCollegeName } from '../../../Services/CredentialInputService';

interface TransfersFormProps {
  addCollegeTeam: (team: CollegeTeam) => void;
  allCollegeTeams: CollegeTeam[];
}

interface TransfersFormState {
  collegeNameValue: string;
  collegeTeamCreated: boolean;
  previousCollegeTeamMade: string;
  errorMessage: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handleCollegeName = this._handleCollegeName.bind(this);
    this._getResults = this._getResults.bind(this);
    this._removeErrorMessage = this._removeErrorMessage.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onValidate = this._onValidate.bind(this);
    this.state = {
      collegeNameValue: 'Please select a team',
      collegeTeamCreated: false,
      previousCollegeTeamMade: '',
      errorMessage: ''
    };
  }

  _getResults() {}

  _handleCollegeName(collegeName: string) {
    this.setState({ collegeNameValue: collegeName }, this._getResults);
  }

  _onValidate() {
    if (validCollegeName(this.state.collegeNameValue)) {
      this._onSubmit();
    } else {
      this.setState({ errorMessage: 'College team name does not match regex (UI)' });
      this.setState({ collegeTeamCreated: false });
      console.log('setting in 5 seconds');
      setTimeout(this._removeErrorMessage, 10000);
    }
  }

  _onSubmit() {
    makeCollegeTeam(this.state.collegeNameValue)
      .then(response => {
        let alreadyThere: boolean = false;

        for (let x = 0; x < this.props.allCollegeTeams.length; x++) {
          if (this.props.allCollegeTeams[x].name === this.state.collegeNameValue) {
            alreadyThere = true;
          }
        }
        if (!alreadyThere) {
          this.props.addCollegeTeam(response);
        }
        this.setState({ collegeTeamCreated: true });
        this.setState({ previousCollegeTeamMade: this.state.collegeNameValue });
        this.setState({ errorMessage: '' });
        setTimeout(this._removeErrorMessage, 10000);
      })
      .catch(error => {
        console.log('error message : ' + error);
        this.setState({ errorMessage: error });
        this.setState({ collegeTeamCreated: false });
        console.log('setting in 5 seconds');
        setTimeout(this._removeErrorMessage, 10000);
      });
  }

  _removeErrorMessage() {
    console.log('error message set');
    this.setState({ collegeTeamCreated: false });
    this.setState({ errorMessage: '' });
  }

  render() {
    let collegeName = this._handleCollegeName;

    return (
      <div className="transfer-filter-rows">
        <div className="transfer-form-row-one">
          <div className="position-dropdown">
            <CollegeName collegeName={collegeName} />
          </div>
        </div>
        <div className="transfer-form-row-two">
          <div>
            <Button
              className="btn btn-default btn-round-lg btn-lg second"
              id="btnRegister"
              onClick={() => this._onValidate()}
            >
              Create College Team
            </Button>
          </div>
        </div>
        {this.state.collegeTeamCreated ? (
          <div className="error-message-animation">
            College team created : {this.state.previousCollegeTeamMade}{' '}
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
