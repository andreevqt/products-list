import React from "react";
import useCheckboxGroup from "./useCheckboxGroup";
import CheckboxBase from "./CheckboxBase";

const Checkbox = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  const group = useCheckboxGroup();

  return (
    <label className="horizontal-field">
      <CheckboxBase
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
        group={group}
        type="checkbox"
      />
      {label}
    </label>
  );
}

export default Checkbox;