import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { CreateLeague } from '../../Models/Interfaces/CreateLeague';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { createLeague } from '../../Services/League/LeagueService';
import '../../Style/League/League-create.css';

interface CreateGroupState {
  leagueName: string;
  codeToJoin: string;
  error: string;
}

interface CreateGroupProps {
  addToLeagueCache: (leagueName: string, position: number) => void;
}

class CreateGroup extends React.Component<
  RoutedFormProps<RouteComponentProps> & CreateGroupProps,
  CreateGroupState
> {
  constructor(props: RoutedFormProps<RouteComponentProps> & CreateGroupProps) {
    super(props);
    this.state = {
      leagueName: '',
      codeToJoin: '',
      error: ''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.setState({
      [eventName]: eventTarget.value
    } as Pick<CreateGroupState, keyof CreateGroupState>); // Needs type conversion, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
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
      case 'btnCreateLeague':
        console.log('button pressed');
        const err = this._validate();
        if (!err) {
          const data: CreateLeague = {
            leagueName: this.state.leagueName,
            codeToJoin: this.state.codeToJoin,
            startWeek: 0
          };
          createLeague(data).then(response => {
            console.log('response = ' + JSON.stringify(response));
            // TO:DO Add newly created league to props
            this.props.addToLeagueCache(this.state.leagueName, 1);
          });
        }
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div id="create-league-form" onSubmit={e => e.preventDefault()}>
        <Form id="create-league-form">
          <h1 id="greeting" className="text-center unselectable">
            Create your league!
          </h1>
          <div id="login-input-fields">
            <Label className="error-text">{this.state.error}</Label>
            <FormGroup>
              <Label for="leagueName" className="unselectable">
                League name
              </Label>
              <Field
                type="text"
                name="leagueName"
                id="leagueName"
                component="input"
                onChange={e => this._handleInput(e!.target.name, e!.target)}
              />
            </FormGroup>
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
            id="btnCreateLeague"
            type="submit"
            className="btn btn-default btn-round-lg btn-lg first"
            onClick={(e: any) => this._onSubmit(e.target.id)}
          >
            Create League
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(
  reduxForm<{}, any>({
    form: 'login'
  })(CreateGroup)
);
