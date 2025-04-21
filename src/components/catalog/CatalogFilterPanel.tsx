
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FilterValues {
  query: string;
  series: string;
  power_min: string;
  power_max: string;
  lumen_min: string;
  lumen_max: string;
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
};

const kssOptions = [
  { value: "", label: "Любая КСС" },
  { value: "Д", label: "Д - 120°" },
  { value: "Ш", label: "Ш" },
  { value: "С", label: "С - 90°" },
  { value: "Г", label: "Г - 60°" }
];

const CatalogFilterPanel: React.FC<Props> = ({ filters, setFilters, allSeries, allIpRatings }) => {
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
      <div>
        <Input
          placeholder="Мощность от, Вт"
          value={filters.power_min}
          type="number"
          min={0}
          max={500}
          onChange={e => setFilters(f => ({ ...f, power_min: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
      <div>
        <Input
          placeholder="Мощность до, Вт"
          value={filters.power_max}
          type="number"
          min={0}
          max={500}
          onChange={e => setFilters(f => ({ ...f, power_max: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
      <div>
        <Input
          placeholder="Световой поток от, лм"
          value={filters.lumen_min}
          type="number"
          min={0}
          max={100000}
          onChange={e => setFilters(f => ({ ...f, lumen_min: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
      <div>
        <Input
          placeholder="Световой поток до, лм"
          value={filters.lumen_max}
          type="number"
          min={0}
          max={100000}
          onChange={e => setFilters(f => ({ ...f, lumen_max: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
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
      <div>
        <select
          className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
          value={filters.kss_type}
          onChange={e => setFilters(f => ({ ...f, kss_type: e.target.value }))}
        >
          {kssOptions.map(opt => (
            <option value={opt.value} key={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <Input
          placeholder="Длина от, мм"
          value={filters.length_min}
          type="number"
          min={0}
          max={3000}
          onChange={e => setFilters(f => ({ ...f, length_min: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
      <div>
        <Input
          placeholder="Длина до, мм"
          value={filters.length_max}
          type="number"
          min={0}
          max={3000}
          onChange={e => setFilters(f => ({ ...f, length_max: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
      <div>
        <Input
          placeholder="Ширина от, мм"
          value={filters.width_min}
          type="number"
          min={0}
          max={710}
          onChange={e => setFilters(f => ({ ...f, width_min: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
      <div>
        <Input
          placeholder="Ширина до, мм"
          value={filters.width_max}
          type="number"
          min={0}
          max={710}
          onChange={e => setFilters(f => ({ ...f, width_max: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
      <div>
        <Input
          placeholder="Высота от, мм"
          value={filters.height_min}
          type="number"
          min={0}
          max={200}
          onChange={e => setFilters(f => ({ ...f, height_min: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
      <div>
        <Input
          placeholder="Высота до, мм"
          value={filters.height_max}
          type="number"
          min={0}
          max={200}
          onChange={e => setFilters(f => ({ ...f, height_max: e.target.value }))}
          className="bg-zasvet-black text-zasvet-white"
        />
      </div>
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

