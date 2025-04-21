
import type { Fixture } from "./CatalogSection";
import { catalogSokol } from "./catalogSokol";

// Разносим минивольты на отдельные модули, подключаем оттуда
import { catalogMinivolt } from "./catalogMinivolt";

// Используем объединённые части минивольта вместо старых данных:
export const catalogPart1: Fixture[] = [
  ...catalogMinivolt,
  // Серия "Сокол"
  ...catalogSokol,
];
