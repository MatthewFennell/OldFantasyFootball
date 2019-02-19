import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface PriceState {
  price: string;
}

interface PriceProps {
  price: (searchByName: string) => void;
}

class Price extends React.Component<PriceProps, PriceState> {
  constructor(props: PriceProps) {
    super(props);
    this.state = {
      price: ''
    };
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.props.price(eventTarget.value);
    this.setState({
      [eventName]: eventTarget.value
    } as Pick<PriceState, keyof PriceState>);
  }

  render() {
    return (
      <div className="create-player-form-outer" onSubmit={e => e.preventDefault()}>
        <Form id="create-player-form">
          <div id="login-input-fields">
            <FormGroup>
              <Label for="price" className="unselectable">
                Price
              </Label>
              <Field
                type="text"
                name="price"
                id="price"
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
  })(Price)
);
