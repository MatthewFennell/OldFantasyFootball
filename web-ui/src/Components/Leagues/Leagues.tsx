import * as React from 'react';
import '../../Style/League/League.css';
import { getLeaguesAndPositions } from '../../Services/UserService';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueTableBody from './LeagueTableBody';

interface LeagueProps {
  leagueCache: any;
  addToLeagueCache: (leagueName: string, position: number) => void;
}

class Leagues extends React.Component<LeagueProps, {}> {
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

  render() {
    // Gets all of the leagues
    let leagues: LeaguePositions[] = [];
    var keys = Object.keys(this.props.leagueCache);
    for (let x = 0; x < keys.length; x++) {
      let p: LeaguePositions = { leagueName: keys[x], position: this.props.leagueCache[keys[x]] };
      leagues.push(p);
    }

    return (
      <div className="flex-container">
        <div className="my-leagues">
          My Leagues
          <div>
            <LeagueTableBody leagues={leagues} />
          </div>
        </div>

        <div>
          <div className="flex-container-two">
            <div className="create league">1</div>
            <div className="join-league">2</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Leagues;
