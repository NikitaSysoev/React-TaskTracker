import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = props => {
    const { name, onChange, value = '', label, mandatory = false, helper, err } = props;
    const mandatoryStr = mandatory && <span className="text-muted">*</span>;
    return (
        <div className="form-group">
            <label className={err ? 'text-danger' : null}>
                {label}{mandatoryStr}
            </label>
            <select
                className={`${err && 'is-invalid'} form-control`}
                name={name}
                value={value}
                onChange={typeof onChange === 'function' ? onChange : null}
            >
                <option value="todo">To do</option>
                <option value="inprogress">In progress</option>
                <option value="done">Done</option>
            </select>
            <small className={`${err && 'text-danger'} form-text text-muted`}>
                {helper}
            </small>
        </div>
    )
}

export default SelectInput;

SelectInput.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    mandatory: PropTypes.bool,
    helper: PropTypes.string,
    err: PropTypes.bool,
}