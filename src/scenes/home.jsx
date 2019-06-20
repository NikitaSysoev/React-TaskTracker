import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as URL from '../router/url';
import './css/home.css';

const Home = (props) => {
    return (
        <div className="masthead">
            <div className="overlay" />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="site-heading" style={{ height: '80vh' }}>
                            <div>
                                <h4 style={{ color: 'white' }}>
                                    Welcome to React TaskTracker
                                </h4>
                                <br />
                                <Link to={URL.URL_TASK_FORM}>
                                    <Button variant="outline-light" size="lg">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    );
}

export default React.memo(withRouter(Home));