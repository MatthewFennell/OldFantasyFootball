import * as React from 'react';
import '../../Style/TextScottCash.css';
import { Route } from 'react-router-dom';
import '../../Style/App.css';
import CategoryTemplate from '../../Containers/CategoryTemplate';
import Team from '../../Containers/Team/Team';
import Transfers from '../../Containers/Transfers';
import Leagues from '../../Containers/League/Leagues';
import Settings from '../../Containers/Settings';

interface PageBodyProps {
  pageBeingViewed: string;
}

class PageBody extends React.Component<PageBodyProps> {
  _whichPage() {
    let pageBeingViewed = this.props.pageBeingViewed;

    if (pageBeingViewed === 'Team') {
      return <Team />;
    } else if (pageBeingViewed === 'Transfers') {
      return <Transfers />;
    } else if (pageBeingViewed === 'Leagues') {
      return <Leagues />;
    } else if (pageBeingViewed === 'Settings') {
      return <Settings />;
    } else {
      return <Team />;
    }
  }

  render() {
    return <Route exact path="/team" component={CategoryTemplate} />;
  }
}

export default PageBody;
