
import React from "react";
import { SliderRange } from "../SliderRange";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  value: [number, number];
  min: number;
  max: number;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  lumenMin: number;
  lumenMax: number;
};

const LumenSliderFilter: React.FC<Props> = ({
  value, min, max, setFilters, lumenMin, lumenMax,
}) => (
  <SliderRange
    label="Световой поток, лм"
    value={value}
    min={min}
    max={max}
    onChange={([minVal, maxVal]) => setFilters(f => ({
      ...f,
      lumen_min: minVal === lumenMin ? "" : String(minVal),
      lumen_max: maxVal === lumenMax ? "" : String(maxVal),
    }))}
    colorThumb="custom"
  />
);

export default LumenSliderFilter;
