import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, HashRouter as Router } from 'react-router-dom';

import Navigation from './components/navigation';
import { NAV_ITEMS, NAV_MAIN } from './lib/nav_data';
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
      <Router>
        <Container>
          <Navigation items={this.navHelper()} />
          <React.Suspense fallback={<div> Loading....</div>}>
            {this.state.activeNavItem === NAV_MAIN ? <MainTab /> : <Dnd />}
            {/* <Route exact path="/" render={props => <MainTab {...props} />} />
            <Route exact path="/dnd" render={props => <Dnd {...props} />} /> */}
          </React.Suspense>
        </Container>
      </Router>
    );
  }
}
