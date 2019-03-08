import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../../Style/Transfers/SortByDropdown.css';

interface SortByDropdownProps {
  setSortBy: (sortBy: string) => void;
}

interface SortByDropdownState {
  sortByDropDownOpen: boolean;
  sortByValue: string;
}

class SortByDropdown extends React.Component<SortByDropdownProps, SortByDropdownState> {
	constructor (props: SortByDropdownProps) {
		super(props);
		this._toggleSortBy = this._toggleSortBy.bind(this);
		this.state = {
			sortByDropDownOpen: false,
			sortByValue: 'Total score'
		};
	}

	_toggleSortBy () {
		this.setState(prevState => ({
			sortByDropDownOpen: !prevState.sortByDropDownOpen
		}));
	}

	_handleSortByChange (sortBy: string) {
		this.setState({ sortByValue: sortBy });
		this.props.setSortBy(sortBy);
	}

	render () {
		let sortBys: string[] = ['Total score', 'Goals', 'Assists', 'Price'];
		const sortByOptions = sortBys.map(sortBy => (
			<p className="sort-by-menu-items">
				<DropdownItem
					className={ 'sort-by-menu-item-' + (sortBy === this.state.sortByValue) }
					key={ sortBy }
					value={ sortBy }
					onClick={ () => this._handleSortByChange(sortBy) }
				>
					{sortBy}
				</DropdownItem>
			</p>
		));

		return (
			<div className="sort-by-dropdown">
				<Dropdown isOpen={ this.state.sortByDropDownOpen } toggle={ this._toggleSortBy }>
					{'Sort by: '} {this.state.sortByValue}
					<DropdownToggle caret className="sort-by-menu-toggle">
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="sort-by-menu">{sortByOptions}</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}
export default SortByDropdown;
