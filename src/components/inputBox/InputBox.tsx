"use client";
import { IconTerminal } from "@tabler/icons-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Loader2, Sparkles, XCircle } from "lucide-react";
import { useGenerateImage } from "@/src/hooks/useGenerateImage";
import DialogBox from "./DialogBox";
import { AnimatePresence, motion } from "motion/react";
import { InputBoxParameter, ModelData } from "@/src/types/BaseType";
import DynamicParameters from "./DynamicParameters";

const initialModel: ModelData = {
  id: "1",
  link: "https://replicate.com/black-forest-labs/flux-dev",
  base_model: "black-forest-labs",
  model_name: "flux-dev",
  description:
    "A 12 billion parameter rectified flow transformer capable of generating images from text descriptions",
  model_uploaded: "Updated 4 weeks ago",
  runs: "22.7M runs",
  parameters: {
    seed: {
      type: "integer",
      title: "Seed",
      "x-order": 10,
      description: "Random seed. Set for reproducible generation",
    },
    steps: {
      type: "integer",
      title: "Steps",
      default: 25,
      maximum: 50,
      minimum: 1,
      "x-order": 5,
      description: "Number of diffusion steps",
    },
    width: {
      type: "integer",
      title: "Width",
      maximum: 1440,
      minimum: 256,
      "x-order": 3,
      description:
        "Width of the generated image in text-to-image mode. Only used when aspect_ratio=custom. Must be a multiple of 32 (if it's not, it will be rounded to nearest multiple of 32). Note: Ignored in img2img and inpainting modes.",
    },
    height: {
      type: "integer",
      title: "Height",
      maximum: 1440,
      minimum: 256,
      "x-order": 4,
      description:
        "Height of the generated image in text-to-image mode. Only used when aspect_ratio=custom. Must be a multiple of 32 (if it's not, it will be rounded to nearest multiple of 32). Note: Ignored in img2img and inpainting modes.",
    },
    prompt: {
      type: "string",
      title: "Prompt",
      "x-order": 0,
      description: "Text prompt for image generation",
    },
    guidance: {
      type: "number",
      title: "Guidance",
      default: 3,
      maximum: 5,
      minimum: 2,
      "x-order": 6,
      description:
        "Controls the balance between adherence to the text prompt and image quality/diversity. Higher values make the output more closely match the prompt but may reduce overall image quality. Lower values allow for more creative freedom but might produce results less relevant to the prompt.",
    },
    interval: {
      type: "number",
      title: "Interval",
      default: 2,
      maximum: 4,
      minimum: 1,
      "x-order": 7,
      description:
        "Interval is a setting that increases the variance in possible outputs letting the model be a tad more dynamic in what outputs it may produce in terms of composition, color, detail, and prompt interpretation. Setting this value low will ensure strong prompt following with more consistent outputs, setting it higher will produce more dynamic or varied outputs.",
    },
    aspect_ratio: {
      enum: [
        "custom",
        "1:1",
        "16:9",
        "3:2",
        "2:3",
        "4:5",
        "5:4",
        "9:16",
        "3:4",
        "4:3",
      ],
      type: "string",
      title: "aspect_ratio",
      description: "Aspect ratio for the generated image",
      default: "1:1",
      "x-order": 2,
    },
    image_prompt: {
      type: "string",
      title: "Image Prompt",
      format: "uri",
      "x-order": 1,
      description:
        "Image to use with Flux Redux. This is used together with the text prompt to guide the generation towards the composition of the image_prompt. Must be jpeg, png, gif, or webp.",
    },
    output_format: {
      enum: ["webp", "jpg", "png"],
      type: "string",
      title: "output_format",
      description: "Format of the output images.",
      default: "webp",
      "x-order": 11,
    },
    output_quality: {
      type: "integer",
      title: "Output Quality",
      default: 80,
      maximum: 100,
      minimum: 0,
      "x-order": 12,
      description:
        "Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs",
    },
    safety_tolerance: {
      type: "integer",
      title: "Safety Tolerance",
      default: 2,
      maximum: 6,
      minimum: 1,
      "x-order": 8,
      description:
        "Safety tolerance, 1 is most strict and 6 is most permissive",
    },
    prompt_upsampling: {
      type: "boolean",
      title: "Prompt Upsampling",
      default: false,
      "x-order": 9,
      description:
        "Automatically modify the prompt for more creative generation",
    },
  },
  cost: 1,
  model_type: "Flux",
  cover_image:
    "https://nvbssjoomsozojofygor.supabase.co/storage/v1/object/public/images/model_cover/3.webp",
  usecase: "generate",
  identifier: "black-forest-labs/flux-dev",
  version: "1.0",
  created_at: "",
};

