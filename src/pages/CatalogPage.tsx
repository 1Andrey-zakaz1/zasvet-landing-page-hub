import React, { useState } from "react";
import CatalogFilterPanel, { FilterValues } from "@/components/catalog/CatalogFilterPanel";
import CatalogList from "@/components/catalog/CatalogList";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogData } from "@/components/catalog/catalogData";

export interface Fixture {
  id: number;
  name: string;
  power: number;
  luminous_flux: number;
  ip_rating: string;
  color_temperature: number;
  category: string;
  beam_angle?: string;
  warranty?: number;
  price: number;
  material: string;
  dimensions: string;
  availability: boolean;
  properties: Record<string, string>;
}

// Получаем массив уникальных серий по первым словам из name, отсортировано по алфавиту
const allSeries = Array.from(new Set(catalogData.map(f => f.name.split(" ")[0])))
  .sort((a, b) => a.localeCompare(b));

// Новый список уникальных IP в базе (например, ["20", "44", "54", "65", "66", "67"]), отсортированный по возрастанию
const allIpRatings = Array.from(new Set(catalogData.map(f => f.ip_rating)))
  .map(ip => ip.replace(/^IP/i, "")) // убрать IP если вдруг где-то есть
  .filter(ip => !!ip && /^\d+$/.test(ip))
  .map(Number)
  .sort((a, b) => a - b)
  .map(ip => String(ip));

// Получаем массив уникальных beam_angle (КСС) по алфавиту, исключая пустые
const allKssTypes = Array.from(
  new Set(
    catalogData.map((f) =>
      (f.beam_angle || "").trim()
    ).filter(Boolean)
  )
).sort((a, b) => a.localeCompare(b));

// Проверяем наличие дубликатов по имени
const duplicateCheck = catalogData.reduce((acc, fixture) => {
  acc[fixture.name] = (acc[fixture.name] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const duplicates = Object.entries(duplicateCheck)
  .filter(([_, count]) => count > 1)
  .map(([name]) => name);

if (duplicates.length > 0) {
  console.log("Warning: Found duplicate fixtures:", duplicates);
}

function filterFixtures(data: Fixture[], filters: FilterValues): Fixture[] {
  return data.filter(f => {
    if (filters.query && !f.name.toLowerCase().includes(filters.query.toLowerCase()))
      return false;
    if (filters.series && f.name.split(" ")[0] !== filters.series)
      return false;
    if (filters.power_min && f.power < Number(filters.power_min)) return false;
    if (filters.power_max && f.power > Number(filters.power_max)) return false;
    if (filters.lumen_min && f.luminous_flux < Number(filters.lumen_min)) return false;
    if (filters.lumen_max && f.luminous_flux > Number(filters.lumen_max)) return false;
    if (filters.ip_rating && f.ip_rating !== filters.ip_rating) return false;
    if (filters.kss_type && !f.beam_angle?.includes(filters.kss_type)) return false;
    if (filters.length_min && Number(f.dimensions.match(/L:\s*(\d+)/)?.[1] ?? 0) < Number(filters.length_min)) return false;
    if (filters.length_max && Number(f.dimensions.match(/L:\s*(\d+)/)?.[1] ?? 0) > Number(filters.length_max)) return false;
    if (filters.width_min && Number(f.dimensions.match(/W:\s*(\d+)/)?.[1] ?? 0) < Number(filters.width_min)) return false;
    if (filters.width_max && Number(f.dimensions.match(/W:\s*(\d+)/)?.[1] ?? 0) > Number(filters.width_max)) return false;
    if (filters.height_min && Number(f.dimensions.match(/H:\s*(\d+)/)?.[1] ?? 0) < Number(filters.height_min)) return false;
    if (filters.height_max && Number(f.dimensions.match(/H:\s*(\d+)/)?.[1] ?? 0) > Number(filters.height_max)) return false;
    if (filters.only_available && !f.availability) return false;
    return true;
  });
}

const CatalogPage: React.FC = () => {
  const [filters, setFilters] = React.useState<FilterValues>({
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
  });

  const [isExpanded, setIsExpanded] = useState(true);
  const filtered = filterFixtures(catalogData, filters);

  // Сортировка по убыванию светового потока:
  const sorted = [...filtered].sort((a, b) => b.luminous_flux - a.luminous_flux);
  
  // Проверяем, есть ли светильник "Сокол" с потоком 48048 в начале списка
  console.log("CatalogPage sorted fixtures:", sorted.map(f => `${f.name}: ${f.luminous_flux}`).slice(0, 3));

  return (
    <div className="bg-zasvet-black min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="section-title text-zasvet-white flex items-center gap-2">
            <Search className="h-6 w-6 text-zasvet-gold" />
            Каталог светильников
          </h1>
          <Button
            variant="gold"
            className="transition-all duration-300 flex items-center gap-1"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? (
              <>
                <span className="mr-1">&#9650;</span> Свернуть
              </>
            ) : (
              <>
                <span className="mr-1">&#9660;</span> Развернуть
              </>
            )}
          </Button>
        </div>
        {isExpanded && (
          <>
            <CatalogFilterPanel
              filters={filters}
              setFilters={setFilters}
              allSeries={allSeries}
              allIpRatings={allIpRatings}
              allKssTypes={allKssTypes}
            />
            <CatalogList fixtures={sorted.slice(0, 5)} />
            {sorted.length > 5 && (
              <div className="mt-4 text-center text-zasvet-gold/90 font-medium animate-fade-in">
                Найдено подходящих светильников: {sorted.length}. Показаны только первые 5. <br />
                Уточните параметры поиска, чтобы увидеть остальные результаты.
              </div>
            )}
            {sorted.length === 0 && (
              <div className="mt-8 text-center text-zasvet-gold text-lg">
                Светильники не найдены. Попробуйте скорректировать параметры поиска.
              </div>
            )}
          </>
        )}
        {!isExpanded && (
          <div className="text-zasvet-gray/60 text-center py-10 animate-fade-in">
            Каталог скрыт. Нажмите «Развернуть», чтобы отобразить список.
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
