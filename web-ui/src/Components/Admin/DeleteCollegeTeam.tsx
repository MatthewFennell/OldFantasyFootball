import * as React from 'react';
import { Button } from 'reactstrap';
import { deleteCollegeTeam } from '../../Services/CollegeTeam/CollegeTeamService';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import { CollegeTeam as CT } from '../../Models/Interfaces/CollegeTeam';
import '../../Style/Admin/ErrorMessage.css';
import ResponseMessage from '../common/ResponseMessage';

interface DeleteCollegeTeamProps {
  allCollegeTeams: CT[];
  removeCollegeTeam: (teamName: string) => void;
}

interface DeleteCollegeTeamState {
  collegeNameValue: string;

  responseMessage: string;
  isError: boolean;
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
			isError: false
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
					isError: false, responseMessage: 'Team successfully deleted (' + prevState.collegeNameValue + ')'
				}));
			})
			.catch(error => {
				this.setState({ responseMessage: error, isError: true });
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
					<div>
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
					</div>
				</div>
			</div>
		);
	}
}
export default DeleteCollegeTeam;
