import React from "react";
import useRadioGroup from "./useRadioGroup";
import CheckboxBase from "./CheckboxBase";

const Radio = ({
  checked,
  onChange,
  label,
  value,
  name
}) => {
  const group = useRadioGroup()

  return (
    <label className="horizontal-field">
      <CheckboxBase
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
        group={group}
        type="radio"
      />
      {label}
    </label>
  );
}

export default Radio;