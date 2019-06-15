import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NAV_ITEMS, NAV_MAIN } from './lib/nav_data';
import Navigation from './components/navigation';

const MainTab = React.lazy(() => import('./screens/main'));
const Dnd = React.lazy(() => import('./screens/dnd'));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNavItem: NAV_MAIN
    };
  }

  handleNavClick = e => {
    e.preventDefault();
    const { target } = e;
    const newItem = target.getAttribute('data-name');
    this.setState({ activeNavItem: newItem });
  };

  navHelper = () => {
    return NAV_ITEMS.map(item => {
      item.onClick = this.handleNavClick;
      item.isActive = false;
      if (this.state.activeNavItem === item.name) {
        item.isActive = true;
      }
      return item;
    });
  };

  render() {
    return (
      <div className="container">
        <Navigation items={this.navHelper()} />
        <React.Suspense fallback={<div> Loading....</div>}>
          {/* <Switch>
          <Route exact path="/" render={() => (<MainTab
            />)} />
          <Route exact path="/dnd" render={() => <Dnd />} />
        </Switch> */}
          {this.state.activeNavItem === NAV_MAIN ? <MainTab /> : <Dnd />}
        </React.Suspense>
      </div>
    );
  }
}
