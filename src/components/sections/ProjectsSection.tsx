
import React, { useState } from 'react';
import { Building2, ChevronLeft, ChevronRight, MapPin, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Импортируем изображения
import tomskUniversity1 from '@/assets/projects/tomsk-university-1.jpg';
import tomskUniversity2 from '@/assets/projects/tomsk-university-2.jpg';
import parkLighting1 from '@/assets/projects/park-lighting-1.jpg';
import parkLighting2 from '@/assets/projects/park-lighting-2.jpg';
import parkLightingVideo from '@/assets/projects/park-lighting-video.mp4';
import bikePath1 from '@/assets/projects/bike-path-1.jpg';
import bikePath2 from '@/assets/projects/bike-path-2.jpg';

interface Project {
  id: number;
  title: string;
  location?: string;
  description: string;
  images: string[];
  video?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Фасадная подсветка здания университета",
    location: "г. Томск",
    description: "Архитектурная подсветка главного корпуса Томского государственного университета. Использованы как светильники со свечением 4000К, так и RGB светильники для точного подбора оттенка розового цвета, требовавшийся заказчику.",
    images: [tomskUniversity1, tomskUniversity2],
  },
  {
    id: 2,
    title: "Архитектурная подсветка парка",
    description: "Декоративная RGB-подсветка деревьев в парковой зоне. Многоцветные светильники создают праздничную атмосферу и подчёркивают красоту зимнего пейзажа.",
    images: [parkLighting1, parkLighting2],
    video: parkLightingVideo,
  },
  {
    id: 3,
    title: "Освещение велодорожки",
    location: "г. Новосибирск",
    description: "Функциональное освещение велодорожки в парковой зоне. Современные светильники обеспечивают комфортное и безопасное передвижение в вечернее время.",
    images: [bikePath1, bikePath2],
  },
];

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentMediaIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentMediaIndex(0);
  };

  // Получаем все медиа (изображения + видео) для проекта
  const getProjectMedia = (project: Project) => {
    const media: { type: 'image' | 'video'; src: string }[] = project.images.map(img => ({ type: 'image', src: img }));
    if (project.video) {
      media.push({ type: 'video', src: project.video });
    }
    return media;
  };

  const nextMedia = () => {
    if (selectedProject) {
      const media = getProjectMedia(selectedProject);
      setCurrentMediaIndex((prev) => 
        prev === media.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevMedia = () => {
    if (selectedProject) {
      const media = getProjectMedia(selectedProject);
      setCurrentMediaIndex((prev) => 
        prev === 0 ? media.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="projects" className="bg-zasvet-black py-10">
      <div className="container mx-auto px-4">
        <div className="border border-zasvet-gold/30 rounded-lg p-6 bg-zasvet-black/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title text-zasvet-white flex items-center gap-2 mb-0">
              <Building2 className="h-6 w-6 text-zasvet-gold" />
              Наши объекты
            </h2>
            <Button
              variant="gold"
              className="transition-all duration-300 flex items-center gap-1"
              onClick={() => setIsExpanded(prev => !prev)}
            >
              {isExpanded ? (
                <>
                  <span className="mr-1">▲</span> Свернуть
                </>
              ) : (
                <>
                  <span className="mr-1">▼</span> Развернуть
                </>
              )}
            </Button>
          </div>

          {isExpanded && (
            <div className="animate-fade-in">
              <p className="text-zasvet-white/70 mb-8">
                Реализованные проекты с использованием нашего светотехнического оборудования
              </p>
              
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => openProject(project)}
                    className="group cursor-pointer rounded-lg overflow-hidden border border-zasvet-gold/20 hover:border-zasvet-gold/50 transition-all duration-300 bg-zasvet-gray/10"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {project.video && (
                        <div className="absolute bottom-2 right-2 bg-zasvet-black/70 rounded-full p-2">
                          <Play className="h-4 w-4 text-zasvet-gold" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-zasvet-white mb-2 group-hover:text-zasvet-gold transition-colors">
                        {project.title}
                      </h3>
                      {project.location && (
                        <div className="flex items-center text-zasvet-white/60 text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-zasvet-gold" />
                          {project.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isExpanded && (
            <div className="text-zasvet-white/80 text-center py-10 animate-fade-in font-medium">
              Нажмите «Развернуть», чтобы просмотреть реализованные проекты.
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно для просмотра проекта */}
      <Dialog open={!!selectedProject} onOpenChange={() => closeProject()}>
        <DialogContent className="max-w-4xl bg-zasvet-black border-zasvet-gold/30 p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl text-zasvet-white">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="p-6">
              {/* Галерея медиа */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                {(() => {
                  const media = getProjectMedia(selectedProject);
                  const currentMedia = media[currentMediaIndex];
                  
                  if (currentMedia.type === 'video') {
                    return (
                      <video
                        src={currentMedia.src}
                        controls
                        className="w-full h-full object-cover"
                        poster={selectedProject.images[0]}
                      />
                    );
                  }
                  
                  return (
                    <img
                      src={currentMedia.src}
                      alt={`${selectedProject.title} - фото ${currentMediaIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  );
                })()}
                
                {(() => {
                  const media = getProjectMedia(selectedProject);
                  if (media.length <= 1) return null;
                  
                  return (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-zasvet-black/50 hover:bg-zasvet-black/70 text-zasvet-white"
                        onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-zasvet-black/50 hover:bg-zasvet-black/70 text-zasvet-white"
                        onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                      
                      {/* Индикаторы */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {media.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(idx); }}
                            className={`w-2 h-2 rounded-full transition-all flex items-center justify-center ${
                              idx === currentMediaIndex 
                                ? 'bg-zasvet-gold w-6' 
                                : 'bg-zasvet-white/50 hover:bg-zasvet-white/70'
                            }`}
                          >
                            {item.type === 'video' && idx !== currentMediaIndex && (
                              <Play className="h-1.5 w-1.5" />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Информация о проекте */}
              {selectedProject.location && (
                <div className="flex items-center text-zasvet-gold mb-3">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="font-medium">{selectedProject.location}</span>
                </div>
              )}
              <p className="text-zasvet-white/80 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
