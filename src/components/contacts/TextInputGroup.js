import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  errors
}) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          value={value}
          name={name}
          className={classnames('form-control corm-control-lg', {
            'is-invalid':errors && errors[name]
          })}
          placeholder={placeholder}
          onChange={onChange}
        />
        {errors && errors[name] &&
          <div className="invalid-feedback">{errors[name]}</div>
        }
      </div>
    )
}

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

TextInputGroup.defaultProps = {
  type: 'text'
}
export default TextInputGroup;
