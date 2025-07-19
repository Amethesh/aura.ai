"use client";
import { IconTerminal } from "@tabler/icons-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import AnimatedCounter from "../ui/AnimatedCounter";
import { Switch } from "../ui/switch";
import { Loader2, Sparkles, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGenerateImage } from "@/src/hooks/useGenerateImage";
import DialogBox from "./DialogBox";
import { AnimatePresence, motion } from "motion/react";

// Function to validate and sanitize the prompt
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
  const [prompt, setPrompt] = useState("");
  const [batchCount, setBatchCount] = useState(1);
  const [ratio, setRatio] = useState("1:1");
  const [quality, setQuality] = useState("28");
  const [enhancePrompt, setEnhancePrompt] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const mutation = useGenerateImage(conversationId);

  // Clear mutation state on component unmount
  useEffect(() => {
    return () => {
      mutation.reset();
    };
  }, [mutation.reset]);

  const handleGenerateClick = () => {
    if (mutation.isPending) return;

    const { isValid, error, sanitized } = validateAndSanitizePrompt(prompt);
    if (!isValid && error) {
      setFormError(error);
      return;
    }

    setFormError(null);

    mutation.mutate(
      {
        prompt: sanitized!,
        batchCount,
        ratio,
        quality,
        enhancePrompt,
        conversationId,
      },
      {
        onSuccess: () => {
          setPrompt(""); // Clear prompt only on success
        },
        onError: (err) => {
          setFormError(`Generation failed: ${err.message}`);
        },
      }
    );
  };

  // Toggles the dialog box visibility
  const handleCardClick = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <section className="w-fit bg-[rgba(17,17,17,0.8)] border border-white/10 backdrop-blur-[5px] rounded-3xl px-2 py-4">
      {/* Display Dialog Box with Framer Motion Animation */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            className="w-full mb-2 overflow-hidden" // overflow-hidden is crucial for height animation
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "20rem" }} // "20rem" is h-80 in Tailwind
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Inner div to handle padding and scrolling */}
            <div className="w-full h-full p-2 overflow-y-auto">
              <DialogBox />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Display Form Errors */}
      {formError && (
        <div className="flex items-center gap-2 text-red-400 bg-red-900/50 p-2 rounded-md mb-2 text-sm">
          <XCircle size={16} />
          <p>{formError}</p>
        </div>
      )}
      <div className="relative">
        <IconTerminal className="absolute top-4 left-4 text-neutral-500" />
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
      </div>
      <div className="mt-2 flex gap-2">
        {/* Model Card - Now Clickable */}
        <div
          onClick={handleCardClick}
          className="w-[100px] h-[75px] rounded-2xl border border-[#282828] shadow-[0_4px_4px] shadow-black/30 relative cursor-pointer transition-transform hover:scale-105 active:scale-100"
        >
          <p className="absolute w-full h-full bg-black/60 rounded-2xl flex justify-center items-center">
            Model
          </p>
          <Image
            className="object-cover w-full h-full rounded-2xl object-top"
            src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/f905bc28-9db6-4f83-85ae-93c94718881d/anim=false,width=450/NfX8MYg-_nTv_PpQBNJSr.jpeg"
            alt="Model image"
            width={200}
            height={200}
          />
        </div>
        {/* Lora Card - Now Clickable */}
        <div
          onClick={handleCardClick}
          className="w-[100px] h-[75px] rounded-2xl border border-[#282828] shadow-[0_4px_4px] shadow-black/30 relative cursor-pointer transition-transform hover:scale-105 active:scale-100"
        >
          <p className="absolute w-full h-full bg-black/60 rounded-2xl flex justify-center items-center">
            Lora
          </p>
          <Image
            className="object-cover w-full h-full rounded-2xl"
            src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/88d7a5cd-db93-45b0-a4c2-731bf208497c/anim=false,width=450/00000_101724454.jpeg"
            alt="Model image"
            width={200}
            height={200}
          />
        </div>

        <AnimatedCounter
          label="Batch"
          initialValue={batchCount}
          min={1}
          max={10}
          onChange={setBatchCount}
        />
        <div className="flex flex-col justify-center items-center ml-2 gap-4">
          <p className="text-sm text-gray-300 font-medium tracking-wide">
            Aspect Ratio
          </p>
          <Select
            onValueChange={setRatio}
            defaultValue={ratio}
            disabled={mutation.isPending}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Select a Ratio" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ratios</SelectLabel>
                <SelectItem value="1:1">1:1 (Square)</SelectItem>
                <SelectItem value="4:5">4:5 (Portrait)</SelectItem>
                <SelectItem value="3:4">3:4</SelectItem>
                <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-center items-center ml-2 gap-4">
          <p className="text-sm text-gray-300 font-medium tracking-wide">
            Quality
          </p>
          <Select
            onValueChange={setQuality}
            defaultValue={quality}
            disabled={mutation.isPending}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Quality</SelectLabel>
                <SelectItem value="48">High</SelectItem>
                <SelectItem value="28">Medium</SelectItem>
                <SelectItem value="18">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-evenly items-center ml-2 gap-4">
          <p className="text-sm text-gray-300 font-medium tracking-wide mb-1">
            Enhance prompt
          </p>
          <Switch
            checked={enhancePrompt}
            onCheckedChange={setEnhancePrompt}
            disabled={mutation.isPending}
          />
        </div>

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
