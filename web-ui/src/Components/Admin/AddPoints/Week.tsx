import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface WeekState {
  week: string;
}

interface WeekProps {
  week: (week: string) => void;
}
class Week extends React.Component<WeekProps, WeekState> {
  constructor(props: WeekProps) {
    super(props);
    this.state = {
      week: ''
    };
  }

  _handleInput(eventName: string, eventTarget: HTMLInputElement) {
    this.props.week(eventTarget.value);
    this.setState({
      [eventName]: eventTarget.value
    } as Pick<WeekState, keyof WeekState>);
  }

  render() {
    return (
      <div className="add-points-week-outer" onSubmit={e => e.preventDefault()}>
        <Form id="add-points-week-form">
          <div id="login-input-fields">
            <FormGroup>
              <Label for="week" className="unselectable">
                Week
              </Label>
              <Field
                type="text"
                name="week"
                id="week"
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
  })(Week)
);
