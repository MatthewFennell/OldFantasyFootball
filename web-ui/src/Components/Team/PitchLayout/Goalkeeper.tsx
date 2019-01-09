import * as React from 'react';
import '../../../Style/Team/PitchLayout/Goalkeeper.css';
import Player from './Player';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface GoalkeeperProps {
  goalkeepers: WeeklyPlayer[];
}

class Goalkeeper extends React.Component<GoalkeeperProps, {}> {
  render() {
    let firstName: string, surname: string, points: number;

    if (this.props.goalkeepers.length > 0) {
      firstName = this.props.goalkeepers[0].firstName;
      surname = this.props.goalkeepers[0].surname;
      points = this.props.goalkeepers[0].points;
    } else {
      firstName = '';
      surname = '';
      points = 0;
    }

    return (
      <div className="goalkeeper-columns">
        <div className="goalkeeper">
          <Player firstName={firstName} surname={surname} points={points} />
        </div>
      </div>
    );
  }
}
export default Goalkeeper;
