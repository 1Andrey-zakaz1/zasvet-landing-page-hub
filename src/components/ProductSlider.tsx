
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
};

const products: Product[] = [
  {
    id: 1,
    name: 'Серия "Буран"',
    description: "Промышленные светильники с защитой IP67 мощностью от 48 до 192 Вт. Гарантия 5 лет.",
    imageSrc: "/lovable-uploads/f13ee1fc-a08c-4b93-991e-38583c802305.png",
  },
  {
    id: 2,
    name: "Серия Alpha",
    description: "Современные светодиодные панели для офисных помещений.",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Серия Beta",
    description: "Промышленные светильники повышенной прочности.",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Серия Gamma",
    description: "Уличное освещение с защитой от атмосферных явлений.",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Серия Delta",
    description: "Декоративное освещение для интерьерных решений.",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Серия Epsilon",
    description: "Специализированное освещение для медицинских учреждений.",
    imageSrc: "/placeholder.svg",
  },
];

const ProductSlider = () => {
  return (
    <section id="products" className="section-padding bg-gradient-to-b from-zasvet-black to-zasvet-gray/80">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mx-auto">Наша продукция</h2>
        <p className="text-center text-zasvet-white/80 max-w-2xl mx-auto mb-12">
          Ознакомьтесь с нашими сериями продукции, разработанными для различных потребностей и условий эксплуатации
        </p>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                <Card className="bg-zasvet-gray border-none overflow-hidden hover:transform hover:scale-105 transition-all">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img
                        src={product.imageSrc}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-zasvet-white">{product.name}</h3>
                      <p className="text-sm text-zasvet-white/70 mt-2">{product.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-zasvet-black bg-zasvet-gold hover:bg-zasvet-darkgold" />
          <CarouselNext className="text-zasvet-black bg-zasvet-gold hover:bg-zasvet-darkgold" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductSlider;
