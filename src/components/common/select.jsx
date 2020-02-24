import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {options[0] && (
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map(option => (
            <option key={option._id} value={option[name]}>
              {option[name]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Select;
