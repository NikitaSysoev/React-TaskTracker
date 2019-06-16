import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Calendar from '../calendar'

const DateInput = (props) => {
    const { label, icon, placeholder, mandatory = false, helper, err } = props;

    const [visibleCalendar, setVisibleCalendar] = React.useState(false);

    const handleView = () => setVisibleCalendar(visibleCalendar => !visibleCalendar);

    const mandatoryStr = mandatory && <span className="text-muted">*</span>;
    return (
        <div className="form-group">
            <label>
                {label}
                {mandatoryStr}
            </label>
            <div className="input-group">
                <div className="input-group-prepend" onClick={handleView}>
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={icon || faCalendar} />
                    </span>
                </div>
                <input
                    readOnly
                    type="text"
                    className={'form-control'}
                    placeholder={placeholder || label}
                />
            </div>
            <Calendar
                handleView={handleView}
                display={visibleCalendar} />
            <small className={`${err && 'text-danger'} form-text text-muted`}>
                {helper || 'Это поле обязательное для заполнения'}
            </small>
        </div>
    )
}

export default DateInput;

DateInput.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.object,
    placeholder: PropTypes.string,
    manadatory: PropTypes.bool,
    helper: PropTypes.string,
    err: PropTypes.bool,
}