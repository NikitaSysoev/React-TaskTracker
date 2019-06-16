import React from 'react';
import {withRouter} from 'react-router';

const Home = (props) => {
    return (
        <div className="row">
            <div className="col-sm-6">
                <h2>This is home</h2>
                <br />
                <h4>Choose route:</h4>
                {
                    props.children
                }
            </div>
        </div>
    );
}

export default React.memo(withRouter(Home));