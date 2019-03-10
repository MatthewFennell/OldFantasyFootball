import * as React from 'react';
// import '../../../Style/Team/PitchLayout/Pitch.css';
import Attackers from '../../../Containers/Team/PitchLayout/Attackers';
import Midfielders from '../../../Containers/Team/PitchLayout/Midfielders';
import Defenders from '../../../Containers/Team/PitchLayout/Defenders';
import Goalkeeper from '../../../Containers/Team/PitchLayout/Goalkeeper';
import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface PitchProps {
  activeWeeklyTeam: PlayerDTO[];
  transfer: boolean;
}

class Pitch extends React.Component<PitchProps, {}> {
	render () {
		let goalKeeper: PlayerDTO[] = [];
		let defenders: PlayerDTO[] = [];
		let midfielders: PlayerDTO[] = [];
		let attackers: PlayerDTO[] = [];

		const { activeWeeklyTeam, transfer } = this.props;

		if (activeWeeklyTeam !== undefined) {
			activeWeeklyTeam.forEach(element => {
				if (element.position === 'GOALKEEPER') {
					goalKeeper.push(element);
				} else if (element.position === 'DEFENDER') {
					defenders.push(element);
				} else if (element.position === 'MIDFIELDER') {
					midfielders.push(element);
				} else if (element.position === 'ATTACKER') {
					attackers.push(element);
				}
			});
		}

		return (
			<div className="pitch-with-players">
				<div className="attackers">
					<Attackers
						attackers={attackers}
						transfer={transfer}
					/>
				</div>
				<div className="midfielders">
					<Midfielders
						midfielders={midfielders}
						transfer={transfer}
					/>
				</div>
				<div className="defenders">
					<Defenders
						defenders={defenders}
						transfer={transfer}
					/>
				</div>
				<div className="goalkeeper">
					<Goalkeeper
						goalkeepers={goalKeeper}
						transfer={transfer}
					/>
				</div>
			</div>
		);
	}
}
export default Pitch;
