import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface FirstNameState {
  firstName: string;
}

interface FirstNameProps {
  firstName: (searchByName: string) => void;
}
class SearchByName extends React.Component<FirstNameProps, FirstNameState> {
  constructor(props: FirstNameProps) {
    super(props);
    this.state = {
      firstName: ''
    };
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.props.firstName(eventTarget.value);
    this.setState({
      [eventName]: eventTarget.value
    } as Pick<FirstNameState, keyof FirstNameState>);
  }

  render() {
    return (
      <div id="search-by-name-form" onSubmit={e => e.preventDefault()}>
        <Form id="search-by-name-form">
          <div id="login-input-fields">
            <FormGroup>
              <Label for="firstName" className="unselectable">
                First name
              </Label>
              <Field
                type="text"
                name="firstName"
                id="firstName"
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
  })(SearchByName)
);
