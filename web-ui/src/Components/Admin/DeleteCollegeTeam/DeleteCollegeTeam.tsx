import * as React from 'react';
import { Button } from 'reactstrap';
import { deleteCollegeTeam } from '../../../Services/CollegeTeam/CollegeTeamService';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import { CollegeTeam as CT } from '../../../Models/Interfaces/CollegeTeam';
import '../../../Style/Admin/ErrorMessage.css';

interface DeleteCollegeTeamProps {
  allCollegeTeams: CT[];
  removeCollegeTeam: (teamName: string) => void;
}

interface DeleteCollegeTeamState {
  collegeNameValue: string;
  collegeTeamDeleted: boolean;
  previousCollegeName: string;
  errorMessage: string;
}

class DeleteCollegeTeam extends React.Component<DeleteCollegeTeamProps, DeleteCollegeTeamState> {
  constructor(props: DeleteCollegeTeamProps) {
    super(props);
    this._handleCollegeName = this._handleCollegeName.bind(this);
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

  _handleCollegeName(collegeName: string) {
    this.setState({ collegeNameValue: collegeName });
  }

  _onSubmit() {
    deleteCollegeTeam(this.state.collegeNameValue)
      .then(response => {
        this.setState({ collegeTeamDeleted: true });
        this.setState({ previousCollegeName: this.state.collegeNameValue });
        this.setState({ errorMessage: '' });
        this.props.removeCollegeTeam(this.state.collegeNameValue);
        setTimeout(this._removeErrorMessage, 10000);
      })
      .catch(error => {
        this.setState({ errorMessage: error });
        this.setState({ collegeTeamDeleted: false });
        setTimeout(this._removeErrorMessage, 10000);
      });
  }

  _removeErrorMessage() {
    this.setState({ collegeTeamDeleted: false });
    this.setState({ errorMessage: '' });
  }

  render() {
    let collegeName = this._handleCollegeName;

    return (
      <div className="admin-form">
        <div className="admin-form-row-one">
          <CollegeTeam setTeam={collegeName} />
        </div>
        <div className="admin-form-row-two">
          <div>
            <Button
              className="btn btn-default btn-round-lg btn-lg second"
              id="btnDeleteCollegeTeam"
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
export default DeleteCollegeTeam;
