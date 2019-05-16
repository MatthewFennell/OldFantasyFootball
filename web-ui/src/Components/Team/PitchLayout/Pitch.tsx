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
	static defaultProps = { teamName: '', username: '' };

	containsEmptyPlayers (): boolean {
		const emptyPlayers = this.props.activeWeeklyTeam.find(x => x.firstName === 'empty');
		return emptyPlayers !== undefined;
	}

	numberOfSpareSpots (): number {
		let numberOfEmptyPlayers = 0;
		for (let x = 0; x < this.props.activeWeeklyTeam.length; x++) {
			if (this.props.activeWeeklyTeam[x].firstName === 'empty') {
				numberOfEmptyPlayers += 1;
			}
		}
		return numberOfEmptyPlayers;
	}

	// Find number of removed in position
	// Find number of existing in position
	// Find how many players short in total
	// Extra = max in row - number in position - number removed in position

	generatePlayers (players: PlayerDTO[], maximumNumberInRow: number, position: string, numberOfEmpty: number) {
		let playersToRender: JSX.Element[] = [];
		players.map(value => {
			if (value.firstName !== 'empty') {
				playersToRender.push(<div
					className="player"
					key={value.id}
				                     >
					<Player
						addOrRemovePlayer={this.props.addOrRemovePlayer}
						emptyPlayer={false}
						handleClickOnPlayer={this.props.handleClickOnPlayer}
						key={value.id}
						noPoints={this.props.noPoints}
						player={value}
						removeFromActiveTeam={this.props.removeFromActiveTeam}
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
		});
		if (this.containsEmptyPlayers()) {
			for (let x = 0; x < Math.min(maximumNumberInRow - players.length, this.numberOfSpareSpots() - numberOfEmpty); x++) {
				playersToRender.push(
					<div
						className="player"
						key={position + x}
					>
						<Player
							addOrRemovePlayer={noop}
							emptyPlayer
							handleClickOnPlayer={noop}
							key={position + x}
							noPoints={this.props.noPoints}
							player={{} as any}
							removeFromActiveTeam={noop}
							transfer={this.props.transfer}
						/>
					</div>);
			}
		}

		return playersToRender;
	}

	render () {
		const { activeWeeklyTeam } = this.props;
		let goalKeeper: PlayerDTO[] = [];
		let defenders: PlayerDTO[] = [];
		let midfielders: PlayerDTO[] = [];
		let attackers: PlayerDTO[] = [];

		let numberOfEmptyDefenders = 0;
		let numberOfEmptyMidfielders = 0;
		let numberOfEmptyAttackers = 0;

		if (activeWeeklyTeam !== undefined) {
			activeWeeklyTeam.forEach(element => {
				if (element.position === 'GOALKEEPER') {
					goalKeeper.push(element);
				} else if (element.position === 'DEFENDER') {
					defenders.push(element);
					if (element.firstName === 'empty') {
						numberOfEmptyDefenders += 1;
					}
				} else if (element.position === 'MIDFIELDER') {
					midfielders.push(element);
					if (element.firstName === 'empty') {
						numberOfEmptyMidfielders += 1;
					}
				} else if (element.position === 'ATTACKER') {
					attackers.push(element);
					if (element.firstName === 'empty') {
						numberOfEmptyAttackers += 1;
					}
				}
			});
		}

		let pitchAttackers = this.generatePlayers(attackers, 3, 'attackers', numberOfEmptyAttackers);
		let pitchMidfielders = this.generatePlayers(midfielders, 5, 'midfielders', numberOfEmptyMidfielders);
		let pitchDefenders = this.generatePlayers(defenders, 5, 'defenders', numberOfEmptyDefenders);
		let pitchGoalkeepers = this.generatePlayers(goalKeeper, 1, 'goalkeepers', 0);

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
