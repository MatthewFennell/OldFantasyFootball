/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface TextValueProps {
  setValue: (value: string) => void;
  currentValue: string;
  title: string;
  password: boolean;
}
class TextValue extends React.Component<TextValueProps, {}> {
	static defaultProps = { password: false, title: '' };
	_handleInput (eventTarget: HTMLInputElement) {
		const { setValue } = this.props;
		setValue(eventTarget.value);
	}

	render () {
		const { title } = this.props;
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
								{title}
							</Label>
							<Field
								component="input"
								id={title}
								name={title}
								onChange={e => this._handleInput(e!.target)}
								type={this.props.password ? 'password' : 'text'}
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
