import Image from "next/image";
import { MouseParallaxItem, MouseParallaxProvider } from "./MouseParallax";
import { InteractiveZoomImage } from "./ImageZoom";

const UpscaleSection = () => {
  return (
    <section className="mt-56">
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
      <div className="mt-32 mx-12 flex gap-3 justify-around">
        <InteractiveZoomImage
          src="/images/landing/upscale/upscale2.jpg"
          alt="A beautifully upscaled image of a futuristic city"
        />
        <InteractiveZoomImage
          src="/images/landing/upscale/upscale3.jpg"
          alt="Woman in blue fluffy coat"
          containerClassName="bg-black rounded-3xl p-4"
          // Clipped Dark Overlay
          overlayClipPath="polygon(-47% 42%, 0% -6%, 43% 29%, 43% 34%)"
          overlayClassName="w-full h-full bg-black/50 border-0 backdrop-blur-sm -left-12"
          // Zoomed Window (left of main image)
          zoomWindowX="-350px"
          zoomWindowY="20px"
          zoomWindowWidth="250px"
          zoomWindowHeight="250px"
        />

        <div className="h-screen"></div>
      </div>
    </section>
  );
};

export default UpscaleSection;
