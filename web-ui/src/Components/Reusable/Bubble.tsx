import * as React from 'react';
import '../../Style/Bubble.css';

interface BubbleProps {
  className: string;
  children?: React.ReactNode;
}

const Bubble: React.SFC<BubbleProps> = (props) => {
	// eslint-disable-next-line react/prop-types
	const { className, children } = props;
	return <div className={'bubble shadow ' + className}>{children}</div>;
};

Bubble.defaultProps = {
	className: ''
};

export default Bubble;
