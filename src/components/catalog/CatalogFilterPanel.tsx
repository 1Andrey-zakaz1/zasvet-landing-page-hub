
import React, { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNormalizedKssList } from "./useNormalizedKssList";
import { SliderRange } from "./SliderRange";
import { catalogData } from "./catalogData";

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
  // Диапазоны всех фильруемых чисел
  const [powerMin, powerMax] = getCatalogMinMax(catalogData, "power", false);
  const [lumenMin, lumenMax] = getCatalogMinMax(catalogData, "luminous_flux", false);
  const [lengthMin, lengthMax] = useMemo(() => {
    // Парсим из строки L: ****
    const arr = catalogData.map(f => Number(f.dimensions.match(/L:\s*(\d+)/)?.[1] ?? 0)).filter(Boolean);
    return [Math.min(...arr), Math.max(...arr)];
  }, []);
  const [widthMin, widthMax] = useMemo(() => {
    const arr = catalogData.map(f => Number(f.dimensions.match(/W:\s*(\d+)/)?.[1] ?? 0)).filter(Boolean);
    return [Math.min(...arr), Math.max(...arr)];
  }, []);
  const [heightMin, heightMax] = useMemo(() => {
    const arr = catalogData.map(f => Number(f.dimensions.match(/H:\s*(\d+)/)?.[1] ?? 0)).filter(Boolean);
    return [Math.min(...arr), Math.max(...arr)];
  }, []);
  const [priceMin, priceMax] = getCatalogMinMax(catalogData, "price", true);

  // Текущее значение каждого диапазона (min/max)
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

  // Новая обработка КСС типов (без дублей, красивая сортировка)
  const uniqueKssTypes = useNormalizedKssList(allKssTypes);

  return (
    <form
      className="bg-zasvet-gray/10 rounded-lg p-4 mb-8 border border-zasvet-gold/30 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in"
      onSubmit={e => e.preventDefault()}
    >
      <div>
        <Input
          placeholder="Поиск"
          value={filters.query}
          onChange={e => setFilters(f => ({ ...f, query: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white border-zasvet-gold/30"
        />
      </div>
      <div>
        <select
          className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
          value={filters.series}
          onChange={e => setFilters(f => ({ ...f, series: e.target.value }))}
        >
          <option value="">Любая серия</option>
          {allSeries.map(series => (
            <option value={series} key={series}>{series}</option>
          ))}
        </select>
      </div>

      {/* Бегунок мощности */}
      <SliderRange
        label="Мощность, Вт"
        value={current.power}
        min={powerMin}
        max={powerMax}
        onChange={([min, max]) => setFilters(f => ({
          ...f,
          power_min: min === powerMin ? "" : String(min),
          power_max: max === powerMax ? "" : String(max),
        }))}
        colorThumb="primary"
      />

      {/* Бегунок светового потока */}
      <SliderRange
        label="Световой поток, лм"
        value={current.lumen}
        min={lumenMin}
        max={lumenMax}
        onChange={([min, max]) => setFilters(f => ({
          ...f,
          lumen_min: min === lumenMin ? "" : String(min),
          lumen_max: max === lumenMax ? "" : String(max),
        }))}
        colorThumb="orange"
      />

      {/* Новый бегунок по цене */}
      <SliderRange
        label="Цена, ₽"
        value={current.price}
        min={priceMin}
        max={priceMax}
        onChange={([min, max]) => setFilters(f => ({
          ...f,
          price_min: min === priceMin ? "" : String(min),
          price_max: max === priceMax ? "" : String(max),
        }))}
        colorThumb="green"
      />

      <div>
        <select
          className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
          value={filters.ip_rating}
          onChange={e => setFilters(f => ({ ...f, ip_rating: e.target.value }))}
        >
          <option value="">Любой IP</option>
          {allIpRatings.map(ip => (
            <option value={ip} key={ip}>{`IP${ip}`}</option>
          ))}
        </select>
      </div>

      {/* КСС: новые значения и сортировка */}
      <div>
        <select
          className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
          value={filters.kss_type}
          onChange={e => setFilters(f => ({ ...f, kss_type: e.target.value }))}
        >
          <option value="">Любая КСС</option>
          {uniqueKssTypes.map((kss) =>
            <option value={kss} key={kss}>{kss}</option>
          )}
        </select>
      </div>

      {/* Бегунки размеров */}
      <SliderRange
        label="Длина, мм"
        value={current.length}
        min={lengthMin}
        max={lengthMax}
        onChange={([min, max]) => setFilters(f => ({
          ...f,
          length_min: min === lengthMin ? "" : String(min),
          length_max: max === lengthMax ? "" : String(max),
        }))}
        colorThumb="blue"
      />
      <SliderRange
        label="Ширина, мм"
        value={current.width}
        min={widthMin}
        max={widthMax}
        onChange={([min, max]) => setFilters(f => ({
          ...f,
          width_min: min === widthMin ? "" : String(min),
          width_max: max === widthMax ? "" : String(max),
        }))}
        colorThumb="green"
      />
      <SliderRange
        label="Высота, мм"
        value={current.height}
        min={heightMin}
        max={heightMax}
        onChange={([min, max]) => setFilters(f => ({
          ...f,
          height_min: min === heightMin ? "" : String(min),
          height_max: max === heightMax ? "" : String(max),
        }))}
        colorThumb="orange"
      />

      <div className="flex items-center">
        <label className="flex items-center cursor-pointer gap-2 select-none text-zasvet-gold">
          <input
            type="checkbox"
            checked={filters.only_available}
            onChange={e => setFilters(f => ({ ...f, only_available: e.target.checked }))}
          />
          Только в наличии
        </label>
      </div>

      <div>
        <Button 
          type="button"
          variant="gold"
          className="w-full"
          onClick={() => setFilters({
            query: "",
            series: "",
            power_min: "",
            power_max: "",
            lumen_min: "",
            lumen_max: "",
            price_min: "",
            price_max: "",
            ip_rating: "",
            kss_type: "",
            kss_angle: "",
            mounting: "",
            length_min: "",
            length_max: "",
            width_min: "",
            width_max: "",
            height_min: "",
            height_max: "",
            only_available: true,
          })}
        >
          Сбросить фильтры
        </Button>
      </div>
    </form>
  );
};

export default CatalogFilterPanel;
