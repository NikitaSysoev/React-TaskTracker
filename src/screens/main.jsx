import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import MainList from '../components/main_list';
import MainForm from '../components/main_form';

const MainTab = () => {
    return (
        <Row>
            <Col>
                <MainForm />
            </Col>
            <Col>
                <MainList />
            </Col>
        </Row>
    );
}

export default MainTab;