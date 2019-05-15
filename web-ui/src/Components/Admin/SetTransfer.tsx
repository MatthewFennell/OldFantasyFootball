import * as React from 'react';
import { Button } from 'reactstrap';
import { setTransferMarket } from '../../Services/Weeks/WeeksService';
import '../../Style/Admin/ErrorMessage.css';
import CustomDropdown from '../common/CustomDropdown';
import ResponseMessage from '../common/ResponseMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface SetTransferProps {
}

interface SetTransferState {
  transferOpen: string;
  responseMessage: string;
  isError: boolean;
  isLoading: boolean;
}

class SetTransfer extends React.Component<SetTransferProps, SetTransferState> {
	constructor (props: SetTransferProps) {
		super(props);
		this.setTransferMarket = this.setTransferMarket.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = {
			transferOpen: '',
			responseMessage: '',
			isError: true,
			isLoading: false
		};
	}

	setTransferMarket (transferOpen: string) {
		this.setState({ transferOpen });
	}

	handleValidate () {
		this._onSubmit();
	}

	_onSubmit () {
		const { transferOpen } = this.state;
		const setTransferOpen = transferOpen === 'true';
		this.setState({ isLoading: true });
		setTransferMarket(setTransferOpen)
			.then(() => {
				this.setState({ responseMessage: 'Transfer market open = ' + transferOpen, isError: false, isLoading: false });
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
							setData={this.setTransferMarket}
							title="Set transfer market open"
							values={['false', 'true']}
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
export default SetTransfer;
