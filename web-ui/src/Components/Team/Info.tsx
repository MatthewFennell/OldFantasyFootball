import * as React from 'react';
import '../../Style/Team/Info.css';

interface StatsProps {
  setTotalPoints: (totalPoints: any) => void;
  totalPoints: number;
}

class Info extends React.Component<StatsProps, {}> {
  constructor(props: StatsProps) {
    super(props);
    // Overestimate the max rows per page (better to load too many than too few)
    this.state = {};
  }

  render() {
    return (
      <div className="info-columns">
        <div className="total-points">Total Points: {this.props.totalPoints}</div>
        <div className="current-week-dropdown">Week 20</div>
        <div className="week-points">Week points : 20</div>
      </div>
    );
  }
}
export default Info;
