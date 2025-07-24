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
    { model: "Гранит 192-67-5000-Д-220-Кронштейн", flux: 34792, power: 192, size: [1000,110,70], price: 20039 },
    { model: "Гранит 240-67-5000-Д-220-Кронштейн", flux: 43490, power: 240, size: [1250,110,70], price: 25042 },
    { model: "Гранит 288-67-5000-Д-220-Кронштейн", flux: 52188, power: 288, size: [1500,110,70], price: 30045 }
  ],
  // Office - Harmony series
  "office": [
    { model: "Гармония 18-20-5000-Д-220-универсальное", flux: 2250, power: 18, size: [595,595,40], price: 2800 },
    { model: "Гармония 22-20-5000-Д-220-универсальное", flux: 2750, power: 22, size: [595,595,40], price: 3000 },
    { model: "Гармония 26-20-5000-Д-220-универсальное", flux: 3250, power: 26, size: [595,595,40], price: 3200 },
    { model: "Гармония 30-20-5000-Д-220-универсальное", flux: 3750, power: 30, size: [595,595,40], price: 3300 },
    { model: "Гармония 34-20-5000-Д-220-универсальное", flux: 4250, power: 34, size: [595,595,40], price: 3418 },
    { model: "Гармония 38-20-5000-Д-220-универсальное", flux: 4750, power: 38, size: [595,595,40], price: 3500 },
    { model: "Гармония 40-20-5000-Д-220-универсальное", flux: 5400, power: 40, size: [595,595,40], price: 3533 },
    { model: "Гармония 42-20-5000-Д-220-универсальное", flux: 5670, power: 42, size: [595,595,40], price: 3633 },
    { model: "Гармония 46-20-5000-Д-220-универсальное", flux: 5750, power: 46, size: [595,595,40], price: 3680 },
    { model: "Гармония 50-20-5000-Д-220-универсальное", flux: 6250, power: 50, size: [595,595,40], price: 3720 },
    { model: "Гармония 52-20-5000-Д-220-универсальное", flux: 7100, power: 52, size: [595,595,40], price: 3747 },
    { model: "Гармония 56-20-5000-Д-220-универсальное", flux: 7000, power: 56, size: [595,595,40], price: 3800 },
    { model: "Гармония 60-20-5000-Д-220-универсальное", flux: 7500, power: 60, size: [595,595,40], price: 3900 },
    { model: "Гармония 64-20-5000-Д-220-универсальное", flux: 8000, power: 64, size: [595,595,40], price: 4000 },
    { model: "Гармония 68-20-5000-Д-220-универсальное", flux: 8500, power: 68, size: [595,595,40], price: 4100 },
    { model: "Гармония 72-20-5000-Д-220-универсальное", flux: 9000, power: 72, size: [595,595,40], price: 4200 }
  ],
  // Commercial - Boutique series
  "commercial": [
    { model: "Бутик 24-54-5000-Д-220-подвес", flux: 3000, power: 24, size: [600,60,55], price: 4191 },
    { model: "Бутик 36-54-5000-Д-220-подвес", flux: 4500, power: 36, size: [900,60,55], price: 5365 },
    { model: "Бутик 48-54-5000-Д-220-подвес", flux: 6000, power: 48, size: [1200,60,55], price: 6689 },
    { model: "Бутик 60-54-5000-Д-220-подвес", flux: 7500, power: 60, size: [1500,60,55], price: 7999 },
    { model: "Бутик 120-54-5000-Д-220-подвес", flux: 15000, power: 120, size: [3000,60,55], price: 14380 }
  ]
};
