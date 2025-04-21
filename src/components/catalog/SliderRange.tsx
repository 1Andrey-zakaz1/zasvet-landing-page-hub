
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
  colorThumb?: "primary" | "orange" | "green" | "blue";
  unit?: string;
  minLabel?: string;
  maxLabel?: string;
};

const thumbColor = {
  primary: "bg-[#9b87f5] border-[#9b87f5]",
  orange: "bg-[#F97316] border-[#F97316]",
  green: "bg-[#22c55e] border-[#22c55e]",
  blue: "bg-[#1EAEDB] border-[#1EAEDB]",
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
        className={clsx("mx-2 w-full", 
          "[&>.slider-thumb-0]:border-2", 
          `[&>.slider-thumb-0]:${thumbColor[colorThumb]}`
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
