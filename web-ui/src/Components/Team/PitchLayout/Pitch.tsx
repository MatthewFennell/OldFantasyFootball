import * as React from 'react';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import Player from './Player';

interface PitchProps {
  activeWeeklyTeam: PlayerDTO[];
  transfer: boolean;

  addOrRemovePlayer: (id:string, price:number, player:PlayerDTO) => void;
  handleClickOnPlayer: (player:PlayerDTO) => void;
  removeFromActiveTeam: (id: string) => void;
}

class Pitch extends React.Component<PitchProps> {
	generatePlayers (players: PlayerDTO[], minimumNumberInRow: number) {
		let playersToRender: JSX.Element[] = [];
		players.map(value => {
			playersToRender.push(<div className="player">
				<Player
					addOrRemovePlayer={this.props.addOrRemovePlayer}
					emptyPlayer={false}
					handleClickOnPlayer={this.props.handleClickOnPlayer}
					player={value}
					removeFromActiveTeam={this.props.removeFromActiveTeam}
					transfer={this.props.transfer}
				/>
			</div>);
		});

		for (let x = 0; x < minimumNumberInRow - players.length; x++) {
			playersToRender.push(<div className="player">
				<Player
					addOrRemovePlayer={() => {}}
					emptyPlayer
					handleClickOnPlayer={() => {}}
					player={{} as any}
					removeFromActiveTeam={() => {}}
					transfer={this.props.transfer}
				/>
			</div>);
		}

		return playersToRender;
	}

	render () {
		const { activeWeeklyTeam } = this.props;
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

		let pitchAttackers = this.generatePlayers(attackers, 2);
		let pitchMidfielders = this.generatePlayers(midfielders, 4);
		let pitchDefenders = this.generatePlayers(defenders, 4);
		let pitchGoalkeepers = this.generatePlayers(goalKeeper, 1);

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
	}
};

export default Pitch;
