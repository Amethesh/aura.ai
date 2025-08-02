// src/components/ImageCardPro.tsx

"use client"; // This component uses hooks, so it must be a client component.

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from "motion/react";

interface ImageCard3DProps {
  bottomImageUrl: string;
  topImageUrl: string;
  cardText: string;
  scrollVelocity: MotionValue<number>;
  rotateDepth?: number;
  parallaxDepth?: number;
  width?: number;
  height?: number;
  topImageScale?: number;
  fontSize?: number;
}

export const ImageCard3D = ({
  bottomImageUrl,
  topImageUrl,
  cardText,
  scrollVelocity,
  rotateDepth = 15,
  parallaxDepth = 25,
  width = 500,
  height = 700,
  topImageScale = 1.1,
  fontSize = 20,
}: ImageCard3DProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // --- MOUSE-BASED Motion Logic (existing) ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform for Card Rotation based on MOUSE position (output numbers)
  const mouseRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [rotateDepth, -rotateDepth]
  );
  const mouseRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-rotateDepth, rotateDepth]
  );

    const scrollVelocitySpring = useSpring(scrollVelocity, {
      stiffness: 400,
      damping: 50,
    });

  // 4. Transform the smoothed velocity into a Y-axis rotation value
  const scrollRotateY = useTransform(
    scrollVelocitySpring,
    [-50, 50], // Input range: from fast left scroll to fast right scroll
    [-12, 12] // Output range: tilt the card up to 12 degrees
  );

  // --- COMBINED Transform ---
  // 5. Use useMotionTemplate to combine mouse and scroll rotations into one transform string.
  // This is the cleanest way to apply multiple, independent transforms.
  const transform = useMotionTemplate`perspective(1200px) rotateX(${mouseRotateX}deg) rotateY(${mouseRotateY}deg) rotateY(${scrollRotateY}deg)`;

  // ... (Parallax and Glare logic remains the same)
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

  const glareX = useTransform(mouseXSpring, [-0.7, 0.7], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.7, 0.7], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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
    <div className="flex items-center justify-center">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // 6. Apply the combined transform. Remove individual rotateX/Y.
        style={{
          transform: transform, // Apply the combined motion template
          width: `${width}px`,
          height: `${height}px`,
        }}
        whileHover={{ scale: 1.05, transition: { type: "spring" } }}
        className="relative rounded-[26px] [transform-style:preserve-3d]"
      >
        {/* C. Card Layers (Children) */}

        {/* Layer 1: Bottom Image (Static) */}
        <div
          className="absolute inset-0 w-full h-full rounded-[26px] bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage: `url(${bottomImageUrl})`,
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
            scale: topImageScale,
            z: 40,
          }}
        />

        {/* Layer 3: Text (Parallax) */}
        <motion.p
          className="absolute bottom-0 -right-1/2 w-full font-gothic font-bold text-white text-opacity-80"
          style={{
            translateX: textTranslateX,
            translateY: textTranslateY,
            scale: 1.2,
            z: 60,
            fontSize: `${fontSize}px`,
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
