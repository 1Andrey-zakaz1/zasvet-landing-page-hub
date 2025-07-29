
import type { Fixture } from "./CatalogSection";
import { catalogSokol } from "./catalogSokol";
import { catalogGranite } from "./catalogGranite";

// Разносим минивольты на отдельные модули, подключаем оттуда
import { catalogMinivolt } from "./catalogMinivolt";

// Используем объединённые части минивольта вместо старых данных:
export const catalogPart1: Fixture[] = [
  ...catalogMinivolt,
  // Серия "Сокол"
  ...catalogSokol,
  // Серия "Гранит"
  ...catalogGranite,
];
