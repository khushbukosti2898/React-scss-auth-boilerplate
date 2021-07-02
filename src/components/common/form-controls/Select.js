/* eslint-disable max-len */
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { getSentenceFromCamelCase } from '../../../utils/helper';

const ReactSelect = (props) => {
  const {
    options,
    name,
    className,
    isSearchable,
    placeholder,
    isRequired,
    error,
    isClearable,
    formGroupClassName,
    labelClassName,
    label,
    isMulti,
    isDisabled,
    noOptionsMessage,
    onChange,
    menuPlacement,
    isLoading,
    loadingMessage,
    value,
    validationHandler,
  } = props;

  const onValidationChange = (event) => {
    if (!validationHandler) return;
    let errorMessage = '';
    if (!event && isRequired) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
    }
    validationHandler(name, errorMessage);
  };

  return (
    <div className={formGroupClassName || 'form-group'}>
      {label && (
        <label className={labelClassName} htmlFor={name}>
          {label}
          {isRequired && <span style={{ color: 'red' }}> * </span>}
        </label>
      )}
      <Select
        menuPlacement={menuPlacement}
        classNamePrefix="react_select"
        className={className}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        placeholder={placeholder}
        name={name}
        options={options}
        value={value}
        isDisabled={isDisabled}
        noOptionsMessage={() => noOptionsMessage}
        isLoading={isLoading}
        loadingMessage={() => loadingMessage}
        onChange={(e) => {
          onValidationChange(e);
          onChange(name, e);
        }}
        required={isRequired}
      />
      {error ? <span className="text-danger fs-12">{error}</span> : null}
    </div>
  );
};

ReactSelect.defaultProps = {
  value: {},
  label: 'Defalut Select',
  placeholder: 'Select',
  isRequired: false,
  className: '',
  labelClassName: '',
  formGroupClassName: '',
  isSearchable: false,
  isMulti: false,
  isClearable: true,
  error: '',
  isDisabled: false,
  noOptionsMessage: 'No options',
  onChange: () => {},
  menuPlacement: 'bottom',
  isLoading: false,
  loadingMessage: 'Loading...',
  validationHandler: () => {},
};

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  formGroupClassName: PropTypes.string,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  error: PropTypes.string,
  isDisabled: PropTypes.bool,
  noOptionsMessage: PropTypes.string,
  onChange: PropTypes.func,
  menuPlacement: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  validationHandler: PropTypes.func,
};

export default ReactSelect;
