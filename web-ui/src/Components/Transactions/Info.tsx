import * as React from 'react';
import '../../Style/Info.css';

interface InfoProps {}

class Info extends React.Component<InfoProps> {
  constructor(props: InfoProps) {
    super(props);
  }

  render() {
    return <div className="transaction-info-page" />;
  }
}

export default Info;
