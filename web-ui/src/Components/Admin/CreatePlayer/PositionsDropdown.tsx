import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface PositionDropdownProps {
  setPosition: (position: string) => void;
}

interface PositionDropdownState {
  positionDropDownOpen: boolean;
  positionValue: string;
}

class PositionDropdown extends React.Component<PositionDropdownProps, PositionDropdownState> {
  constructor(props: PositionDropdownProps) {
    super(props);
    this._togglePosition = this._togglePosition.bind(this);
    this.state = {
      positionDropDownOpen: false,
      positionValue: 'Goalkeeper'
    };
  }

  _togglePosition() {
    this.setState(prevState => ({
      positionDropDownOpen: !prevState.positionDropDownOpen
    }));
  }

  _handlePositionChange(position: string) {
    this.setState({ positionValue: position });
    this.props.setPosition(position);
  }

  render() {
    let positions: string[] = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
    const positionOptions = positions.map(position => (
      <p className="menu-items">
        <DropdownItem
          className={'position-menu-item-' + (position === this.state.positionValue)}
          key={position}
          value={position}
          onClick={() => this._handlePositionChange(position)}
        >
          {position}
        </DropdownItem>
      </p>
    ));

    return (
      <div className="position-dropdown">
        <Dropdown isOpen={this.state.positionDropDownOpen} toggle={this._togglePosition}>
          {'Position: '} {this.state.positionValue}
          <DropdownToggle caret className="position-menu-toggle">
            {' '}
            {' ▼'}
          </DropdownToggle>
          <DropdownMenu className="position-menu">{positionOptions}</DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
export default PositionDropdown;
