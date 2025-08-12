"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface AnimatedCounterProps {
  label?: string;
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const AnimatedCounter = ({
  label = "Batch",
  initialValue = 2,
  min = 0,
  max = 99,
  onChange = () => {},
}: AnimatedCounterProps) => {
  const [count, setCount] = useState<number>(initialValue);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleIncrement = () => {
    if (count < max) {
      setIsAnimating(true);
      setCount((prev) => prev + 1);
      onChange(count + 1);
      setTimeout(() => setIsAnimating(false), 200);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      setIsAnimating(true);
      setCount((prev) => prev - 1);
      onChange(count - 1);
      setTimeout(() => setIsAnimating(false), 200);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ml-2 gap-4">
      <p className="text-xs text-gray-300 font-medium tracking-wide">{label}</p>

      <div className="relative w-16 h-8 bg-[#131312] border border-[#313131] shadow-[inset_0px_0px_12px_-4px_rgba(200,200,200,0.25)] rounded-lg text-sm flex items-center justify-center p-1 transition-all duration-300 hover:border-[#404040] hover:shadow-[inset_0px_0px_16px_-4px_rgba(200,200,200,0.35)]">
        {/* Minus Button */}
        <button
          onClick={handleDecrement}
          disabled={count <= min}
          className={`
            w-6 h-6 rounded-md flex items-center justify-center
            transition-all duration-200 ease-out
            ${
              count <= min
                ? "text-gray-600 cursor-not-allowed opacity-50"
                : "text-gray-300 hover:text-white hover:bg-[#2a2a2a] hover:scale-110 active:scale-95 cursor-pointer"
            }
          `}
        >
          <Minus size={12} strokeWidth={2.5} />
        </button>

        {/* Counter Display */}
        <div
          className={`
          bg-[#363635] w-full h-full rounded-md flex justify-center items-center text-[12px] mx-1
          font-semibold text-white transition-all duration-200 ease-out
          ${isAnimating ? "scale-110 bg-[#404040] shadow-lg" : "scale-100"}
        `}
        >
          <span
            className={`
            transition-all duration-300 ease-out
            ${isAnimating ? "transform scale-125" : "transform scale-100"}
          `}
          >
            {count}
          </span>
        </div>

        <button
          onClick={handleIncrement}
          disabled={count >= max}
          className={`
            w-6 h-6 rounded-md flex items-center justify-center
            transition-all duration-200 ease-out
            ${
              count >= max
                ? "text-gray-600 cursor-not-allowed opacity-50"
                : "text-gray-300 hover:text-white hover:bg-[#2a2a2a] hover:scale-110 active:scale-95 cursor-pointer"
            }
          `}
        >
          <Plus size={12} strokeWidth={2.5} />
        </button>

        {isAnimating && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/20 to-accent/10 animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default AnimatedCounter;
