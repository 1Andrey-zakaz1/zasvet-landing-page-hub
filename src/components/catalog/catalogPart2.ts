import type { Fixture } from "./CatalogSection";

export const catalogPart2: Fixture[] = [
  {
    id: 234,
    name: "Гармония 34-20-5000-Д-220-универсальное",
    category: "Универсальное",
    power: 34,
    luminous_flux: 4250,
    ip_rating: "20",
    color_temperature: 5000,
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
    category: "Универсальное",
    power: 40,
    luminous_flux: 5400,
    ip_rating: "20",
    color_temperature: 5000,
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
  }
  // Удалены дублирующиеся светильники "Буран", т.к. они определены в catalogPart3.ts
];
