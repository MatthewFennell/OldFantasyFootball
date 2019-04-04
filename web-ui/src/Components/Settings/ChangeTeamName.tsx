import * as React from 'react';
import { Button } from 'reactstrap';
import { validCollegeName } from '../../Services/CredentialInputService';
import TextInputForm from '../common/TexInputForm';
import '../../Style/Settings/ChangeTeamName.css';

interface CreateCollegeTeamProps {
}

interface CreateCollegeTeamState {
  collegeNameValue: string;
  collegeTeamCreated: boolean;
  previousCollegeTeamMade: string;
  errorMessage: string;
}

// eslint-disable-next-line react/require-optimization
class CreateCollegeTeam extends React.Component<CreateCollegeTeamProps, CreateCollegeTeamState> {
	constructor (props: CreateCollegeTeamProps) {
		super(props);
		this._handleCollegeName = this._handleCollegeName.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = {
			collegeNameValue: 'Please select a team',
			collegeTeamCreated: false,
			previousCollegeTeamMade: '',
			errorMessage: ''
		};
	}

	_handleCollegeName (collegeName: string) {
		this.setState({ collegeNameValue: collegeName });
	}

	handleValidate () {
		const { collegeNameValue } = this.state;
		if (validCollegeName(collegeNameValue)) {
			this._onSubmit();
		} else {
			this.setState({ errorMessage: 'College team name does not match regex (UI)' });
			this.setState({ collegeTeamCreated: false });
			setTimeout(this._removeErrorMessage, 10000);
		}
	}

	_onSubmit () {
	}

	_removeErrorMessage () {
		this.setState({ collegeTeamCreated: false });
		this.setState({ errorMessage: '' });
	}

	render () {
		const { collegeNameValue } = this.state;
		return (
			<div className="college-form">
				<div className="college-form-row-one">
					<TextInputForm
						currentValue={collegeNameValue}
						setValue={this._handleCollegeName}
						title="Enter your new team name"
					/>
				</div>
				<div className="college-form-row-two">
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnChangeTeamName"
							onClick={this.handleValidate}
						>
              			Submit
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
export default CreateCollegeTeam;
