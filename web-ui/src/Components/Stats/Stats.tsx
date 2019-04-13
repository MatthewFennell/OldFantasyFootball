import * as React from 'react';
import { getStats } from '../../Services/Player/PlayerService';
import { SingleHistory } from '../../Models/Interfaces/SingleHistory';

interface SettingsProps {
    setStatsHistory: (week:number, statsHistory: SingleHistory) => void;
    statsHistory: SingleHistory[];
}

interface SettingsState {
  }

class Settings extends React.Component<SettingsProps, SettingsState> {
	getHistory (week: number) {
		if (!this.props.statsHistory[week]) {
			getStats(week).then(response => {
				this.props.setStatsHistory(week, response);
			})
			// eslint-disable-next-line handle-callback-err
				.catch(error => {
					console.log('error = ' + error);
				});
		}
	}

	render () {
		this.getHistory(0);
		return (
			<div className="stats-wrapper">
				Stats
			</div>
		);
	}
}
export default Settings;
