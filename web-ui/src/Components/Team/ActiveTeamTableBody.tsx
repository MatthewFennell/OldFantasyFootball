import * as React from 'react';
import { WeeklyPlayer } from '../../Models/Interfaces/WeeklyPlayer';
import RowActiveTeam from './RowActiveTeam';

interface ActiveTeamProps {
  activeTeam: WeeklyPlayer[];
}

class ActiveTeamTableBody extends React.Component<ActiveTeamProps> {
  render() {
    return (
      <tbody className="my-active-team">
        {this.props.activeTeam.map((datum, index) => (
          <RowActiveTeam key={datum.id} element={datum} />
        ))}
      </tbody>
    );
  }
}
export default ActiveTeamTableBody;
