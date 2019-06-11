import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { Card } from '../card';
import { TextInput, TextArea, SelectInput, CheckboxInput } from '../form';
import { TASK_OPTIONS, FORM_ADD, TODO } from '../../lib/const';

export default class MainForm extends React.Component {
    static propTypes = {
        formSate: PropTypes.string, // состояние формы (редактровать или добавить таску)
        taskForEdit: PropTypes.object, // номер таски, которую редактируют
        onSaveData: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            err: {},
            propsFlag: false
        }
    }

    static getDerivedStateFromProps = (nextProps, state) => {
        if (!state.propsFlag && nextProps.taskForEdit) {
            return {
                data: nextProps.taskForEdit,
                propsFlag: true
            }
        }
        return null;
    };


    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const result = type === 'checkbox' ? checked : value;
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: result
            }
        }));
    }

    handleClearForm = () => {
        this.setState({ data: {} });
    }

    handleResetData = () => {
        this.handleClearForm();
    }

    handleSaveData = (e) => {
        e.preventDefault();
        const { taskStatus = TODO } = this.state.data;
        if (this.props.onSaveData({ ...this.state.data, taskStatus, id: new Date().valueOf() }) === true) {
            this.setState({ data: {} });
        }
    }

    render() {
        return (
            <Card>
                <h4>
                    {
                        this.props.formSate === FORM_ADD
                            ? "Add new task"
                            : `Edit task ${this.props.taskId || ""}`
                    }
                </h4>

                <TextInput
                    value={this.state.data.taskName || ''}
                    name='taskName'
                    onChange={this.handleChange}
                    label='Task name'
                    helper={this.state.err.taskName || 'Введите название вашей задачи'}
                    err={!!this.state.err.taskName}
                    mandatory
                />

                <TextArea
                    value={this.state.data.taskDescription || ''}
                    name='taskDescription'
                    onChange={this.handleChange}
                    label='Task description'
                    helper={'Введите описание вашей задачи'}
                    rows={4}
                />

                <div className="form-group">
                    <label>Task date<span className="text-muted">*</span></label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faCalendar} />
                            </span>
                        </div>
                        <input
                            type="text"
                            className={'form-control'}
                            placeholder="Date"
                        />
                    </div>
                    <small className="form-text text-muted">
                        Это поле обязательное для заполнения
                    </small>
                </div>

                <SelectInput
                    value={this.state.data.taskStatus || TODO}
                    options={TASK_OPTIONS}
                    name='taskStatus'
                    onChange={this.handleChange}
                    label='Select status'
                    placeholder={'Status'}
                    helper={'Выберите статус задачи'}
                />

                <CheckboxInput
                    checked={this.state.data.taskUrgent || false}
                    name='taskUrgent'
                    onChange={this.handleChange}
                    helper={'Укажите важность для задачи'}
                    label='Task Urgency'
                />

                <div className="row">
                    <div className='col-sm-6'>
                        <button
                            type="submit"
                            className={`btn ${this.props.formSate === FORM_ADD ? 'btn-primary' : 'btn-warning'}`}
                            onClick={this.handleSaveData}
                        >
                            {
                                this.props.formSate === FORM_ADD ? "Add new task" : "Save changes"
                            }
                        </button>
                    </div>
                    <div className='col-sm-6'>
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            onClick={this.handleResetData}
                        >
                            {
                                this.props.formSate === FORM_ADD ? "Clear form" : "Cancel"
                            }
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
} 