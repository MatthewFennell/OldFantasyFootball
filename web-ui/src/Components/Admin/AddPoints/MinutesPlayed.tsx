import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface State {
  minutesPlayed: string;
}

interface MinutesPlayedProps {
  minutesPlayed: (minutesPlayed: string) => void;
}
class MinutesPlayed extends React.Component<MinutesPlayedProps, State> {
	constructor (props: MinutesPlayedProps) {
		super(props);
		this.state = {
			minutesPlayed: ''
		};
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.props.minutesPlayed(eventTarget.value);
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<State, keyof State>);
	}

	render () {
		return (
			<div
				className="add-points-minutes-outer"
				onSubmit={e => e.preventDefault()}
			>
				<Form id="add-points-minutes">
					<div id="login-input-fields">
						<FormGroup>
							<Label
								className="unselectable"
								for="minutesPlayed"
							>
                Minutes Played
							</Label>
							<Field
								component="input"
								id="minutesPlayed"
								name="minutesPlayed"
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
	})(MinutesPlayed)
);
