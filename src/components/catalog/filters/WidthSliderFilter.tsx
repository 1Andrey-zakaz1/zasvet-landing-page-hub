
import React from "react";
import { SliderRange } from "../SliderRange";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  value: [number, number];
  min: number;
  max: number;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  widthMin: number;
  widthMax: number;
};

const WidthSliderFilter: React.FC<Props> = ({
  value, min, max, setFilters, widthMin, widthMax,
}) => (
  <SliderRange
    label="Ширина, мм"
    value={value}
    min={min}
    max={max}
    onChange={([minVal, maxVal]) => setFilters(f => ({
      ...f,
      width_min: minVal === widthMin ? "" : String(minVal),
      width_max: maxVal === widthMax ? "" : String(maxVal),
    }))}
    colorThumb="custom"
  />
);

export default WidthSliderFilter;
