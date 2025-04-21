
import type { Fixture } from "./CatalogSection";
import { catalogPart3 } from "./catalogPart3";
import { catalogPart4 } from "./catalogPart4";
import { catalogPart5 } from "./catalogPart5";

// Добавляйте новые части к этому массиву!
export const catalogData: Fixture[] = [
  ...catalogPart3,
  ...catalogPart4,
  ...catalogPart5,
];
