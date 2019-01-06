import * as React from 'react';
import '../../../Style/Team/PitchLayout/Defenders.css';
import Player from './Player';

class Defenders extends React.Component<{}, {}> {
  render() {
    return (
      <div className="defenders-columns">
        <div className="first-defender">
          <Player />
        </div>
        <div className="second-defender">
          <Player />
        </div>
        <div className="second-defender">
          <Player />
        </div>
        <div className="second-defender">
          <Player />
        </div>
      </div>
    );
  }
}
export default Defenders;
