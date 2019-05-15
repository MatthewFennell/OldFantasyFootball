import * as React from 'react';
import { Button } from 'reactstrap';
import { makeCollegeTeam } from '../../Services/CollegeTeam/CollegeTeamService';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import '../../Style/Admin/ErrorMessage.css';
import { validCollegeName } from '../../Services/CredentialInputService';
import TextInputForm from '../common/TexInputForm';
import ResponseMessage from '../common/ResponseMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface CreateCollegeTeamProps {
  addCollegeTeam: (team: CollegeTeam) => void;
  allCollegeTeams: CollegeTeam[];
}

interface CreateCollegeTeamState {
  collegeNameValue: string;
  responseMessage: string;
  isError: boolean;
  isLoading: boolean;
}

class CreateCollegeTeam extends React.Component<CreateCollegeTeamProps, CreateCollegeTeamState> {
	constructor (props: CreateCollegeTeamProps) {
		super(props);
		this._handleCollegeName = this._handleCollegeName.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = {
			collegeNameValue: 'Please select a team',
			responseMessage: '',
			isError: true,
			isLoading: false
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
			this.setState({ responseMessage: 'College team name does not match regex (UI)', isError: true });
		}
	}

	_onSubmit () {
		const { allCollegeTeams, addCollegeTeam } = this.props;
		const { collegeNameValue } = this.state;
		this.setState({ isLoading: true });
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
				this.setState({ responseMessage: 'Successfully made a college team called ' + collegeNameValue, isError: false, isLoading: false });
			})
			.catch(error => {
				this.setState({ responseMessage: error, isError: true, isLoading: false });
			});
	}

	render () {
		const { collegeNameValue } = this.state;
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
					<div className="admin-submit-button">
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnCreateCollegeTeam"
							onClick={this.handleValidate}
						>
              			Create College Team
						</Button>
						<ResponseMessage
							isError={this.state.isError}
							responseMessage={this.state.responseMessage}
							shouldDisplay={this.state.responseMessage.length > 0}
						/>
						<LoadingSpinner isLoading={this.state.isLoading} />
					</div>
				</div>

			</div>
		);
	}
}
export default CreateCollegeTeam;
