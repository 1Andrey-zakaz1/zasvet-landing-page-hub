
import React from "react";
import { SliderRange } from "../SliderRange";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  value: [number, number];
  min: number;
  max: number;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  priceMin: number;
  priceMax: number;
};

const PriceSliderFilter: React.FC<Props> = ({
  value, min, max, setFilters, priceMin, priceMax,
}) => (
  <SliderRange
    label="Цена, ₽"
    value={value}
    min={min}
    max={max}
    onChange={([minVal, maxVal]) => setFilters(f => ({
      ...f,
      price_min: minVal === priceMin ? "" : String(minVal),
      price_max: maxVal === priceMax ? "" : String(maxVal),
    }))}
    colorThumb="custom"
  />
);

export default PriceSliderFilter;
