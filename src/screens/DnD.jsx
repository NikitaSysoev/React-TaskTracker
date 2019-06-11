import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { TODO, IN_PROGRESS, DONE } from '../lib/const';

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
                // onClick={props.handleViewTask}
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
        const todo = props.taskList.filter(item => item.taskStatus === TODO);
        const inprogress = props.taskList.filter(item => item.taskStatus === IN_PROGRESS);
        const done = props.taskList.filter(item => item.taskStatus === DONE);
        setState({ todo, inprogress, done });
    }, [props.taskList]);

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