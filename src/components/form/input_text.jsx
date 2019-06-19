import React from 'react';
import PropTypes from 'prop-types';

const TextInput = props => {
    const { name, onChange, value = '', label, placeholder, mandatory = false, helper, err } = props;
    const mandatoryStr = mandatory && <span className={err ? 'text-danger' : 'text-muted'}>*</span>;
    return (
        <div className="form-group">
            <label htmlFor={name} className={err ? 'text-danger' : null}>
                {label}
                {mandatoryStr}
            </label>
            <input
                name={name}
                onChange={typeof onChange === 'function' ? onChange : null}
                value={value}
                className={`${err && 'is-invalid'} form-control`}
                placeholder={placeholder || label} />
            <small className={`${err ? 'text-danger' : 'text-muted'} form-text`}>
                {helper || 'Это поле обязательно для заполнения'}
            </small>
        </div>

    )
}

export default TextInput;

TextInput.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    mandatory: PropTypes.bool,
    helper: PropTypes.string,
    err: PropTypes.bool,
}