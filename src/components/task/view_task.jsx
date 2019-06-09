import React from 'react';
import PropTypes from 'prop-types';

const ViewTaskModal = (props) => {
    const { data } = props;
    return (
        <React.Fragment>
            <small className="text-muted">task name</small>
            <br />{data.taskName}<br />
            <small className="text-muted">task status</small>
            <br />{data.taskStatus}<br />
            <small className="text-muted">task date</small>
            <br />{data.taskDate}<br />
            <small className="text-muted">task description</small>
            <br />{data.taskDescription}<br />
            <small className="text-muted">urgent</small>
            <br />{data.taskUrgent ? "Важная задача" : "Обычная задача"}
        </React.Fragment>
    );
};

ViewTaskModal.propTypes = {
    data: PropTypes.object, // все данные по таске
};

export default React.memo(ViewTaskModal);