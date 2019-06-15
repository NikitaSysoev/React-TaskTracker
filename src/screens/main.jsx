import React from 'react';

import MainList from '../components/main_list';
import MainForm from '../components/main_form';

const MainTab = (props) => {
    return (
        <div className="row">
            <div className="col-sm-6">
                <MainForm />
            </div>
            <div className="col-sm-6">
                <MainList />
            </div>
        </div>
    );
}

export default MainTab;