import * as React from 'react';
import * as _ from 'lodash';
import Bubble from '../Reusable/Bubble';
import BubbleAnimationWrapper from '../Reusable/BubbleAnimationWrapper';
import TextScottCash from '../Reusable/TextScottCash';
import SplashScreen from '../Reusable/SplashScreen';
import LoginForm from './LoginForm';
import { isLoggedIn } from '../../Services/CredentialInputService';
import { UserProps } from '../../Models/Interfaces/UserProps';
import '../../Style/LoginForm.css';
import Media from 'react-media';

interface LoginProps {
  location: any;
  history: any;
}

class Login extends React.Component<UserProps & LoginProps> {
	componentDidMount () {
		let header: HTMLElement | null = document.getElementById('header');
		if (header != null) {
			header.hidden = true;
		}
	}

	shouldComponentUpdate () {
		return false;
	}

	_renderAnimatedWrapper (transitionName: string, children: React.ReactNode) {
		const animate = _.get(this.props.location, 'state.animate', false);
		const { action } = this.props.history;
		const shouldAnimate = animate && action === 'PUSH';

		if (shouldAnimate) {
			return (
				<BubbleAnimationWrapper transitionName={transitionName}>{children}</BubbleAnimationWrapper>
			);
		}

		return children;
	}
	render () {
		if (!isLoggedIn()) {
			return (
				<Media query="(max-width: 599px)">
					{matches =>
						matches ? (
							<LoginForm
								setAccount={this.props.setAccount}
								setRemainingBudget={this.props.setRemainingBudget}
								setUserBeingViewed={this.props.setUserBeingViewed}
							/>
						) : (
							<div id="bubbles">
								<Bubble className="bubble-medium bubble-red">
									<TextScottCash />
								</Bubble>
								{this._renderAnimatedWrapper(
									'bubble-smallest',
									<Bubble className="bubble-smallest bubble-blue" />
								)}
								{this._renderAnimatedWrapper(
									'bubble-largest',
									<Bubble className="bubble-largest bubble-green">
										<LoginForm
											setAccount={this.props.setAccount}
											setRemainingBudget={this.props.setRemainingBudget}
											setUserBeingViewed={this.props.setUserBeingViewed}
										/>
									</Bubble>
								)}
							</div>
						)
					}
				</Media>
			);
		} else {
			return <SplashScreen redirect="/team" />;
		}
	}
}
export default Login;
