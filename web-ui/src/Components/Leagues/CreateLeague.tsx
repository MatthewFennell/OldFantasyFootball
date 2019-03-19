import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { CreateLeague } from '../../Models/Interfaces/CreateLeague';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { createLeague } from '../../Services/League/LeagueService';
import '../../Style/League/League-create.css';
import { Col } from 'react-bootstrap';

interface CreateLeagueState {
  leagueName: string;
  error: string;
  leagueCode: string;
}

interface CreateGroupProps {
  addToLeagueCache: (leagueName: string, position: number) => void;
}

class CreateLeagueClass extends React.Component<
	RoutedFormProps<RouteComponentProps> & CreateGroupProps,
	CreateLeagueState
	> {
	constructor (props: RoutedFormProps<RouteComponentProps> & CreateGroupProps) {
		super(props);
		this.state = {
			leagueName: '',
			error: '',
			leagueCode: ''
		};
		this._onSubmit = this._onSubmit.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<CreateLeagueState, keyof CreateLeagueState>);
	}

  _validate = () => {
  	return false;
  };

  _onSubmit = (event: string) => {
	  const { leagueName } = this.state;
	  const { addToLeagueCache } = this.props;
  	switch (event) {
  	case 'btnCreateLeague':
  		const err = this._validate();
  		if (!err) {
  			const data: CreateLeague = {
  				leagueName: leagueName,
  				startWeek: 0
  			};
  			createLeague(data)
  				.then(response => {
  					this.setState({ leagueCode: response.id });
  					addToLeagueCache(leagueName, 1);
  					console.log('Just made a league with name ' + leagueName);
  				})
  				.catch(error => {
  					this.setState({ error });
  					setTimeout(this._removeErrorMessage, 10000);
  					console.log(error);
  				});
  		}
  		break;
  	default:
  		break;
  	}
  };

  _removeErrorMessage () {
  	this.setState({ error: '' });
  }

  render () {
	  const { error, leagueCode, leagueName } = this.state;
  	return (
  		<Col
  			className="league-info-screen"
  			lg={6}
  			md={6}
  			xs={6}
  		>
  		<div
  			className="create-league-form"
  			onSubmit={e => e.preventDefault()}
  		>
  			<Form id="create-league-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Create your league!
  				</h1>
  				<div id="login-input-fields">
  					<Label className="error-text">{error}</Label>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="leagueName"
  						>
                		League name
  						</Label>
  						<Field
  							component="input"
  							id="leagueName"
  							name="leagueName"
  							onChange={e => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  				</div>
  				<Button
  					className="btn btn-default btn-round-lg btn-lg first"
  					id="btnCreateLeague"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  					type="submit"
  				>
            Create League
  				</Button>

				  {leagueCode.length > 0 ? (
  				<div className="league-code-join-message">
  							<p>League created : {leagueName}.</p> <p>The code to join is {leagueCode}</p>
  				</div>
  			) : null}
  			{error.length > 0 ? (
  				<div className="error-message-animation">Error : {error} </div>
  			) : null}
  			</Form>

  		</div>
		  </Col>
  	);
  }
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'login'
	})(CreateLeagueClass)
);
