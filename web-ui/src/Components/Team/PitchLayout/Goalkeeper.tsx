import * as React from 'react';
import '../../../Style/Team/PitchLayout/Goalkeeper.css';
import Player from './Player';

class Goalkeeper extends React.Component<{}, {}> {
  render() {
    return (
      <div className="goalkeeper-columns">
        <div className="goalkeeper">
          <Player />
        </div>
      </div>
    );
  }
}
export default Goalkeeper;
