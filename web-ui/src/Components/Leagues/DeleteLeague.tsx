/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { deleteLeague } from '../../Services/League/LeagueService';
import '../../Style/League/League-join.css';
import { Col } from 'react-bootstrap';
import ResponseMessage from '../common/ResponseMessage';

interface DeleteLeagueState {
  leagueToDelete: string;
  error: string;
  isError: boolean;
  responseMessage: string;
}

interface DeleteLeagueProps {
	setLeagues: (user: string, leagueName: string, position: number) => void;
    userBeingViewed: string;
    leagues: { user: { league: { leagueName: string; position: number } } }
    removeLeagues: (user: string, leagueName: string) => void;
}

class DeleteLeague extends React.Component<
	RoutedFormProps<RouteComponentProps> & DeleteLeagueProps,
	DeleteLeagueState
	> {
	constructor (props: RoutedFormProps<RouteComponentProps> & DeleteLeagueProps) {
		super(props);
		this.state = {
			leagueToDelete: '',
			error: '',
			isError: false,
			responseMessage: ''
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleInput (eventName: any, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<DeleteLeagueState, keyof DeleteLeagueState>);
	}

  _validate = () => {
  	return false;
  };

  _onSubmit = (event: string) => {
  	switch (event) {
  	case 'btnJoinLeague':
  		const err = this._validate();
  		if (!err) {
  			deleteLeague(this.state.leagueToDelete)
  				.then(response => {
  					// TO:DO -> Remove league
  					this.props.removeLeagues(this.props.userBeingViewed, this.state.leagueToDelete);
					  this.setState({ responseMessage: 'Deleted league successfully', isError: false });
  				})
  				.catch(error => {
					  this.setState({ responseMessage: error, isError: true });
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
  		<Col
  			className="league-info-screen"
  			lg={6}
  			md={6}
  			xs={6}
  		>
  		<div
  			className="join-league-form"
  			onSubmit={e => e.preventDefault()}
  		>
  			<Form id="join-league-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Delete a league! (Admin of league only)
  				</h1>
  				<div id="login-input-fields">
  					<Label className="error-text">{error}</Label>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="leagueToDelete"
  						>
                		Name of league to delete
  						</Label>
  						<Field
  							component="input"
  							id="leagueToDelete"
  							name="leagueToDelete"
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
            		Leave League
  				</Button>
				  <div className="join-league-response-wrapper">
				  <ResponseMessage
  						isError={this.state.isError}
  						responseMessage={this.state.responseMessage}
  						shouldDisplay={this.state.responseMessage.length > 0}
				  />
				  </div>
  			</Form>
  		</div>
		  </Col>
  	);
  }
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'login'
	})(DeleteLeague)
);
