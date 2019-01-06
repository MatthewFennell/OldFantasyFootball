import * as React from 'react';
import '../../../Style/Team/PitchLayout/Midfielders.css';
import Player from './Player';

class Midfielders extends React.Component<{}, {}> {
  render() {
    return (
      <div className="midfielders-columns">
        <div className="first-midfielder">
          <Player />
        </div>
        <div className="second-midfielder">
          <Player />
        </div>
        <div className="second-midfielder">
          <Player />
        </div>
        <div className="second-midfielder">
          <Player />
        </div>
      </div>
    );
  }
}
export default Midfielders;
