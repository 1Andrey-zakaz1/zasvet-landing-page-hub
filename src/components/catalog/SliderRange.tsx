
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
  colorThumb?: "primary" | "orange" | "green" | "blue" | "custom"; // добавил custom для красно-синего
  unit?: string;
  minLabel?: string;
  maxLabel?: string;
};

// Цвета для бегунков: минимум — синий, максимум — красный
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
}) => (
  <div className="flex flex-col justify-end">
    <label className="text-zasvet-gold text-sm mb-1 ml-1 select-none">{label}</label>
    <div className="flex items-center gap-3">
      <span className="text-zasvet-white text-xs min-w-[3em]">{value[0]}{unit}</span>
      <Slider
        className={clsx(
          "mx-2 w-full",
          // Стили для бегунков с разными цветами
          "[&>.slider-thumb-0]:border-2",
          `[&>.slider-thumb-0]:${thumbColors[colorThumb][0]}`,
          "[&>.slider-thumb-1]:border-2",
          `[&>.slider-thumb-1]:${thumbColors[colorThumb][1]}`
        )}
        min={min}
        max={max}
        step={step}
        value={[value[0], value[1]]}
        minStepsBetweenThumbs={1}
        onValueChange={([val1, val2]) => onChange([val1, val2])}
        style={{ maxWidth: "90%" }}
      />
      <span className="text-zasvet-white text-xs min-w-[3em]">{value[1]}{unit}</span>
    </div>
    <div className="flex justify-between px-1 mt-1 text-zasvet-gray/70 text-xs">
      <span>{minLabel ?? `Минимум: ${min}`}</span>
      <span>{maxLabel ?? `Максимум: ${max}`}</span>
    </div>
  </div>
);
