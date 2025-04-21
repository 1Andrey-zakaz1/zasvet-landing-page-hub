
import React from "react";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  kss_type: string;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  uniqueKssTypes: string[];
};

const KssTypeFilter: React.FC<Props> = ({ kss_type, setFilters, uniqueKssTypes }) => (
  <select
    className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
    value={kss_type}
    onChange={e => setFilters(f => ({ ...f, kss_type: e.target.value }))}
  >
    <option value="">Любая КСС</option>
    {uniqueKssTypes.map((kss) =>
      <option value={kss} key={kss}>{kss}</option>
    )}
  </select>
);

export default KssTypeFilter;
