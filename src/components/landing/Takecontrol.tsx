import Image from "next/image";
import { MouseParallaxItem, MouseParallaxProvider } from "./MouseParallax";
import GlassPaneBG from "./GlassPaneBG";
import { GradientComponent } from "./Gradient";

const blue = {
  primary: "#4460C5",
  secondary: "#6F74AC",
  accent1: "#D5FDB9",
  accent2: "#E4F9FF",
  accent3: "#5367CE",
  highlight1: "#5B82E1",
  highlight2: "#5165CC",
};

const Takecontrol = () => {
  return (
    <section className="relative mt-12">
      <GlassPaneBG paneWidth={60}>
        <MouseParallaxProvider className="relative flex h-screen w-screen items-center justify-center py-16 px-4">
          <div
            className="absolute inset-0 z-20 overflow-hidden pointer-events-none opacity-60"
            style={{
              backgroundImage: "url(/images/landing/grain.png)",
              backgroundSize: "100px 100px",
              backgroundRepeat: "repeat",
              backgroundBlendMode: "overlay",
              backgroundPosition: "left top",
            }}
          />
          <MouseParallaxItem
            strength={5}
            className="absolute inset-0 z-10 h-full w-[1000px] mx-auto mt-16"
          >
            <Image
              alt="Abstract background"
              src="/images/landing/control/control_bottom.jpg"
              fill
              unoptimized
              className="rounded-[100px] object-cover"
            />
          </MouseParallaxItem>
          <MouseParallaxItem
            strength={15}
            className="absolute inset-0 z-20 flex h-full w-full items-center justify-center pb-[120px]"
          >
            <Image
              alt="Take control UI element"
              src="/images/landing/control/control_top.png"
              width={600}
              height={800}
              unoptimized
              className="h-auto"
            />
          </MouseParallaxItem>
          <p className="z-20 absolute top-12 left-0 ml-12 text-[80px] text-accent font-bold">
            TAKE CONTROL <span className="!z-50">OVER</span>
          </p>
          <p className="z-50 absolute bottom-0 right-0 ml-12 text-[80px] text-white font-bold">
            YOUR IMAGE GENERATION
          </p>
          <div className="z-10 absolute inset-x-0 -bottom-20 h-[400px] bg-black/20 [mask-image:linear-gradient(to_top,white,transparent)] !backdrop-blur-sm" />
        </MouseParallaxProvider>
      </GlassPaneBG>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[-1]">
        <GradientComponent colors={blue} sizeVW={150} />
      </div>
    </section>
  );
};

export default Takecontrol;
