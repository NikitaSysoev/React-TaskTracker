import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const renderOneTask = (item) => {
    return (
        <li key={item.id}
            className="list-group-item"
            style={{ position: "relative" }}>
            {
                item.taskUrgent && (<FontAwesomeIcon icon={faExclamationTriangle} />)
            }
            <a
                href="#"
                // onClick={this.handleViewTask}
                data-id={item.id}
            >
                {item.taskName}
            </a>
            <br />
            <span className="text-muted">
                <small>
                    {item.taskDate}
                </small>
            </span>
            <br />
        </li>
    )
};


const DnD = (props) => {
    const [state, setState] = React.useState({
        todo: [],
        inprogress: [],
        done: []
    });

    React.useEffect(() => {
        const string = localStorage.getItem('TASKS');
        const taskList = JSON.parse(string);
        const todo = taskList.filter(item => item.taskStatus === 'TODO');
        const inprogress = taskList.filter(item => item.taskStatus === 'INPROGRESS');
        const done = taskList.filter(item => item.taskStatus === 'DONE');
        setState({ todo, inprogress, done });
    }, []);

    const emptyList = <li className="list-group-item">
        <strong className="text-secondary">Список пуст</strong>
    </li>;

    return (
        <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>To Do</h3>
                        <ul className="list-group">
                            {state.todo.length ? state.todo.map(renderOneTask) : emptyList}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>In progress</h3>
                        <ul className="list-group">
                            {state.inprogress.length ? state.inprogress.map(renderOneTask) : emptyList}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>Done</h3>
                        <ul className="list-group">
                            {state.done.length ? state.done.map(renderOneTask) : emptyList}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DnD;