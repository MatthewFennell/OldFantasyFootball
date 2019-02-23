import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeName from './CollegeName';
import { makeCollegeTeam } from '../../../Services/CollegeTeam/CollegeTeamService';
import { CollegeTeam } from '../../../Models/Interfaces/CollegeTeam';
import '../../../Style/Admin/ErrorMessage.css';
import { validCollegeName } from '../../../Services/CredentialInputService';

interface CreateCollegeTeamProps {
  addCollegeTeam: (team: CollegeTeam) => void;
  allCollegeTeams: CollegeTeam[];
}

interface CreateCollegeTeamState {
  collegeNameValue: string;
  collegeTeamCreated: boolean;
  previousCollegeTeamMade: string;
  errorMessage: string;
}

class CreateCollegeTeam extends React.Component<CreateCollegeTeamProps, CreateCollegeTeamState> {
  constructor(props: CreateCollegeTeamProps) {
    super(props);
    this._handleCollegeName = this._handleCollegeName.bind(this);
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

  _handleCollegeName(collegeName: string) {
    this.setState({ collegeNameValue: collegeName });
  }

  _onValidate() {
    if (validCollegeName(this.state.collegeNameValue)) {
      this._onSubmit();
    } else {
      this.setState({ errorMessage: 'College team name does not match regex (UI)' });
      this.setState({ collegeTeamCreated: false });
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
        this.setState({ errorMessage: error });
        this.setState({ collegeTeamCreated: false });
        setTimeout(this._removeErrorMessage, 10000);
      });
  }

  _removeErrorMessage() {
    this.setState({ collegeTeamCreated: false });
    this.setState({ errorMessage: '' });
  }

  render() {
    let collegeName = this._handleCollegeName;

    return (
      <div className="admin-form">
        <div className="admin-form-row-one">
          <CollegeName collegeName={collegeName} />
        </div>
        <div className="admin-form-row-two">
          <div>
            <Button
              className="btn btn-default btn-round-lg btn-lg second"
              id="btnCreateCollegeTeam"
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
export default CreateCollegeTeam;
