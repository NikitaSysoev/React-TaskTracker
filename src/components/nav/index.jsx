import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { NAV_ITEMS, NAV_MAIN } from '../../lib/nav_data';

const isItemActive = (url, location) => {
	let { pathname } = location;

	if (pathname.charAt(pathname.length-1) === "/" && pathname.length > 1) {
		pathname = pathname.slice(0, -1);
	}

	if (pathname === url) {
		return "active";
	}
	return "";
};



const Navigation = (props) => {

	const renderNavItem = (item) => {
		const {
			title,
			name,
			url,
		} = item;

		const isActive = isItemActive(url, props.location)

		return (
			<Link
				to={ url }
				role="button"
				key={ name }
				className={ `nav-item nav-link ${ isActive ? "active" : "" }` }
			>
				{ title }
			</Link>
		)
	};

	console.log("NAV = ", props)
	return (
		<nav>
			<div className="nav nav-tabs">
				{
					NAV_ITEMS.map(renderNavItem)
				}
			</div>
		</nav>);
};


export default React.memo(withRouter(Navigation));