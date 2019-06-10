import React from 'react';
import { Container } from 'react-bootstrap';
// import { Route, HashRouter as Router } from 'react-router-dom';
import { FORM_ADD, FORM_EDIT } from './lib/const';
import { NAV_ITEMS, NAV_MAIN } from './lib/nav_data';
import Navigation from './components/navigation';

const MainTab = React.lazy(() => import('./screens/main'));
const Dnd = React.lazy(() => import('./screens/dnd'));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNavItem: NAV_MAIN,
      taskList: [],
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
    this.setState({ taskList: taskList !== null ? taskList : [] });
  }

  handleSaveFormData = data => {
    let { taskList } = this.state;
    if (this.state.formSate === FORM_ADD) {
      taskList.push(data);
    } else {
      taskList = taskList.map(item => {
        if (item.id === this.state.taskForEdit.id) {
          return data;
        }
        return item;
      });
    }
    this.setState({
      taskList,
      taskForEdit: null,
      formSate: FORM_ADD
    });
    localStorage.setItem('TASKS', JSON.stringify(taskList));
    return true;
  };

  handleEditTask = (e, taskId) => {
    const { taskList } = this.state;
    const taskForEdit = taskList.find(item => String(item.id) === taskId);
    this.setState({
      taskForEdit,
      formSate: FORM_EDIT
    });
  };

  handleDeleteTask = (e, taskId) => {
    const { taskList } = this.state;
    this.setState(
      {
        taskList: taskList.filter(item => String(item.id) !== taskId)
      },
      () => localStorage.setItem('TASKS', JSON.stringify(this.state.taskList))
    );
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const { taskList } = this.state;
  //   if (JSON.stringify(taskList) !== JSON.stringify(prevState.taskList)) {
  //     localStorage.setItem('TASKS', JSON.stringify(taskList));
  //   }
  // }

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
              onSaveData={this.handleSaveFormData}
            />
          ) : (
            <Dnd />
          )}
          {/* <Route exact path="/" render={props => <MainTab {...props} />} />
            <Route exact path="/dnd" render={props => <Dnd {...props} />} /> */}
        </React.Suspense>
      </Container>
    );
  }
}