const validateAndSanitizePrompt = (prompt: string) => {
  const trimmed = prompt.trim();
  if (!trimmed) return { isValid: false, error: "Prompt cannot be empty." };
  if (trimmed.length > 1000)
    return {
      isValid: false,
      error: "Prompt is too long (max 1000 characters).",
    };
  return { isValid: true, sanitized: trimmed };
};

interface InputBoxProps {
  conversationId?: string;
}

const InputBox = ({ conversationId }: InputBoxProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelData>(initialModel);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useGenerateImage(conversationId);

  const handleModelSelect = (model: ModelData) => {
    setSelectedModel(model);
    setIsDialogOpen(false);
  };

  // Clear mutation state on component unmount
  useEffect(() => {
    return () => {
      mutation.reset();
    };
  }, [mutation.reset]);

  const handleGenerateClick = () => {
    if (mutation.isPending) return;

    const { isValid, error, sanitized } = validateAndSanitizePrompt(
      parameters.prompt || ""
    );
    if (!isValid && error) {
      setFormError(error);
      return;
    }

    setFormError(null);

    mutation.mutate(
      {
        parameters,
        conversationId,
        model: selectedModel.identifier,
      },
      {
        onSuccess: () => {
          setParameters((prev) => ({
            ...prev,
            prompt: "",
          }));
        },
        onError: (err) => {
          setFormError(`Generation failed: ${err.message}`);
        },
      }
    );
  };

  const handleCardClick = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleParametersChange = (values: Record<string, any>) => {
    setParameters(values);
    console.log("Updated form values:", values);
  };

  return (
    <section className="w-fit bg-[rgba(17,17,17,0.8)] border border-white/10 backdrop-blur-[5px] rounded-3xl px-2 py-4 mb-2">
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            className="w-full mb-2 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "22rem" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="w-full h-full p-2 overflow-y-auto">
              <DialogBox onSelectModel={handleModelSelect} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {formError && (
        <div className="flex items-center gap-2 text-red-400 bg-red-900/50 p-2 rounded-md mb-2 text-sm">
          <XCircle size={16} />
          <p>{formError}</p>
        </div>
      )}
      <AnimatePresence>
        {!isDialogOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <IconTerminal className="absolute top-4 left-4 text-neutral-500" />
            <Textarea
              value={parameters.prompt || ""}
              onChange={(e) =>
                setParameters((prev) => ({
                  ...prev,
                  prompt: e.target.value,
                }))
              }
              className="pl-12 hide-scrollbar"
              placeholder="A cute magical flying cat, cinematic, 4k"
              maxHeight={100}
              disabled={mutation.isPending}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerateClick();
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-2 flex gap-2">
        <div
          onClick={handleCardClick}
          className="w-[100px] h-[75px] rounded-2xl border border-[#282828] shadow-[0_4px_4px] shadow-black/30 relative cursor-pointer transition-transform hover:scale-105 active:scale-100 overflow-hidden"
        >
          <div className="absolute w-full h-full bg-black/60 rounded-2xl flex justify-center items-center p-1 text-center">
            <p className="text-white text-xs font-semibold leading-tight">
              {selectedModel.model_name}
            </p>
          </div>
          <Image
            className="object-cover w-full h-full rounded-2xl object-center"
            src={selectedModel.cover_image}
            alt={selectedModel.model_name}
            width={100}
            height={75}
          />
        </div>

        <DynamicParameters
          inputParameters={selectedModel.parameters}
          outputParameters={parameters}
          onValuesChange={handleParametersChange}
        />

        <button
          onClick={handleGenerateClick}
          disabled={mutation.isPending}
          className="px-6 rounded-2xl text-xl bg-accent/90 text-black font-black border-2 border-black flex items-center gap-2 backdrop-blur-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Sparkles />
          )}
          {mutation.isPending ? "Generating..." : "Generate"}
        </button>
      </div>
    </section>
  );
};

export default InputBox;
