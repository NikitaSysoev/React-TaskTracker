import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskid: null,
            taskname: '',
            taskdesciption: '',
            date: null,
            urgent: false,
            status: 'todo',
            tasknameValid: true,
            dateValid: true
        }
        this.initialState = this.state;
    }

    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const result = type === 'checkbox' ? checked : value;
        this.setState({ [name]: result });
    }

    handleClearForm = () => {
        this.setState({ ...this.initialState });
    }

    handleAddTask = (e) => {
        e.preventDefault();
        const { taskname, taskdesciption, date, urgent, status } = this.state;
        if (!taskname) this.setState({ tasknameValid: false });
        if (taskname) this.setState({ tasknameValid: true });
        if (!date) this.setState({ dateValid: false });
        if (date) this.setState({ dateValid: true });
        if (taskname && date) {
            console.log(taskname);
            console.log(taskdesciption);
            console.log(date);
            console.log(urgent);
            console.log(status);
        }
    }

    render() {
        const taskNameClass = classNames('form-control', { 'is-invalid': !this.state.tasknameValid });
        const dateClass = classNames('form-control', { 'is-invalid': !this.state.dateValid })
        return (
            <div className="card" style={{ marginTop: '20px' }}>
                <div className="card-body">
                    <div className="form-group">
                        <h4>Add Task</h4>
                        <label>Task name<span className="text-muted">*</span></label>
                        <input
                            name="taskname"
                            onChange={this.handleChange}
                            value={this.state.taskname}
                            className={taskNameClass}
                            placeholder="Enter task name" />
                        <small className="form-text text-muted">
                            Это поле обязательное для заполнения
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Task description</label>
                        <textarea
                            name="taskdesciption"
                            onChange={this.handleChange}
                            value={this.state.taskdesciption}
                            className="form-control"
                            rows="3"
                            style={{ resize: "none" }}
                        />
                        <small className="form-text text-muted"></small>
                    </div>

                    <div className="form-group">
                        <label>Task date<span className="text-muted">*</span></label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faCalendar} />
                                </span>
                            </div>
                            <input
                                readOnly
                                type="text"
                                className={dateClass}
                                placeholder="Date"
                            />
                        </div>
                        <small className="form-text text-muted">
                            Это поле обязательное для заполнения
                        </small>
                    </div>

                    <div className="form-group form-check">
                        <input
                            name="urgent"
                            checked={this.state.urgent}
                            onChange={this.handleChange}
                            type="checkbox"
                            className="form-check-input"
                        />
                        <label className="form-check-label" >
                            <FontAwesomeIcon icon={faExclamationTriangle} /> Urgent
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Select status</label>
                        <select
                            className="form-control"
                            name='status'
                            value={this.state.status}
                            onChange={this.handleChange}>
                            <option value="todo">To do</option>
                            <option value="inprogress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.handleAddTask}
                            >
                                Add new task
                            </button>
                        </div>
                        <div className="col-sm-6">
                            <button
                                type="submit"
                                className="btn btn-secondary"
                                onClick={this.handleClearForm}
                            >
                                Clear form
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 