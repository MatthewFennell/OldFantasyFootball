import * as React from 'react';
import { Button } from 'reactstrap';
import { triggerWeek } from '../../Services/Weeks/WeeksService';
import '../../Style/Admin/ErrorMessage.css';
import ResponseMessage from '../common/ResponseMessage';
import LoadingSpinner from '../common/LoadingSpinner';
import CustomDropdown from '../common/CustomDropdown';

interface TriggerWeekProps {
	setTotalNumberOfWeeks: (week: number) => void;
	totalNumberOfWeeks: number;
}

interface TriggerWeekState {
  weekNumber: number;
  responseMessage: string;
  isError: boolean;
  isLoading: boolean;
  confirmOpen: boolean;
}

class TriggerWeek extends React.Component<TriggerWeekProps, TriggerWeekState> {
	constructor (props: TriggerWeekProps) {
		super(props);
		this._handleCollegeName = this._handleCollegeName.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.confirm = this.confirm.bind(this);
		this.state = {
			weekNumber: this.props.totalNumberOfWeeks + 1,
			responseMessage: '',
			isError: true,
			isLoading: false,
			confirmOpen: false
		};
	}

	_handleCollegeName (weekNumber: number) {
		this.setState({ weekNumber });
	}

	handleValidate () {
		this._onSubmit();
	}

	_onSubmit () {
		this.setState({ confirmOpen: true });
	}

	confirm () {
		const { weekNumber } = this.state;
		this.setState({ isLoading: true });
		triggerWeek(weekNumber)
			.then(() => {
				this.setState({ responseMessage: 'Successfully triggered a new week - ' + weekNumber, isError: false, isLoading: false });
				this.props.setTotalNumberOfWeeks(weekNumber);
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
						<CustomDropdown
							setData={this._handleCollegeName}
							startAtEnd
							title="Trigger new week"
							values={[this.props.totalNumberOfWeeks + 1]}
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
              			Trigger new week
						</Button>
						<div className="trigger-confirm-button">
							{ this.state.confirmOpen && <Button
								className="btn btn-default btn-round-lg btn-lg second"
								id="btnCreateCollegeTeam"
								onClick={this.confirm}
						                            >
              			Confirm
							</Button> }
						</div>
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
export default TriggerWeek;
