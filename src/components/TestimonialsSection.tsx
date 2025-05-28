
import React from 'react';
import { Star, Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    text: "Светильник классный, светит очень ярко, даже не ожидали, покупкой максимально довольны",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 2,
    text: "Купили 16 шт для освещения улицы в дачном обществе. Светят как и нужно и цена устраивает, ранее стояли 100вт (другого производителя), но как-то быстро светодиоды выходили из строя и светили по 30-50%. Посмотрим как эти поведут себя. Но пока довольны.",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 3,
    text: "Качественный уличный светильник. Провод длинный. Крепление в комплекте. Надежная фиксация при регулировке светильника!!!",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 4,
    text: "Сделан добротно, кронштейн под любое положение, плавный запуск, свет приятный, 4000К. За такую цену просто находка. 5 соток осветил легко.",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 5,
    text: "Хороший долговечный. Купил пятый в цех, первые четыре установил под навес! Все круто",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 6,
    text: "50 вт светит просто огонь, парковка как днем, уч 8 соток как при луне",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 7,
    text: "Пользуюсь таким, уже второй год, освещение супер, даже за двором освещает не смотря что весь двор как днем сияет",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 8,
    text: "Приобретаю эти светильники уже не первый раз. Товар качественный и соответствует заявленным характеристикам.",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 9,
    text: "Шикарные фонари беру не первый раз и не последний 👍",
    rating: 5,
    source: "Маркетплейс"
  },
  {
    id: 10,
    text: "Уже не первый такой беру, качество на высоте, производитель прислушивается к пожеланиям покупателей.",
    rating: 5,
    source: "Маркетплейс"
  }
];

const TestimonialsSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-zasvet-gold text-zasvet-gold' : 'text-zasvet-gray'
        }`}
      />
    ));
  };

  return (
    <section className="bg-zasvet-black py-16 border-t border-zasvet-gold/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zasvet-gold mb-4">
            Отзывы клиентов
          </h2>
          <p className="text-lg text-zasvet-white/80 max-w-3xl mx-auto">
            Отзывы о наших светильниках от клиентов на маркетплейсах
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-zasvet-gray/10 border-zasvet-gold/20 hover:border-zasvet-gold/40 transition-all duration-300 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                        <Quote className="h-5 w-5 text-zasvet-gold/60" />
                      </div>
                      
                      <p className="text-zasvet-white/90 text-sm leading-relaxed flex-grow">
                        {testimonial.text}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-zasvet-gold/20">
                        <p className="text-zasvet-gold text-xs font-medium">
                          {testimonial.source}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex -left-12 bg-zasvet-gold/10 border-zasvet-gold/30 text-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black" />
            <CarouselNext className="hidden md:flex -right-12 bg-zasvet-gold/10 border-zasvet-gold/30 text-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <p className="text-zasvet-white/60 text-sm">
            Все отзывы получены от реальных покупателей на популярных маркетплейсах
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
