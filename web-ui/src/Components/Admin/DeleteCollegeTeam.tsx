import * as React from 'react';
import { Button } from 'reactstrap';
import { deleteCollegeTeam } from '../../Services/CollegeTeam/CollegeTeamService';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import { CollegeTeam as CT } from '../../Models/Interfaces/CollegeTeam';
import '../../Style/Admin/ErrorMessage.css';

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
	constructor (props: DeleteCollegeTeamProps) {
		super(props);
		this._handleCollegeName = this._handleCollegeName.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);

		const { allCollegeTeams } = this.props;

		if (allCollegeTeams.length > 0) {
			this.state = {
				collegeNameValue: allCollegeTeams[0].name,
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

	_handleCollegeName (collegeName: string) {
		this.setState({ collegeNameValue: collegeName });
	}

	handleSubmit () {
		const { removeCollegeTeam } = this.props;
		const { collegeNameValue } = this.state;
		deleteCollegeTeam(collegeNameValue)
			.then(response => {
				this.setState({ collegeTeamDeleted: true });
				this.setState({ previousCollegeName: collegeNameValue });
				this.setState({ errorMessage: '' });
				removeCollegeTeam(collegeNameValue);
				setTimeout(this._removeErrorMessage, 10000);
			})
			.catch(error => {
				this.setState({ errorMessage: error });
				this.setState({ collegeTeamDeleted: false });
				setTimeout(this._removeErrorMessage, 10000);
			});
	}

	_removeErrorMessage () {
		this.setState({ collegeTeamDeleted: false });
		this.setState({ errorMessage: '' });
	}

	render () {
		const { collegeTeamDeleted, previousCollegeName, errorMessage } = this.state;
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<div className="admin-wrapper">
						<CollegeTeam setTeam={this._handleCollegeName} />
					</div>
				</div>
				<div className="admin-form-row-two">
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnDeleteCollegeTeam"
							onClick={this.handleSubmit}
						>
              Delete College Team
						</Button>
					</div>
				</div>
				{collegeTeamDeleted ? (
					<div className="error-message-animation">
            Deleted college team successfully : {previousCollegeName}{' '}
					</div>
				) : null}
				{errorMessage.length > 0 ? (
					<div className="error-message-animation">Error : {errorMessage} </div>
				) : null}
			</div>
		);
	}
}
export default DeleteCollegeTeam;
