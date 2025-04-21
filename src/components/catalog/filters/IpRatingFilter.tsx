
import React from "react";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  ip_rating: string;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  allIpRatings: string[];
};

const IpRatingFilter: React.FC<Props> = ({ ip_rating, setFilters, allIpRatings }) => (
  <div className="flex flex-col gap-1">
    <label className="text-zasvet-gold text-xs font-medium mb-0 ml-1">
      IP класс
    </label>
    <select
      className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
      value={ip_rating}
      onChange={e => setFilters(f => ({ ...f, ip_rating: e.target.value }))}
    >
      <option value="">Любой IP класс</option>
      {allIpRatings.map(rating => (
        <option value={rating} key={rating}>IP {rating}</option>
      ))}
    </select>
  </div>
);

export default IpRatingFilter;
