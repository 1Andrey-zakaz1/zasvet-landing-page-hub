
import type { Fixture } from "./CatalogSection";
import { catalogPart1 } from "./catalogPart1";
import { catalogPart2 } from "./catalogPart2";
import { catalogPart3 } from "./catalogPart3";
import { catalogPart4 } from "./catalogPart4";
import { catalogPart5 } from "./catalogPart5";

// Добавляйте новые части к этому массиву!
export const catalogData: Fixture[] = [
  ...catalogPart1,
  ...catalogPart2,
  ...catalogPart3,
  ...catalogPart4,
  ...catalogPart5,
];

