import React, { useState } from "react";
import CatalogFilterPanel, { FilterValues } from "@/components/catalog/CatalogFilterPanel";
import CatalogList from "@/components/catalog/CatalogList";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Fixture {
  id: number;
  name: string;
  power: number;
  luminous_flux: number;
  ip_rating: string;
  color_temperature: number;
  category: string;
  beam_angle: string;
  warranty: number;
  price: number;
  material: string;
  dimensions: string;
  availability: boolean;
  properties: Record<string, string>;
}

const DATA: Fixture[] = [
  {
    id: 234,
    name: "Гармония 34-20-5000-Д-220-универсальное",
    power: 34,
    luminous_flux: 4250,
    ip_rating: "20",
    color_temperature: 5000,
    category: "Универсальное",
    beam_angle: "Д - 120°",
    warranty: 5,
    price: 3418,
    material: "Сталь/микропризма",
    dimensions: "L: 595 мм, W: 595 мм, H: 40 мм",
    availability: true,
    properties: {
      "I": "2",
      "P": "0",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -20 до + 30 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 235,
    name: "Гармония 40-20-5000-Д-220-универсальное",
    power: 40,
    luminous_flux: 5400,
    ip_rating: "20",
    color_temperature: 5000,
    category: "Универсальное",
    beam_angle: "Д - 120°",
    warranty: 5,
    price: 3533,
    material: "Сталь/микропризма",
    dimensions: "L: 595 мм, W: 595 мм, H: 40 мм",
    availability: true,
    properties: {
      "I": "2",
      "P": "0",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -20 до + 30 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 256,
    name: "Буран 96-67-5000-Д-220-Консоль",
    power: 96,
    luminous_flux: 17396,
    ip_rating: "67",
    color_temperature: 5000,
    category: "Консольное",
    beam_angle: "Д - 120°",
    warranty: 5,
    price: 10020,
    material: "Алюминий/прозрачный противоударный поликарбонат",
    dimensions: "L: 500 мм, W: 110 мм, H: 70 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -60 до + 40 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 257,
    name: "Буран 144-67-5000-Д-220-Консоль",
    power: 144,
    luminous_flux: 26094,
    ip_rating: "67",
    color_temperature: 5000,
    category: "Консольное",
    beam_angle: "Д - 120°",
    warranty: 5,
    price: 15036,
    material: "Алюминий/прозрачный противоударный поликарбонат",
    dimensions: "L: 750 мм, W: 110 мм, H: 70 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -60 до + 40 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 258,
    name: "Буран 192-67-5000-Д-220-Консоль",
    power: 192,
    luminous_flux: 34792,
    ip_rating: "67",
    color_temperature: 5000,
    category: "Консольное",
    beam_angle: "Д - 120°",
    warranty: 5,
    price: 20040,
    material: "Алюминий/прозрачный противоударный поликарбонат",
    dimensions: "L: 1000 мм, W: 110 мм, H: 70 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -60 до + 40 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 1,
    name: "Буран 96-67-5000-Д-220-Консоль",
    power: 96,
    luminous_flux: 17396,
    ip_rating: "67",
    color_temperature: 5000,
    category: "Консольное",
    beam_angle: "Д - 120°",
    warranty: 5,
    price: 10020,
    material: "Алюминий/прозрачный противоударный поликарбонат",
    dimensions: "L: 500 мм, W: 110 мм, H: 70 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -60 до + 40 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 2,
    name: "Буран 144-67-5000-Д-220-Консоль",
    power: 144,
    luminous_flux: 26094,
    ip_rating: "67",
    color_temperature: 5000,
    category: "Консольное",
    beam_angle: "Д - 120°",
    warranty: 5,
    price: 15036,
    material: "Алюминий/прозрачный противоударный поликарбонат",
    dimensions: "L: 750 мм, W: 110 мм, H: 70 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -60 до + 40 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 3,
    name: "Буран 192-67-5000-Д-220-Консоль",
    power: 192,
    luminous_flux: 34792,
    ip_rating: "67",
    color_temperature: 5000,
    category: "Консольное",
    beam_angle: "Д - 120°",
    warranty: 5,
    price: 20052,
    material: "Алюминий/прозрачный противоударный поликарбонат",
    dimensions: "L: 1000 мм, W: 110 мм, H: 70 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -60 до + 40 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 4,
    name: "Буран 96-67-5000-Ш-220-Консоль",
    power: 96,
    luminous_flux: 16704,
    ip_rating: "67",
    color_temperature: 5000,
    category: "Консольное",
    beam_angle: "Ш",
    warranty: 5,
    price: 18930,
    material: "Алюминий/оптика ППМА",
    dimensions: "L: 500 мм, W: 110 мм, H: 70 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Ш\"",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -60 до + 40 °С",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 5,
    name: "Буран 96-67-5000-С-220-Консоль",
    power: 96,
    luminous_flux: 16704,
    ip_rating: "67",
    color_temperature: 5000,
    category: "Консольное",
    beam_angle: "С - 90°",
    warranty: 5,
    price: 18930,
    material: "Алюминий/оптика ППМА",
    dimensions: "L: 500 мм, W: 110 мм, H: 70 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"С\"- 90°",
      "Напряжение питания, В": "220",
      "Гарантия, лет": "5",
      "Рабочий диапазон температур": "от -60 до + 40 °С",
      "Светодиоды": "Lumileds"
    }
  }
];

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

const CatalogPage: React.FC = () => {
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

  const [isExpanded, setIsExpanded] = useState(true);
  const filtered = filterFixtures(DATA, filters);

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
                <ChevronUp className="mr-1" /> Свернуть
              </>
            ) : (
              <>
                <ChevronDown className="mr-1" /> Развернуть
              </>
            )}
          </Button>
        </div>
        {isExpanded && (
          <>
            <CatalogFilterPanel filters={filters} setFilters={setFilters} />
            <CatalogList fixtures={filtered.slice(0, 5)} />
            {filtered.length > 5 && (
              <div className="mt-4 text-center text-zasvet-gold/90 font-medium animate-fade-in">
                Найдено подходящих светильников: {filtered.length}. Показаны только первые 5. <br />
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

export default CatalogPage;
