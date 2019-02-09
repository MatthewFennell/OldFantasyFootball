import * as React from 'react';
import * as _ from 'lodash';
import Bubble from '../Reusable/Bubble';
import BubbleAnimationWrapper from '../Reusable/BubbleAnimationWrapper';
import TextScottCash from '../Reusable/TextScottCash';
import RegisterForm from './RegisterForm';
import { clearSessionStorage } from '../../Services/CredentialInputService';
import '../../Style/RegisterForm.css';
import { Account } from '../../Models/Interfaces/Account';

interface RegisterProps {
  resetAccount: () => void;
  setAccount: (account: Account) => void;
  setRemainingBudget: (budget: number) => void;
  location: any;
  history: any;
}

class Register extends React.Component<RegisterProps, {}> {
  constructor(props: RegisterProps) {
    super(props);
    this.props.resetAccount();
    clearSessionStorage();
  }
  componentDidMount() {
    let header: HTMLElement | null = document.getElementById('header');
    if (header != null) {
      header.hidden = true;
    }
  }

  _renderAnimatedWrapper(transitionName: string, children: React.ReactNode) {
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

  render() {
    return (
      <div id="bubbles">
        <Bubble className="bubble-medium bubble-red">
          <TextScottCash />
        </Bubble>
        {this._renderAnimatedWrapper(
          'bubble-smallest',
          <Bubble className="bubble-smallest bubble-green" />
        )}
        {this._renderAnimatedWrapper(
          'bubble-largest',
          <Bubble className="bubble-largest bubble-blue">
            <RegisterForm
              setAccount={this.props.setAccount}
              setRemainingBudget={this.props.setRemainingBudget}
            />
          </Bubble>
        )}
      </div>
    );
  }
}
export default Register;
