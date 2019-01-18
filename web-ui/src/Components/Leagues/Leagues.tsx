import * as React from 'react';
import '../../Style/League/League.css';
import {
  getLeaguesAndPositions,
  getPositionsOfUsersInLeague
} from '../../Services/League/LeagueService';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueTableBody from './LeagueTableBody';
import { Button, Container } from 'reactstrap';
import { Row, Col } from 'react-bootstrap';
import CreateLeague from '../../Containers/League/CreateLeague';
import JoinLeague from '../../Containers/League/JoinLeague';
import RankingsTableBody from './RankingsTableBody';
import { UserLeaguePosition } from '../..//Models/Interfaces/UserLeaguePosition';

interface LeagueProps {
  leagueCache: any;
  addToLeagueCache: (leagueName: string, position: number) => void;

  leaguePageBeingViewed: string;
  setLeaguePageBeingViewed: (leaguePageBeingViewed: string) => void;

  leagueRankings: UserLeaguePosition[];
  setLeagueRankings: (leagueRankings: UserLeaguePosition[]) => void;
}

class Leagues extends React.Component<LeagueProps, {}> {
  constructor(props: LeagueProps) {
    super(props);
    this._setLeagueBeingViewed = this._setLeagueBeingViewed.bind(this);
  }

  componentDidMount() {
    getLeaguesAndPositions().then(leagueAndPositionsArray => {
      for (let x = 0; x < leagueAndPositionsArray.length; x++) {
        if (this.props.leagueCache[leagueAndPositionsArray[x].leagueName] === undefined) {
          this.props.addToLeagueCache(
            leagueAndPositionsArray[x].leagueName,
            leagueAndPositionsArray[x].position
          );
        }
      }
    });
  }

  _setLeagueBeingViewed(leagueToView: string) {
    this.props.setLeaguePageBeingViewed(leagueToView);
    getPositionsOfUsersInLeague(leagueToView).then(leagueRankings => {
      this.props.setLeagueRankings(leagueRankings);
    });
  }

  _onClickCreateLeague() {
    console.log('clicked');
    this.props.setLeaguePageBeingViewed('create-league');
  }

  _onClickJoinLeague() {
    console.log('clicked');
    this.props.setLeaguePageBeingViewed('join-league');
  }

  render() {
    let setLeagueBeingViewed = this._setLeagueBeingViewed;

    // Gets all of the leagues
    let leagues: LeaguePositions[] = [];
    var keys = Object.keys(this.props.leagueCache);
    for (let x = 0; x < keys.length; x++) {
      let p: LeaguePositions = { leagueName: keys[x], position: this.props.leagueCache[keys[x]] };
      leagues.push(p);
    }

    const offSet = this.props.leaguePageBeingViewed === 'home' ? 1 : 0;
    const width = this.props.leaguePageBeingViewed === 'home' ? 10 : 6;

    const renderCreateLeague = () => (
      <Col xs={6} md={6} lg={6} className="league-info-screen">
        <CreateLeague />
      </Col>
    );

    const renderJoinLeague = () => (
      <Col xs={6} md={6} lg={6} className="league-info-screen">
        <JoinLeague />
      </Col>
    );

    const renderLeagueRankings = () => (
      <Col xs={6} md={6} lg={6} className="league-info-screen">
        <RankingsTableBody leagueRankings={this.props.leagueRankings} />
      </Col>
    );

    return (
      <Container>
        <Row>
          <Col
            xs={width}
            xsOffset={offSet}
            md={width}
            mdOffset={offSet}
            lg={width}
            lgOffset={offSet}
          >
            <div className="outer-league-rows">
              <div className="my-leagues">
                My Leagues
                <div className="league-table">
                  <LeagueTableBody leagues={leagues} setLeagueBeingViewed={setLeagueBeingViewed} />
                </div>
              </div>

              <div>
                <div className="flex-container-two">
                  <div className="create league">
                    <div className="create-league-button">
                      <Button
                        id="btnCreateLeague"
                        type="submit"
                        className="btn btn-default btn-round-lg btn-lg first"
                        onClick={(e: any) => this._onClickCreateLeague()}
                      >
                        Create league
                      </Button>
                    </div>
                  </div>
                  <div className="join-league">
                    <div className="join-league-button">
                      <Button
                        id="btnJoinLeague"
                        type="submit"
                        className="btn btn-default btn-round-lg btn-lg first"
                        onClick={(e: any) => this._onClickJoinLeague()}
                      >
                        Join league
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {this.props.leaguePageBeingViewed === 'create-league'
            ? renderCreateLeague()
            : this.props.leaguePageBeingViewed === 'join-league'
              ? renderJoinLeague()
              : this.props.leaguePageBeingViewed !== 'home'
                ? renderLeagueRankings()
                : null}
        </Row>
      </Container>
    );
  }
}
export default Leagues;
