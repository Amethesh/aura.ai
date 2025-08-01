"use client";
import ImageCard from "@/src/components/ui/ImageCard";
import { IconCoin, IconCopy, IconRefresh } from "@tabler/icons-react";
import { MessageType } from "@/src/types/BaseType";
import { ImageCardLoading } from "../ui/ImageCardLoading";
import { useState } from "react";
import { motion } from "motion/react";

const getLoadingMessage = (status: string) => {
  switch (status) {
    case "pending":
      return "Queued...";
    case "starting":
      return "Starting...";
    case "processing":
      return "Generating...";
    default:
      return "Loading...";
  }
};

interface MessageBoxProps {
  message: MessageType;
}

export default function MessageBox({ message }: MessageBoxProps) {
  const {
    job_status,
    output_images,
    parameters,
    error_message,
    userPrompt,
    credit_cost,
  } = message;
  const numOfOutputs = parameters?.num_of_output || 1;
  const ratio = parameters?.aspect_ratio;
  const [isHovered, setIsHovered] = useState(false);
  console.log("MessageBox rendered with job_status:", message);
  return (
    <div className="w-full max-w-4xl">
      <motion.div
        className="overflow-hidden "
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          height: isHovered ? "auto" : "60px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <p className="text-lg pt-1 ml-8 p-4 cursor-pointer">{userPrompt}</p>
      </motion.div>

      <div className="mt-4 pl-12">
        <div className="flex gap-4 border-l-2 border-gray-700 p-4 pt-0">
          {job_status === "succeeded" && output_images.length > 0 ? (
            output_images.map((image, index) => (
              <div key={image.imageUrl || index} className="max-w-[400px]">
                <ImageCard
                  imageUrl={image.imageUrl}
                  width={800}
                  height={800}
                  prompt={userPrompt}
                />
              </div>
            ))
          ) : job_status === "pending" ||
            job_status === "processing" ||
            job_status === "starting" ? (
            [...Array(numOfOutputs)].map((_, index) => (
              <ImageCardLoading
                key={index}
                ratio={ratio}
                width={360}
                loadingText={getLoadingMessage(job_status)}
                variant="cool"
              />
            ))
          ) : job_status === "failed" ? (
            <p className="text-red-500 font-semibold">
              `` ❌ Generation failed: {error_message || "Unknown error."}
            </p>
          ) : null}
        </div>
        <div className="flex gap-3 mt-2 items-center">
          <IconCopy size={25} className="custom-box" />
          <IconRefresh size={25} className="custom-box" />
          <p className="flex custom-box items-center gap-2 text-xs font-semibold text-white/80">
            <IconCoin size={20} className="text-white/80" />
            18
          </p>
          <p className="text-sm tracking-wide text-white/80">
            <span className="font-medium">Model:</span> Image 2.1
          </p>
          <p className="text-sm tracking-wide text-white/80">
            <span className="font-medium">Ratio:</span>{" "}
            {parameters?.aspect_ratio || "1:1"}
          </p>
        </div>
      </div>
    </div>
  );
}
