import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../../Style/Transfers/MinimumPriceDropdown.css';

interface MinimumPriceDropdownProps {
  setMinimumPrice: (minimumPrice: string) => void;
}

interface MinimumPriceDropdownState {
  minimumPriceDropDownOpen: boolean;
  minimumPriceValue: string;
}

class MinimumPriceDropdown extends React.Component<
	MinimumPriceDropdownProps,
	MinimumPriceDropdownState
	> {
	constructor (props: MinimumPriceDropdownProps) {
		super(props);
		this._toggleMinimumPrice = this._toggleMinimumPrice.bind(this);
		this.state = {
			minimumPriceDropDownOpen: false,
			minimumPriceValue: 'No limit'
		};
	}

	_toggleMinimumPrice () {
		this.setState(prevState => ({
			minimumPriceDropDownOpen: !prevState.minimumPriceDropDownOpen
		}));
	}

	_handleMinimumPriceChange (minimumPrice: string) {
		this.setState({ minimumPriceValue: minimumPrice });
		this.props.setMinimumPrice(minimumPrice);
	}

	render () {
		let minimumPrices: string[] = [
			'No limit',
			'5.0',
			'6.0',
			'7.0',
			'8.0',
			'9.0',
			'10.0',
			'11.0',
			'12.0'
		];
		const minimumPriceOptions = minimumPrices.map(minimumPrice => (
			<p className="minimum-menu-items">
				<DropdownItem
					className={ 'minimum-price-menu-item-' + (minimumPrice === this.state.minimumPriceValue) }
					key={ minimumPrice }
					value={ minimumPrice }
					onClick={ () => this._handleMinimumPriceChange(minimumPrice) }
				>
					{minimumPrice}
				</DropdownItem>
			</p>
		));

		return (
			<div className="minimum-price-dropdown">
				<Dropdown isOpen={ this.state.minimumPriceDropDownOpen } toggle={ this._toggleMinimumPrice }>
					{'Minimum price: '} {this.state.minimumPriceValue}
					<DropdownToggle caret className="minimum-price-menu-toggle">
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="minimum-price-menu">{minimumPriceOptions}</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}
export default MinimumPriceDropdown;
