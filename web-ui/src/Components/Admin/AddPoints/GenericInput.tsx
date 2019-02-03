import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface State {
  genericValue: string;
}

interface PositionDropdownProps {
  inputFunction: (genericValue: string) => void;
  title: string;
}
class Generic extends React.Component<PositionDropdownProps, State> {
  constructor(props: PositionDropdownProps) {
    super(props);
    this.state = {
      genericValue: '0'
    };
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.props.inputFunction(eventTarget.value);
    this.setState({
      [eventName]: eventTarget.value
    } as Pick<State, keyof State>); // Needs type conversion, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
  }

  _validate = () => {
    return false;
  };

  render() {
    return (
      <div id="search-by-name-form" onSubmit={e => e.preventDefault()}>
        <Form id="search-by-name-form">
          <div id="login-input-fields">
            <FormGroup>
              <Label for="genericValue" className="unselectable">
                {this.props.title}
              </Label>
              <Field
                type="text"
                name="genericValue"
                id="genericValue"
                component="input"
                onChange={e => this._handleInput(e!.target.name, e!.target)}
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
  })(Generic)
);
