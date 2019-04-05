import * as React from 'react';
import { Button } from 'reactstrap';
import { makeCollegeTeam } from '../../Services/CollegeTeam/CollegeTeamService';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import '../../Style/Admin/ErrorMessage.css';
import { validCollegeName } from '../../Services/CredentialInputService';
import TextInputForm from '../common/TexInputForm';

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
		const { allCollegeTeams, addCollegeTeam } = this.props;
		const { collegeNameValue } = this.state;
		makeCollegeTeam(collegeNameValue)
			.then(response => {
				let alreadyThere: boolean = false;

				for (let x = 0; x < allCollegeTeams.length; x++) {
					if (allCollegeTeams[x].name === collegeNameValue) {
						alreadyThere = true;
					}
				}
				if (!alreadyThere) {
					addCollegeTeam(response);
				}
				this.setState({ collegeTeamCreated: true });
				this.setState({ previousCollegeTeamMade: collegeNameValue });
				this.setState({ errorMessage: '' });
				setTimeout(this._removeErrorMessage, 10000);
			})
			.catch(error => {
				this.setState({ errorMessage: error });
				this.setState({ collegeTeamCreated: false });
				setTimeout(this._removeErrorMessage, 10000);
			});
	}

	_removeErrorMessage () {
		this.setState({ collegeTeamCreated: false });
		this.setState({ errorMessage: '' });
	}

	render () {
		const { collegeNameValue, collegeTeamCreated, previousCollegeTeamMade, errorMessage } = this.state;
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<div className="admin-wrapper">
						<TextInputForm
							currentValue={collegeNameValue}
							setValue={this._handleCollegeName}
							title="College team name"
						/>
					</div>
				</div>
				<div className="admin-form-row-two">
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnCreateCollegeTeam"
							onClick={this.handleValidate}
						>
              			Create College Team
						</Button>
					</div>
				</div>
				{collegeTeamCreated ? (
					<div className="error-message-animation">
            College team created : {previousCollegeTeamMade}{' '}
					</div>
				) : null}
				{errorMessage.length > 0 ? (
					<div className="error-message-animation">Error : {errorMessage} </div>
				) : null}
			</div>
		);
	}
}
export default CreateCollegeTeam;
