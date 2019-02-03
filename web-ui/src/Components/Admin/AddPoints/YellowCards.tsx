import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface YellowCardState {
  yellowCards: string;
}

interface YellowCardProps {
  yellowCards: (yellowCards: string) => void;
}
class YellowCards extends React.Component<YellowCardProps, YellowCardState> {
  constructor(props: YellowCardProps) {
    super(props);
    this.state = {
      yellowCards: ''
    };
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.props.yellowCards(eventTarget.value);
    this.setState({
      [eventName]: eventTarget.value
    } as Pick<YellowCardState, keyof YellowCardState>); // Needs type conversion, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
  }

  _validate = () => {
    return false;
  };

  render() {
    return (
      <div id="search-by-name-form" onSubmit={e => e.preventDefault()}>
        <Form id="search-by-name-form">
          <div id="login-input-fields">
            <FormGroup>
              <Label for="yellowCards" className="unselectable">
                Yellow Cards
              </Label>
              <Field
                type="text"
                name="yellowCards"
                id="yellowCards"
                component="input"
                onChange={e => this._handleInput(e!.target.name, e!.target)}
              />
            </FormGroup>
          </div>
        </Form>
      </div>
    );
  }
}

export default withRouter(
  reduxForm<{}, any>({
    form: 'login'
  })(YellowCards)
);
