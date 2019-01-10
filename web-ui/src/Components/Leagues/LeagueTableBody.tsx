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
        <tr className="league" key={'header'}>
          <td className="league-name">{'League Name'}</td>
          <td className="position">{'Position'}</td>
        </tr>
        {this.props.leagues.map(datum => (
          <LeagueRow key={datum.leagueName} element={datum} />
        ))}
      </tbody>
    );
  }
}
export default LeagueTableBody;
