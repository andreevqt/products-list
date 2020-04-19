import React from "react";
import CheckboxGroupContext from "./CheckboxGroupContext";

const CheckboxGroup = ({
  label,
  children,
  onChange,
  value,
  name,
}) => {
  return (  
    <div className="filter-group">
      <CheckboxGroupContext.Provider value={{ name, onChange, value }}>
        {label && <div className="filter-group__label"> {label}</div>}
        <div className="form-group">
          {children} 
        </div>
      </CheckboxGroupContext.Provider>
    </div >
  );
}

export default CheckboxGroup;