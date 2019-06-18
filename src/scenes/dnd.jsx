import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { TODO, IN_PROGRESS, DONE } from '../lib/const';
import Modal from '../components/modals/simple_modal';
import ViewTaskModal from '../components/task/view_task';
import * as ACT from '../store/actions';

const DnD = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        todo: [],
        inprogress: [],
        done: [],
    });
    const [modalFlag, setModalFlag] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const taskList = useSelector(store => store.app.taskList);

    useEffect(() => {
        const todo = taskList.filter(item => item.taskStatus === TODO);
        const inprogress = taskList.filter(item => item.taskStatus === IN_PROGRESS);
        const done = taskList.filter(item => item.taskStatus === DONE);
        setState({ todo, inprogress, done });
    }, [taskList]);

    const handleViewTask = (e) => {
        e.preventDefault();
        const taskId = e.target.getAttribute('data-id');
        setTaskId(taskId);
        setModalFlag(true);
    }

    const handleDragStart = (e) => {
        if (e.target.classList.contains('tag_a')) {
            return false;
        }
        const taskId = e.currentTarget.getElementsByTagName('a')[0].getAttribute('data-id');
        const newTaskList = taskList.map(item => {
            if (item.id === taskId) {
                item.taskStatus = DONE;
            }
            return item;
        });
        dispatch({
            type: ACT.DATA_TASK_UPDATE,
            payload: { taskList: newTaskList }
        });
    }

    const handleCloseModal = () => {
        setModalFlag(false);
        setTaskId(null);
    }

    const emptyList = <li className="list-group-item">
        <strong className="text-secondary">Список пуст</strong>
    </li>;

    const filterElement = () => {
        return taskList.length ?
            taskList.find(item => item.id === taskId)
            : null;
    }

    const renderOneTask = (item) => {
        return (
            <li key={item.id}
                className="list-group-item"
                onClick={handleDragStart}
                style={{ position: "relative" }}>
                {
                    item.taskUrgent && (<FontAwesomeIcon icon={faExclamationTriangle} />)
                }
                <a
                    href={item.id}
                    className="tag_a"
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
        <div className="container">
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
        </div>
    )
}

export default DnD;