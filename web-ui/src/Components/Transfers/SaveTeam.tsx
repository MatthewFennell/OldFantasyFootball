import * as React from 'react';
import { WeeklyPlayer } from '../../Models/Interfaces/WeeklyPlayer';

interface SaveTeamProps {
  activeTeam: WeeklyPlayer[];
}

interface SaveTeamState {}

class SaveTeam extends React.Component<SaveTeamProps, SaveTeamState> {
  render() {
    return <div />;
  }
}
export default SaveTeam;
