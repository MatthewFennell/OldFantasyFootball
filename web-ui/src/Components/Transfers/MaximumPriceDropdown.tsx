import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../../Style/Transfers/MaximumPriceDropdown.css';

interface MaximumPriceDropdownProps {
  setMaximumPrice: (maximumPrice: string) => void;
}

interface MaximumPriceDropdownState {
  maximumPriceDropDownOpen: boolean;
  maximumPriceValue: string;
}

class MaximumPriceDropdown extends React.Component<
	MaximumPriceDropdownProps,
	MaximumPriceDropdownState
	> {
	constructor (props: MaximumPriceDropdownProps) {
		super(props);
		this._toggleMaximumPrice = this._toggleMaximumPrice.bind(this);
		this.state = {
			maximumPriceDropDownOpen: false,
			maximumPriceValue: 'No limit'
		};
	}

	_toggleMaximumPrice () {
		this.setState(prevState => ({
			maximumPriceDropDownOpen: !prevState.maximumPriceDropDownOpen
		}));
	}

	_handlemaximumPriceChange (maximumPrice: string) {
		this.setState({ maximumPriceValue: maximumPrice });
		this.props.setMaximumPrice(maximumPrice);
	}

	render () {
		let maximumPrices: string[] = [
			'5.0',
			'6.0',
			'7.0',
			'8.0',
			'9.0',
			'10.0',
			'11.0',
			'12.0',
			'13.0',
			'14.0',
			'No limit'
		];
		const maximumPriceOptions = maximumPrices.map(maximumPrice => (
			<p className="maximum-menu-items">
				<DropdownItem
					className={ 'maximum-price-menu-item-' + (maximumPrice === this.state.maximumPriceValue) }
					key={ maximumPrice }
					value={ maximumPrice }
					onClick={ () => this._handlemaximumPriceChange(maximumPrice) }
				>
					{maximumPrice}
				</DropdownItem>
			</p>
		));

		return (
			<div className="maximum-price-dropdown">
				<Dropdown isOpen={ this.state.maximumPriceDropDownOpen } toggle={ this._toggleMaximumPrice }>
					{'Maximum price: '} {this.state.maximumPriceValue}
					<DropdownToggle caret className="maximum-price-menu-toggle">
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="maximum-price-menu">{maximumPriceOptions}</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}
export default MaximumPriceDropdown;
