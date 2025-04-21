
import React from "react";
import { Slider } from "@/components/ui/slider";
import clsx from "clsx";

type Props = {
  value: [number, number];
  min: number;
  max: number;
  step?: number;
  onChange: (value: [number, number]) => void;
  label: string;
  colorThumb?: "primary" | "orange" | "green" | "blue" | "custom";
  unit?: string;
  minLabel?: string;
  maxLabel?: string;
};

// Цвета для бегунков (левая и правая точка)
const thumbColors = {
  primary: ["bg-[#9b87f5] border-[#9b87f5]", "bg-[#7E69AB] border-[#7E69AB]"],
  orange: ["bg-[#F97316] border-[#F97316]", "bg-[#FCA745] border-[#FCA745]"],
  green: ["bg-[#22c55e] border-[#22c55e]", "bg-[#16a34a] border-[#16a34a]"],
  blue: ["bg-[#1EAEDB] border-[#1EAEDB]", "bg-[#0FA0CE] border-[#0FA0CE]"],
  custom: ["bg-[#1EAEDB] border-[#1EAEDB]", "bg-[#ea384c] border-[#ea384c]"], // синий и красный
};

export const SliderRange: React.FC<Props> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  colorThumb = "primary",
  unit,
  minLabel,
  maxLabel,
}) => {
  // Определяем классы для обеих точек
  const [leftColor, rightColor] = thumbColors[colorThumb] || thumbColors.primary;
  
  return (
    <div className="flex flex-col justify-end">
      <label className="text-zasvet-gold text-sm mb-1 ml-1 select-none">{label}</label>
      <div className="flex items-center gap-3">
        <span className="text-zasvet-white text-xs min-w-[3em]">{value[0]}{unit}</span>
        <div className="w-full relative" style={{ maxWidth: "90%" }}>
          {/* Кастомный слайдер */}
          <Slider
            className="mx-2 w-full custom-range-slider"
            min={min}
            max={max}
            step={step}
            value={[value[0], value[1]]}
            minStepsBetweenThumbs={1}
            onValueChange={([val1, val2]) => onChange([val1, val2])}
          />
          
          {/* Стили для бегунков */}
          <style dangerouslySetInnerHTML={{ __html: `
            /* Стили для обоих бегунков */
            .custom-range-slider [data-orientation=horizontal] [role=slider] {
              display: block !important;
              height: 20px !important;
              width: 20px !important;
              border-radius: 9999px !important;
              border-width: 2px !important;
              box-sizing: border-box !important;
            }
            
            /* Стиль для первого бегунка (минимальное значение) */
            .custom-range-slider [data-orientation=horizontal] [role=slider]:first-child {
              background-color: ${leftColor.includes("bg-[#") ? leftColor.match(/bg-\[(.*?)\]/)[1] : "#1EAEDB"} !important;
              border-color: ${leftColor.includes("border-[#") ? leftColor.match(/border-\[(.*?)\]/)[1] : "#1EAEDB"} !important;
            }
            
            /* Стиль для второго бегунка (максимальное значение) */
            .custom-range-slider [data-orientation=horizontal] [role=slider]:last-child {
              background-color: ${rightColor.includes("bg-[#") ? rightColor.match(/bg-\[(.*?)\]/)[1] : "#ea384c"} !important;
              border-color: ${rightColor.includes("border-[#") ? rightColor.match(/border-\[(.*?)\]/)[1] : "#ea384c"} !important;
            }
          `}} />
        </div>
        <span className="text-zasvet-white text-xs min-w-[3em]">{value[1]}{unit}</span>
      </div>
      <div className="flex justify-between px-1 mt-1 text-zasvet-gray/70 text-xs">
        <span>{minLabel ?? `Минимум: ${min}`}</span>
        <span>{maxLabel ?? `Максимум: ${max}`}</span>
      </div>
    </div>
  );
};
