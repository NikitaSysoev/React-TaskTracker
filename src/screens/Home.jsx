import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStroopwafel } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <Row>
            <Col>
                <FontAwesomeIcon icon={faUser} />
            </Col>
            <Col>
                <FontAwesomeIcon icon={faStroopwafel} />
            </Col>
        </Row>
    );
}

export default Home;