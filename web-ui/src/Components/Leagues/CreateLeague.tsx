/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { CreateLeague } from '../../Models/Interfaces/CreateLeague';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { createLeague } from '../../Services/League/LeagueService';
import '../../Style/League/League-create.css';
import { Col } from 'react-bootstrap';
import ResponseMessage from '../common/ResponseMessage';

interface CreateLeagueState {
  leagueName: string;
  responseMessage: string;
  isError: boolean;
  startWeek: number;
}

interface CreateGroupProps {
  setLeagues: (user: string, leagueName: string, position: number) => void;
  userBeingViewed: string;
}

class CreateLeagueClass extends React.Component<
	RoutedFormProps<RouteComponentProps> & CreateGroupProps,
	CreateLeagueState
	> {
	constructor (props: RoutedFormProps<RouteComponentProps> & CreateGroupProps) {
		super(props);
		this.state = {
			leagueName: '',
			responseMessage: '',
			isError: false,
			startWeek: 0
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleInput (eventName: any, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<CreateLeagueState, keyof CreateLeagueState>);
	}

  _validate = () => {
  	return false;
  };

  _onSubmit = (event: string) => {
	  const { leagueName, startWeek } = this.state;
  	switch (event) {
  	case 'btnCreateLeague':
  		const err = this._validate();
  		if (!err) {
  			const data: CreateLeague = {
  				leagueName,
  				startWeek
  			};
  			createLeague(data)
  				.then(response => {
					  this.props.setLeagues(this.props.userBeingViewed, leagueName, 1);
					  this.setState({ responseMessage: 'Created league ' + leagueName + ' successfully with start week ' + startWeek +
					  '. The code to join is ' + response.id,
  					isError: false });
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
  	return (
  		<Col
  			className="league-info-screen"
  			lg={6}
  			md={6}
  			xs={6}
  		>
  		<div
  			className="create-league-form"
  			onSubmit={(e:any) => e.preventDefault()}
  		>
  			<Form id="create-league-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Create your league!
  				</h1>
  				<div id="login-input-fields">
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
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>

  							<Label
							  className="unselectable"
  							for="startWeek"
  							id="startWeekLabel"
  							>
                		Start Week
  						</Label>
  						<Field
  							component="input"
  							id="startWeek"
  							name="startWeek"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
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
				  <div className="create-league-response-wrapper">
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
	})(CreateLeagueClass)
);
