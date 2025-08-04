import * as motion from "motion/react-client";
import React from "react";
import clsx from "clsx";

const baseStyles = "shadow-[inset_0px_2px_4px_rgba(255,255,255,0.16)]";
const gradientTransparent =
  "bg-[linear-gradient(268.66deg,_rgba(22,22,24,0.01)_1.07%,_rgba(0,0,0,0.01)_17.36%,_rgba(26,26,29,0.0001)_98.79%)]";
const gradientOpaque =
  "bg-[linear-gradient(268.66deg,_rgba(22,22,24,0.39)_1.07%,_rgba(0,0,0,0.39)_17.36%,_rgba(26,26,29,0.0039)_98.79%)]";
const blurOptions = [
  "backdrop-blur-[5px]",
  "backdrop-blur-[10px]",
  "backdrop-blur-[15px]",
];
const rotate90 = "rotate-90";

const getRandomStyle = () => {
  const gradient = Math.random() > 0.5 ? gradientTransparent : gradientOpaque;
  const blur = blurOptions[Math.floor(Math.random() * blurOptions.length)];
  const rotate = Math.random() < 0.05 ? rotate90 : "";
  return clsx(baseStyles, gradient, blur, rotate);
};

interface PixelCensorProps {
  matrix: number[][];
  squareSize?: number;
	className?: string; 
}

const PixelCensor: React.FC<PixelCensorProps> = ({
  matrix,
  squareSize = 30,
	className= ""
}) => {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: cols * squareSize,
        height: rows * squareSize,
      }}
    >
      {matrix.flatMap((row, rowIndex) =>
        row.map((value, colIndex) => {
          const isVisible = value === 1;
          const x = colIndex * squareSize;
          const y = rowIndex * squareSize;

          return (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className={clsx(
                "absolute",
                isVisible ? getRandomStyle() : "opacity-0"
              )}
              style={{
                width: squareSize,
                height: squareSize,
                left: x,
                top: y,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{
                delay: 0.01 * (rowIndex * cols + colIndex), // staggered
                duration: 0.3,
                ease: "easeOut",
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default PixelCensor;
