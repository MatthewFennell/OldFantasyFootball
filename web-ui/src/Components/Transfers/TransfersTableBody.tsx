import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import TransfersRow from './TransfersRow';
import '../../Style/Transfers/TransfersFilter.css';
import Media from 'react-media';

interface TransfersTableBodyProps {
  searchingByPercentage: boolean;
  filteredPlayers: PlayerDTO[];
  handleRowClick: (player: PlayerDTO) => void;
  sortByColumnHeader: (columnHeader: string) => void;
}

// eslint-disable-next-line react/prefer-stateless-function
const TransfersTableBody: React.FC<TransfersTableBodyProps> = (props) => {
	const memoizedSortByFirstname = React.useCallback(
		() => props.sortByColumnHeader('firstName'), []);

	const memoizedSortByCollegeTeam = React.useCallback(
		() => props.sortByColumnHeader('collegeTeam'), []);

	const memoizedSortByPrice = React.useCallback(
		() => props.sortByColumnHeader('price'), []);

	const memoizedSortByGoals = React.useCallback(
		() => props.sortByColumnHeader('totalGoals'), []);

	const memoizedSortByAssists = React.useCallback(
		() => props.sortByColumnHeader('totalAssists'), []);

	const memoizedSortByPosition = React.useCallback(
		() => props.sortByColumnHeader('position'), []);

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
							onClick={memoizedSortByFirstname}
						>
							{'Name'}
						</td>
						<td
							className="position"
							onClick={memoizedSortByPosition}
						>
							{'Position'}
						</td>
						<td
							className="team"
							onClick={memoizedSortByCollegeTeam}
						>
							{'Team'}
						</td>
						<td
							className="price"
							onClick={memoizedSortByPrice}
						>
							{'Price'}
						</td>
						<td
							className="goals"
							onClick={memoizedSortByGoals}
						>
							{'Goals'}
						</td>

						<Media query="(max-width: 599px)">
							{matches =>
								matches ? (
									null
								) : (
									<td
										className="assists"
										onClick={memoizedSortByAssists}
									>
										{'Assists'}
									</td>
								)
							}
						</Media>

						{props.searchingByPercentage ? <td
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
					{props.filteredPlayers.map((datum, index) => (
						<TransfersRow
							element={datum}
							handleRowClick={props.handleRowClick}
							index={index}
							key={datum.id}
							searchingByPercentage={props.searchingByPercentage}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default TransfersTableBody;
