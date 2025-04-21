
import type { Fixture } from "./CatalogSection";
import { catalogPart3 } from "./catalogPart3";
import { catalogPart5 } from "./catalogPart5";

// В дальнейшем просто добавляйте новые части к этому массиву!
export const catalogData: Fixture[] = [
  ...catalogPart3,
  ...catalogPart5
];
