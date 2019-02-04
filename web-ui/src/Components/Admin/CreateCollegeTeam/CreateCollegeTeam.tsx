import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeName from './CollegeName';
import { makeCollegeTeam } from '../../../Services/CollegeTeam/CollegeTeamService';

interface TransfersFormProps {}

interface TransfersFormState {
  collegeNameValue: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
  constructor(props: TransfersFormProps) {
    super(props);
    this._handleCollegeName = this._handleCollegeName.bind(this);
    this._getResults = this._getResults.bind(this);
    this.state = {
      collegeNameValue: ''
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
    makeCollegeTeam(this.state.collegeNameValue).catch(error => {
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
              Create Player
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default TransfersForm;
