import * as React from 'react';
import { Row, Col } from 'reactstrap';
import '../../../Style/Header.css';
import { Image } from 'react-bootstrap';
import ButtonPageSelector from './ButtonPageSelector';
import { getUser } from '../../../Services/User/UserService';
import { Account } from '../../../Models/Interfaces/Account';

interface Props {
  setPageBeingViewed: (page: string) => void;
  setAccount: (account: Account) => void;
  firstname: string;
  surname: string;
}
class Header extends React.Component<Props> {
  private transfersRef: React.RefObject<HTMLDivElement>;
  private leagueRef: React.RefObject<HTMLDivElement>;
  private settingsRef: React.RefObject<HTMLDivElement>;
  private teamRef: React.RefObject<HTMLDivElement>;
  private _onTeamSelect: () => void;
  private _onSettingsSelect: () => void;
  private _onLeagueSelect: () => void;
  private _onTransfersSelect: () => void;

  constructor(props: Props) {
    super(props);

    this.transfersRef = React.createRef<HTMLDivElement>();
    this.leagueRef = React.createRef<HTMLDivElement>();
    this.settingsRef = React.createRef<HTMLDivElement>();
    this.teamRef = React.createRef<HTMLDivElement>();
    this._onTeamSelect = () => this._select(this.teamRef, 'Team');
    this._onSettingsSelect = () => this._select(this.settingsRef, 'Settings');
    this._onLeagueSelect = () => this._select(this.leagueRef, 'Leagues');
    this._onTransfersSelect = () => this._select(this.transfersRef, 'Transfers');
  }

  componentDidMount() {
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
          remainingTransfers: response.remainingTransfers
        });
      }
    });
  }

  _select = (target: React.RefObject<HTMLDivElement>, name: string) => {
    this.teamRef.current!.classList.remove('selected');
    this.transfersRef.current!.classList.remove('selected');
    this.leagueRef.current!.classList.remove('selected');
    this.settingsRef.current!.classList.remove('selected');
    target.current!.classList.add('selected');
    this.props.setPageBeingViewed(name);
  };

  render() {
    return (
      <div id="header">
        <Row className="categories-user unselectable">
          <Col lg="2">
            <Image id="appIcon" src="appIcon.jpg" alt="App Icon" />
          </Col>
          <Col lg="9">
            <div id="midOptions">
              <ButtonPageSelector
                id="transactions"
                setRef={() => this.teamRef}
                selected={true}
                select={() => this._onTeamSelect()}
                imgSrc="Home.png"
                text="Team"
              />
              <ButtonPageSelector
                id="categories"
                setRef={() => this.transfersRef}
                selected={false}
                select={() => this._onTransfersSelect()}
                imgSrc="Max.png"
                text="Transfers"
              />
              <ButtonPageSelector
                id="settings"
                setRef={() => this.leagueRef}
                selected={false}
                select={() => this._onLeagueSelect()}
                imgSrc="Rupert.png"
                text="Leagues"
              />
              <ButtonPageSelector
                id="settings"
                setRef={() => this.settingsRef}
                selected={false}
                select={() => this._onSettingsSelect()}
                imgSrc="Windy.png"
                text="Settings"
              />
            </div>
          </Col>
          <Col lg="2">
            <div id="account">
              <div id="avatar" />
              <h5 id="name">{'Firstname' + ' ' + 'Surname'}</h5>
              <i className="fa fa-caret-down cursor-pointer" aria-hidden="true" />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Header;
