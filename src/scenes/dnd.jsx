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
        const taskId = e.currentTarget.getElementsByTagName('a')[0].getAttribute('data-id');
        setTaskId(taskId);
    }

    const handleDragEnd = (e) => {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const status = searchParentDiv(target);
        const newTaskList = taskList.map(item => {
            if (item.id === taskId) {
                item.taskStatus = status;
            }
            return item;
        });
        dispatch({
            type: ACT.DATA_TASK_UPDATE,
            payload: { taskList: newTaskList }
        });
        localStorage.setItem('TASKS', JSON.stringify(taskList));
    }

    const searchParentDiv = (element) => {
        if (element.getAttribute('data-id') === TODO) return TODO;
        if (element.getAttribute('data-id') === IN_PROGRESS) return IN_PROGRESS;
        if (element.getAttribute('data-id') === DONE) return DONE;
        if (element.parentNode === null) return '';
        else return searchParentDiv(element.parentNode);
    };

    const handleCloseModal = () => {
        setModalFlag(false);
        setTaskId(null);
    }

    const filterElement = () => {
        return taskList.length ?
            taskList.find(item => item.id === taskId)
            : null;
    }

    const renderOneTask = (item) => {
        return (
            <li key={item.id}
                className="list-group-item"
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                draggable
                style={{ position: "relative", paddingRight: '36px' }}>
                <a
                    href={item.id}
                    draggable='false'
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
                {
                    item.taskUrgent && (<span className="urgent_dnd_ico">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                    </span>)
                }
            </li>
        )
    };

    const emptyList = <li className="list-group-item">
        <strong className="text-secondary">Список пуст</strong>
    </li>;

    return (
        <div className="container">
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-sm-4">
                    <div className="card" data-id={TODO}>
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
                    <div className="card" data-id={IN_PROGRESS}>
                        <div className="card-body card-body-dnd">
                            <h3>В процессе</h3>
                            <ul className="list-group">
                                {state.inprogress.length ? state.inprogress.map(renderOneTask) : emptyList}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card" data-id={DONE}>
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