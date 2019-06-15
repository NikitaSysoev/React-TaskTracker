import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/action_creators';

import { Card } from '../card';
import { TextInput, TextArea, SelectInput, CheckboxInput, DateInput } from '../form';
import { TASK_OPTIONS, FORM_ADD, TODO } from '../../lib/const';

class MainForm extends React.Component {
    static propTypes = {
        taskForEdit: PropTypes.string, // номер таски, которую редактируют
        formState: PropTypes.string,
        taskList: PropTypes.array,
        taskAdd: PropTypes.func,
        setFormState: PropTypes.func,
        taskEdit: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            err: {},
            propsFlag: false
        }
    }

    // static getDerivedStateFromProps = (nextProps, state) => {
    //     if (!state.propsFlag && nextProps.taskForEdit !== null && nextProps.taskList.length) {
    //         const data = { ...nextProps.taskList.find(item => item.id === nextProps.taskForEdit) };
    //         return {
    //             data,
    //             propsFlag: true
    //         }
    //     }
    //     return null;
    // };

    componentDidUpdate(prevProps) {
        if (this.props.taskForEdit !== prevProps.taskForEdit) {
            this.setState({
                data: { ...this.props.taskList.find(item => item.id === this.props.taskForEdit) }
            })
        }
    }


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

    handleResetData = () => {
        if (this.props.formState === FORM_ADD) {
            this.setState({ data: {} });
        } else {
            this.props.setFormState({ formState: FORM_ADD, taskId: null });
            this.setState({ data: {} });
        }
    }

    handleSaveData = (e) => {
        e.preventDefault();
        const { data } = this.state;
        const { taskStatus = TODO } = data;
        const { taskList, taskForEdit } = this.props;
        if (this.props.formState === FORM_ADD) {
            const newItem = { ...data, taskStatus, id: String(Date.now()) };
            this.props.taskAdd({ newItem, taskList });
        } else {
            const newItem = { ...data };
            this.props.taskEdit({ newItem, taskList, taskForEdit });
            this.props.setFormState({ formState: FORM_ADD, taskId: null })
        }
        this.setState({ data: {} });
    }

    render() {
        return (
            <Card>
                <h4>
                    {
                        this.props.formState === FORM_ADD
                            ? "Add new task"
                            : `Edit task ${this.state.data.taskName || ""}`
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

                <DateInput
                    label='Task date'
                    placeholder='Date'
                    mandatory
                />

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
                            className={`btn ${this.props.formState === FORM_ADD ?
                                'btn-primary' : 'btn-warning'}`}
                            onClick={this.handleSaveData}
                        >
                            {
                                this.props.formState === FORM_ADD ?
                                    "Add new task" : "Save changes"
                            }
                        </button>
                    </div>
                    <div className='col-sm-6'>
                        <button
                            type="submit"
                            className={`btn ${this.props.formState === FORM_ADD ?
                                'btn-secondary' : 'btn-danger'}`}
                            onClick={this.handleResetData}
                        >
                            {
                                this.props.formState === FORM_ADD ?
                                    "Clear form" : "Cancel"
                            }
                        </button>
                    </div>
                </div>
            </Card>
        )
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
        taskAdd: payload => dispatch(actions.addTask(payload)),
        taskEdit: payload => dispatch(actions.editTask(payload)),
        setFormState: payload => dispatch(actions.setFormState(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);