import * as React from 'react';
import { Button } from 'reactstrap';
import { triggerWeek } from '../../Services/Weeks/WeeksService';
import '../../Style/Admin/ErrorMessage.css';
import TextInputForm from '../common/TexInputForm';
import ResponseMessage from '../common/ResponseMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface TriggerWeekProps {
}

interface TriggerWeekState {
  weekNumber: number;
  responseMessage: string;
  isError: boolean;
  isLoading: boolean;
}

class TriggerWeek extends React.Component<TriggerWeekProps, TriggerWeekState> {
	constructor (props: TriggerWeekProps) {
		super(props);
		this._handleCollegeName = this._handleCollegeName.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = {
			weekNumber: 0,
			responseMessage: '',
			isError: true,
			isLoading: false
		};
	}

	_handleCollegeName (weekNumber: number) {
		this.setState({ weekNumber });
	}

	handleValidate () {
		this._onSubmit();
	}

	_onSubmit () {
		const { weekNumber } = this.state;
		this.setState({ isLoading: true });
		triggerWeek(weekNumber)
			.then(() => {
				this.setState({ responseMessage: 'Successfully triggered a new week - ' + weekNumber, isError: false, isLoading: false });
			})
			.catch(error => {
				this.setState({ responseMessage: error, isError: true, isLoading: false });
			});
	}

	render () {
		const { weekNumber } = this.state;
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<div className="admin-wrapper">
						<TextInputForm
							currentValue={weekNumber}
							setValue={this._handleCollegeName}
							title="Week to start"
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
