import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';

const Task = ({ openModal, taskname, taskdesciption, date, urgent, status }) => {
    return (
        <li class="list-group-item">
            <p onClick={openModal}>{taskname}</p>
            <br />
            <span class="text-muted">
                <small>{date}</small>
            </span>
            <br />
            <span class="edit_ico">
                <FontAwesomeIcon icon={faStar} />
            </span>
            <span class="edit_ico">
                <FontAwesomeIcon icon={faEdit} onClick={openModal} />
            </span>
            <span class="delete_ico">
                <FontAwesomeIcon icon={faTimes} onClick={openModal} />
            </span>
        </li>
    )
}

export default React.memo(Task);

Task.propTypes = {
    openModal: PropTypes.func.isRequired,
    taskname: PropTypes.string.isRequired,
    taskdesciption: PropTypes.string,
    date: PropTypes.number.isRequired,
    urgent: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    taskid: PropTypes.string.isRequired
}