
import React from "react";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  ip_rating: string;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  allIpRatings: string[];
};

const IpRatingFilter: React.FC<Props> = ({ ip_rating, setFilters, allIpRatings }) => (
  <select
    className="w-full bg-zasvet-black text-zasvet-white border border-zasvet-gold/30 rounded-md h-10 px-3"
    value={ip_rating}
    onChange={e => setFilters(f => ({ ...f, ip_rating: e.target.value }))}
  >
    <option value="">Любой IP</option>
    {allIpRatings.map(ip => (
      <option value={ip} key={ip}>{`IP${ip}`}</option>
    ))}
  </select>
);

export default IpRatingFilter;
