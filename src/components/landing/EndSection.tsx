import Image from "next/image";
import { MouseParallaxItem, MouseParallaxProvider } from "./MouseParallax";
import HorizontalImageScroller from "./HorizontalImageScroller";

const sampleImages = [
  {
    src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/a237fca1-59c1-4615-acfc-2d76a419eb23/original=true,quality=90/ComfyUI_00002_mnkhu_1755432615.jpeg',
    alt: 'A desert landscape with a person standing on a rock formation',
    width: 1600,
    height: 1067,
  },
  {
    src: '/images/landing/footer/scroll10.png',
    alt: 'A portrait of a woman with intricate face paint',
    width: 1024,
    height: 1280,
  },
  {
    src: '/images/landing/footer/scroll11.png',
    alt: 'A person snorkeling in crystal clear water',
    width: 1024,
    height: 1280
  },
  {
    src: '/images/landing/footer/scroll1.png',
    alt: 'A snow-covered mountain range under a cloudy sky',
    width: 1792,
    height: 2304,
  },
  {
    src: '/images/landing/footer/scroll3.jpg',
    alt: 'Close-up of a colorful bird with a vibrant beak',
    width: 1152,
    height: 2048,
  },
  {
    src: '/images/landing/footer/scroll5.png',
    alt: 'An underwater shot of a sea turtle swimming',
    width: 1664,
    height: 2432,
  },
  {
    src: '/images/landing/footer/scroll7.png',
    alt: 'An underwater shot of a sea turtle swimming',
    width: 1024,
    height: 1280,
  },
  {
    src: '/images/landing/footer/scroll9.png',
    alt: 'An underwater shot of a sea turtle swimming',
    width: 1024,
    height: 1280,
  },
  {
    src: '/images/landing/footer/scroll6.png',
    alt: 'An underwater shot of a sea turtle swimming',
    width: 1024,
    height: 1280,
  },
  {
    src: '/images/landing/footer/scroll2.jpg',
    alt: 'An underwater shot of a sea turtle swimming',
    width: 2048,
    height: 2048,
  },
];

const EndSection = () => {
  return (
    <section className="">
      <MouseParallaxProvider className="relative flex h-[1500px] w-screen items-center justify-center py-16 px-4">
        <MouseParallaxItem
          strength={5}
          className="absolute -top-32 inset-0 z-10 w-[1000px] h-[1500px] mx-auto ml-32"
        >
          <Image
            alt="Abstract background"
            src="/images/landing/footer/footerLarge.png"
            fill
            unoptimized
            className="rounded-[100px] object-cover"
          />
        </MouseParallaxItem>
        <MouseParallaxItem
          strength={25}
          className="absolute inset-0 flex h-full w-full items-center justify-center"
        >
          <p className="absolute top-44 left-0 ml-12 text-[100px] text-accent font-bold z-50">
            <span>GENERATE</span>
            {" "}
            <span className="z-10">WITH</span>
          </p>
          <p className="absolute bottom-1/2 pb-4 right-36 text-[100px] text-white font-bold">
            <a
              href="#"
              className="relative mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              <img
                src="/images/newlogo.png"
                alt="logo"
                width={90}
                height={90}
              />
              <p className="text-[120px] font-bold text-white">
                Aura<span className="text-accent">.</span>ai
              </p>
            </a>
          </p>
        </MouseParallaxItem>
      </MouseParallaxProvider>
      <p className="font-bold text-2xl ml-6">Explore Now:</p>
      <HorizontalImageScroller images={sampleImages} galleryHeight={350} />
    </section>
  );
};

export default EndSection;
