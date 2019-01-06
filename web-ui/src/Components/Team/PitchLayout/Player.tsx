import * as React from 'react';
import '../../../Style/Team/PitchLayout/Player.css';

class Player extends React.Component<{}, {}> {
  render() {
    return (
      <div className="player">
        <p className="name">Sergio Aguero</p>
        <p className="price">25</p>
      </div>
    );
  }
}
export default Player;
