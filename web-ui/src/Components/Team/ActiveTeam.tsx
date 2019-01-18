import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { Table, Col, Row } from 'reactstrap';
import ActiveTeamTableBody from './ActiveTeamTableBody';

interface ActiveTeamProps {
  activeTeam: PlayerDTO[];
  setTeam: (activeTeam: any) => void;
}

interface ActiveTeamState {}

class ActiveTeam extends React.Component<ActiveTeamProps, ActiveTeamState> {
  constructor(props: ActiveTeamProps) {
    super(props);
    this.state = {};
  }

  _activeTeamJSX = () => {
    return (
      <Table responsive>
        <ActiveTeamTableBody activeTeam={this.props.activeTeam} />
      </Table>
    );
  };

  render() {
    return (
      <div id="active-team-table">
        <Row id="player-in-active-team-row">
          <Col sm="12" md={{ size: 12 }} lg="12" id="active-team-columns">
            {this._activeTeamJSX()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ActiveTeam;
