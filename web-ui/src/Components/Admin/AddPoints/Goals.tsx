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
  constructor(props: GoalsProps) {
    super(props);
    this.state = {
      goals: ''
    };
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.props.goals(eventTarget.value);
    this.setState({
      [eventName]: eventTarget.value
    } as Pick<GoalsState, keyof GoalsState>); // Needs type conversion, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
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
              <Label for="goals" className="unselectable">
                Number of goals
              </Label>
              <Field
                type="text"
                name="goals"
                id="goals"
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
  })(Goals)
);
