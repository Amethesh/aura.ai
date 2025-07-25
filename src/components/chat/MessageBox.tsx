"use client";
import ImageCard from "@/src/components/ui/ImageCard";
import { IconDownload, IconRefresh, IconUser } from "@tabler/icons-react";
import { MessageType } from "@/src/types/BaseType";
import { ImageCardLoading } from "../ui/ImageCardLoading";
// Omitted IconDownload, IconRefresh for brevity

// Function to provide more descriptive loading text
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
  const { job_status, output_images, parameters, error_message, userPrompt } =
    message;
  const numOfOutputs = parameters?.num_of_output || 1;
  const ratio = parameters?.aspect_ratio;

  return (
    <div className="w-full max-w-4xl">
      <p className="text-lg pt-1 ml-8">{userPrompt}</p>

      <div className="mt-4 pl-12">
        <div className="flex gap-4 border-l-2 border-gray-700 p-4 pt-0">
          {job_status === "succeeded" && output_images.length > 0 ? (
            output_images.map((image, index) => (
              <div key={image.imageUrl || index} className="max-w-[330px]">
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
                // Use the new descriptive loading message
                loadingText={getLoadingMessage(job_status)}
                variant="cool"
              />
            ))
          ) : job_status === "failed" ? (
            <p className="text-red-500 font-semibold">``
              ❌ Generation failed: {error_message || "Unknown error."}
            </p>
          ) : null}
        </div>
        <div className="flex gap-3 mt-2">
          <IconDownload className="custom-box" />
          <IconRefresh className="custom-box" />
          
        </div>
      </div>
    </div>
  );
}
