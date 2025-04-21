
import React from "react";
import { SliderRange } from "../SliderRange";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  value: [number, number];
  min: number;
  max: number;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  powerMin: number;
  powerMax: number;
};

const PowerSliderFilter: React.FC<Props> = ({
  value, min, max, setFilters, powerMin, powerMax,
}) => (
  <SliderRange
    label="Мощность, Вт"
    value={value}
    min={min}
    max={max}
    onChange={([minVal, maxVal]) => setFilters(f => ({
      ...f,
      power_min: minVal === powerMin ? "" : String(minVal),
      power_max: maxVal === powerMax ? "" : String(maxVal),
    }))}
    colorThumb="custom"
  />
);

export default PowerSliderFilter;
