import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface GoalsState {
  goals: string;
}

interface GoalsProps {
  goals: (goals: string) => void;
}

class Goals extends React.Component<GoalsProps, GoalsState> {
	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		const { goals } = this.props;
		goals(eventTarget.value);
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<GoalsState, keyof GoalsState>);
	}

	render () {
		return (
			<div
				className="add-points-goals-outer"
				onSubmit={e => e.preventDefault}
			>
				<Form id="add-points-goals">
					<div id="login-input-fields">
						<FormGroup>
							<Label
								className="unselectable"
								for="goals"
							>
                Number of goals
							</Label>
							<Field
								component="input"
								id="goals"
								name="goals"
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
	})(Goals)
);
