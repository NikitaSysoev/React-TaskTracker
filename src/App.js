import React from 'react';

import Navigation from './components/nav';

class App extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <Navigation />
          {this.props.children}
        </div>
      </>
    );
  }
}

export default App;
