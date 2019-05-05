import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import '../../Style/BubbleAnimation.css';

interface Props {
  transitionName: string;
  children?: React.ReactNode;
}

class BubbleAnimationWrapper extends React.Component<Props, {}> {
	shouldComponentUpdate () {
		return false;
	}

	render () {
		const { transitionName, children } = this.props;

		return (
			<CSSTransitionGroup
				transitionAppear
				transitionAppearTimeout={1000}
				transitionEnter={false}
				transitionLeave={false}
				transitionName={transitionName}
			>
				{children}
			</CSSTransitionGroup>
		);
	}
}
export default BubbleAnimationWrapper;
