import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../card';
import ViewTaskModal from '../task/view_task';
import Modal from '../modals/simple_modal';
import * as actions from '../../store/action_creators';
import { FORM_ADD, FORM_EDIT } from '../../lib/const';

class MainList extends React.Component {
    static propTypes = {
        taskList: PropTypes.array,
        taskUpdate: PropTypes.func,
        taskDelete: PropTypes.func,
        setFormState: PropTypes.func,
        taskForEdit: PropTypes.string, // номер таски, которую редактируют
        formState: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            modalFlag: false,
            taskId: null
        }
    }

    componentDidMount() {
        let taskList = [];
        try {
            taskList = JSON.parse(localStorage.getItem('TASKS')) || [];
        } catch {
            console.error('Error localstorage upload data');
        }
        this.props.taskUpdate({ taskList });
    }


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
        });
    }

    handleEditTask = (e) => {
        e.persist(); // convert event React to event DOM
        const { currentTarget: target } = e;
        const taskId = target.getAttribute('data-id');
        
        this.props.setFormState({ formState: FORM_EDIT, taskId });
        
        if (this.props.formState === FORM_EDIT && taskId === this.props.taskForEdit){
            this.props.setFormState({ formState: FORM_ADD, taskId: null })
        }
    };

    handleDeleteTask = (e) => {
        e.persist(); // convert event React to event DOM
        const { taskList } = this.props;
        const { currentTarget: target } = e;
        const taskId = target.getAttribute('data-id');
        this.props.taskDelete({ taskList, taskId });
    };

    handleClearList = () => {
        this.props.taskUpdate({ taskList: [] });
        localStorage.removeItem('TASKS');
    }

    renderOneTask = (item) => {
        const { taskForEdit } = this.props;
        const isActive = taskForEdit && taskForEdit === item.id ? 'active' : '';
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

        const list = this.props.taskList && this.props.taskList.length
            ? this.props.taskList.map(this.renderOneTask)
            : emptyList;

        const btnClearAll = this.props.taskList && this.props.taskList.length ?
            <button
                type="button"
                className="btn btn-outline-danger"
                onClick={this.handleClearList}
                style={{ marginTop: '10px' }}>
                Clear List
            </button>
            :
            null;

        const filterElement = () => {
            return this.props.taskList ?
                this.props.taskList.find(item => String(item.id) === this.state.taskId)
                : null;
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
                    title="Task Info"
                    onCancelClick={this.handleCloseModal}
                    display={this.state.modalFlag}
                >
                    <ViewTaskModal
                        data={filterElement()} />
                </Modal>
            </Card>);

    }
}

const mapStateToProps = store => {
    return {
        taskForEdit: store.app.taskId,
        formState: store.app.formState,
        taskList: [...store.app.taskList]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        taskUpdate: (payload) => dispatch(actions.updateTask(payload)),
        taskDelete: (payload) => dispatch(actions.deleteTask(payload)),
        setFormState: payload => dispatch(actions.setFormState(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainList);