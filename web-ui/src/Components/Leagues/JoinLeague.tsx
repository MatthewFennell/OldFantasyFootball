import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { joinLeague } from '../../Services/League/LeagueService';
import '../../Style/League/League-join.css';

interface JoinLeagueState {
  codeToJoin: string;
  error: string;
}

interface JoinLeagueProps {
  addToLeagueCache: (leagueName: string, position: number) => void;
}

class JoinLeague extends React.Component<
  RoutedFormProps<RouteComponentProps> & JoinLeagueProps,
  JoinLeagueState
> {
  constructor(props: RoutedFormProps<RouteComponentProps> & JoinLeagueProps) {
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
    } as Pick<JoinLeagueState, keyof JoinLeagueState>); // Needs type conversion, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
  }

  _validate = () => {
    return false;
  };

  _onSubmit = (event: string) => {
    switch (event) {
      case 'btnJoinLeague':
        console.log('join league button pressed');
        const err = this._validate();
        if (!err) {
          joinLeague(this.state.codeToJoin)
            .then(response => {
              // TO:DO Add newly created league to props
              this.props.addToLeagueCache(response.leagueName, response.position);
            })
            .catch(error => {
              console.log(error);
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
