import * as React from 'react';
import '../../Style/TextScottCash.css';
import { Route } from 'react-router-dom';
import '../../Style/App.css';
import CategoryTemplate from '../CategoryTemplate';

interface PageBodyProps {
  viewingTransactions: boolean;
}

class PageBody extends React.Component<PageBodyProps> {
  render() {
    return <Route exact path="/balance" component={CategoryTemplate} />;
  }
}

export default PageBody;
