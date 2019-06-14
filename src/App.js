import React from 'react';
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
      taskForEdit: null,
      formSate: FORM_ADD // ["add", "edit"]
    };
  }

  handleSaveFormData = data => {
    let { taskList, formSate, taskForEdit } = this.state;
    if (formSate === FORM_ADD) {
      taskList = taskList.concat(data);
    } else {
      taskList = taskList.map(item => (item.id === taskForEdit.id ? data : item));
    }
    this.setState({
      taskList,
      taskForEdit: null,
      formSate: FORM_ADD
    });
    localStorage.setItem('TASKS', JSON.stringify(taskList));
    return true;
  };

  handleResetData = () => {
    this.setState({
      taskForEdit: null,
      formSate: FORM_ADD
    });
  };

  handleEditTask = (e, taskId) => {
    const { taskList } = this.state;
    const taskForEdit = taskList.find(item => item.id === taskId);
    if (taskForEdit === this.state.taskForEdit || this.state.formSate === FORM_EDIT) {
      this.handleResetData();
      return false;
    }
    if (this.state.formSate === FORM_ADD) {
      this.setState({
        taskForEdit,
        formSate: FORM_EDIT
      });
    }
  };

  handleClearList = () => {
    this.setState({ taskList: [] });
    localStorage.removeItem('TASKS');
  };

  // handleDeleteTask = (e, taskId) => {
  //   const { taskList } = this.state;
  //   this.setState(
  //     {
  //       taskList: taskList.filter(item => item.id !== taskId)
  //     },
  //     () => localStorage.setItem('TASKS', JSON.stringify(this.state.taskList))
  //   );
  // };

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
          {this.state.activeNavItem === NAV_MAIN ? (
            <MainTab
              onTaskEdit={this.handleEditTask}
              taskForEdit={this.state.taskForEdit}
              formSate={this.state.formSate}
              onSaveData={this.handleSaveFormData}
              onListClear={this.handleClearList}
              onResetData={this.handleResetData}
            />
          ) : (
            <Dnd taskList={this.state.taskList} />
          )}
        </React.Suspense>
      </div>
    );
  }
}
