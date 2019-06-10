import React from 'react';

export const Card = (props) => {
    const { children } = props;
    return (
        <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

