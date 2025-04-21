
import React from "react";
import { useNormalizedKssList } from "./useNormalizedKssList";
import { catalogData } from "./catalogData";
import SearchFilter from "./filters/SearchFilter";
import SeriesFilter from "./filters/SeriesFilter";
import PowerSliderFilter from "./filters/PowerSliderFilter";
import LumenSliderFilter from "./filters/LumenSliderFilter";
import PriceSliderFilter from "./filters/PriceSliderFilter";
import IpRatingFilter from "./filters/IpRatingFilter";
import KssTypeFilter from "./filters/KssTypeFilter";
import LengthSliderFilter from "./filters/LengthSliderFilter";
import WidthSliderFilter from "./filters/WidthSliderFilter";
import HeightSliderFilter from "./filters/HeightSliderFilter";
import ResetFiltersButton from "./filters/ResetFiltersButton";

export interface FilterValues {
  query: string;
  series: string;
  power_min: string;
  power_max: string;
  lumen_min: string;
  lumen_max: string;
  price_min: string;
  price_max: string;
  ip_rating: string;
  kss_type: string;
  kss_angle: string;
  mounting: string;
  length_min: string;
  length_max: string;
  width_min: string;
  width_max: string;
  height_min: string;
  height_max: string;
  only_available: boolean;
}

type Props = {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  allSeries: string[];
  allIpRatings: string[];
  allKssTypes: string[];
};

const getCatalogMinMax = (
  arr: { [key: string]: any }[],
  field: string,
  keepZero = false
): [number, number] => {
  const nums = arr.map(item => Number(item[field])).filter(x => !isNaN(x) && (keepZero || x > 0));
  return [Math.min(...nums), Math.max(...nums)];
};

const CatalogFilterPanel: React.FC<Props> = ({
  filters,
  setFilters,
  allSeries,
  allIpRatings,
  allKssTypes,
}) => {
  const [powerMinOrig, powerMax] = getCatalogMinMax(catalogData, "power", false);
  const powerMin = Math.min(powerMinOrig, 10);

  const [lumenMinOrig, lumenMax] = getCatalogMinMax(catalogData, "luminous_flux", false);
  const lumenMin = Math.min(lumenMinOrig, 1360); // минимальный световой поток 1360лм

  const [lengthMinOrig, lengthMax] = React.useMemo(() => {
    const arr = catalogData.map(f => Number(f.dimensions.match(/L:\s*(\d+)/)?.[1] ?? 0)).filter(Boolean);
    return [Math.min(...arr), Math.max(...arr)];
  }, []);
  const lengthMin = Math.min(lengthMinOrig, 180); // минимальная длина 180 мм

  const [widthMin, widthMax] = React.useMemo(() => {
    const arr = catalogData.map(f => Number(f.dimensions.match(/W:\s*(\d+)/)?.[1] ?? 0)).filter(Boolean);
    return [Math.min(...arr), Math.max(...arr)];
  }, []);
  const [heightMin, heightMax] = React.useMemo(() => {
    const arr = catalogData.map(f => Number(f.dimensions.match(/H:\s*(\d+)/)?.[1] ?? 0)).filter(Boolean);
    return [Math.min(...arr), Math.max(...arr)];
  }, []);
  const [priceMin, priceMax] = getCatalogMinMax(catalogData, "price", true);

  const current = {
    power: [
      filters.power_min !== "" ? Number(filters.power_min) : powerMin,
      filters.power_max !== "" ? Number(filters.power_max) : powerMax
    ] as [number, number],
    lumen: [
      filters.lumen_min !== "" ? Number(filters.lumen_min) : lumenMin,
      filters.lumen_max !== "" ? Number(filters.lumen_max) : lumenMax
    ] as [number, number],
    price: [
      filters.price_min !== "" ? Number(filters.price_min) : priceMin,
      filters.price_max !== "" ? Number(filters.price_max) : priceMax
    ] as [number, number],
    length: [
      filters.length_min !== "" ? Number(filters.length_min) : lengthMin,
      filters.length_max !== "" ? Number(filters.length_max) : lengthMax
    ] as [number, number],
    width: [
      filters.width_min !== "" ? Number(filters.width_min) : widthMin,
      filters.width_max !== "" ? Number(filters.width_max) : widthMax
    ] as [number, number],
    height: [
      filters.height_min !== "" ? Number(filters.height_min) : heightMin,
      filters.height_max !== "" ? Number(filters.height_max) : heightMax
    ] as [number, number],
  };

  const uniqueKssTypes = useNormalizedKssList(allKssTypes);

  return (
    <form
      className="bg-zasvet-gray/10 rounded-lg p-4 mb-8 border border-zasvet-gold/30 flex flex-col gap-4 animate-fade-in"
      onSubmit={e => e.preventDefault()}
    >
      <div className=" flex flex-col gap-1">
        <label className="text-zasvet-gold text-xs font-medium mb-0 ml-1">
          Поиск по названию
        </label>
        <div>
          <SearchFilter query={filters.query} setFilters={setFilters} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SeriesFilter series={filters.series} setFilters={setFilters} allSeries={allSeries} />
        <KssTypeFilter kss_type={filters.kss_type} setFilters={setFilters} uniqueKssTypes={uniqueKssTypes} />
        <IpRatingFilter ip_rating={filters.ip_rating} setFilters={setFilters} allIpRatings={allIpRatings} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        <PowerSliderFilter
          value={current.power}
          min={powerMin}
          max={powerMax}
          setFilters={setFilters}
          powerMin={powerMin}
          powerMax={powerMax}
        />
        <LumenSliderFilter
          value={current.lumen}
          min={lumenMin}
          max={lumenMax}
          setFilters={setFilters}
          lumenMin={lumenMin}
          lumenMax={lumenMax}
        />
        <PriceSliderFilter
          value={current.price}
          min={priceMin}
          max={priceMax}
          setFilters={setFilters}
          priceMin={priceMin}
          priceMax={priceMax}
        />
        <LengthSliderFilter
          value={current.length}
          min={lengthMin}
          max={lengthMax}
          setFilters={setFilters}
          lengthMin={lengthMin}
          lengthMax={lengthMax}
        />
        <WidthSliderFilter
          value={current.width}
          min={widthMin}
          max={widthMax}
          setFilters={setFilters}
          widthMin={widthMin}
          widthMax={widthMax}
        />
        <HeightSliderFilter
          value={current.height}
          min={heightMin}
          max={heightMax}
          setFilters={setFilters}
          heightMin={heightMin}
          heightMax={heightMax}
        />
      </div>

      <div className="mt-2">
        <ResetFiltersButton setFilters={setFilters} />
      </div>
    </form>
  );
};

export default CatalogFilterPanel;

