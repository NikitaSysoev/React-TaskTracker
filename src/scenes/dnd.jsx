import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { TODO, IN_PROGRESS, DONE } from '../lib/const';
import Modal from '../components/modals/simple_modal';
import ViewTaskModal from '../components/task/view_task';

const DnD = (props) => {
    const [state, setState] = React.useState({
        todo: [],
        inprogress: [],
        done: [],
    });
    const [modalFlag, setModalFlag] = React.useState(false);
    const [taskId, setTaskId] = React.useState(null);

    React.useEffect(() => {
        const todo = props.taskList.filter(item => item.taskStatus === TODO);
        const inprogress = props.taskList.filter(item => item.taskStatus === IN_PROGRESS);
        const done = props.taskList.filter(item => item.taskStatus === DONE);
        setState({ todo, inprogress, done });
    }, [props.taskList]);

    const handleViewTask = (e) => {
        e.preventDefault();
        const taskId = e.target.getAttribute('data-id');
        setTaskId(taskId);
        setModalFlag(true);
    }

    const handleCloseModal = () => {
        setModalFlag(false);
        setTaskId(null);
    }

    const emptyList = <li className="list-group-item">
        <strong className="text-secondary">Список пуст</strong>
    </li>;

    const filterElement = () => {
        return props.taskList.length ?
            props.taskList.find(item => item.id === taskId)
            : null;
    }

    const renderOneTask = (item) => {
        return (
            <li key={item.id}
                className="list-group-item"
                style={{ position: "relative" }}>
                {
                    item.taskUrgent && (<FontAwesomeIcon icon={faExclamationTriangle} />)
                }
                <a
                    href={item.id}
                    style={{ color: 'black' }}
                    onClick={handleViewTask}
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

    return (
        <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>К исполнению</h3>
                        <ul className="list-group">
                            {state.todo.length ?
                                state.todo.map(renderOneTask)
                                : emptyList}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>В процессе</h3>
                        <ul className="list-group">
                            {state.inprogress.length ? state.inprogress.map(renderOneTask) : emptyList}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body card-body-dnd">
                        <h3>Готово</h3>
                        <ul className="list-group">
                            {state.done.length ? state.done.map(renderOneTask) : emptyList}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal
                title="Task Info"
                onCancelClick={handleCloseModal}
                display={modalFlag}
            >
                <ViewTaskModal data={filterElement()} />
            </Modal>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        taskList: [...store.app.taskList]
    }
}

export default connect(mapStateToProps)(DnD);