import React from 'react';
import PropTypes from 'prop-types';

const TextArea = props => {
    const { name, rows = null, cols = null, onChange, value = '', label, placeholder, mandatory = false, helper, err } = props;
    const mandatoryStr = mandatory && <span className="text-muted">*</span>;
    const colsRows = {};
    if (rows !== null) {
        colsRows.rows = rows;
    }
    if (cols !== null) {
        colsRows.cols = cols;
    }

    return (
        <div className="form-group">
            <label htmlFor={name} className={err ? 'text-danger' : null}>
                {label}
                {mandatoryStr}
            </label>
            <textarea
                name={name}
                onChange={typeof onChange === 'function' ? onChange : null}
                value={value}
                className={`${err && 'is-invalid'} form-control`}
                placeholder={placeholder || label}
                {...colsRows}
                style={{ resize: "none" }}
            />
            <small className={`${err && 'text-danger'} form-text text-muted`}>
                {helper}
            </small>
        </div>

    )
}

export default TextArea;

TextArea.propTypes = {
    name: PropTypes.string,
    rows: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    mandatory: PropTypes.bool,
    helper: PropTypes.string,
    err: PropTypes.bool,
    cols: PropTypes.number
}