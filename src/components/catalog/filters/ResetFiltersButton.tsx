
import React from "react";
import { Button } from "@/components/ui/button";
import type { FilterValues } from "../CatalogFilterPanel";

type Props = {
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
};

const ResetFiltersButton: React.FC<Props> = ({ setFilters }) => (
  <Button
    type="button"
    variant="gold"
    className="w-full"
    onClick={() => setFilters({
      query: "",
      series: "",
      power_min: "",
      power_max: "",
      lumen_min: "",
      lumen_max: "",
      price_min: "",
      price_max: "",
      ip_rating: "",
      kss_type: "",
      kss_angle: "",
      mounting: "",
      length_min: "",
      length_max: "",
      width_min: "",
      width_max: "",
      height_min: "",
      height_max: "",
      only_available: true,
    })}
  >
    Сбросить фильтры
  </Button>
);

export default ResetFiltersButton;
