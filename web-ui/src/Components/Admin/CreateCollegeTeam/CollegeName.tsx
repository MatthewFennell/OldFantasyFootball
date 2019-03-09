import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface State {
  collegeName: string;
}

interface PositionDropdownProps {
  collegeName: (searchByName: string) => void;
}
class SearchByName extends React.Component<PositionDropdownProps, State> {
	constructor (props: PositionDropdownProps) {
		super(props);
		this.state = {
			collegeName: ''
		};
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.props.collegeName(eventTarget.value);
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<State, keyof State>);
	}

	render () {
		return (
			<div
				className="create-college-team-form-outer"
				onSubmit={e => e.preventDefault()}
			>
				<Form id="create-college-team-form">
					<div id="login-input-fields">
						<FormGroup>
							<Label
								className="unselectable"
								for="collegeName"
							>
                College Team Name
							</Label>
							<Field
								component="input"
								id="collegeName"
								name="collegeName"
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
	})(SearchByName)
);
