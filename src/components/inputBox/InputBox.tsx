"use client";
import { IconArrowUp, IconSparkles, IconTerminal } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { RatioSelect } from "./RatioSelect";
import { QualitySelect } from "./QualitySelect";
import { Textarea } from "../ui/textarea";
import AnimatedCounter from "../ui/AnimatedCounter";
import { Switch } from "../ui/switch";
import GenerateButton from "./GenerateButton";

const InputBox = () => {
  const [batchCount, setBatchCount] = useState(2);
  return (
    <section className="w-fit bg-[rgba(17,17,17,0.8)] border border-white/10 backdrop-blur-[5px] rounded-3xl px-2 py-4">
      <div className="relative">
        <IconTerminal className="absolute top-4 left-4 text-neutral-500" />
        <Textarea
          className="pl-12 hide-scrollbar"
          placeholder="Type here... I will grow up to 200px then scroll."
          maxHeight={100}
        />
        <div className="absolute right-4 top-2.5 rounded-full p-1.5 bg-[#202020] shadow-[0px_0px_4px_1px_rgba(217,232,37,0.3)]">
          <IconArrowUp className="text-accent" />
        </div>
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
          initialValue={2}
          min={0}
          max={10}
          onChange={setBatchCount}
        />
        <RatioSelect />
        <QualitySelect />
        <div className="flex flex-col justify-evenly items-center ml-2 gap-4">
          <p className="text-sm text-gray-300 font-medium tracking-wide mb-1">
            Enhance prompt
          </p>
          <Switch />
        </div>
        <GenerateButton />
      </div>
    </section>
  );
};

export default InputBox;
