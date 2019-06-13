import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const DateInput = (props) => {
    const { label, placeholder, mandatory = false, helper, err } = props;
    const handleView = () => console.log('x')
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
                        <FontAwesomeIcon icon={faCalendar} />
                    </span>
                </div>
                <input
                    readOnly
                    type="text"
                    className={'form-control'}
                    placeholder={placeholder || label}
                />
            </div>
            <small className={`${err && 'text-danger'} form-text text-muted`}>
                {helper || 'Это поле обязательное для заполнения'}
            </small>
        </div>
    )
}

export default DateInput;

DateInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    manadatory: PropTypes.bool,
    helper: PropTypes.string,
    err: PropTypes.bool,
}