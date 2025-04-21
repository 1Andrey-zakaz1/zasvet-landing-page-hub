
import React from "react";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  series: string;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  allSeries: string[];
};

const SeriesFilter: React.FC<Props> = ({ series, setFilters, allSeries }) => (
  <select
    className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
    value={series}
    onChange={e => setFilters(f => ({ ...f, series: e.target.value }))}
  >
    <option value="">Любая серия</option>
    {allSeries.map(series => (
      <option value={series} key={series}>{series}</option>
    ))}
  </select>
);

export default SeriesFilter;
