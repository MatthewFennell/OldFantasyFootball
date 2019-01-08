import * as React from 'react';
import '../../../Style/Team/PitchLayout/Attackers.css';
import Player from './Player';

class Attackers extends React.Component<{}, {}> {
  render() {
    return (
      <div className="attackers-columns">
        <div className="first-attacker">
          <Player firstName="Sergio" surname="Aguero" points={23} />
        </div>
        <div className="second-attacker">
          <Player firstName="Sergio" surname="Aguero" points={23} />
        </div>
      </div>
    );
  }
}
export default Attackers;
