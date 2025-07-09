"use client";
import Image from "next/image";
import HistoryCard from "../components/home/HistoryCard";
import SidebarMain from "../components/home/Sidebar";
import InputBox from "../components/InputBox";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, ReactNode } from "react";

const page = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform values for the background glass image only
  const backgroundX = useTransform(springX, (value: number) => value * 0.02);
  const backgroundY = useTransform(springY, (value: number) => value * 0.02);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative flex h-full w-full flex-row">
      <div className="fixed">
        <SidebarMain />
      </div>
      <div className="w-full h-screen flex flex-col bg-background overflow-y-scroll justify-center items-center">
        <motion.div
          className="absolute z-0 cursor-pointer mt-60 ml-40"
          style={{
            x: backgroundX,
            y: backgroundY,
            rotate: 28,
          }}
          whileHover={{
            scale: 1.05,
            rotate: 25,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          <Image
            src="/images/generate_bg.png"
            alt="Plus BG"
            width={800}
            height={800}
          />
        </motion.div>
        <InputBox />
      </div>
    </div>
  );
};

export default page;
