import React, { useState } from "react";
import CatalogFilterPanel, { FilterValues } from "@/components/catalog/CatalogFilterPanel";
import CatalogList from "@/components/catalog/CatalogList";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogData } from "./catalogData";

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

function filterFixtures(data: Fixture[], filters: FilterValues): Fixture[] {
  return data.filter(f => {
    if (filters.query && !f.name.toLowerCase().includes(filters.query.toLowerCase()))
      return false;
    if (filters.series && !f.name.toLowerCase().includes(filters.series.toLowerCase()))
      return false;
    if (filters.power_min && f.power < Number(filters.power_min)) return false;
    if (filters.power_max && f.power > Number(filters.power_max)) return false;
    if (filters.lumen_min && f.luminous_flux < Number(filters.lumen_min)) return false;
    if (filters.lumen_max && f.luminous_flux > Number(filters.lumen_max)) return false;
    if (filters.ip_rating && f.ip_rating !== filters.ip_rating) return false;
    if (filters.kss_type && !f.beam_angle.includes(filters.kss_type)) return false;
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

const CatalogSection: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
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
    only_available: true
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const filtered = filterFixtures(catalogData, filters);

  return (
    <div className="bg-zasvet-black py-10">
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="section-title text-zasvet-white flex items-center gap-2">
            <Search className="h-6 w-6 text-zasvet-gold" />
            Каталог светильников
          </h1>
          <Button
            variant="gold"
            className="transition-all duration-300 flex items-center gap-1"
            onClick={() => setIsExpanded(prev => !prev)}
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
            <CatalogFilterPanel filters={filters} setFilters={setFilters} />
            <CatalogList fixtures={filtered.slice(0, 8)} />
            {filtered.length > 8 && (
              <div className="mt-4 text-center text-zasvet-gold/90 font-medium animate-fade-in">
                Найдено подходящих светильников: {filtered.length}. Показаны только первые 8. <br />
                Уточните параметры поиска, чтобы увидеть остальные результаты.
              </div>
            )}
            {filtered.length === 0 && (
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

export default CatalogSection;
