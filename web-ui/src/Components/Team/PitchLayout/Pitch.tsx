import * as React from 'react';
// import '../../../Style/Team/PitchLayout/Pitch.css';
import Attackers from '../../../Containers/Team/PitchLayout/Attackers';
import Midfielders from '../../../Containers/Team/PitchLayout/Midfielders';
import Defenders from '../../../Containers/Team/PitchLayout/Defenders';
import Goalkeeper from '../../../Containers/Team/PitchLayout/Goalkeeper';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface PitchProps {
  activeWeeklyTeam: WeeklyPlayer[];
  transfer: boolean;
}

class Pitch extends React.Component<PitchProps, {}> {
  render() {
    let goalKeeper: WeeklyPlayer[] = [];
    let defenders: WeeklyPlayer[] = [];
    let midfielders: WeeklyPlayer[] = [];
    let attackers: WeeklyPlayer[] = [];

    if (this.props.activeWeeklyTeam !== undefined) {
      this.props.activeWeeklyTeam.forEach(element => {
        if (element.position === 'GOALKEEPER') {
          goalKeeper.push(element);
        } else if (element.position === 'DEFENDER') {
          defenders.push(element);
        } else if (element.position === 'MIDFIELDER') {
          midfielders.push(element);
        } else if (element.position === 'ATTACKER') {
          attackers.push(element);
        }
      });
    }

    return (
      <div className="pitch-with-players">
        <div className="attackers">
          <Attackers attackers={attackers} transfer={this.props.transfer} />
        </div>
        <div className="midfielders">
          <Midfielders midfielders={midfielders} transfer={this.props.transfer} />
        </div>
        <div className="defenders">
          <Defenders defenders={defenders} transfer={this.props.transfer} />
        </div>
        <div className="goalkeeper">
          <Goalkeeper goalkeepers={goalKeeper} transfer={this.props.transfer} />
        </div>
      </div>
    );
  }
}
export default Pitch;
