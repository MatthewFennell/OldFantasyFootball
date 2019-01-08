import * as React from 'react';
import '../../../Style/Team/PitchLayout/Midfielders.css';
import Player from './Player';

class Midfielders extends React.Component<{}, {}> {
  render() {
    return (
      <div className="midfielders-columns">
        <div className="first-midfielder">
          <Player firstName="Sergio" surname="Aguero" points={213} />
        </div>
        <div className="second-midfielder">
          <Player firstName="Sergio" surname="Aguero" points={2453} />
        </div>
        <div className="second-midfielder">
          <Player firstName="Sergio" surname="Aguero" points={213} />
        </div>
        <div className="second-midfielder">
          <Player firstName="Sergio" surname="Aguero" points={232} />
        </div>
      </div>
    );
  }
}
export default Midfielders;
