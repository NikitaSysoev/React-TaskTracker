import React from 'react';
import Task from './task';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    handleDeleteAll = () => {
        console.log('delete all')
    }

    handleOpenModal = () => {

    }

    render() {
        return (
            <div className="card" style={{ marginTop: '20px' }}>
                <div className="card-body">
                    <div className="form-group">
                        <h3>List of tasks</h3>
                        <ul id="taksList" className="list-group">
                            {
                                this.state.tasks.length ? this.state.tasks.map(item => {
                                    return <Task />
                                }) : <li className="list-group-item">
                                        <strong className="text-secondary">Список пуст</strong>
                                    </li>
                            }
                        </ul>
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={this.handleDeleteAll}
                            style={{ marginTop: '20px' }}
                        >
                            Clear List
                        </button>
                    </div>
                </div>
            </div>
        );
    }
} 