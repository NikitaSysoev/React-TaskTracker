import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const renderNavItem = (item) => {
    const { title, onClick, isActive, name } = item;
    return (
        <a
            href={name}
            data-name={name}
            key={name}
            onClick={onClick}
            className={`nav-item nav-link ${isActive ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
        >{title}</a>
    )
}

const Navigation = (props) => {
    const { items = [] } = props;
    return (
        <nav>
            <div className="nav nav-tabs">
                {
                    items.map(renderNavItem)
                }
            </div >
        </nav>
    )
}

export default React.memo(Navigation);

Navigation.propTypes = {
    items: PropTypes.array,
}

Navigation.defaultTypes = {
    items: []
}