import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
// import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
// import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
// import * as LoginService from '../../Services/CredentialInputService';
import '../../Style/Transfers/SearchByName.css';

interface State {
  searchByValue: string;
}

interface PositionDropdownProps {
  setSearchByName: (searchByName: string) => void;
}
class SearchByName extends React.Component<PositionDropdownProps, State> {
  constructor(props: PositionDropdownProps) {
    super(props);
    this.state = {
      searchByValue: ''
    };
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.props.setSearchByName(eventTarget.value);
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
              <Label for="searchByValue" className="unselectable">
                League name
              </Label>
              <Field
                type="text"
                name="searchByValue"
                id="searchByValue"
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
