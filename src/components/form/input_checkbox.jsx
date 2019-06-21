import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const CheckboxInput = props => {
    const { name, onChange, checked = false, label, helper } = props;
    return (
        <div className="form-group form-check">
            <input
                name={name}
                checked={checked}
                onChange={typeof onChange === 'function' ? onChange : null}
                type="checkbox"
                className="form-check-input"
                style={{ cursor: 'pointer' }}
            />
            <label className="form-check-label" >
                <FontAwesomeIcon icon={faExclamationTriangle} /> {label}
            </label>
            <small className={`form-text text-muted`}>
                {helper}
            </small>
        </div>
    )
}

export default CheckboxInput;

CheckboxInput.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    label: PropTypes.string,
    helper: PropTypes.string,
}