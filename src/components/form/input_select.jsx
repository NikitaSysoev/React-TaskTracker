import React from 'react';
import PropTypes from 'prop-types';

const renderSelectOptions = item => {
    let value = null;
    let title = null;
    if (typeof item === 'object') {
        value = item.value;
        title = item.title;
    } else {
        value = title = String(item);
    }

    return <option key={value} value={value} >
        {
            title
        }
    </option>
}

const SelectInput = props => {
    const { name, onChange, value = '', label, options, placeholder, mandatory = false, helper, err } = props;
    const mandatoryStr = mandatory && <span className="text-muted">*</span>;
    return (
        <div className="form-group">
            <label className={err ? 'text-danger' : null}>
                {label}{mandatoryStr}
            </label>
            <select
                className={`${err && 'is-invalid'} form-control`}
                name={name}
                value={value.toLocaleUpperCase()}
                onChange={typeof onChange === 'function' ? onChange : null}
                placeholder={placeholder}
            >
                {options.map(renderSelectOptions)}
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
    placeholder: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    label: PropTypes.string,
    mandatory: PropTypes.bool,
    helper: PropTypes.string,
    err: PropTypes.bool,
}