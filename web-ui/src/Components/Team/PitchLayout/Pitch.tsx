import * as React from 'react';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import Player from './Player';

interface PitchProps {
  activeWeeklyTeam: PlayerDTO[];
  addOrRemovePlayer: (id:string, price:number, player:PlayerDTO) => void;
  transfer: boolean;
  removeFromActiveTeam: (id: string) => void;
}

const Pitch: React.SFC<PitchProps> = (props) => {
	// eslint-disable-next-line react/prop-types
	const { activeWeeklyTeam, transfer } = props;
	let goalKeeper: PlayerDTO[] = [];
	let defenders: PlayerDTO[] = [];
	let midfielders: PlayerDTO[] = [];
	let attackers: PlayerDTO[] = [];

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

	let pitchAttackers: JSX.Element[] = [];
	attackers.map(value => {
		pitchAttackers.push(<div className="player">
			<Player
				addOrRemovePlayer={props.addOrRemovePlayer}
				emptyPlayer={false}
				player={value}
				removeFromActiveTeam={props.removeFromActiveTeam}
				transfer={transfer}
			/>
		</div>);
	});

	let pitchMidfielders: JSX.Element[] = [];
	midfielders.map(value => {
		pitchMidfielders.push(<div className="player">
			<Player
				addOrRemovePlayer={props.addOrRemovePlayer}
				emptyPlayer={false}
				player={value}
				removeFromActiveTeam={props.removeFromActiveTeam}
				transfer={transfer}
			/>
		</div>);
	});

	let pitchDefenders: JSX.Element[] = [];
	defenders.map(value => {
		pitchDefenders.push(<div className="player">
			<Player
				addOrRemovePlayer={props.addOrRemovePlayer}
				emptyPlayer={false}
				player={value}
				removeFromActiveTeam={props.removeFromActiveTeam}
				transfer={transfer}
			/>
		</div>);
	});

	let pitchGoalkeepers: JSX.Element[] = [];
	goalKeeper.map(value => {
		pitchGoalkeepers.push(<div className="player">
			<Player
				addOrRemovePlayer={props.addOrRemovePlayer}
				emptyPlayer={false}
				player={value}
				removeFromActiveTeam={props.removeFromActiveTeam}
				transfer={transfer}
			/>
		</div>);
	});
	return (
		<div className="pitch-with-players">
			<div className="attackers">
				<div className="player-columns">
					{pitchAttackers}
				</div>
			</div>
			<div className="midfielders">
				<div className="player-columns">
					{pitchMidfielders}
				</div>
			</div>
			<div className="defenders">
				<div className="player-columns">
					{pitchDefenders}
				</div>
			</div>
			<div className="goalkeeper">
				<div className="player-columns">
					{pitchGoalkeepers}
				</div>
			</div>
		</div>
	);
};

export default Pitch;
