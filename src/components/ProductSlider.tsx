import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

type Product = {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  slogan?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Серия "Буран"',
    description: "Уличные светильники с дополнительной защитой от скачков напряжения, перегрева и грозовых разрядов. Противоударный рассеиватель.",
    slogan: "Светильник, покоривший стихию",
    imageSrc: "/lovable-uploads/f13ee1fc-a08c-4b93-991e-38583c802305.png",
  },
  {
    id: 2,
    name: 'Серия "Простор"',
    description: "Уличный светильник с оптикой \"Ш\" и дополнительными защитами: от скачков напряжения, перегрева и грозовых разрядов.",
    slogan: "Освещение для российских просторов",
    imageSrc: "/lovable-uploads/ab04b935-544e-45e3-b2a7-aaad30a26ad7.png",
  },
  {
    id: 3,
    name: 'Серия "Гранит"',
    description: "Промышленный светильник с дополнительной защитой: от скачков напряжения, перегрева и грозозащитой. Противоударный рассеиватель.",
    slogan: "Освещение прочное как сибирская скала",
    imageSrc: "/lovable-uploads/8a4d6a22-1a29-40f0-a53c-ae031137e25f.png",
  },
  {
    id: 4,
    name: 'Серия "Гармония"',
    description: "Офисные светильники для потолков типа \"Армстронг\" или для накладного монтажа. Светильник укомплектован российским драйвером.",
    slogan: "Свет, который создает атмосферу вдохновения",
    imageSrc: "/lovable-uploads/f6f48988-544c-4a62-9d49-c566dea28792.png",
  },
  {
    id: 5,
    name: 'Серия "Сокол"',
    description: "Уличные прожектора с большим выбором оптики (КСС Д, С, Г, К) с дополнительной защитой: от скачков напряжения, перегрева и грозозащитой.",
    slogan: "Зоркий взгляд с высоты - для идеального контроля",
    imageSrc: "/lovable-uploads/dce9c18d-8932-4d5b-a1f5-2387a5fd0fa5.png",
  },
  {
    id: 3,
    name: "Серия Beta",
    description: "Промышленные светильники повышенной прочности.",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Серия Gamma",
    description: "Уличное освещение с защитой от атмосферных явлений.",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Серия Delta",
    description: "Декоративное освещение для интерьерных решений.",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Серия Epsilon",
    description: "Специализированное освещение для медицинских учреждений.",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 6,
    name: 'Серия "Минивольт"',
    description: "Низковольтные светильники на постоянный и переменный ток 12,24,36В. Разнообразные типы креплений.",
    slogan: "Минимум напряжения - максимум эффекта",
    imageSrc: "/lovable-uploads/2d7f3e16-3edb-49c5-8685-21668a495b6e.png",
  }
];

const ProductSlider = () => {
  return (
    <section id="products" className="section-padding bg-gradient-to-b from-zasvet-black to-zasvet-gray/80">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mx-auto">Наша продукция</h2>
        <p className="text-center text-zasvet-white/80 max-w-2xl mx-auto mb-12">
          Ознакомьтесь с нашими сериями продукции, разработанными для различных потребностей и условий эксплуатации
        </p>
        
        <Carousel 
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
            containScroll: "trimSnaps"
          }}
        >
          <CarouselContent className="ml-0">
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-4 pr-2">
                <Card className="bg-zasvet-gray border-none overflow-hidden rounded-xl">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img
                        src={product.imageSrc}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl font-semibold text-zasvet-white mb-1">
                          {product.name}
                        </h3>
                        {product.slogan && (
                          <p className="text-sm text-zasvet-gold italic mb-2 opacity-80">
                            "{product.slogan}"
                          </p>
                        )}
                        <p className="text-sm text-zasvet-white/70">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="static mx-2 translate-y-0 text-zasvet-black bg-zasvet-gold hover:bg-zasvet-darkgold" />
            <CarouselNext className="static mx-2 translate-y-0 text-zasvet-black bg-zasvet-gold hover:bg-zasvet-darkgold" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ProductSlider;
