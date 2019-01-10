import * as React from 'react';
import { UserLeaguePosition } from '../../Models/Interfaces/UserLeaguePosition';
import RankingsRow from './RankingsRow';
import '../../Style/League/Rankings.css';

interface RankingsTableBodyProps {
  leagueRankings: UserLeaguePosition[];
}

class RankingsTableBody extends React.Component<RankingsTableBodyProps> {
  render() {
    return (
      <tbody className="league-rankings">
        <tr className="rankings" key={'header'}>
          <td className="user-name">{'Name'}</td>
          <td className="points">{'Points'}</td>
          <td className="position">{'Position'}</td>
        </tr>
        {this.props.leagueRankings.map(datum => (
          <RankingsRow key={datum.position} element={datum} />
        ))}
      </tbody>
    );
  }
}
export default RankingsTableBody;
