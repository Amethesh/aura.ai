import Image from "next/image";
import { MouseParallaxItem, MouseParallaxProvider } from "./MouseParallax";
import ImageMagnifyCard, { FocusRect } from "./ImageZoom";

const imageFocus1: FocusRect = {
  topPct: 28,
  leftPct: 32,
  widthPct: 12,
  heightPct: 12,
};
const imageFocus2: FocusRect = {
  topPct: 60,
  leftPct: 35,
  widthPct: 14,
  heightPct: 12,
};
const imageFocus3: FocusRect = {
  topPct: 48,
  leftPct: 48,
  widthPct: 14,
  heightPct: 12,
};
const imageFocus4: FocusRect = {
  topPct: 25,
  leftPct: 45,
  widthPct: 24,
  heightPct: 12,
};
const UpscaleSection = () => {
  return (
    <section className="relative mt-56">
      <MouseParallaxProvider className="relative flex h-[1500px] w-screen items-center justify-center py-16 px-4">
        <div
          className="absolute inset-0 z-50 overflow-hidden pointer-events-none opacity-60 animate-manga-lines"
          style={{
            backgroundImage: "url(/images/landing/upscale/manga_lines.svg)",
            backgroundSize: "500px 500px",
            backgroundRepeat: "repeat",
            backgroundBlendMode: "overly",
            // backgroundPosition: "left top",
            // mixBlendMode: "overlay",
          }}
        />
        <MouseParallaxItem
          strength={5}
          className="absolute inset-0 z-10 w-[1000px] h-[1500px] mx-auto"
        >
          <Image
            alt="Abstract background"
            src="https://nvbssjoomsozojofygor.supabase.co/storage/v1/object/public/images/landing/upscale/upscale_BG.jpg"
            fill
            unoptimized
            className="rounded-[100px] object-cover"
          />
        </MouseParallaxItem>
        <MouseParallaxItem
          strength={25}
          className="absolute inset-0 z-20 flex h-full w-full items-center justify-center"
        >
          <Image
            alt="Take control UI element"
            src="https://nvbssjoomsozojofygor.supabase.co/storage/v1/object/public/images/landing/upscale/upscale_FG.png"
            width={1200}
            height={1600}
            unoptimized
            className="h-auto"
          />
        </MouseParallaxItem>
        <p className="z-20 absolute top-12 left-0 ml-12 text-[80px] text-accent font-bold">
          PUSH PAST PIXELES
        </p>
        <p className="z-50 absolute bottom-0 right-36 ml-12 text-[100px] text-white font-bold">
          UPSCALE TO 4K
        </p>
        <div className="z-10 absolute inset-x-0 -bottom-20 h-[400px] bg-black/20 [mask-image:linear-gradient(to_top,white,transparent)] !backdrop-blur-sm" />
      </MouseParallaxProvider>
      <div className="flex justify-between w-full items-end mt-32">
          <ImageMagnifyCard 
            src="/images/landing/upscale/upscale3.jpg"
            focus={imageFocus1}
            scale={6}
            className="left-[110%]"
           />
          <ImageMagnifyCard 
            src="/images/landing/upscale/upscale2.jpg"
            focus={imageFocus2}
            scale={6}
            className="right-[110%] bottom-0"
           />
      </div>
      <p className="w-full text-[40px] font-bold text-center my-4">Ultimate image enhancement and upscaler</p>
      <div className="flex justify-between w-full items-start mt-3">
          <ImageMagnifyCard 
            src="/images/landing/upscale/upscale4.jpg"
            mainSize={{ w: 500, h: 600 }}
            previewSize={{ w: 350, h: 260 }}
            focus={imageFocus3}
            scale={5}
            className="left-[110%]"
            />
          <ImageMagnifyCard 
            src="/images/landing/upscale/upscale5.jpg"
            mainSize={{ w: 554, h: 810 }}
            previewSize={{ w: 400, h: 300 }}
            focus={imageFocus4}
            scale={3}
            className="right-[105%] bottom-1/4"
           />
      </div>
      {/* <BlurEffect position="top" intensity={100}  className="z-10 absolute inset-x-0 -bottom-20 h-[400px] bg-gradient-to-b from-black/30 to-transparent"/> */}
      <div className="z-50 absolute inset-x-0 -bottom-2 h-[400px] bg-black/20 [mask-image:linear-gradient(to_top,white,transparent)] !backdrop-blur-sm" />
      <div className="z-50 absolute inset-x-0 -bottom-2 h-[400px] bg-black/20 [mask-image:linear-gradient(to_top,white,transparent)] !backdrop-blur-sm" />
      <div className="z-50 absolute inset-x-0 -bottom-2 h-[400px] bg-black/20 [mask-image:linear-gradient(to_top,white,transparent)] !backdrop-blur-sm" />
      <p className="z-50 text-[40px] text-center absolute inset-x-0 bottom-2 px-56">
        Create <span className="text-accent">ultrarealistic</span> images with natural skin, lighting and camera
      </p>

    </section>
  );
};

export default UpscaleSection;
