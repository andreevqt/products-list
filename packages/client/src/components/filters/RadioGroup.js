import React from "react";
import RadioGroupContext from "./RadioGroupContext";

const RadioGroup = ({
  children,
  onChange,
  value,
  name,
  label
}) => {

  const handleChange = (e, value) => {
    if (onChange) {
      onChange(e, value);
    }
  }

  return (
    <div className="filter-group">
      <RadioGroupContext.Provider value={{ name, onChange: handleChange, value }}>
        {label && <div className="filter-group__label">{label}</div>}
        <div className="form-group">
          {children}
        </div>
      </RadioGroupContext.Provider>
    </div>
  );
}

export default RadioGroup;