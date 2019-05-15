import * as React from 'react';
import { Button } from 'reactstrap';
import { deleteCollegeTeam } from '../../Services/CollegeTeam/CollegeTeamService';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import { CollegeTeam as CT } from '../../Models/Interfaces/CollegeTeam';
import '../../Style/Admin/ErrorMessage.css';
import ResponseMessage from '../common/ResponseMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface DeleteCollegeTeamProps {
  allCollegeTeams: CT[];
  removeCollegeTeam: (teamName: string) => void;
}

interface DeleteCollegeTeamState {
  collegeNameValue: string;
  responseMessage: string;
  isError: boolean;
  isLoading: boolean;
}

class DeleteCollegeTeam extends React.Component<DeleteCollegeTeamProps, DeleteCollegeTeamState> {
	constructor (props: DeleteCollegeTeamProps) {
		super(props);
		this._handleCollegeName = this._handleCollegeName.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		const { allCollegeTeams } = this.props;

		this.state = {
			collegeNameValue: allCollegeTeams.length > 0 ? allCollegeTeams[0].name : '',
			responseMessage: '',
			isError: false,
			isLoading: false
		};
	}

	_handleCollegeName (collegeName: string) {
		this.setState({ collegeNameValue: collegeName });
	}

	handleSubmit () {
		deleteCollegeTeam(this.state.collegeNameValue)
			.then(response => {
				this.props.removeCollegeTeam(this.state.collegeNameValue);
				this.setState(prevState => ({
					isLoading: false, isError: false, responseMessage: 'Team successfully deleted (' + prevState.collegeNameValue + ')'
				}));
			})
			.catch(error => {
				this.setState({ responseMessage: error, isError: true, isLoading: false });
			});
	}

	render () {
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<div className="admin-wrapper">
						<CollegeTeam setTeam={this._handleCollegeName} />
					</div>
				</div>
				<div className="admin-form-row-two">
					<div className="admin-submit-button">
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnDeleteCollegeTeam"
							onClick={this.handleSubmit}
						>
              Delete College Team
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
export default DeleteCollegeTeam;
