
import React from "react";
import { SliderRange } from "../SliderRange";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  value: [number, number];
  min: number;
  max: number;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  heightMin: number;
  heightMax: number;
};

const HeightSliderFilter: React.FC<Props> = ({
  value, min, max, setFilters, heightMin, heightMax,
}) => (
  <SliderRange
    label="Высота, мм"
    value={value}
    min={min}
    max={max}
    onChange={([minVal, maxVal]) => setFilters(f => ({
      ...f,
      height_min: minVal === heightMin ? "" : String(minVal),
      height_max: maxVal === heightMax ? "" : String(maxVal),
    }))}
    colorThumb="custom"
  />
);

export default HeightSliderFilter;
