import * as React from 'react';
import '../../../Style/Team/PitchLayout/Player.css';

interface PlayerProps {
  firstName: String;
  surname: String;
  points: number;
}

class Player extends React.Component<PlayerProps, {}> {
  render() {
    const { firstName, surname, points } = this.props;

    return (
      <div className="player">
        <p className="name">
          {firstName} {surname}
        </p>
        <p className="points">{points}</p>
      </div>
    );
  }
}
export default Player;
