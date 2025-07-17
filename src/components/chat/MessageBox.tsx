"use client";
import ImageCard from "@/src/components/ui/ImageCard";
import { IconDownload, IconRefresh, IconUser } from "@tabler/icons-react";
import { MessageType } from "@/src/types/MessageType";
import { ImageCardLoading } from "../ui/ImageCardLoading";

interface MessageBoxProps {
  message: MessageType;
}

export default function MessageBox({ message }: MessageBoxProps) {
  const { job_status, output_images, parameters, error_message, userPrompt } =
    message;

  const numOfOutputs = parameters?.num_of_output || 1;
  const ratio = parameters?.ratio;

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center">
          <IconUser size={20} />
        </div>
        <p className="text-lg pt-1">{userPrompt}</p>
      </div>

      <div className="mt-4 pl-12">
        <div className="max-w-[40vw] flex  gap-4 border-l-2 border-gray-700 p-4">
          {job_status === "succeeded" && output_images.length > 0 ? (
            output_images.map((image, index) => (
              <div key={image.imageUrl || index} className="max-w-72">
                <ImageCard
                  imageUrl={image.imageUrl}
                  width={800}
                  height={800}
                  prompt={userPrompt}
                />
              </div>
            ))
          ) : job_status === "pending" || job_status === "processing" ? (
            [...Array(numOfOutputs)].map((_, index) => (
              <ImageCardLoading
                key={index}
                ratio={ratio}
                width={360}
                loadingText={job_status}
                variant="cool"
              />
            ))
          ) : job_status === "failed" ? (
            <p className="text-red-500 font-semibold">
              ❌ Generation failed: {error_message || "Unknown error."}
            </p>
          ) : null}
        </div>

        {(job_status === "succeeded" || job_status === "failed") && (
          <div className="mt-4 flex items-center gap-4">
            <button aria-label="Download images">
              <IconDownload className="custom-box cursor-pointer" size={25} />
            </button>
            <button aria-label="Generate new images">
              <IconRefresh className="custom-box cursor-pointer" size={25} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
