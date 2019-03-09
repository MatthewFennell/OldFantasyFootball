import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface TextValueProps {
  setValue: (value: string) => void;
  currentValue: string;
  title: string;
}
class TextValue extends React.Component<TextValueProps, {}> {
	_handleInput (eventTarget: HTMLInputElement) {
		this.props.setValue(eventTarget.value);
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
								for="firstName"
							>
								{this.props.title}
							</Label>
							<Field
								component="input"
								id={this.props.title}
								name={this.props.title}
								onChange={e => this._handleInput(e!.target)}
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
	})(TextValue)
);
