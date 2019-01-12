import * as React from 'react';
import '../../../Style/Team/PitchLayout/Player.css';

interface PlayerProps {
  firstName: String;
  surname: String;
  points: number;
  price: number;
  transfer: boolean;
}

class Player extends React.Component<PlayerProps, {}> {
  render() {
    const { firstName, surname, points, price } = this.props;

    return (
      <div className="player">
        <p className="name">
          {firstName} {surname}
        </p>
        {this.props.transfer ? (
          <p className="value">{'£' + price}</p>
        ) : (
          <p className="points">{points + ' pts'}</p>
        )}
      </div>
    );
  }
}
export default Player;
