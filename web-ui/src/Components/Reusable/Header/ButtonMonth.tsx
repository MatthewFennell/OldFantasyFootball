import * as React from 'react';
import { MonthButtonInfo } from '../../../Models/Interfaces/MonthButtonInfo';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ButtonMonthProps {}

class ButtonMonth extends React.Component<
  MonthButtonInfo & ButtonMonthProps & RouteComponentProps
> {
  render() {
    return <div />;
  }
}

export default withRouter(ButtonMonth);
