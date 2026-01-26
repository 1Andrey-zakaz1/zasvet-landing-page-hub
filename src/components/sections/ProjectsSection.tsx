
import React, { useState } from 'react';
import { Building2, ChevronLeft, ChevronRight, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Импортируем изображения
import tomskUniversity1 from '@/assets/projects/tomsk-university-1.jpg';
import tomskUniversity2 from '@/assets/projects/tomsk-university-2.jpg';
import parkLighting1 from '@/assets/projects/park-lighting-1.jpg';
import parkLighting2 from '@/assets/projects/park-lighting-2.jpg';

interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  images: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Фасадная подсветка здания университета",
    location: "г. Томск",
    description: "Архитектурная подсветка главного корпуса Томского государственного университета. Использованы светильники серии для создания эффектного освещения фасада в вечернее время.",
    images: [tomskUniversity1, tomskUniversity2],
  },
  {
    id: 2,
    title: "Архитектурная подсветка парка",
    location: "Россия",
    description: "Декоративная RGB-подсветка деревьев в парковой зоне. Многоцветные светильники создают праздничную атмосферу и подчёркивают красоту зимнего пейзажа.",
    images: [parkLighting1, parkLighting2],
  },
];

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
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
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-zasvet-white mb-2 group-hover:text-zasvet-gold transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-zasvet-white/60 text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-zasvet-gold" />
                        {project.location}
                      </div>
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
              {/* Галерея изображений */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} - фото ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {selectedProject.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-zasvet-black/50 hover:bg-zasvet-black/70 text-zasvet-white"
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-zasvet-black/50 hover:bg-zasvet-black/70 text-zasvet-white"
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    
                    {/* Индикаторы */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex 
                              ? 'bg-zasvet-gold w-6' 
                              : 'bg-zasvet-white/50 hover:bg-zasvet-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Информация о проекте */}
              <div className="flex items-center text-zasvet-gold mb-3">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="font-medium">{selectedProject.location}</span>
              </div>
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
