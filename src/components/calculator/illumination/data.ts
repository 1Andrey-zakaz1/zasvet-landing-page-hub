// Recommended illumination levels by room type (СП 52.13330.2016)
export const recommendedLux = {
  "corridor": 51,     // Corridor: 51 lx
  "kladovka": 71,     // Storage room: 71 lx
  "warehouse": 201,   // Warehouse: 201 lx
  "office": 301,      // Office: 301 lx
  "retail": 501,      // Trading hall: 501 lx
  "vitrina": 1001     // Display window: 1001 lx
};

// Luminaire models database
export const luminaireModels = {
  // Industrial - Granite series
  "industrial": [
    { model: "Гранит 48-67-5000-Д-220-Кронштейн", flux: 8698, power: 48, size: [250,110,70], price: 5550 },
    { model: "Гранит 96-67-5000-Д-220-Кронштейн", flux: 17396, power: 96, size: [500,110,70], price: 10484 },
    { model: "Гранит 144-67-5000-Д-220-Кронштейн", flux: 26094, power: 144, size: [750,110,70], price: 15036 },
    { model: "Гранит 192-67-5000-Д-220-Кронштейн", flux: 34792, power: 192, size: [1000,110,70], price: 20039 }
  ],
  // Office - Harmony series
  "office": [
    { model: "Гармония 34-20-5000-Д-220-универсальное", flux: 4250, power: 34, size: [595,595,40], price: 3418 },
    { model: "Гармония 40-20-5000-Д-220-универсальное", flux: 5400, power: 40, size: [595,595,40], price: 3533 },
    { model: "Гармония 42-20-5000-Д-220-универсальное", flux: 5670, power: 42, size: [595,595,40], price: 3633 },
    { model: "Гармония 52-20-5000-Д-220-универсальное", flux: 7100, power: 52, size: [595,595,40], price: 3747 }
  ],
  // Commercial - Boutique series
  "commercial": [
    { model: "Бутик 24-54-5000-Д-220-подвес", flux: 3000, power: 24, size: [600,60,55], price: 4191 },
    { model: "Бутик 36-54-5000-Д-220-подвес", flux: 4500, power: 36, size: [900,60,55], price: 5365 },
    { model: "Бутик 48-54-5000-Д-220-подвес", flux: 6000, power: 48, size: [1200,60,55], price: 6689 },
    { model: "Бутик 60-54-5000-Д-220-подвес", flux: 7500, power: 60, size: [1500,60,55], price: 8586 },
    { model: "Бутик 120-54-5000-Д-220-подвес", flux: 15000, power: 120, size: [3000,60,55], price: 17118 }
  ]
};
