"use client";
import Image from "next/image";
import React from "react";
import { TexturedImage } from "./TexturedImage";
import PixelCensor from "./PixelCensor";
import { MouseParallaxItem, MouseParallaxProvider } from "./MouseParallax";

const matrix = [
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
];

const PrivacySection = () => {
  return (
    <section className="mt-12">
      <MouseParallaxProvider className="relative w-screen py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-60"
          style={{
            backgroundImage: "url(/images/landing/grain.png)",
            backgroundSize: "100px 100px",
            backgroundRepeat: "repeat",
            backgroundBlendMode: "overlay",
            backgroundPosition: "left top",
          }}
        />

        {/* 2. Wrap the bottom image with a ParallaxItem */}
        <MouseParallaxItem strength={15}>
          <TexturedImage
            src={"/images/landing/privacy_bottom.png"}
            borderRadius="200px"
            baseFrequency={0.16}
            numOctaves={2}
            scale={100}
            seed={2}
            className="w-full"
          />
        </MouseParallaxItem>

        {/* Static text elements */}
        <p className="text-[50px] absolute top-44 left-0 ml-8 font-bold text-accent/80 z-1 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
          PRIVATE BY DESIGN.
        </p>
        <p className="text-[50px] absolute top-44 right-0 mr-8 font-bold text-accent/80 z-20 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
          ENCRYPTED BY DEFAULT.
        </p>
        <p className="text-[100px] absolute top-1/3 left-0 ml-8 font-bold text-black/50 z-20">
          PRIVACY
        </p>
        <p className="text-[100px] absolute top-1/3 right-0 mr-8 font-bold text-black/50 z-20">
          MATTERS
        </p>

        {/* 3. Wrap the top image with a ParallaxItem with a different strength */}
        <MouseParallaxItem
          strength={30}
          className="w-full rounded-[200px] absolute left-0 -top-24"
        >
          <Image
            src={"/images/landing/privacy_top.png"}
            quality={100}
            width={800}
            height={800}
            unoptimized
            alt="Privacy"
            className="w-full h-auto rounded-[200px]"
          />
        </MouseParallaxItem>

        {/* Other static elements */}
        <div className="z-30 absolute inset-x-0 bottom-0 h-[400px] bg-black/20 [mask-image:linear-gradient(to_top,white,transparent)] !backdrop-blur-sm text-white" />
        <p className="z-40 text-[35px] text-center absolute inset-x-0 bottom-32 px-56">
          We respect your <span className="text-accent">privacy</span>— no
          prompts, images, or metadata are safe and encrypted. Everything is
          processed in real-time with full encryption.
        </p>

        <div className="absolute top-0 w-full h-full z-20 flex justify-center items-center">
          <PixelCensor matrix={matrix} squareSize={50} className="mb-52" />
        </div>
      </MouseParallaxProvider>
    </section>
  );
};

export default PrivacySection;
