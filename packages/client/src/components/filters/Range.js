import React from "react";

const Range = ({
  name,
  min,
  max,
  step,
  value,
  onChange,
  label,
}) => {
  return (
    <div className="filter-group">
      {label && <div className="filter-group__label">{label}</div>}
      <input
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="range"
        type="range" />
    </div>
  )
}

export default Range