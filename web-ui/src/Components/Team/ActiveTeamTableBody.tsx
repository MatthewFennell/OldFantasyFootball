import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import RowActiveTeam from './RowActiveTeam';

interface ActiveTeamProps {
  activeTeam: PlayerDTO[];
}

class ActiveTeamTableBody extends React.Component<ActiveTeamProps> {
  render() {
    return (
      <tbody className="my-active-team">
        {this.props.activeTeam.map(datum => (
          <RowActiveTeam key={datum.id} element={datum} />
        ))}
      </tbody>
    );
  }
}
export default ActiveTeamTableBody;
