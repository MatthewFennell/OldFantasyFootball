import * as React from 'react';
import '../../../Style/Team/PitchLayout/Defenders.css';
import Player from './Player';

class Defenders extends React.Component<{}, {}> {
  render() {
    return (
      <div className="defenders-columns">
        <div className="first-defender">
        <Player firstName="Sergio" surname="Aguero" points={23} />
        </div>
        <div className="second-defender">
        <Player firstName="Sergio" surname="Aguero" points={23} />
        </div>
        <div className="second-defender">
        <Player firstName="Sergio" surname="Aguero" points={23} />
        </div>
        <div className="second-defender">
        <Player firstName="Sergio" surname="Aguero" points={23} />
        </div>
      </div>
    );
  }
}
export default Defenders;
