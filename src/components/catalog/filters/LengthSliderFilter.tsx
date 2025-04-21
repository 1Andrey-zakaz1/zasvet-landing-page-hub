
import React from "react";
import { SliderRange } from "../SliderRange";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  value: [number, number];
  min: number;
  max: number;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  lengthMin: number;
  lengthMax: number;
};

const LengthSliderFilter: React.FC<Props> = ({
  value, min, max, setFilters, lengthMin, lengthMax,
}) => (
  <SliderRange
    label="Длина, мм"
    value={value}
    min={min}
    max={max}
    onChange={([minVal, maxVal]) => setFilters(f => ({
      ...f,
      length_min: minVal === lengthMin ? "" : String(minVal),
      length_max: maxVal === lengthMax ? "" : String(maxVal),
    }))}
    colorThumb="custom"
  />
);

export default LengthSliderFilter;
