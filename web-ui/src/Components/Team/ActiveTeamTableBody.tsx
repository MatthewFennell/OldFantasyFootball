import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import RowActiveTeam from './RowActiveTeam';

interface ActiveTeamProps {
  activeTeam: PlayerDTO[];
}

const ActiveTeamTableBody: React.SFC<ActiveTeamProps> = (props) => {
	// eslint-disable-next-line react/prop-types
	const { activeTeam } = props;
	return (
		<tbody className="my-active-team">
			{activeTeam.map(datum => (
				<RowActiveTeam
					element={datum}
					key={datum.id}
				/>
			))}
		</tbody>
	);
};

ActiveTeamTableBody.defaultProps = {
	activeTeam: []
};

export default ActiveTeamTableBody;
