
import type { Fixture } from "./CatalogSection";

// Основные характеристики для всех "Сокол"
const common = {
  category: "Скоба",
  ip_rating: "67",
  color_temperature: 5000,
  warranty: 5,
  material: "Алюминий/оптика ППМА",
  availability: true,
  properties: {
    "I": "6",
    "P": "7",
    "Напряжение питания, В": "220",
    "Гарантия, лет": "5",
    "Рабочий диапазон температур": "от -60 до + 40 °C",
    "Светодиоды": "Lumileds"
  }
};

const sokolModels: Array<[
  number, // мощность
  number, // световой поток
  string, // размеры
  number  // цена
]> = [
  [26, 3200, "L: 250 мм, W: 135 мм, H: 82 мм", 5859],
  [52, 6400, "L: 500 мм, W: 135 мм, H: 82 мм", 7700],
  [78, 9600, "L: 700 мм, W: 135 мм, H: 82 мм", 11717],
  [104, 16016, "L: 900 мм, W: 135 мм, H: 82 мм", 16068],
  [128, 19712, "L: 1050 мм, W: 135 мм, H: 82 мм", 20594],
  [156, 24024, "L: 1230 мм, W: 135 мм, H: 82 мм", 23397],
  [182, 28028, "L: 1400 мм, W: 135 мм, H: 82 мм", 27986],
  [208, 32032, "L: 1580 мм, W: 135 мм, H: 82 мм", 27986],    // Цена и размеры ранее отсутствовали, оставлено как у 182 Вт
  [260, 40040, "L: 1910 мм, W: 135 мм, H: 82 мм", 27986],   // Цена как выше (нет в вашем прайсе)
  [312, 48048, "L: 2240 мм, W: 135 мм, H: 82 мм", 45192],
  [468, 64064, "L: 2920 мм, W: 135 мм, H: 82 мм", 66616],
  [624, 80080, "L: 3590 мм, W: 135 мм, H: 82 мм", 84860],
  [780, 96096, "L: 4270 мм, W: 135 мм, H: 82 мм", 91642],
  [936, 128128,"L: 4950 мм, W: 135 мм, H: 82 мм", 132227]
];

const kssOptions = [
  { code: "Д",   beam: "Д - 120°" },
  { code: "С",   beam: "С - 90°"  },
  { code: "Г",   beam: "Г - 60°"  },
  { code: "К30", beam: "К - 30°"  },
  { code: "К12", beam: "К - 12°"  },
];

// ID начинается с 1000 и увеличивается
let id = 1000;
export const catalogSokol: Fixture[] = [];

for (const [power, luminous_flux, dimensions, price] of sokolModels) {
  for (const kss of kssOptions) {
    catalogSokol.push({
      id: id++,
      name: `Сокол ${power}-67-5000-${kss.code}-220-Скоба`,
      power,
      luminous_flux,
      dimensions,
      price,
      ...common,
      beam_angle: kss.beam,
      properties: {
        ...common.properties,
        "КСС": `"${kss.beam}"`
      }
    });
  }
}
