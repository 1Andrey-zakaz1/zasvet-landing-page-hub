
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { LampFloor, LampDesk, LampCeiling, LampWallUp, Lightbulb, Zap, Thermometer, Ruler } from "lucide-react";
import { openCalculatorChat } from "@/components/TelegramBotWidget";

const LightingSelectionWidget = () => {
  const [selectedType, setSelectedType] = useState("ceiling");
  const [brightness, setBrightness] = useState([1500]);
  const [temperature, setTemperature] = useState([4000]);
  const [size, setSize] = useState([50]);
  
  const handleSubmit = () => {
    const selectionData = {
      type: selectedType,
      brightness: brightness[0],
      temperature: temperature[0],
      size: size[0]
    };
    
    // Открываем чат с данными о выбранном светильнике
    openCalculatorChat(`подбор_светильника:${JSON.stringify(selectionData)}`);
  };
  
  return (
    <section id="lighting-selection" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zasvet-white mb-4">
            Подбор светильников
          </h2>
          <div className="w-16 h-1 bg-zasvet-gold mx-auto mb-6"></div>
          <p className="text-zasvet-white/80 max-w-2xl mx-auto">
            Подберите оптимальное освещение для вашего пространства с помощью нашего конфигуратора
          </p>
        </div>
        
        <div className="bg-zasvet-gray/10 border border-zasvet-gold/20 rounded-lg p-6 max-w-3xl mx-auto">
          <Tabs defaultValue="ceiling" onValueChange={setSelectedType} className="mb-8">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="ceiling" className="flex flex-col items-center py-3">
                <LampCeiling className="h-6 w-6 mb-2" />
                <span className="text-sm">Потолочные</span>
              </TabsTrigger>
              <TabsTrigger value="wall" className="flex flex-col items-center py-3">
                <LampWallUp className="h-6 w-6 mb-2" />
                <span className="text-sm">Настенные</span>
              </TabsTrigger>
              <TabsTrigger value="floor" className="flex flex-col items-center py-3">
                <LampFloor className="h-6 w-6 mb-2" />
                <span className="text-sm">Напольные</span>
              </TabsTrigger>
              <TabsTrigger value="desk" className="flex flex-col items-center py-3">
                <LampDesk className="h-6 w-6 mb-2" />
                <span className="text-sm">Настольные</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ceiling" className="space-y-4">
              <div className="aspect-video bg-zasvet-black rounded-lg overflow-hidden border border-zasvet-gold/20">
                <img 
                  src="/lovable-uploads/73a54517-b93b-448f-bad2-1848a88f57d1.png" 
                  alt="Потолочный светильник" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </TabsContent>
            <TabsContent value="wall" className="space-y-4">
              <div className="aspect-video bg-zasvet-black rounded-lg overflow-hidden border border-zasvet-gold/20">
                <img 
                  src="/lovable-uploads/bd6e1f11-5009-4d95-a578-082eb853a850.png" 
                  alt="Настенный светильник" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </TabsContent>
            <TabsContent value="floor" className="space-y-4">
              <div className="aspect-video bg-zasvet-black rounded-lg overflow-hidden border border-zasvet-gold/20">
                <img 
                  src="/lovable-uploads/6f1de9df-ec7b-4ab7-bcce-47e3f5496c0f.png" 
                  alt="Напольный светильник" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </TabsContent>
            <TabsContent value="desk" className="space-y-4">
              <div className="aspect-video bg-zasvet-black rounded-lg overflow-hidden border border-zasvet-gold/20">
                <img 
                  src="/lovable-uploads/9aa29444-c53f-406a-ab71-94572c977bc9.png" 
                  alt="Настольный светильник" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-zasvet-gold" />
                  <label className="text-zasvet-white font-medium">Яркость (люмен)</label>
                </div>
                <span className="text-zasvet-white/90 font-mono">{brightness[0]} лм</span>
              </div>
              <Slider
                defaultValue={[1500]}
                max={5000}
                min={100}
                step={100}
                value={brightness}
                onValueChange={setBrightness}
                className="pt-2"
              />
              <div className="flex justify-between text-xs text-zasvet-white/60">
                <span>100 лм</span>
                <span>5000 лм</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-zasvet-gold" />
                  <label className="text-zasvet-white font-medium">Цветовая температура (K)</label>
                </div>
                <span className="text-zasvet-white/90 font-mono">{temperature[0]} K</span>
              </div>
              <Slider
                defaultValue={[4000]}
                max={6500}
                min={2700}
                step={100}
                value={temperature}
                onValueChange={setTemperature}
                className="pt-2"
              />
              <div className="flex justify-between text-xs text-zasvet-white/60">
                <span>Теплый 2700K</span>
                <span>Холодный 6500K</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-zasvet-gold" />
                  <label className="text-zasvet-white font-medium">Размер (см)</label>
                </div>
                <span className="text-zasvet-white/90 font-mono">{size[0]} см</span>
              </div>
              <Slider
                defaultValue={[50]}
                max={200}
                min={10}
                step={5}
                value={size}
                onValueChange={setSize}
                className="pt-2"
              />
              <div className="flex justify-between text-xs text-zasvet-white/60">
                <span>10 см</span>
                <span>200 см</span>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-text py-6 text-lg font-medium"
                onClick={handleSubmit}
              >
                <Zap className="mr-2 h-5 w-5" />
                Подобрать светильники
              </Button>
              <p className="text-center text-zasvet-white/60 text-sm mt-4">
                После нажатия кнопки откроется чат с нашим помощником для завершения подбора
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LightingSelectionWidget;
