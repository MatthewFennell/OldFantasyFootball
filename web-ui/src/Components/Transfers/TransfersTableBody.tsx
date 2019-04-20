import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import TransfersRow from './TransfersRow';
import '../../Style/Transfers/TransfersFilter.css';

interface TransfersTableBodyProps {
  searchingByPercentage: boolean;
  filteredPlayers: PlayerDTO[];
  handleRowClick: (player: PlayerDTO) => void;
  setFilteredPlayers: (filteredTeam: PlayerDTO[]) => void;
  reverseFilteredPlayers: () => void;
}

// eslint-disable-next-line react/prefer-stateless-function
class TransfersTableBody extends React.Component<TransfersTableBodyProps> {
	// constructor (props: TransfersTableBodyProps) {
	// 	super(props);
	// }

	render () {
		const { filteredPlayers } = this.props;
		return (
			<div>
				<table>
					<thead>
						<tr
							className="transfers-header"
							key="header"
						>
							<td
								className="name"
							>
								{'Name'}
							</td>
							<td
								className="position"
							>
								{'Position'}
							</td>
							<td
								className="team"
							>
								{'Team'}
							</td>
							<td
								className="price"
							>
								{'Price'}
							</td>
							<td
								className="goals"
							>
								{'Goals'}
							</td>
							<td
								className="assists"
							>
								{'Assists'}
							</td>

							{this.props.searchingByPercentage ? <td
								className="percentage"
							                                    >
								{'Percentage'}{' '}
							</td> : <td
								className="score"
							        >
								{'Score'}{' '}
							</td>}
						</tr>
					</thead>
					<tbody>
						{filteredPlayers.map((datum, index) => (
							<TransfersRow
								element={datum}
								handleRowClick={this.props.handleRowClick}
								index={index}
								key={datum.firstName + datum.surname}
								searchingByPercentage={this.props.searchingByPercentage}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
export default TransfersTableBody;
