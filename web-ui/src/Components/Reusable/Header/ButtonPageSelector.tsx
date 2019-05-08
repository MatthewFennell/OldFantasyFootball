import * as React from 'react';
import classNames from 'classnames';
import Media from 'react-media';

interface ButtonPageSelectorProps {
  select: () => void;
  id: string;
  text: string;
  imgSrc: string;
  selected: boolean;
  setRef: () => React.RefObject<HTMLDivElement>;
}

class ButtonPageSelector extends React.Component<ButtonPageSelectorProps> {
	shouldComponentUpdate (nextProps: ButtonPageSelectorProps) {
		return nextProps !== this.props;
	}

	render () {
		return (
			<div
				className={classNames('cursor-pointer', {
					selected: this.props.selected
				})}
				id={this.props.id}
				onClick={this.props.select}
				ref={this.props.setRef()}
			>
				<img src={this.props.imgSrc} />
				<Media query="(max-width: 899px)">
					{matches =>
						matches ? (
							null
						) : (
							<h6>{this.props.text}</h6>
						)
					}
				</Media>
			</div>
		);
	}
}

export default ButtonPageSelector;
