
import type { Fixture } from "./CatalogSection";

// МОДЕЛИ "Минивольт" — КОНСОЛЬ
export const catalogPart1: Fixture[] = [
  // --- Д-24 и Д-36 консоль ---
  {
    id: 220,
    name: "Минивольт 40-67-5000-Д-24-Консоль",
    category: "Консольное",
    power: 40,
    luminous_flux: 5480,
    ip_rating: "67",
    color_temperature: 5000,
    beam_angle: "Д - 120°",
    warranty: 2,
    price: 7470,
    material: "Алюминий/прозрачный противоударный поликарбонат",
    dimensions: "L: 580 мм, W: 60 мм, H: 55 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "24",
      "Гарантия, лет": "2",
      "Рабочий диапазон температур": "от -40 до + 40 °C",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 221,
    name: "Минивольт 40-67-5000-Д-36-Консоль",
    category: "Консольное",
    power: 40,
    luminous_flux: 5480,
    ip_rating: "67",
    color_temperature: 5000,
    beam_angle: "Д - 120°",
    warranty: 2,
    price: 7470,
    material: "Алюминий/прозрачный противоударный поликарбонат",
    dimensions: "L: 580 мм, W: 60 мм, H: 55 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Д\" - 120°",
      "Напряжение питания, В": "36",
      "Гарантия, лет": "2",
      "Рабочий диапазон температур": "от -40 до + 40 °C",
      "Светодиоды": "Lumileds"
    }
  },
  // ------------------------- Ш, С, Г версии — 12В
  {
    id: 222,
    name: "Минивольт 40-67-5000-Ш-12-Консоль",
    category: "Консольное",
    power: 40,
    luminous_flux: 6000,
    ip_rating: "67",
    color_temperature: 5000,
    beam_angle: "Ш",
    warranty: 2,
    price: 15516,
    material: "Алюминий/оптика ППМА",
    dimensions: "L: 350 мм, W: 110 мм, H: 76 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Ш\"",
      "Напряжение питания, В": "12",
      "Гарантия, лет": "2",
      "Рабочий диапазон температур": "от -40 до + 40 °C",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 223,
    name: "Минивольт 40-67-5000-С-12-Консоль",
    category: "Консольное",
    power: 40,
    luminous_flux: 6000,
    ip_rating: "67",
    color_temperature: 5000,
    beam_angle: "С - 90°",
    warranty: 2,
    price: 15516,
    material: "Алюминий/оптика ППМА",
    dimensions: "L: 350 мм, W: 110 мм, H: 76 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"С\"- 90°",
      "Напряжение питания, В": "12",
      "Гарантия, лет": "2",
      "Рабочий диапазон температур": "от -40 до + 40 °C",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 224,
    name: "Минивольт 40-67-5000-Г-12-Консоль",
    category: "Консольное",
    power: 40,
    luminous_flux: 6000,
    ip_rating: "67",
    color_temperature: 5000,
    beam_angle: "Г - 60°",
    warranty: 2,
    price: 15516,
    material: "Алюминий/оптика ППМА",
    dimensions: "L: 350 мм, W: 110 мм, H: 76 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"Г\" - 60°",
      "Напряжение питания, В": "12",
      "Гарантия, лет": "2",
      "Рабочий диапазон температур": "от -40 до + 40 °C",
      "Светодиоды": "Lumileds"
    }
  },
  // --------------- НОВЫЕ МОДЕЛИ ПО СПИСКУ, КОНСОЛЬ 40Вт ---
  {
    id: 225,
    name: "Минивольт 40-67-5000-К-30-12-Консоль",
    category: "Консольное",
    power: 40,
    luminous_flux: 6000, // TODO: Точную величину уточнить
    ip_rating: "67",
    color_temperature: 5000,
    beam_angle: "К-30",
    warranty: 2,
    price: 15516,
    material: "Алюминий/оптика ППМА",
    dimensions: "L: 350 мм, W: 110 мм, H: 76 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"К-30\"",
      "Напряжение питания, В": "12",
      "Гарантия, лет": "2",
      "Рабочий диапазон температур": "от -40 до + 40 °C",
      "Светодиоды": "Lumileds"
    }
  },
  {
    id: 226,
    name: "Минивольт 40-67-5000-К-12-12-Консоль",
    category: "Консольное",
    power: 40,
    luminous_flux: 6000, // TODO: Уточнить
    ip_rating: "67",
    color_temperature: 5000,
    beam_angle: "К-12",
    warranty: 2,
    price: 15516,
    material: "Алюминий/оптика ППМА",
    dimensions: "L: 350 мм, W: 110 мм, H: 76 мм",
    availability: true,
    properties: {
      "I": "6",
      "P": "7",
      "КСС": "\"К-12\"",
      "Напряжение питания, В": "12",
      "Гарантия, лет": "2",
      "Рабочий диапазон температур": "от -40 до + 40 °C",
      "Светодиоды": "Lumileds"
    }
  }
  // Дальнейшие модели — продолжу по аналогии при поступлении следующей части вашего списка или после подтверждения!
];
