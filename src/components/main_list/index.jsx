import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ViewTaskModal from '../task/view_task';
import Modal from '../modals/simple_modal';

export default class MainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalFlag: false,
            taskId: null
        }
    }

    static propTypes = {
        data: PropTypes.array, // список задач длдя рендера
        onTaskEdit: PropTypes.func,
        onTaskDelete: PropTypes.func,
    };

    static defaultTypes = {
        data: []
    };

    handleViewTask = (e) => {
        e.preventDefault();
        const { target } = e;
        const taskId = target.getAttribute('data-id');
        this.setState({
            taskId,
            modalFlag: true
        });
    };

    handleCloseModal = () => {
        this.setState({
            modalFlag: false,
            taskId: null
        })
    }

    handleEditTask = (e) => {
        e.persist(); // convert event React to event DOM
        const { currentTarget: target } = e;
        const taskId = target.getAttribute('data-id');
        this.props.onTaskEdit(e, taskId);
    };

    handleDeleteTask = (e) => {
        e.persist(); // convert event React to event DOM
        const { currentTarget: target } = e;
        const taskId = target.getAttribute('data-id');
        this.props.onTaskDelete(e, taskId);
    };

    handleClearList() {
        this.props.onListClear();
    }

    renderOneTask = (item) => {
        const { taskForEdit } = this.props;
        const isActive = taskForEdit && taskForEdit.id === item.id ? 'active' : '';
        return (
            <li
                key={item.id}
                className={`list-group-item ${isActive}`}
                style={{ position: "relative" }}
            >
                {
                    item.taskUrgent && (<FontAwesomeIcon icon={faExclamationTriangle} />)
                }
                <a
                    href={item.id}
                    onClick={this.handleViewTask}
                    data-id={item.id}
                    style={{ color: 'black' }}
                >
                    {item.taskName}
                </a>
                <br />
                <span className="text-muted">
                    <small>
                        {item.taskDate}
                    </small>
                </span>

                <span
                    data-id={item.id}
                    className="delete_ico"
                    onClick={this.handleDeleteTask}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <span
                    data-id={item.id}
                    className="edit_ico"
                    onClick={this.handleEditTask}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </span>

            </li>

        )
    };

    render() {
        const emptyList = (
            <li className="list-group-item">
                <span className="text-secondary">Список задач пуст</span>
            </li>);

        const list = this.props.data && this.props.data.length
            ? this.props.data.map(this.renderOneTask)
            : emptyList;

        const btnClearAll = this.props.data && this.props.data.length ?
            <button
                type="button"
                className="btn btn-outline-danger"
                onClick={this.handleClearList.bind(this)}
                style={{ marginTop: '10px' }}>
                Clear List
            </button>
            :
            null;

        const filterElement = () => {
            return this.props.data ? this.props.data.find(item => String(item.id) === this.state.taskId) : null;
        }
        return (
            <Card>
                <h4>Список всех задач</h4>
                <ul className="list-group">
                    {
                        list
                    }
                </ul>
                {
                    btnClearAll
                }
                <Modal
                    title="Some title"
                    onCancelClick={this.handleCloseModal}
                    display={this.state.modalFlag}
                >
                    <ViewTaskModal
                        data={filterElement()} />
                </Modal>
            </Card>);

    }
}