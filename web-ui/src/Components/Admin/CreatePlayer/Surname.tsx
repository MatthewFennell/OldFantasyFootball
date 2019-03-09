import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface SurnameState {
  surname: string;
}

interface SurnameProps {
  surname: (searchByName: string) => void;
}
class SearchByName extends React.Component<SurnameProps, SurnameState> {
	constructor (props: SurnameProps) {
		super(props);
		this.state = {
			surname: ''
		};
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.props.surname(eventTarget.value);
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<SurnameState, keyof SurnameState>);
	}

	render () {
		return (
			<div
				className="create-player-form-outer"
				onSubmit={e => e.preventDefault()}
			>
				<Form id="create-player-form">
					<div id="login-input-fields">
						<FormGroup>
							<Label
								className="unselectable"
								for="surname"
							>
                Surname
							</Label>
							<Field
								component="input"
								id="surname"
								name="surname"
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
