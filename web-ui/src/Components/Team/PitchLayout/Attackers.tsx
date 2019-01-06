import * as React from 'react';
import '../../../Style/Team/PitchLayout/Attackers.css';
import Player from './Player';

class Attackers extends React.Component<{}, {}> {
  render() {
    return (
      <div className="attackers-columns">
        <div className="first-attacker">
          <Player />
        </div>
        <div className="second-attacker">
          <Player />
        </div>
      </div>
    );
  }
}
export default Attackers;
