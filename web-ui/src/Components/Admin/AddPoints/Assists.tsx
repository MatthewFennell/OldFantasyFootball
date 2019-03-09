import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface AssistsState {
  assists: string;
}

interface AssistProps {
  assists: (assists: string) => void;
}

class Assists extends React.Component<AssistProps, AssistsState> {
	constructor (props: AssistProps) {
		super(props);
		this.state = {
			assists: ''
		};
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.props.assists(eventTarget.value);
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<AssistsState, keyof AssistsState>);
	}

	render () {
		return (
			<div
				className="add-points-assists-outer"
				onSubmit={e => e.preventDefault()}
			>
				<Form id="add-points-assists">
					<div id="login-input-fields">
						<FormGroup>
							<Label
								className="unselectable"
								for="assists"
							>
                			Number of assists
							</Label>
							<Field
								component="input"
								id="assists"
								name="assists"
								onChange={e => this._handleInput(e!.target.name, e!.target)}
								type="text"
							/>
						</FormGroup>
					</div>
				</Form>
			</div>
		);
	}
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'login'
	})(Assists)
);
