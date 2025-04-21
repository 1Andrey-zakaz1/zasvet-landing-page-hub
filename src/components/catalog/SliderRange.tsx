
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

// Новый компонент кастомного бегунка с нужными классами
const SliderThumb: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={clsx(
      "block h-5 w-5 rounded-full border-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    tabIndex={0}
    style={{ boxSizing: "border-box" }}
    // IMPORTANT для совместимости с Radix
    data-radix-slider-thumb=""
  />
);

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
          {/* Кастомный слайдер с двумя цветными бегунками */}
          <Slider
            className="mx-2 w-full"
            min={min}
            max={max}
            step={step}
            value={[value[0], value[1]]}
            minStepsBetweenThumbs={1}
            onValueChange={([val1, val2]) => onChange([val1, val2])}
            // Передаём кастомные компоненты для обоих бегунков
            renderThumb={() => null}
          >
            {/* Кастомные бегунки */}
            <SliderThumb className={leftColor + " radix-slider-thumb z-10"} />
            <SliderThumb className={rightColor + " radix-slider-thumb z-10"} />
          </Slider>
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
