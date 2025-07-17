"use client";
import { IconArrowUp, IconTerminal } from "@tabler/icons-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import AnimatedCounter from "../ui/AnimatedCounter";
import { Switch } from "../ui/switch";
import { Loader2, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MessageType } from "@/src/types/MessageType";

interface InputBoxProps {
  conversationId?: string;
  onNewMessage: (optimisticMessage: MessageType) => void;
}

const InputBox = ({ conversationId, onNewMessage }: InputBoxProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [prompt, setPrompt] = useState("");
  const [batchCount, setBatchCount] = useState(2);
  const [ratio, setRatio] = useState("1:1");
  const [quality, setQuality] = useState("28");
  const [enhancePrompt, setEnhancePrompt] = useState(false);

  const handleGenerateClick = () => {
    if (!prompt.trim() || isPending) return;

    // 1. Create the optimistic message object
    const optimisticMessage: MessageType = {
      // Use a temporary, unique ID for the React key.
      // The real ID will come from the DB on the next fetch.
      id: crypto.randomUUID(),
      userPrompt: prompt,
      input_images: [], // Assuming no input images for this example
      output_images: [],
      jobId: null, // We don't have the job ID yet
      job_status: "pending", // The key part of the optimistic UI
      parameters: { num_of_output: batchCount, ratio: ratio },
      credit_cost: batchCount, // An estimate
      error_message: null,
    };

    // 2. Immediately update the UI using the passed-in handler
    onNewMessage(optimisticMessage);

    // Clear the prompt from the textarea
    setPrompt("");

    const formData = {
      prompt,
      batchCount,
      ratio,
      quality,
      enhancePrompt,
      conversationId,
    };

    // 3. Start the actual API call in the background
    startTransition(async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "An unknown error occurred.");
        }

        // We no longer need router.refresh() or router.push().
        // The real-time listener will handle the final update.
        // If it's a new conversation, we still want to navigate.
        if (!conversationId && result.conversationId) {
          router.push(`/image/generate/${result.conversationId}`);
        }
      } catch (error: any) {
        alert(error.message);
        // Optional: Implement logic to remove or mark the optimistic message as failed
      }
    });
  };

  return (
    <section className="w-fit bg-[rgba(17,17,17,0.8)] border border-white/10 backdrop-blur-[5px] rounded-3xl px-2 py-4">
      <div className="relative">
        <IconTerminal className="absolute top-4 left-4 text-neutral-500" />
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="pl-12 hide-scrollbar"
          placeholder="A cute magical flying cat, cinematic, 4k"
          maxHeight={100}
          disabled={isPending}
        />
      </div>
      <div className="mt-2 flex gap-2">
        <div className="w-[100px] h-[75px] rounded-2xl border border-[#282828] shadow-[0_4px_4px] shadow-black/30 relative">
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
        <div className="w-[100px] h-[75px] rounded-2xl border border-[#282828] shadow-[0_4px_4px] shadow-black/30 relative">
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
            disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
          />
        </div>

        <button
          onClick={handleGenerateClick}
          disabled={isPending}
          className="px-8 rounded-2xl text-xl bg-accent/90 text-black font-black border-2 border-black flex items-center gap-2 backdrop-blur-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {isPending ? "Generating..." : "Generate"}
        </button>
      </div>
    </section>
  );
};

export default InputBox;
