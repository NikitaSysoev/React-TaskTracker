import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom'; //  , Switch
import * as URL from './url';

import Home from '../scenes/home';
const TaskForm = lazy(() => import('../scenes/main'));
const TaskDnd = lazy(() => import('../scenes/dnd'));
const Page404 = lazy(() => import('../scenes/404'));
const ViewTaskOne = lazy(() => import('../scenes/view_task_one'));

export default (
    <Switch>
        <Route exact path={URL.URL_HOME} component={Home} />
        <Route exact path={URL.URL_TASK_FORM} component={TaskForm} />
        <Route exact path={URL.URL_TASK_DND} component={TaskDnd} />
        <Route exact path={URL.URL_TASK_VIEW_ONE} component={ViewTaskOne} />

        <Route component={Page404} />
    </Switch>);