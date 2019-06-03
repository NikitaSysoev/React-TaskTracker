import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, HashRouter as Router } from 'react-router-dom';

import './App.css';
import Header from './components/header';
const Home = React.lazy(() => import('./screens/Home'));
const DnD = React.lazy(() => import('./screens/DnD'));

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Container>
          <Header />
          <React.Suspense fallback={<div> Loading....</div>}>
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route exact path="/dnd" render={props => <DnD {...props} />} />
          </React.Suspense>
        </Container>
      </Router>
    );
  }
}
