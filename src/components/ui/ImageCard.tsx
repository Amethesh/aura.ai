"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "motion/react";
import {
  IconArrowLeft,
  IconDownload,
  IconHeart,
  IconShare,
  IconThumbDown,
  IconTrash,
  IconWand,
} from "@tabler/icons-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

// Define the props for the component
interface ImageCardProps {
  imageUrl: string;
  prompt: string;
  width: number;
  height: number;
  blurhash: string;
}

const ImageCard = ({
  imageUrl,
  prompt,
  width,
  height,
  blurhash,
}: ImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log(imageUrl);
  const cardOverlayVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <>
      {/* --- Image Card Preview --- */}
      {/* CHANGE 1: Set width to full and REMOVE fixed height. The card is now responsive. */}
      <motion.div
        className="relative w-full rounded-[28px] overflow-hidden cursor-pointer border-2 border-white/30"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }} // Keep the cool scale effect
        transition={{ duration: 0.3 }}
        onClick={openModal}
        layoutId={`card-container-${imageUrl}`}
      >
        {/* Background Image Wrapper */}
        <div className="relative">
          {/* CHANGE 2: Remove layout="fill" and add width/height props. */}
          {/* This makes the image responsive while preventing layout shift. */}
          <Image
            src={imageUrl}
            alt={prompt}
            width={width} // Use the actual image width for optimization
            height={height} // Use the actual image height for aspect ratio
            className="w-full h-auto" // Ensures the image is responsive
            blurDataURL={blurhash}
            placeholder="blur"
          />
        </div>

        {/* Original Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[80px] p-5 flex items-end
                        bg-gradient-to-t from-black/75 to-transparent backdrop-blur-[2px]"
              variants={cardOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="w-full flex justify-between items-center">
                {/* Edit Button */}
                <button
                  className="flex items-center gap-2 py-2 px-4 bg-white/30 rounded-full text-white font-semibold text-base backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()} // Prevents modal from opening when clicking button
                >
                  <IconWand />
                  <span>Edit</span>
                </button>

                {/* Action Icons */}
                <div className="flex items-center gap-4 text-white/80 text-xl">
                  <IconDownload className="hover:text-white cursor-pointer transition-colors" />
                  <IconHeart className="hover:text-white cursor-pointer transition-colors" />
                  <IconThumbDown className="hover:text-white cursor-pointer transition-colors" />
                  <IconTrash className="hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- Detailed Image Modal (from new design) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed h-screen w-screen inset-0 z-50 flex flex-col p-4 md:p-8"
            style={{
              background: "rgba(9, 9, 9, 0.81)",
              backdropFilter: "blur(5px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Modal Content */}
            <div
              className="relative w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar */}
              <motion.header
                className="flex justify-between items-center text-white w-full"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              >
                <button
                  onClick={closeModal}
                  className="flex items-center gap-2 py-2 px-4 rounded-full hover:bg-white/10 transition-colors"
                >
                  <IconArrowLeft size={20} />
                  <span className="font-medium">Go Back</span>
                </button>
                <div className="flex items-center gap-3 md:gap-4 text-white/80">
                  <IconDownload
                    className="cursor-pointer hover:text-white transition-colors"
                    size={22}
                  />
                  <IconThumbDown
                    className="cursor-pointer hover:text-white transition-colors"
                    size={22}
                  />
                  <IconHeart
                    className="cursor-pointer hover:text-white transition-colors"
                    size={22}
                  />
                  <IconTrash
                    className="cursor-pointer hover:text-red-400 transition-colors"
                    size={22}
                  />
                </div>
              </motion.header>

              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center my-4 min-h-0">
                <motion.div
                  className="relative w-full h-full"
                  layoutId={`card-container-${imageUrl}`}
                >
                  <Image
                    src={imageUrl}
                    alt={prompt}
                    layout="fill"
                    objectFit="contain"
                  />
                </motion.div>
              </div>

              {/* Bottom Bar */}
              <motion.footer
                className="flex justify-between items-end text-white w-full"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              >
                <div className="max-w-prose flex items-center gap-4">
                  <span className="font-semibold text-white/50 text-nowrap">
                    Generate →
                  </span>
                  {/* <p className="text-white">{prompt}</p> */}
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      {prompt.length > 50
                        ? `${prompt.slice(0, 50)}...`
                        : prompt}
                    </HoverCardTrigger>
                    <HoverCardContent>{prompt}</HoverCardContent>
                  </HoverCard>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 py-2 px-5 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <IconWand size={20} />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center gap-2 py-2 px-5 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <IconShare size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </motion.footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCard;
