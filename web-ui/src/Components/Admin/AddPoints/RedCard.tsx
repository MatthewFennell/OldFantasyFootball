import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface RedCardProps {
  setRedCard: (team: boolean) => void;
}

interface RedCardState {
  redCardOpen: boolean;
  redCard: string;
}

class RedCard extends React.Component<RedCardProps, RedCardState> {
	constructor (props: RedCardProps) {
		super(props);
		this._toggleRedCard = this._toggleRedCard.bind(this);
		this.state = {
			redCardOpen: false,
			redCard: 'No'
		};
	}

	_toggleRedCard () {
		this.setState(prevState => ({
			redCardOpen: !prevState.redCardOpen
		}));
	}

	_handleRedCardChange (redCard: string) {
		this.setState({ redCard });
		if (redCard === 'Yes') {
			this.props.setRedCard(true);
		} else {
			this.props.setRedCard(false);
		}
	}

	render () {
		let options: string[] = ['Yes', 'No'];
		const teamOptions = options.map(option => (
			<p className="team-menu-items">
				<DropdownItem
					className={ 'team-menu-item-' + (option === this.state.redCard) }
					key={ option }
					value={ option }
					onClick={ () => this._handleRedCardChange(option) }
				>
					{option}
				</DropdownItem>
			</p>
		));

		return (
			<div className="team-dropdown">
				<Dropdown isOpen={ this.state.redCardOpen } toggle={ this._toggleRedCard }>
					{'Red Card: '} {this.state.redCard}
					<DropdownToggle caret className="team-menu-toggle">
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="team-menu">{teamOptions}</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}
export default RedCard;
