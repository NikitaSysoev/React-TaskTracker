import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

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
                <FontAwesomeIcon icon={faStroopwafel} />
            </Col>
        </Row>
    );
}

export default Home;