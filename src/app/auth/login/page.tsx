"use client";

import { LoginForm } from "@/src/components/auth/login-form";
import GlassModal from "@/src/components/ui/GlassModal";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Page() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform values for the background glass image only
  const backgroundX = useTransform(springX, (value) => value * 0.02);
  const backgroundY = useTransform(springY, (value) => value * 0.02);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="bg-[#0C0C0C] overflow-hidden w-screen h-screen relative">
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex items-center justify-center">
          <Image
            src="/images/glass_image.png"
            alt="Login Image"
            width={200}
            height={100}
            className=""
          />
          <Image
            src="/images/aura.png"
            alt="Login Image"
            width={300}
            height={250}
            className=""
          />
        </div>

        <div className="relative flex items-center justify-center w-full h-full">
          <GlassModal width={36} height={440} count={16} className="z-10" />
          <LoginForm className="absolute z-20" />
        </div>
      </div>

      <motion.div
        className="absolute right-[48%] top-72 z-0 cursor-pointer"
        style={{
          x: backgroundX,
          y: backgroundY,
          rotate: -28,
        }}
        whileHover={{
          scale: 1.05,
          rotate: -25,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        <Image
          src="/images/glass_image.png"
          alt="Login Image"
          width={850}
          height={500}
        />
      </motion.div>
    </section>
  );
}
