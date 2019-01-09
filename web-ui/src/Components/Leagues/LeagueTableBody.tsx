import * as React from 'react';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueRow from './LeagueRow';

interface LeagueTableBodyProps {
  leagues: LeaguePositions[];
}

class LeagueTableBody extends React.Component<LeagueTableBodyProps> {
  render() {
    return (
      <tbody className="my-active-leagues">
        {this.props.leagues.map(datum => (
          <LeagueRow key={datum.leagueName} element={datum} />
        ))}
      </tbody>
    );
  }
}
export default LeagueTableBody;
