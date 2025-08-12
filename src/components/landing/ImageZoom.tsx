// components/InteractiveZoomImage.tsx
import * as motion from "motion/react-client";
import Image from "next/image";
import type { FC } from "react";

// Define the types for our component's props for type-safety and auto-completion
interface InteractiveZoomImageProps {
  // --- Image ---
  src: string;
  alt: string;

  // --- Main Container ---
  containerWidth?: string | number;
  containerHeight?: string | number;
  containerClassName?: string;

  // --- Selector Loupe (the small white box on the base image) ---
  selectorTop?: string | number;
  selectorLeft?: string | number;
  selectorWidth?: string | number;
  selectorHeight?: string | number;
  selectorClassName?: string;

  // --- Clipped Dark Overlay ---
  overlayClipPath?: string;
  overlayClassName?: string;

  // --- Zoomed-in Window ---
  zoomWindowX?: string | number;
  zoomWindowY?: string | number;
  zoomWindowWidth?: string | number;
  zoomWindowHeight?: string | number;
  zoomWindowClassName?: string;

  // --- Inner Zoomed Image ---
  zoomFactor?: number;
  zoomObjectPosition?: string;
  zoomTransformOrigin?: string;
  zoomImageClassName?: string;
}

export const InteractiveZoomImage: FC<InteractiveZoomImageProps> = ({
  // Set default values for all props
  src,
  alt,
  containerWidth = "600px",
  containerHeight = "600px",
  containerClassName = "",
  selectorTop = "360px",
  selectorLeft = "220px",
  selectorWidth = "65px",
  selectorHeight = "50px",
  selectorClassName = "border-2 border-white rounded-2xl",
  overlayClipPath = "polygon(36% 52%, 85% 41%, 85% 84%, 36% 58%)",
  overlayClassName = "w-[800px] h-[700px] bg-black/50 border-2 border-white/50 rounded-lg backdrop-blur-sm",
  zoomWindowX = "680px",
  zoomWindowY = "280px",
  zoomWindowWidth = "300px",
  zoomWindowHeight = "300px",
  zoomWindowClassName = "overflow-hidden rounded-3xl border-2 border-white/30",
  zoomFactor = 7,
  zoomObjectPosition = "13% 70%",
  zoomTransformOrigin = "43% 67%",
  zoomImageClassName = "object-cover",
}) => {
  return (
    <motion.div
      className={`relative ${containerClassName}`}
      style={{ width: containerWidth, height: containerHeight }}
      // Animate the container on load and add a subtle hover effect
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Selector Loupe */}
      <motion.div
        className={`absolute z-50 ${selectorClassName}`}
        style={{
          top: selectorTop,
          left: selectorLeft,
          width: selectorWidth,
          height: selectorHeight,
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      />

      {/* Clipped Dark Overlay */}
      <motion.div
        className={`absolute z-10 ${overlayClassName}`}
        style={{
          clipPath: overlayClipPath,
        }}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      ></motion.div>

      {/* Base Image */}
      <Image
        src={src}
        fill
        alt={alt}
        unoptimized
        className="rounded-3xl object-cover z-0 border-2 border-white/30"
      />

      {/* Zoomed-in Window */}
      <motion.div
        className={`absolute z-50 ${zoomWindowClassName}`}
        style={{
          width: zoomWindowWidth,
          height: zoomWindowHeight,
          transform: `translate(${zoomWindowX}, ${zoomWindowY})`,
        }}
        // initial={{ opacity: 0, scale: 0.5 }}
        // animate={{ opacity: 1, scale: 1 }}
        // transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
      >
        <div className="relative w-full h-full">
          {/* Inner Zoomed Image */}
          <Image
            src={src}
            fill
            alt={`${alt} - Zoomed View`}
            className={zoomImageClassName}
            unoptimized
            style={{
              transform: `scale(${zoomFactor})`,
              objectPosition: zoomObjectPosition,
              transformOrigin: zoomTransformOrigin,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
