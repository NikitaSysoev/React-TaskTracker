import React from 'react';
import PropTypes from 'prop-types';

import MainList from '../components/main_list';
import MainForm from '../components/main_form';

const MainTab = (props) => {
    console.log("MainTab RND", {props})
    return (
        <div className="row">
            <div className="col-sm-6">
                <MainForm
                    taskForEdit={props.taskForEdit}
                    formSate={props.formSate}
                >
                    <p>This is children from Main Tab</p>
                </MainForm>
            </div>
            <div className="col-sm-6">
                <MainList
                    onTaskEdit={props.onTaskEdit}
                    onTaskDelete={props.onTaskDelete}
                    data={props.taskList}
                />
            </div>
        </div>
    );
}

export default MainTab;

MainTab.propTypes = {
    taskList: PropTypes.array, // список задач
    onTaskEdit: PropTypes.func, // редактировать таску
    onTaskDelete: PropTypes.func, // удалить таску
    formSate: PropTypes.string, // состояние формы (редактровать или добавить таску)
    taskForEdit: PropTypes.object, // номер таски, которую редактируют
};