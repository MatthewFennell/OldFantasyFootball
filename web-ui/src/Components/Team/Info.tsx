import * as React from 'react';
import '../../Style/Team/Info.css';

class Info extends React.Component<{}, {}> {
  render() {
    return (
      <div className="info-columns">
        <div className="total-points">Total Points: 50</div>
        <div className="current-week-dropdown">Week 20</div>
        <div className="week-points">Week points : 20</div>
      </div>
    );
  }
}
export default Info;
