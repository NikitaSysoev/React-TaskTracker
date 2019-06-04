import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <div
                    name="home"
                    className={'nav-link active'}
                ><Link to="/">Home</Link></div>
            </li>
            <li className="nav-item">
                <div
                    name="dnd"
                    className={'nav-link'}
                > <Link to="/dnd">DnD</Link></div>
            </li>
        </ul >
    )
}

export default Header;