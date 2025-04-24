
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
    description: "Уличные светильники с дополнительной защитой от скачков напряжения, перегрева и грозовых разрядов.",
    slogan: "Светильник, покоривший стихию",
    imageSrc: "/lovable-uploads/f13ee1fc-a08c-4b93-991e-38583c802305.png",
  },
  {
    id: 2,
    name: "Серия Alpha",
    description: "Современные светодиодные панели для офисных помещений.",
    imageSrc: "/placeholder.svg",
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
