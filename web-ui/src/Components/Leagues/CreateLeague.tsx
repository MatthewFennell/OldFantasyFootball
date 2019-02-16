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
    return false;
  };

  _onSubmit = (event: string) => {
    switch (event) {
      case 'btnCreateLeague':
        const err = this._validate();
        if (!err) {
          const data: CreateLeague = {
            leagueName: this.state.leagueName,
            startWeek: 0
          };
          createLeague(data)
            .then(response => {
              console.log(response);
              // TO:DO Add newly created league to props
              this.props.addToLeagueCache(this.state.leagueName, 1);
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
