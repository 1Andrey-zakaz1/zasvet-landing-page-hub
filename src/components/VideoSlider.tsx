
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, Video, Film } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

type VideoItem = {
  id: number;
  title: string;
  description: string;
  thumbnailSrc: string;
  videoSrc: string;
};

const videos: VideoItem[] = [
  {
    id: 1,
    title: "О нашей компании",
    description: "Познакомьтесь с историей и ценностями производственной компании Zасвет.",
    thumbnailSrc: "/placeholder.svg",
    videoSrc: "https://www.example.com/video1.mp4",
  },
  {
    id: 2,
    title: "Как пользоваться сайтом",
    description: "Подробная инструкция по навигации и использованию функций нашего сайта.",
    thumbnailSrc: "/placeholder.svg",
    videoSrc: "https://www.example.com/video2.mp4",
  },
  {
    id: 3,
    title: "Наша продукция",
    description: "Обзор линейки наших продуктов и их ключевых преимуществ.",
    thumbnailSrc: "/placeholder.svg",
    videoSrc: "https://www.example.com/video3.mp4",
  },
];

const VideoSlider = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const openVideo = (video: VideoItem) => {
    setActiveVideo(video);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section id="videos" className="section-padding bg-zasvet-black">
      <div className="container mx-auto px-4">
        <div className="text-xs uppercase tracking-wider text-zasvet-gold font-semibold mb-2 text-center">
          ВИДЕОМАТЕРИАЛЫ
        </div>
        <h2 className="section-title text-center mx-auto text-3xl md:text-4xl font-bold mb-4 text-zasvet-white">
          Узнайте больше о нас и нашей продукции
        </h2>
        <div className="w-16 h-1 bg-zasvet-gold mb-8 mx-auto"></div>
        <p className="text-center text-zasvet-white/80 max-w-2xl mx-auto mb-12">
          Смотрите обучающие видео, обзоры продукции и другие полезные материалы, которые помогут вам лучше понять особенности наших решений
        </p>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-zasvet-gray/20 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all border border-zasvet-gold/30">
                  <div className="relative cursor-pointer" onClick={() => openVideo(video)}>
                    <AspectRatio ratio={16/9}>
                      <img
                        src={video.thumbnailSrc}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Button 
                          className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black rounded-full h-16 w-16 flex items-center justify-center"
                          size="icon"
                        >
                          <Play className="h-8 w-8 ml-1" />
                        </Button>
                      </div>
                    </AspectRatio>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-zasvet-white">{video.title}</h3>
                    <p className="text-sm text-zasvet-white/70 mt-2">{video.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-zasvet-black bg-zasvet-gold hover:bg-zasvet-darkgold" />
          <CarouselNext className="text-zasvet-black bg-zasvet-gold hover:bg-zasvet-darkgold" />
        </Carousel>
      </div>
      
      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative bg-zasvet-gray rounded-lg max-w-4xl w-full">
            <Button 
              onClick={closeVideo}
              className="absolute -top-12 right-0 bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black"
            >
              Закрыть
            </Button>
            <div className="p-4">
              <AspectRatio ratio={16/9}>
                <video 
                  controls 
                  className="w-full h-full object-cover rounded-lg"
                  src={activeVideo.videoSrc}
                >
                  Ваш браузер не поддерживает видео.
                </video>
              </AspectRatio>
              <h3 className="text-xl font-semibold text-zasvet-white mt-4">{activeVideo.title}</h3>
              <p className="text-sm text-zasvet-white/70 mt-2">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSlider;
