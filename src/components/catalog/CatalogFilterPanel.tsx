
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

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
  allKssTypes: string[];
};

// Получение числового угла из строки КСС
const getAngleFromKSS = (kss: string): number => {
  // КСС Ш (широкая) = 140, Д = 120, С = 90, Г = 60
  if (kss === "Ш") return 140;
  if (kss.startsWith("Д")) return 120;
  if (kss.startsWith("С")) return 90;
  if (kss.startsWith("Г")) return 60;

  // К-12
  if (kss.includes("12")) return 12;
  // К-30
  if (kss.includes("30")) return 30;

  // Попробовать парсить числовое значение
  const match = kss.match(/(\d+)[°]?/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 0;
};

// Унификация и сортировка КСС
function normalizedKssList(kssArr: string[]): string[] {
  // Парсим все варианты, группируем: "К-12", "K-12", "К12", "K12", "К - 12°", etc → "К - 12°"
  const set = new Set<string>();
  let hasK12 = false, hasK30 = false;
  kssArr.forEach(kss => {
    if (/(к|k)[\s\-]?12/i.test(kss)) {
      hasK12 = true;
    } else if (/(к|k)[\s\-]?30/i.test(kss)) {
      hasK30 = true;
    } else if (/^ш$/i.test(kss)) {
      set.add("Ш");
    } else if (/^д/i.test(kss)) {
      set.add("Д-120");
    } else if (/^с/i.test(kss)) {
      set.add("С");
    } else if (/^г/i.test(kss)) {
      set.add("Г");
    } else {
      set.add(kss.replace(/\s+/g, " ").replace("°", "").trim() + (kss.includes("°") ? "°" : ""));
    }
  });
  if (hasK12) set.add("К - 12°");
  if (hasK30) set.add("К - 30°");
  // Удаляем возможные исходные K12/K-12/K-30/K30 и дубли (они уже добавлены красивым названием)
  const arr = Array.from(set)
    .filter(k => !/(к|k)[\s\-]?12/i.test(k) && !/(к|k)[\s\-]?30/i.test(k))
    .concat(hasK12 ? ["К - 12°"] : [], hasK30 ? ["К - 30°"] : []);

  // Специальная ручная сортировка:
  // 1. "Ш", 2. "Д-120", далее по убыванию угла
  return arr
    .sort((a, b) => {
      if (a === "Ш") return -1;
      if (b === "Ш") return 1;
      if (a === "Д-120") return -1;
      if (b === "Д-120") return 1;
      return getAngleFromKSS(b) - getAngleFromKSS(a);
    });
}

const CatalogFilterPanel: React.FC<Props> = ({
  filters,
  setFilters,
  allSeries,
  allIpRatings,
  allKssTypes,
}) => {
  // Мощность: диапазон значений бегунка
  const powerMinMax = [0, 500];
  // Определяем текущие min/max слайдера из фильтра (если пусто, границы)
  const currentPowerMin = filters.power_min !== "" ? Number(filters.power_min) : powerMinMax[0];
  const currentPowerMax = filters.power_max !== "" ? Number(filters.power_max) : powerMinMax[1];

  // Обновлённый список КСС без дублей и красиво отсортированный
  const uniqueKssTypes = normalizedKssList(allKssTypes);

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

      {/* Мощность по диапазону */}
      <div className="col-span-1 md:col-span-2 flex flex-col justify-end">
        <label className="text-zasvet-gold text-sm mb-1 ml-1 select-none">Мощность, Вт</label>
        <div className="flex items-center gap-3">
          <span className="text-zasvet-white text-xs min-w-[2.5em]">{currentPowerMin}</span>
          <Slider
            className="mx-2 w-full"
            min={powerMinMax[0]}
            max={powerMinMax[1]}
            step={1}
            value={[currentPowerMin, currentPowerMax]}
            minStepsBetweenThumbs={1}
            onValueChange={([min, max]) => {
              setFilters(f => ({
                ...f,
                power_min: min === powerMinMax[0] ? "" : String(min),
                power_max: max === powerMinMax[1] ? "" : String(max),
              }));
            }}
            style={{ maxWidth: "90%" }}
          />
          <span className="text-zasvet-white text-xs min-w-[2.5em]">{currentPowerMax}</span>
        </div>
        <div className="flex justify-between px-1 mt-1 text-zasvet-gray/70 text-xs">
          <span>Минимум: {powerMinMax[0]}</span>
          <span>Максимум: {powerMinMax[1]}</span>
        </div>
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
      {/* --- остальные поля фильтра --- */}
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
