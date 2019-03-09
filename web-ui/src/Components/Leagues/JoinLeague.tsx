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
	constructor (props: RoutedFormProps<RouteComponentProps> & JoinLeagueProps) {
		super(props);
		this.state = {
			codeToJoin: '',
			error: ''
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<JoinLeagueState, keyof JoinLeagueState>);
	}

  _validate = () => {
  	return false;
  };

  _onSubmit = (event: string) => {
	  const { codeToJoin } = this.state;
	  const { addToLeagueCache } = this.props;
  	switch (event) {
  	case 'btnJoinLeague':
  		console.log('join league button pressed');
  		const err = this._validate();
  		if (!err) {
  			joinLeague(codeToJoin)
  				.then(response => {
  					// TO:DO Add newly created league to props
  					addToLeagueCache(response.leagueName, response.position);
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

  render () {
	  const { error } = this.state;
  	return (
  		<div
  			className="join-league-form"
  			onSubmit={e => e.preventDefault()}
  		>
  			<Form id="join-league-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Join a league!
  				</h1>
  				<div id="login-input-fields">
  					<Label className="error-text">{error}</Label>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="codeToJoin"
  						>
                Code to join league
  						</Label>
  						<Field
  							component="input"
  							id="codeToJoin"
  							name="codeToJoin"
  							onChange={e => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  				</div>
  				<Button
  					className="btn btn-default btn-round-lg btn-lg first"
  					id="btnJoinLeague"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  					type="submit"
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
