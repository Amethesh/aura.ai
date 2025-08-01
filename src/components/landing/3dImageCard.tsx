// src/components/ImageCardPro.tsx

"use client"; // This component uses hooks, so it must be a client component.

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";

// --- Props Interface ---
interface ImageCardProProps {
  bottomImageUrl: string;
  topImageUrl: string;
  cardText: string;
  // Make the effect strength configurable!
  rotateDepth?: number;
  parallaxDepth?: number;
}

export const ImageCard3D = ({
  bottomImageUrl,
  topImageUrl,
  cardText,
  rotateDepth = 15,
  parallaxDepth = 25,
}: ImageCardProProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // --- Spring-based Motion Logic from your example ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Wrap motion values in springs for smooth transitions
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // 1. Transform for Card Rotation
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`] // Invert for natural feel
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );

  // 2. Transform for Inner Layer Parallax
  const topImageTranslateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${parallaxDepth}px`, `${parallaxDepth}px`]
  );
  const topImageTranslateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${parallaxDepth}px`, `${parallaxDepth}px`]
  );
  const textTranslateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${parallaxDepth * 1.5}px`, `${parallaxDepth * 1.5}px`]
  );
  const textTranslateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${parallaxDepth * 1.5}px`, `${parallaxDepth * 1.5}px`]
  );

  // 3. Transform for the Glossy Glare Effect
  const glareX = useTransform(mouseXSpring, [-0.7, 0.7], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.7, 0.7], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`;

  // --- Event Handlers ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate mouse position as a percentage from the center
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // A. Perspective wrapper to create the 3D space
    <div className="flex items-center justify-center [perspective:1200px]">
      {/* B. Main rotating card container */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.05, transition: { type: "spring" } }}
        className="relative w-[581px] h-[775px] rounded-[26px] [transform-style:preserve-3d]"
      >
        {/* C. Card Layers (Children) */}

        {/* Layer 1: Bottom Image (Static) */}
        <div
          className="absolute inset-0 w-full h-full rounded-[26px] bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage: `url(${bottomImageUrl})`,
            // Placing the complex shadow here is cleaner
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 40px 100px 0px, rgba(0, 0, 0, 0.2) 0px 20px 60px 0px",
          }}
        />

        {/* Layer 2: Top Image (Parallax) */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-center [filter:drop-shadow(4px_4px_10px_rgba(0,0,0,0.5))]"
          style={{
            backgroundImage: `url(${topImageUrl})`,
            translateX: topImageTranslateX,
            translateY: topImageTranslateY,
            // Pop it out towards the viewer on hover
            scale: 1.1,
            z: 40,
          }}
        />

        {/* Layer 3: Text (Parallax) */}
        <motion.p
          className="absolute left-[254px] top-[722px] w-[126px] h-[49px] font-['Century_Gothic'] text-[40px] font-bold text-white text-opacity-80"
          style={{
            translateX: textTranslateX,
            translateY: textTranslateY,
            // Pop it out even further on hover
            scale: 1.2,
            z: 60,
          }}
        >
          {cardText}
        </motion.p>

        {/* Layer 4: Glare Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 w-full h-full rounded-[26px] mix-blend-soft-light"
          style={{ background: glareBackground }}
        />
      </motion.div>
    </div>
  );
};
