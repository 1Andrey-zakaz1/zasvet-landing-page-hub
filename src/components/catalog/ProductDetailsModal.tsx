
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Fixture } from "@/pages/CatalogPage";
import { products } from "@/components/ProductSlider";
import { Package } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";

interface ProductDetailsModalProps {
  fixture: Fixture;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  fixture,
  open,
  onOpenChange,
}) => {
  // Find matching product from slider by series name
  const seriesName = fixture.name.split(" ")[0];
  const matchingProduct = products.find(p => p.name.includes(seriesName));
  const { openContactForm } = useContactForm();

  const handleOrderClick = () => {
    onOpenChange(false); // Закрываем текущее модальное окно
    openContactForm("request"); // Открываем форму заявки
  };

  const handleConsultationClick = () => {
    onOpenChange(false); // Закрываем текущее модальное окно
    openContactForm("contact"); // Открываем форму контакта
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zasvet-black border-zasvet-gold/30 text-zasvet-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-zasvet-gold">{fixture.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            {matchingProduct && (
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={matchingProduct.imageSrc}
                  alt={matchingProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {matchingProduct?.slogan && (
              <p className="text-zasvet-gold italic mt-2 text-sm text-center">
                "{matchingProduct.slogan}"
              </p>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-zasvet-gold mb-2">Характеристики:</h3>
              <ul className="space-y-2 text-zasvet-white/80">
                <li><span className="font-medium">Мощность:</span> {fixture.power} Вт</li>
                <li><span className="font-medium">Световой поток:</span> {fixture.luminous_flux} лм</li>
                <li><span className="font-medium">IP-защита:</span> {fixture.ip_rating}</li>
                <li><span className="font-medium">Размеры:</span> {fixture.dimensions}</li>
                <li><span className="font-medium">Материал:</span> {fixture.material}</li>
                <li><span className="font-medium">Коэффициент пульсации:</span> менее 1%</li>
                {Object.entries(fixture.properties)
                  .filter(([key]) => key !== 'I' && key !== 'P')
                  .map(([key, value]) => (
                    <li key={key}>
                      <span className="font-medium">{key}:</span> {value}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Button 
            variant="gold" 
            size="lg" 
            className="font-medium"
            onClick={handleOrderClick}
          >
            <Package className="mr-1" /> Заказать надежный светильник
          </Button>
          <Button 
            variant="gold" 
            size="lg" 
            className="font-medium shadow-lg transform transition-transform active:translate-y-1 hover:-translate-y-1"
            onClick={handleConsultationClick}
          >
            👨‍💼 Получить консультацию
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
