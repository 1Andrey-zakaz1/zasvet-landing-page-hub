
import React from "react";
import { Fixture } from "@/pages/CatalogPage";
import CatalogCard from "./CatalogCard";

type Props = {
  fixtures: Fixture[];
};

const CatalogList: React.FC<Props> = ({ fixtures }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {fixtures.map(fix => (
        <CatalogCard fixture={fix} key={fix.id} />
      ))}
    </div>
  );
};

export default CatalogList;
