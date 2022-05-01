/* eslint-disable no-unused-vars */
import React from "react";
import { Slider } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export const RangeSlider = ({
  min,
  max,
  defaultValue,
  handleDistanceFilter,
}) => {
  console.log(defaultValue, max);
  console.log("render");
  return (
    <div style={{ width: "100%" }}>
      <Slider
        progress
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={(value) => handleDistanceFilter(value)}
      />
    </div>
  );
};
