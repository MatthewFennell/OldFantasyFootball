import * as React from 'react';
import { FilteredPlayer } from '../../Models/Interfaces/FilteredPlayer';
import TransfersRow from '../../Containers/Transfers/TransfersRow';
import '../../Style/Transfers/TransfersFilter.css';

interface TransfersTableBodyProps {
  filteredPlayers: FilteredPlayer[];
}

class TransfersTableBody extends React.Component<TransfersTableBodyProps> {
  render() {
    return (
      <tbody className="my-active-transfers">
        <tr className="transfers-header" key={'header'}>
          <td className="name">{'Name'}</td>
          <td className="position">{'Position'}</td>
          <td className="team">{'Team'}</td>
          <td className="price">{'Price'}</td>
          <td className="goals">{'Total Goals'}</td>
          <td className="assists">{'Total Assists'}</td>
          <td className="score">{'Total Score'}</td>
        </tr>
        {this.props.filteredPlayers.map(datum => (
          <TransfersRow key={datum.firstName + datum.surname} element={datum} />
        ))}
      </tbody>
    );
  }
}
export default TransfersTableBody;
