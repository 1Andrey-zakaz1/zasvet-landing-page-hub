
import React from "react";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  series: string;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  allSeries: string[];
};

const SeriesFilter: React.FC<Props> = ({ series, setFilters, allSeries }) => (
  <div className="flex flex-col gap-1">
    <label className="text-zasvet-gold text-xs font-medium mb-0 ml-1">
      Серия
    </label>
    <select
      className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
      value={series}
      onChange={e => setFilters(f => ({ ...f, series: e.target.value }))}
    >
      <option value="">Любая серия</option>
      {allSeries.map(seriesItem => (
        <option value={seriesItem} key={seriesItem}>{seriesItem}</option>
      ))}
    </select>
  </div>
);

export default SeriesFilter;
