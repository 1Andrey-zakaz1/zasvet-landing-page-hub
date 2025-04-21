
import React from "react";
import { Input } from "@/components/ui/input";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  query: string;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
};
const SearchFilter: React.FC<Props> = ({ query, setFilters }) => (
  <Input
    placeholder="Поиск"
    value={query}
    onChange={e => setFilters(f => ({ ...f, query: e.target.value }))}
    className="bg-zasvet-black text-zasvet-white border-zasvet-gold/30"
  />
);

export default SearchFilter;
