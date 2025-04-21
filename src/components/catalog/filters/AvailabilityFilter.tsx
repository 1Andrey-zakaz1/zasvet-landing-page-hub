
import React from "react";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  only_available: boolean;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
};

const AvailabilityFilter: React.FC<Props> = ({ only_available, setFilters }) => (
  <label className="flex items-center cursor-pointer gap-2 select-none text-zasvet-gold">
    <input
      type="checkbox"
      checked={only_available}
      onChange={e => setFilters(f => ({ ...f, only_available: e.target.checked }))}
    />
    Только в наличии
  </label>
);

export default AvailabilityFilter;
