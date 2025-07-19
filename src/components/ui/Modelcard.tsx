"use client";
import { IconHeart } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";

// Animation for the card scale and image zoom (declarative)
const cardVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.01,
    transition: { type: "spring", stiffness: 100, damping: 17 },
  },
};

const imageVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
};

const buttonVariants: Variants = {
  initial: { opacity: 0, y: 15, transition: { duration: 0.2 } },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: 15,
    transition: { duration: 0.2 },
  },
};

const ModelCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-[170px] h-[210px] rounded-[18px] border-2 border-white/30 overflow-hidden cursor-pointer"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      // Use Framer Motion's hover handlers to set state
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Tag */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        variants={imageVariants}
      >
        <Image
          src="https://replicate.delivery/xezq/pvkq4S7Nx96bCdxUEK51fDCFx1Msf5UDJWItRW9VNeByPydpA/out-0.webp"
          alt="Anime 3d style model"
          className="object-cover"
          fill
        />
      </motion.div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Top Tags */}
        <div className="flex justify-between p-2">
          {/* ... top tags are unchanged */}
          <div className="bg-black/80 rounded-[7px] py-1 px-2">
            <p className="text-white font-semibold text-[8px] leading-[10px]">
              Base Model
            </p>
          </div>
          <div className="bg-black/80 rounded-[7px] py-1 px-2">
            <p className="text-white font-semibold text-[8px] leading-[10px]">
              FLUX
            </p>
          </div>
        </div>

        {/* Bottom Section with Gradient */}
        <div className="w-full backdrop-blur-[2px] bg-gradient-to-t from-black/75 to-transparent p-2 flex flex-col justify-end">
          <p className="font-quicksand text-white font-medium text-[11px] leading-[14px]">
            Flux Dev
          </p>
          <div className="flex justify-between items-center mt-2">
            <div className="bg-white/50 rounded-[7px] py-0.5 px-2">
              <p className="font-quicksand text-white font-semibold text-[8px] leading-[10px]">
                V1.0
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <IconHeart className="w-[10px]" />
              <p className="font-quicksand text-white font-medium text-[8px] leading-[10px]">
                Favorite
              </p>
            </div>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.button
                className="text-[12px] bg-accent/80 text-black font-semibold rounded-full p-1 mt-2 hover:bg-accent/90"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                Use
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ModelCard;
