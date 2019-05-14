import * as React from 'react';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import Player from './Player';
import { noop } from 'lodash';

interface PitchProps {
  activeWeeklyTeam: PlayerDTO[];
  transfer: boolean;
  noPoints: boolean;

  username: string;
  teamName: string;

  addOrRemovePlayer: (id:string, price:number, player:PlayerDTO) => void;
  handleClickOnPlayer: (player:PlayerDTO) => void;
  removeFromActiveTeam: (id: string) => void;
}

class Pitch extends React.Component<PitchProps> {
	static defaultProps = { username: '', teamName: '' };
	generatePlayers (players: PlayerDTO[], minimumNumberInRow: number) {
		let playersToRender: JSX.Element[] = [];
		players.map(value => {
			playersToRender.push(<div className="player">
				<Player
					addOrRemovePlayer={this.props.addOrRemovePlayer}
					emptyPlayer={false}
					handleClickOnPlayer={this.props.handleClickOnPlayer}
					noPoints={this.props.noPoints}
					player={value}
					removeFromActiveTeam={this.props.removeFromActiveTeam}
					transfer={this.props.transfer}
				/>
			</div>);
		});

		for (let x = 0; x < minimumNumberInRow - players.length; x++) {
			playersToRender.push(<div className="player">
				<Player
					addOrRemovePlayer={noop}
					emptyPlayer
					handleClickOnPlayer={noop}
					noPoints={this.props.noPoints}
					player={{} as any}
					removeFromActiveTeam={noop}
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

		let pitchAttackers = this.generatePlayers(attackers, 1);
		let pitchMidfielders = this.generatePlayers(midfielders, 3);
		let pitchDefenders = this.generatePlayers(defenders, 3);
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
				{ this.props.teamName && this.props.username
					? <div className="team-and-username-pitch">
						<div className="pitchUsername">
							{this.props.username}
						</div>
						<div className="pitchTeamName">
							{this.props.teamName}
						</div>
					</div> : null}
			</div>
		);
	}
};

export default Pitch;
