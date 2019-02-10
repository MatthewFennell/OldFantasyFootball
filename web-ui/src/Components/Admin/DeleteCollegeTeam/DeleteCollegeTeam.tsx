import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeName from '../CreateCollegeTeam/CollegeName';
import { deleteCollegeTeam } from '../../../Services/CollegeTeam/CollegeTeamService';

interface TransfersFormProps {}

interface TransfersFormState {
  collegeNameValue: string;
  collegeTeamDeleted: boolean;
  previousCollegeName: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handleCollegeName = this._handleCollegeName.bind(this);
    this._getResults = this._getResults.bind(this);
    this.state = {
      collegeNameValue: '',
      collegeTeamDeleted: false,
      previousCollegeName: ''
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
    deleteCollegeTeam(this.state.collegeNameValue)
      .then(response => {
        console.log('response to deleting college team = ' + response);
        this.setState({ collegeTeamDeleted: true });
        this.setState({ previousCollegeName: this.state.collegeNameValue });
      })
      .catch(error => {
        console.log('error message : ' + error);
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
              Delete College Team
            </Button>
          </div>
        </div>
        {this.state.collegeTeamDeleted ? (
          <div>Deleted college team : {this.state.previousCollegeName} </div>
        ) : null}
      </div>
    );
  }
}
export default TransfersForm;
