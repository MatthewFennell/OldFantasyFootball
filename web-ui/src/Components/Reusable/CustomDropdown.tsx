import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../../Style/Reusuable/CustomDropdown.css';

interface CustomDropdownProps {
  setData: (position: any) => void;
  values: any[];
  title: string;
}

interface CustomDropdownState {
  dropDownOpen: boolean;
  value: string;
}

class CustomDropdown extends React.Component<CustomDropdownProps, CustomDropdownState> {
	constructor (props: CustomDropdownProps) {
		super(props);
		this._togglePosition = this._togglePosition.bind(this);

		if (this.props.values.length > 0) {
			this.state = {
				dropDownOpen: false,
				value: this.props.values[0]
			};
		} else {
			this.state = {
				dropDownOpen: false,
				value: ''
			};
		}
	}

	_togglePosition () {
		this.setState(prevState => ({
			dropDownOpen: !prevState.dropDownOpen
		}));
	}

	_handleValueChange (position: string) {
		this.setState({ value: position });
		this.props.setData(position);
	}

	render () {
		const positionOptions = this.props.values.map(name => (
			<p
				className="custom-dropdown-menu-items"
				key={name}
			>
				<DropdownItem
					className={'custom-dropdown-menu-item-' + (name === this.state.value)}
					key={name}
					onClick={() => this._handleValueChange(name)}
					value={name}
				>
					{name}
				</DropdownItem>
			</p>
		));

		return (
			<div className="custom-dropdown">
				<Dropdown
					isOpen={this.state.dropDownOpen}
					toggle={this._togglePosition}
				>
					{this.props.title + ':'} {this.state.value}
					<DropdownToggle
						caret
						className="custom-dropdown-menu-toggle"
					>
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="custom-dropdown-menu">{positionOptions}</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}
export default CustomDropdown;
