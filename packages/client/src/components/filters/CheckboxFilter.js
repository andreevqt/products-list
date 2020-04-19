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
      onChange={() => onChange(name, value)}
    >
      {
        items.map(item => (
          <Checkbox
            key={item.value}
            label={item.name}
            value={items.find(item => item.name === item.name).value}
          />
        ))
      }
    </CheckboxGroup>
  );
}

export default CheckboxFilter;