import * as React from 'react';
import Team from '../Containers/Team/Team';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import SplashScreen from './Reusable/SplashScreen';
import Transfers from '../Containers/Transfers/Transfers';
import Leagues from '../Containers/League/Leagues';
import Settings from '../Containers/Settings';

interface CategoryTemplateProps {
  pageBeingViewed: string;
}

class CategoryTemplate extends React.Component<CategoryTemplateProps, {}> {
  public render() {
    let header = document.getElementById('header');
    if (header != null) {
      header.hidden = false;
    }
    if (sessionStorage.access !== undefined) {
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
    } else {
      return <SplashScreen redirect={'/login'} />;
    }
  }
}
export default CategoryTemplate;
