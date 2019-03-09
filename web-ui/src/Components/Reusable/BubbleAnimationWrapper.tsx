import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import '../../Style/BubbleAnimation.css';

interface Props {
  transitionName: string;
  children?: React.ReactNode;
}

class BubbleAnimationWrapper extends React.Component<Props, {}> {
	render () {
		const { transitionName, children } = this.props;

		return (
			<CSSTransitionGroup
				transitionName={ transitionName }
				transitionAppear={ true }
				transitionAppearTimeout={ 1000 }
				transitionEnter={ false }
				transitionLeave={ false }
			>
				{children}
			</CSSTransitionGroup>
		);
	}
}
export default BubbleAnimationWrapper;
