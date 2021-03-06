import * as React from 'react';
import Team from '../Containers/Team/Team';
import SplashScreen from './Reusable/SplashScreen';
import Transfers from '../Containers/Transfers/Transfers';
import Leagues from '../Containers/League/Leagues';
import Settings from '../Containers/Settings/Settings';
import Admin from '../Containers/Admin/Admin';
import Stats from '../Containers/Stats/Stats';
import Captain from '../Containers/Captain/Captain';

interface CategoryTemplateProps {
  pageBeingViewed: string;
}

class CategoryTemplate extends React.Component<CategoryTemplateProps, {}> {
	shouldComponentUpdate () {
		return true;
	}

	public render () {
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
			} else if (pageBeingViewed === 'Admin') {
				return <Admin />;
			} else if (pageBeingViewed === 'Stats') {
				return <Stats />;
			} else if (pageBeingViewed === 'Captain') {
				return <Captain />;
			} else {
				return <Team />;
			}
		} else {
			return <SplashScreen redirect="/login" />;
		}
	}
}
export default CategoryTemplate;
