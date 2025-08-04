"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconUpload } from "@tabler/icons-react";

const DragAndDropBox = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Only set dragging to false if we're leaving the main container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    console.log("Dropped files:", files);
    // Handle file upload logic here
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log("Selected files:", files);
      // Handle file upload logic here
    }
  };

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Custom dashed border */}
      <div className="absolute z-20 inset-0 flex items-center justify-center">
        <motion.svg
          width="712"
          height="432"
          className="absolute inset-0"
          style={{ pointerEvents: "none" }}
        >
          <motion.rect
            x="1"
            y="1"
            width="300"
            height="200"
            rx="62" // Rounded corners
            fill="none"
            stroke={isDragging ? "#ff1515" : isHovered ? "#f3f4f6" : "#e5e7eb"}
            strokeWidth="8"
            strokeDasharray="30 20"
            initial={{ strokeOpacity: 0.6 }}
            animate={{
              strokeOpacity: isDragging || isHovered ? 1 : 0.6,
              stroke: isDragging
                ? "#ff1515"
                : isHovered
                ? "#f3f4f6"
                : "#e5e7eb",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.svg>
      </div>

      {/* Main container */}
      <motion.div
        className="w-full h-full rounded-[62px] flex items-center justify-center overflow-hidden relative"
        animate={{
          backgroundColor: isDragging
            ? "rgba(0, 0, 0, 0.4)"
            : isHovered
            ? "rgba(0, 0, 0, 0.25)"
            : "rgba(0, 0, 0, 0.2)",
        }}
        style={{ backdropFilter: "blur(8.95px)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background particles */}
        <AnimatePresence>
          {(isDragging || isHovered) && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: Math.random() * 600 - 300,
                    y: Math.random() * 400 - 200,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -50, -100],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Upload icon */}
        <motion.div
          className="absolute mb-8"
          animate={{
            y: isDragging ? -20 : isHovered ? -10 : 0,
            scale: isDragging ? 1.2 : isHovered ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white/70 mb-4"
            animate={{
              rotate: isDragging ? 360 : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            <IconUpload />
          </motion.svg>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center pointer-events-none mt-12"
          animate={{
            y: isDragging ? 20 : isHovered ? 10 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.p
            className="text-white text-lg font-medium mb-2"
            animate={{
              color: isDragging ? "#ffffff" : isHovered ? "#f3f4f6" : "#e5e7eb",
            }}
          >
            {isDragging ? "Drop files here" : "Click or drag & drop files here"}
          </motion.p>
          <motion.p
            className="text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
          >
            Upload multiple files at once
          </motion.p>
        </motion.div>

        {/* Ripple effect on click */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              className="absolute inset-0 rounded-[62px]"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
    </motion.div>
  );
};

export default DragAndDropBox;
