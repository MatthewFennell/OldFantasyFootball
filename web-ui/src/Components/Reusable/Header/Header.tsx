import * as React from 'react';
import { Row, Col } from 'reactstrap';
import '../../../Style/Header.css';
import { Image } from 'react-bootstrap';
import ButtonPageSelector from './ButtonPageSelector';
import { getUser } from '../../../Services/User/UserService';
import { Account } from '../../../Models/Interfaces/Account';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

interface Props {
  setPageBeingViewed: (page: string) => void;
  setAccount: (account: Account) => void;
  firstname: string;
  surname: string;
  roles: string[];
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
  				totalPoints: response.totalPoints,
  				remainingBudget: response.remainingBudget,
  				remainingTransfers: response.remainingTransfers,
  				roles: response.roles
  			});
  		}
  	});
  }

  _select = (target: React.RefObject<HTMLDivElement>, name: string) => {
  	console.log('DAFUQ');
    this.teamRef.current!.classList.remove('selected');
    this.transfersRef.current!.classList.remove('selected');
    this.leagueRef.current!.classList.remove('selected');
    this.settingsRef.current!.classList.remove('selected');
    if (this._isAdmin()) {
      this.adminRef.current!.classList.remove('selected');
    }
    target.current!.classList.add('selected');
    this.props.setPageBeingViewed(name);
  };

  render () {
  	const { firstname, surname } = this.props;
  	return (
  		<div id="header">
  			<Row className="categories-user unselectable">
  				<Col lg="2">
  					<Image id="appIcon" src="appIcon.jpg" alt="App Icon" />
  				</Col>
  				<Col lg="9">
  					<div id="midOptions">
  						<Link to="/team">
  							<ButtonPageSelector
  								id="transactions"
  								setRef={ () => this.teamRef }
  								selected={ this.props.location.pathname === '/team' }
  								select={ () => this._onTeamSelect() }
  								imgSrc="Home.png"
  								text="Team"
  							/>
  						</Link>
  						<Link to="/transfers">
  							<ButtonPageSelector
  								id="categories"
  								setRef={ () => this.transfersRef }
  								selected={ this.props.location.pathname === '/transfers' }
  								select={ () => this._onTransfersSelect() }
  								imgSrc="Max.png"
  								text="Transfers"
  							/>
  						</Link>
  						<Link to="/leagues">
  							<ButtonPageSelector
  								id="settings"
  								setRef={ () => this.leagueRef }
  								selected={ this.props.location.pathname === '/leagues' }
  								select={ () => this._onLeagueSelect() }
  								imgSrc="Rupert.png"
  								text="Leagues"
  							/>
  						</Link>
  						<Link to="/settings">
  							<ButtonPageSelector
  								id="settings"
  								setRef={ () => this.settingsRef }
  								selected={ this.props.location.pathname === '/settings' }
  								select={ () => this._onSettingsSelect() }
  								imgSrc="Windy.png"
  								text="Settings"
  							/>
  						</Link>
  						{this._isAdmin() ? (
  							<Link to="/admin">
  								<ButtonPageSelector
  									id="settings"
  									setRef={ () => this.adminRef }
  									selected={ this.props.location.pathname === '/admin' }
  									select={ () => this._onAdminSelect() }
  									imgSrc="Windy.png"
  									text="Admin"
  								/>{' '}
  							</Link>
  						) : null}
  					</div>
  				</Col>
  				<Col lg="2">
  					<div id="account">
  						<div id="avatar" />
  						<h5 id="name">{firstname + ' ' + surname}</h5>
  						<i className="fa fa-caret-down cursor-pointer" aria-hidden="true" />
  					</div>
  				</Col>
  			</Row>
  		</div>
  	);
  }
}
export default withRouter(Header);
