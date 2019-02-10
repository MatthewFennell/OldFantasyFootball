import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeName from './CollegeName';
import { makeCollegeTeam } from '../../../Services/CollegeTeam/CollegeTeamService';
import { CollegeTeam } from '../../../Models/Interfaces/CollegeTeam';

interface TransfersFormProps {
  addCollegeTeam: (team: CollegeTeam) => void;
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
    this.state = {
      collegeNameValue: '',
      collegeTeamCreated: false,
      previousCollegeTeamMade: '',
      errorMessage: ''
    };
  }

  _getResults() {}

  _handleCollegeName(collegeName: string) {
    this.setState({ collegeNameValue: collegeName }, this._getResults);
  }

  _onSubmit() {
    // createPlayer(data).catch(error => {
    //   console.log('error = ' + JSON.stringify(error));
    // });
    makeCollegeTeam(this.state.collegeNameValue)
      .then(response => {
        this.props.addCollegeTeam(response);
        this.setState({ collegeTeamCreated: true });
        this.setState({ previousCollegeTeamMade: this.state.collegeNameValue });
        this.setState({ errorMessage: '' });
      })
      .catch(error => {
        console.log('error message : ' + error);
        this.setState({ errorMessage: error });
        this.setState({ collegeTeamCreated: false });
      });
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
              onClick={() => this._onSubmit()}
            >
              Create College Team
            </Button>
          </div>
        </div>
        {this.state.collegeTeamCreated ? (
          <div>College team created : {this.state.previousCollegeTeamMade} </div>
        ) : null}
        {this.state.errorMessage.length > 0 ? <div>Error : {this.state.errorMessage} </div> : null}
      </div>
    );
  }
}
export default TransfersForm;
