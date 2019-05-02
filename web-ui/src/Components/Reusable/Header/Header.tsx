/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/sort-comp */
import * as React from 'react';
import { Row, Col, Button } from 'reactstrap';
import '../../../Style/Header.css';
import { Image } from 'react-bootstrap';
import { clearSessionStorage } from '../../../Services/CredentialInputService';
import ButtonPageSelector from './ButtonPageSelector';
import { RoutedFormProps } from '../../../Models/Types/RoutedFormProps';
import { getUser, getIsAdmin, getIsCaptain } from '../../../Services/User/UserService';
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

interface HeaderState{
	isAdmin: boolean;
	isCaptain: boolean;
}

class Header extends React.Component<RoutedFormProps<RouteComponentProps> & Props,
	HeaderState> {
  private transfersRef: React.RefObject<HTMLDivElement>;
  private leagueRef: React.RefObject<HTMLDivElement>;
  private settingsRef: React.RefObject<HTMLDivElement>;
  private teamRef: React.RefObject<HTMLDivElement>;
  private adminRef: React.RefObject<HTMLDivElement>;
  private statsRef: React.RefObject<HTMLDivElement>;
  private captainRef: React.RefObject<HTMLDivElement>;
  private _onTeamSelect: () => void;
  private _onSettingsSelect: () => void;
  private _onLeagueSelect: () => void;
  private _onTransfersSelect: () => void;
  private _onAdminSelect: () => void;
  private _onStatsRef: () => void;
  private _onCaptainSelect: () => void;

  constructor (props: RoutedFormProps<RouteComponentProps> & Props) {
  	super(props);
	  this.logout = this.logout.bind(this);
  	this.transfersRef = React.createRef<HTMLDivElement>();
  	this.leagueRef = React.createRef<HTMLDivElement>();
  	this.settingsRef = React.createRef<HTMLDivElement>();
  	this.teamRef = React.createRef<HTMLDivElement>();
  	this.adminRef = React.createRef<HTMLDivElement>();
	  this.statsRef = React.createRef<HTMLDivElement>();
	  this.captainRef = React.createRef<HTMLDivElement>();
	  this._isAdmin = this._isAdmin.bind(this);
	  this._isCaptain = this._isCaptain.bind(this);
  	this._onTeamSelect = () => this._select(this.teamRef, 'Team');
  	this._onSettingsSelect = () => this._select(this.settingsRef, 'Settings');
  	this._onLeagueSelect = () => this._select(this.leagueRef, 'Leagues');
  	this._onTransfersSelect = () => this._select(this.transfersRef, 'Transfers');
  	this._onAdminSelect = () => this._select(this.adminRef, 'Admin');
  	this._onStatsRef = () => this._select(this.statsRef, 'Stats');
  	this._onCaptainSelect = () => this._select(this.captainRef, 'Captain');
  	this.state = {
		  isAdmin: false,
		  isCaptain: true
	  };
	  this._isAdmin();
	  this._isCaptain();
  }

  _isAdmin (): void {
  	 getIsAdmin().then(response => {
  		this.setState({ isAdmin: response });
	  });
  }

  _isCaptain (): void {
  	getIsCaptain().then(response => {
	   this.setState({ isCaptain: response });
  	});
  }

  componentDidMount () {
	  this._isAdmin();
	  this._isCaptain();
  	getUser().then(response => {
  		if (response !== undefined) {
  			this.props.setAccount({
  				id: response.id,
  				firstName: response.firstName,
  				surname: response.surname,
  				username: response.username,
  				remainingBudget: response.remainingBudget,
				  teamName: response.teamName
			  });
			  this.props.setUserBeingViewed(response.id);
  		}
  	});
  }

  componentDidUpdate (prevProps:any) {
  	if (prevProps.firstname !== this.props.firstname) {
		  this._isAdmin();
		  this._isCaptain();
  	}
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
    this.statsRef.current!.classList.remove('selected');
    if (this.state.isAdmin) {
      this.adminRef.current!.classList.remove('selected');
    }
    if (this.state.isCaptain) {
		this.captainRef.current!.classList.remove('selected');
	  }
    target.current!.classList.add('selected');
    this.props.setPageBeingViewed(name);
    this.props.setUserBeingViewed(this.props.accountId);
  };

  render () {
  	return (
  		<div id="header">
  			<Row className="categories-user unselectable">
  				<Col lg="1">
  					<Image
  						alt="App Icon"
  						id="appIcon"
  						src="cwood_symbol.png"
  					/>
  				</Col>
  					<div className="fantasy-football-ccafc">
						  CCAFC Fantasy Football
					  </div>
  				<Col lg="8">
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
  								imgSrc="black-white-pitch.png"
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
						  <Link to="/stats">
  							<ButtonPageSelector
  								id="settings"
  								imgSrc="stats-icons.png"
  								select={this._onStatsRef}
  								selected={this.props.location.pathname === '/stats'}
  								setRef={() => this.statsRef}
  								text="Stats"
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
						  {this.state.isCaptain ? (
						  <Link to="/captain">
  							<ButtonPageSelector
  								id="captain"
  								imgSrc="Captain.png"
  								select={this._onCaptainSelect}
  								selected={this.props.location.pathname === '/captain'}
  								setRef={() => this.captainRef}
  								text="Captain"
  							/>
						  </Link>) : null}
  						{this.state.isAdmin ? (
  							<Link to="/admin">
  								<ButtonPageSelector
  									id="admin"
  									imgSrc="Admin.png"
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
