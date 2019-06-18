import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './store/action_creators';

import Navigation from './components/nav';

class App extends React.Component {
  static propTypes = {
    taskUpdate: PropTypes.func
  };

  componentDidMount() {
    let taskList = [];
    try {
      taskList = JSON.parse(localStorage.getItem('TASKS')) || [];
    } catch {
      console.error('Error localstorage upload data');
    }
    this.props.taskUpdate({ taskList });
  }

  render() {
    return (
      <>
        <Navigation />
        {this.props.children}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    taskUpdate: payload => dispatch(actions.updateTask(payload))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
