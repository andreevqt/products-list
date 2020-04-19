import React from "react";
import CheckboxGroup from "./CheckboxGroup";
import Checkbox from "./Checkbox";

const CheckboxFilter = ({
  label,
  name,
  value,
  onChange,
  items
}) => {
  
  return (
    <CheckboxGroup
      label={label}
      name={name}
      value={value}
      onChange={(e, value) => onChange(e, name, value)}
    >
      {
        items.map(item => (
          <Checkbox
            key={item.value}
            label={item.name}
            value={item.value}
          />
        ))
      }
    </CheckboxGroup>
  );
}

export default CheckboxFilter;