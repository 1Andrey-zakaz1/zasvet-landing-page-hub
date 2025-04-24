
import React, { useState } from "react";
import { Fixture } from "@/pages/CatalogPage";
import { Button } from "@/components/ui/button";
import ProductDetailsModal from "./ProductDetailsModal";

const CatalogCard: React.FC<{ fixture: Fixture }> = ({ fixture }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => setShowDetails(true);

  return (
    <>
      <div className="rounded-xl border border-zasvet-gold/30 bg-zasvet-gray/10 shadow-lg overflow-hidden min-h-[270px] flex flex-col transition-transform hover:scale-105 hover:shadow-xl">
        <div className="p-4 flex-grow flex flex-col">
          <h3 
            className="font-bold text-lg mb-2 text-zasvet-gold cursor-pointer hover:text-zasvet-darkgold transition-colors"
            onClick={handleShowDetails}
          >
            {fixture.name}
          </h3>
          <ul className="text-zasvet-white/80 text-sm space-y-1 mb-4">
            <li><span className="font-medium">Мощность:</span> {fixture.power} Вт</li>
            <li><span className="font-medium">Световой поток:</span> {fixture.luminous_flux} лм</li>
            <li><span className="font-medium">IP-защита:</span> {fixture.ip_rating}</li>
            <li><span className="font-medium">КСС:</span> {fixture.beam_angle}</li>
            <li><span className="font-medium">Размер:</span> {fixture.dimensions}</li>
            <li><span className="font-medium">Гарантия:</span> {fixture.warranty} года</li>
          </ul>
          <div className="flex items-center justify-between mt-auto">
            <div className="text-base text-zasvet-gold font-bold">
              {fixture.price.toLocaleString("ru-RU")} ₽
            </div>
            <Button 
              variant="gold" 
              size="sm"
              className="font-semibold"
              onClick={handleShowDetails}
            >
              Подробнее
            </Button>
          </div>
        </div>
      </div>

      <ProductDetailsModal
        fixture={fixture}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
};

export default CatalogCard;
