import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
// import * as LoginService from '../../Services/CredentialInputService';
import { joinLeague } from '../../Services/League/LeagueService';
import '../../Style/League/League-join.css';

interface State {
  codeToJoin: string;
  error: string;
}

class JoinLeague extends React.Component<RoutedFormProps<RouteComponentProps>, State> {
  constructor(props: RoutedFormProps<RouteComponentProps>) {
    super(props);
    this.state = {
      codeToJoin: '',
      error: ''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.setState({
      [eventName]: eventTarget.value
    } as Pick<State, keyof State>); // Needs type conversion, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
  }

  _validate = () => {
    // if (LoginService.emptyFields(this.state.leagueName, this.state.codeToJoin)) {
    //   this.setState({ error: 'All fields must be filled in' });
    //   return true;
    // } else if (
    //   LoginService.invalidUsername(this.state.leagueName) ||
    //   LoginService.invalidPasscode(this.state.codeToJoin) ||
    //   LoginService.passcodeTooShort(this.state.codeToJoin)
    // ) {
    //   this.setState({ error: 'leagueName or codeToJoin not recognised' });
    //   return true;
    // } else return false;
    return false;
  };

  _onSubmit = (event: string) => {
    switch (event) {
      case 'btnJoinLeague':
        console.log('join league button pressed');
        const err = this._validate();
        if (!err) {
          joinLeague(this.state.codeToJoin).then(response => {
            console.log('response = ' + JSON.stringify(response));
            // TO:DO Add newly created league to props
          });
        }
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div id="join-league-form" onSubmit={e => e.preventDefault()}>
        <Form id="join-league-form">
          <h1 id="greeting" className="text-center unselectable">
            Join a league!
          </h1>
          <div id="login-input-fields">
            <Label className="error-text">{this.state.error}</Label>
            <FormGroup>
              <Label for="codeToJoin" className="unselectable">
                Code to join league
              </Label>
              <Field
                type="text"
                name="codeToJoin"
                id="codeToJoin"
                component="input"
                onChange={e => this._handleInput(e!.target.name, e!.target)}
              />
            </FormGroup>
          </div>
          <Button
            id="btnJoinLeague"
            type="submit"
            className="btn btn-default btn-round-lg btn-lg first"
            onClick={(e: any) => this._onSubmit(e.target.id)}
          >
            Join League
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(
  reduxForm<{}, any>({
    form: 'login'
  })(JoinLeague)
);
