import React from "react";

const CheckboxBase = ({
  checked,
  onChange,
  value,
  name,
  type,
  group
}) => {
  if (group) {
    if (typeof checked === "undefined") {
      if (type === "checkbox") {
        checked = group.value.indexOf(value) !== -1;
      }
      if (type === "radio") {
        checked = group.value === value;
      }
    }
    if (typeof name === "undefined") {
      name = group.name;
    }
    if (typeof onChange === "undefined") {
      onChange = (e) => group.onChange(e, value);
    }
  }

  return (
    <input
      name={name}
      type={type}
      onChange={onChange}
      checked={checked}
      className="horizontal-field__input"
    />
  );
}

export default CheckboxBase