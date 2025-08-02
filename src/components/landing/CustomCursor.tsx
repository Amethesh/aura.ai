"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, Variants } from "motion/react";

interface CustomCursorProps {
  isVisible: boolean;
}

export const CustomCursor = ({ isVisible }: CustomCursorProps) => {
  // 1. Motion values to track mouse position
  const mouseX = useMotionValue(-200); // Initialize off-screen
  const mouseY = useMotionValue(-200);

  // 2. Spring animations for smooth, delayed following
  const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3. Effect to update mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // 4. Variants for animating visibility (fade in/out, scale up/down)
  const cursorVariants:Variants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  return (
    <motion.div
      // --- Core Properties ---
      variants={cursorVariants}
      animate={isVisible ? "visible" : "hidden"}
      initial="hidden"
      // Apply the spring-animated coordinates
      style={{
        translateX: springX,
        translateY: springY,
      }}
      // --- Styling for Glassmorphism ---
      className="
        fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 
        w-24 h-24 rounded-full 
        flex items-center justify-center 
        bg-white/10 backdrop-blur-sm 
        border border-white/20 
        pointer-events-none 
        text-white font-semibold text-base z-50
      "
    >
      Drag me
    </motion.div>
  );
};
