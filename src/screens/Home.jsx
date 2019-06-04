import React from 'react';
import { Row, Col } from 'react-bootstrap';

import TaskList from '../components/taskList';
import TaskForm from '../components/form';

const Home = () => {
    return (
        <Row>
            <Col>
                <TaskForm />
            </Col>
            <Col>
                <TaskList />
            </Col>
        </Row>
    );
}

export default Home;