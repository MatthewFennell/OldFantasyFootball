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

  removePlayer: (id:string, price:number, player:PlayerDTO) => void;
  handleClickOnPlayer: (player:PlayerDTO) => void;
  removeFromActiveTeam: (id: string) => void;
}

class Pitch extends React.Component<PitchProps> {
	static defaultProps = { teamName: '', username: '' };

	numberOfSpareSpots (): number {
		return this.props.activeWeeklyTeam.filter(x => x.firstName === 'REMOVED').length;
	}

	generatePlayers (players: PlayerDTO[], maximumNumberInRow: number, position: string, numberOfEmpty: number, emptyGoalkeepers: number) {
		let playersToRender: JSX.Element[] = [];
		players.map(value => {
			if (value.firstName !== 'REMOVED') {
				playersToRender.push(<div
					className="player"
					key={value.id}
				                     >
					<Player
						emptyPlayer={false}
						handleClickOnPlayer={this.props.handleClickOnPlayer}
						key={value.id}
						noPoints={this.props.noPoints}
						player={value}
						removeFromActiveTeam={this.props.removeFromActiveTeam}
						removePlayer={this.props.removePlayer}
						transfer={this.props.transfer}
					/>
				</div>);
			} else {
				playersToRender.push(
					<div
						className="player"
						key={value.id}
					>
						<Player
							emptyPlayer
							handleClickOnPlayer={noop}
							noPoints={this.props.noPoints}
							player={{} as any}
							removeFromActiveTeam={noop}
							removePlayer={noop}
							transfer={this.props.transfer}
						/>
					</div>);
			}
		});

		console.log('Position = ' + position);
		console.log('Number removed = ' + this.numberOfSpareSpots());
		console.log('Row max = ' + maximumNumberInRow);
		console.log('Number of players in row = ' + players.filter(x => x.position === position && x.firstName !== 'REMOVED').length);
		console.log('Number removed in row = ' + numberOfEmpty);
		console.log('Number of extra players to render = ' + (Math.min(maximumNumberInRow - players.length, this.numberOfSpareSpots()) - numberOfEmpty));
		console.log('empty goalkeepers = ' + emptyGoalkeepers);
		console.log('');

		for (let x = 0; x < Math.min(Math.min(maximumNumberInRow - players.filter(x => x.position === position && x.firstName !== 'REMOVED').length, this.numberOfSpareSpots()) - numberOfEmpty, this.numberOfSpareSpots() - emptyGoalkeepers); x++) {
			playersToRender.push(
				<div
					className="player"
					key={position + x}
				>
					<Player
						emptyPlayer
						handleClickOnPlayer={noop}
						key={position + x}
						noPoints={this.props.noPoints}
						player={{} as any}
						removeFromActiveTeam={noop}
						removePlayer={noop}
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

		let numberOfEmptyGoalkeepers: number = 0;
		let numberOfEmptyDefenders: number = 0;
		let numberOfEmptyMidfielders: number = 0;
		let numberOfEmptyAttackers: number = 0;

		if (activeWeeklyTeam !== undefined) {
			activeWeeklyTeam.forEach(element => {
				if (element.position === 'GOALKEEPER') {
					goalKeeper.push(element);
					if (element.firstName === 'REMOVED') {
						numberOfEmptyGoalkeepers += 1;
					}
				} else if (element.position === 'DEFENDER') {
					defenders.push(element);
					if (element.firstName === 'REMOVED') {
						numberOfEmptyDefenders += 1;
					}
				} else if (element.position === 'MIDFIELDER') {
					midfielders.push(element);
					if (element.firstName === 'REMOVED') {
						numberOfEmptyMidfielders += 1;
					}
				} else if (element.position === 'ATTACKER') {
					attackers.push(element);
					if (element.firstName === 'REMOVED') {
						numberOfEmptyAttackers += 1;
					}
				}
			});
		}

		let pitchAttackers = this.generatePlayers(attackers, 3, 'ATTACKER', numberOfEmptyAttackers, numberOfEmptyGoalkeepers);
		let pitchMidfielders = this.generatePlayers(midfielders, 5, 'MIDFIELDER', numberOfEmptyMidfielders, numberOfEmptyGoalkeepers);
		let pitchDefenders = this.generatePlayers(defenders, 5, 'DEFENDER', numberOfEmptyDefenders, numberOfEmptyGoalkeepers);
		let pitchGoalkeepers = this.generatePlayers(goalKeeper, 1, 'GOALKEEPER', numberOfEmptyGoalkeepers, numberOfEmptyGoalkeepers);

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
