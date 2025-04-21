
import React from "react";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  kss_type: string;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  uniqueKssTypes: string[];
};

const KssTypeFilter: React.FC<Props> = ({ kss_type, setFilters, uniqueKssTypes }) => (
  <div className="flex flex-col gap-1">
    <label className="text-zasvet-gold text-xs font-medium mb-0 ml-1">
      Тип КСС
    </label>
    <select
      className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
      value={kss_type}
      onChange={e => setFilters(f => ({ ...f, kss_type: e.target.value }))}
    >
      <option value="">Любой тип КСС</option>
      {uniqueKssTypes.map(type => (
        <option value={type} key={type}>{type}</option>
      ))}
    </select>
  </div>
);

export default KssTypeFilter;
