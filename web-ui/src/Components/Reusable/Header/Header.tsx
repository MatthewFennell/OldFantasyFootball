/* eslint-disable react/sort-comp */
import * as React from 'react';
import { Row, Col, Button } from 'reactstrap';
import '../../../Style/Header.css';
import { Image } from 'react-bootstrap';
import { clearSessionStorage } from '../../../Services/CredentialInputService';
import ButtonPageSelector from './ButtonPageSelector';
import { getUser } from '../../../Services/User/UserService';
import { Account } from '../../../Models/Interfaces/Account';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

interface Props {
	setUserBeingViewed: (user: string) => void;
  setPageBeingViewed: (page: string) => void;
  setAccount: (account: Account) => void;
  firstname: string;
  surname: string;
  roles: string[];
  accountId: string;
  logout: () => void;
}
class Header extends React.Component<Props & RouteComponentProps> {
  private transfersRef: React.RefObject<HTMLDivElement>;
  private leagueRef: React.RefObject<HTMLDivElement>;
  private settingsRef: React.RefObject<HTMLDivElement>;
  private teamRef: React.RefObject<HTMLDivElement>;
  private adminRef: React.RefObject<HTMLDivElement>;
  private _onTeamSelect: () => void;
  private _onSettingsSelect: () => void;
  private _onLeagueSelect: () => void;
  private _onTransfersSelect: () => void;
  private _onAdminSelect: () => void;

  constructor (props: Props & RouteComponentProps) {
  	super(props);
	  this.logout = this.logout.bind(this);
  	this.transfersRef = React.createRef<HTMLDivElement>();
  	this.leagueRef = React.createRef<HTMLDivElement>();
  	this.settingsRef = React.createRef<HTMLDivElement>();
  	this.teamRef = React.createRef<HTMLDivElement>();
  	this.adminRef = React.createRef<HTMLDivElement>();
  	this._onTeamSelect = () => this._select(this.teamRef, 'Team');
  	this._onSettingsSelect = () => this._select(this.settingsRef, 'Settings');
  	this._onLeagueSelect = () => this._select(this.leagueRef, 'Leagues');
  	this._onTransfersSelect = () => this._select(this.transfersRef, 'Transfers');
  	this._onAdminSelect = () => this._select(this.adminRef, 'Admin');
  }

  _isAdmin (): boolean {
  	for (let x = 0; x < this.props.roles.length; x++) {
  		if (this.props.roles[x] === 'ROLE_ADMIN') {
  			return true;
  		}
  	}
  	return false;
  }

  componentDidMount () {
  	getUser().then(response => {
  		if (response !== undefined) {
  			this.props.setAccount({
  				id: response.id,
  				firstName: response.firstName,
  				surname: response.surname,
  				email: response.email,
  				username: response.username,
  				remainingBudget: response.remainingBudget,
				  roles: response.roles,
				  teamName: response.teamName
			  });
			  this.props.setUserBeingViewed(response.id);
  		}
  	});
  }

  logout () {
	  clearSessionStorage();
	  this.props.logout();
  	this.props.history.push('/login');
  }

  _select = (target: React.RefObject<HTMLDivElement>, name: string) => {
    this.teamRef.current!.classList.remove('selected');
    this.transfersRef.current!.classList.remove('selected');
    this.leagueRef.current!.classList.remove('selected');
    this.settingsRef.current!.classList.remove('selected');
    if (this._isAdmin()) {
      this.adminRef.current!.classList.remove('selected');
    }
    target.current!.classList.add('selected');
    this.props.setPageBeingViewed(name);
    this.props.setUserBeingViewed(this.props.accountId);
  };

  render () {
  	//   const { firstname, surname } = this.props;
  	return (
  		<div id="header">
  			<Row className="categories-user unselectable">
  				<Col lg="2">
  					<Image
  						alt="App Icon"
  						id="appIcon"
  						src="appIcon.jpg"
  					/>
  				</Col>
  				<Col lg="11">
  					<div id="midOptions">
  						<Link to="/team">
  							<ButtonPageSelector
  								id="transactions"
  								imgSrc="Home.png"
  								select={this._onTeamSelect}
  								selected={this.props.location.pathname === '/team' || this.props.location.pathname === '/login'}
  								setRef={() => this.teamRef}
  								text="Team"
  							/>
  						</Link>
  						<Link to="/transfers">
  							<ButtonPageSelector
								  id="categories"
  								imgSrc="Matt.png"
  								select={this._onTransfersSelect}
  								selected={this.props.location.pathname === '/transfers'}
  								setRef={() => this.transfersRef}
  								text="Transfers"
  							/>
  						</Link>
  						<Link to="/leagues">
  							<ButtonPageSelector
  								id="settings"
  								imgSrc="stag.jpg"
  								select={this._onLeagueSelect}
  								selected={this.props.location.pathname === '/leagues'}
  								setRef={() => this.leagueRef}
  								text="Leagues"
  							/>
  						</Link>
  						<Link to="/settings">
  							<ButtonPageSelector
  								id="settings"
  								imgSrc="Settings.png"
  								select={this._onSettingsSelect}
  								selected={this.props.location.pathname === '/settings'}
  								setRef={() => this.settingsRef}
  								text="Settings"
  							/>
  						</Link>
  						{this._isAdmin() ? (
  							<Link to="/admin">
  								<ButtonPageSelector
  									id="settings"
  									imgSrc="Windy.png"
  									select={this._onAdminSelect}
  									selected={this.props.location.pathname === '/admin'}
  									setRef={() => this.adminRef}
  									text="Admin"
  								/>{' '}
  							</Link>
  						) : null}
  					</div>
  				</Col>
  				<Col
  					className="account-header"
  					lg="2"
  				>
				  <div className="logout">
						  {/* {firstname}{' '}{surname} */}
						  <Button
  								className=""
  								id="logout-button"
  								onClick={this.logout}
						  >
							Logout
  							</Button>
  					</div>
  				</Col>
  			</Row>
  		</div>
  	);
  }
}
export default withRouter(Header);
