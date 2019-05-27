import * as React from 'react';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import Player from './Player';
import { noop } from 'lodash';

interface PitchProps {
  activeWeeklyTeam: PlayerDTO[];
  originalTransferTeam: PlayerDTO[];
  transfer: boolean;
  noPoints: boolean;

  username: string;
  teamName: string;

  setPositionFilter: (pos:string) => void;
  removePlayer: (id:string, price:number, player:PlayerDTO) => void;
  handleClickOnPlayer: (player:PlayerDTO) => void;
}

class Pitch extends React.Component<PitchProps> {
	static defaultProps = { teamName: '', username: '' };

	numberOfSpareSpots (position: string): number {
		const numberOfAttackersIHaveToAdd = Math.max(1 - this.props.activeWeeklyTeam.filter(x => x.position === 'ATTACKER' && x.firstName !== 'REMOVED').length, 0);
		const numberOfMidfieldersIHaveToAdd = Math.max(3 - this.props.activeWeeklyTeam.filter(x => x.position === 'MIDFIELDER' && x.firstName !== 'REMOVED').length, 0);
		const numberOfDefendersIHaveToAdd = Math.max(3 - this.props.activeWeeklyTeam.filter(x => x.position === 'DEFENDER' && x.firstName !== 'REMOVED').length, 0);

		if (position === 'ATTACKER') {
			return 11 - this.props.activeWeeklyTeam.filter(x => x.firstName !== 'REMOVED').length - numberOfMidfieldersIHaveToAdd - numberOfDefendersIHaveToAdd;
		} else if (position === 'MIDFIELDER') {
			return 11 - this.props.activeWeeklyTeam.filter(x => x.firstName !== 'REMOVED').length - numberOfAttackersIHaveToAdd - numberOfDefendersIHaveToAdd;
		} else if (position === 'DEFENDER') {
			return 11 - this.props.activeWeeklyTeam.filter(x => x.firstName !== 'REMOVED').length - numberOfAttackersIHaveToAdd - numberOfMidfieldersIHaveToAdd;
		} else {
			return 11 - this.props.activeWeeklyTeam.filter(x => x.firstName !== 'REMOVED').length;
		}
	}

	playerExistsInOriginalTeam (id: string) {
		return this.props.originalTransferTeam.find(x => x.id === id) !== undefined;
	}

	generatePlayers (players: PlayerDTO[], maximumNumberInRow: number, position: string, numberOfEmpty: number, emptyGoalkeepers: number, shouldPrevent: boolean) {
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
						newPlayer={!this.playerExistsInOriginalTeam(value.id)}
						noPoints={this.props.noPoints}
						player={value}
						removePlayer={this.props.removePlayer}
						transfer={this.props.transfer}
					/>
				</div>);
			} else if (!shouldPrevent) {
				playersToRender.push(
					<div
						className="player"
						key={value.id}
					>
						<Player
							emptyPlayer
							handleClickOnPlayer={noop}
							newPlayer={false}
							noPoints={this.props.noPoints}
							player={{ position: position } as any}
							removePlayer={noop}
							setPositionFilter={this.props.setPositionFilter}
							transfer={this.props.transfer}
						/>
					</div>);
			}
		});

		if (!shouldPrevent) {
			for (let x = 0; x < Math.min(
				Math.min(maximumNumberInRow - players.filter(x => x.position === position && x.firstName !== 'REMOVED').length,	this.numberOfSpareSpots(position)) - numberOfEmpty,
				  this.numberOfSpareSpots(position) - emptyGoalkeepers - numberOfEmpty); x++) {
				playersToRender.push(
					<div
						className="player"
						key={position + x}
					>
						<Player
							emptyPlayer
							handleClickOnPlayer={noop}
							key={position + x}
							newPlayer={false}
							noPoints={this.props.noPoints}
							player={{ position: position } as any}
							removePlayer={noop}
							setPositionFilter={this.props.setPositionFilter}
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
		const numberOfAttackers = attackers.length - numberOfEmptyAttackers;
		const numberOfMidfielders = midfielders.length - numberOfEmptyMidfielders;
		const preventEmptyAttackers = numberOfAttackers === 2 && numberOfMidfielders === 5;
		const preventEmptyMidfielders = numberOfMidfielders === 4 && numberOfAttackers === 3;

		let pitchAttackers = this.generatePlayers(attackers, 3, 'ATTACKER', numberOfEmptyAttackers, numberOfEmptyGoalkeepers, preventEmptyAttackers);
		let pitchMidfielders = this.generatePlayers(midfielders, 5, 'MIDFIELDER', numberOfEmptyMidfielders, numberOfEmptyGoalkeepers, preventEmptyMidfielders);
		let pitchDefenders = this.generatePlayers(defenders, 5, 'DEFENDER', numberOfEmptyDefenders, numberOfEmptyGoalkeepers, false);
		let pitchGoalkeepers = this.generatePlayers(goalKeeper, 1, 'GOALKEEPER', numberOfEmptyGoalkeepers, numberOfEmptyGoalkeepers, false);

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
