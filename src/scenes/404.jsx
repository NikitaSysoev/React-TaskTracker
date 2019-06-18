import React from 'react';

const Page404 = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <h1>404</h1>
                    <h4>PAge not found</h4>
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    );
}

export default React.memo(Page404);