import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, HashRouter as Router } from 'react-router-dom';
import { FORM_ADD, FORM_EDIT } from './lib/const';

import Navigation from './components/navigation';
import { NAV_ITEMS, NAV_MAIN } from './lib/nav_data';
const MainTab = React.lazy(() => import('./screens/main'));
const Dnd = React.lazy(() => import('./screens/dnd'));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNavItem: NAV_MAIN,
      taskList: [],
      taskId: null,
      taskForEdit: null,
      formSate: FORM_ADD // ["add", "edit"]
    };
  }

  componentDidMount() {
    let taskList = null;
    try {
      taskList = JSON.parse(localStorage.getItem('TASKS'));
    } catch {
      console.log('Error localstorage upload data');
    }
   this.setState({ taskList: taskList !== null ? taskList : [] }) 
  }

  handleSaveFormData = data => {
    const { taskList  } = this.state;
    if (this.state.formSate === FORM_ADD) {
      taskList.push(data);
    } else {
      taskList.filter(item => this.state.taskId === item.id)[0] = { ...data };
    }
    this.setState({
      taskList,
      taskId: null,
      taskForEdit: null,
      formSate: FORM_ADD
    });
    localStorage.setItem('TASKS', JSON.stringify(taskList));
    return true;
  };

  handleEditTask = (e, taskId) => {
    const { taskList } = this.state;
    const taskForEdit = taskList.filter(item => item.id === taskId)[0];
    this.setState({
      taskForEdit,
      formSate: FORM_EDIT
    });
  };

  handleDeleteTask = (e, taskId) => {
    
    console.log('this is DELETE from App, id = ', taskId);
  };

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
            {this.state.activeNavItem === NAV_MAIN ? (
              <MainTab
                onTaskEdit={this.handleEditTask}
                taskList={this.state.taskList}
                onTaskDelete={this.handleDeleteTask}
                taskForEdit={this.state.taskForEdit}
                formSate={this.state.formSate}
                onSaveData={ this.handleSaveFormData }
              />
            ) : (
              <Dnd />
            )}
            {/* <Route exact path="/" render={props => <MainTab {...props} />} />
            <Route exact path="/dnd" render={props => <Dnd {...props} />} /> */}
          </React.Suspense>
        </Container>
      </Router>
    );
  }
}
