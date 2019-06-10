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
        const { target } = e;
        const taskId = target.getAttribute('data-id');
        this.setState({
            taskId,
            modalFlag: true
        })
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

    renderOneTask = (item) => {
        return (
            <li key={item.id} className="list-group-item" style={{ position: "relative" }}>
                {
                    item.taskUrgent && (<FontAwesomeIcon icon={faExclamationTriangle} />)
                }
                <a
                    href="#"
                    onClick={this.handleViewTask}
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
                    this.props.children // компоненты "дети", которые были переданы внутрь <MainList>....</MainList>
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