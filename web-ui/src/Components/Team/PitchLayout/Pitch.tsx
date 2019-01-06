import * as React from 'react';
import '../../../Style/Team/PitchLayout/Pitch.css';
import Attackers from '../../../Containers/Team/PitchLayout/Attackers';
import Midfielders from '../../../Containers/Team/PitchLayout/Midfielders';
import Defenders from '../../../Containers/Team/PitchLayout/Defenders';
import Goalkeeper from '../../../Containers/Team/PitchLayout/Goalkeeper';

class Pitch extends React.Component<{}, {}> {
  render() {
    return (
      <div className="pitch-with-players">
        <div className="attackers">
          <Attackers />
        </div>
        <div className="midfielders">
          <Midfielders />
        </div>
        <div className="defenders">
          <Defenders />
        </div>
        <div className="goalkeeper">
          <Goalkeeper />
        </div>
      </div>
    );
  }
}
export default Pitch;
