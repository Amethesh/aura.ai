import Image from "next/image";
import { GradientComponent } from "./Gradient";
import CardScroll from "./CardScroll";
import GlassPaneBG from "./GlassPaneBG";
import InputBox from "../inputBox/InputBox";
import { ImageCard3DType } from "@/src/types/BaseType";

const cardData1: ImageCard3DType[] = [
  {
    topImageUrl: "/images/landing/cards/prop_game_top.png",
    bottomImageUrl: "/images/landing/cards/prop_game_bottom.png",
    cardText: "Gaming",
    topImageScale: 1.2,
  },
  {
    topImageUrl: "/images/landing/cards/anime_girl_top.png",
    bottomImageUrl: "/images/landing/cards/anime_girl_bottom.png",
    cardText: "Anime",
    topImageScale: 1.1,
  },
  {
    topImageUrl: "/images/landing/cards/goth_girl_top.png",
    bottomImageUrl: "/images/landing/cards/goth_girl_bottom.png",
    cardText: "Gothic",
    topImageScale: 1.2,
  },
  {
    topImageUrl: "/images/landing/cards/goth_girl2_top.png",
    bottomImageUrl: "/images/landing/cards/goth_girl2_bottom.png",
    cardText: "Dark",
    topImageScale: 1.1,
  },
  {
    topImageUrl: "/images/landing/cards/jap_girl_top.png",
    bottomImageUrl: "/images/landing/cards/jap_girl_bottom.png",
    cardText: "Kawaii",
    topImageScale: 1.2,
  },
];

const cardData2: ImageCard3DType[] = [
  {
    topImageUrl: "/images/landing/cards/guy_top.png",
    bottomImageUrl: "/images/landing/cards/guy_bottom.png",
    cardText: "Guy",
    topImageScale: 1.1,
    width: 400,
    height: 600,
  },
  {
    topImageUrl: "/images/landing/cards/mirror_girl_top.png",
    bottomImageUrl: "/images/landing/cards/mirror_girl_bottom.png",
    cardText: "Instagram",
    topImageScale: 1.2,
    width: 400,
    height: 600,
  },
  {
    topImageUrl: "/images/landing/cards/prop_top.png",
    bottomImageUrl: "/images/landing/cards/prop_bottom.png",
    cardText: "Dark",
    topImageScale: 1.3,
    width: 400,
    height: 600,
  },
  {
    topImageUrl: "/images/landing/cards/jap_girl_top.png",
    bottomImageUrl: "/images/landing/cards/jap_girl_bottom.png",
    cardText: "Kawaii",
    topImageScale: 1.2,
    width: 400,
    height: 600,
  },
  {
    topImageUrl: "/images/landing/cards/prop_top.png",
    bottomImageUrl: "/images/landing/cards/prop_bottom.png",
    cardText: "Dark",
    topImageScale: 1.3,
    width: 400,
    height: 600,
  },
  {
    topImageUrl: "/images/landing/cards/jap_girl_top.png",
    bottomImageUrl: "/images/landing/cards/jap_girl_bottom.png",
    cardText: "Kawaii",
    topImageScale: 1.2,
    width: 400,
    height: 600,
  },
];

const red = {
  primary: "#FF4E4E",
  secondary: "#FF7373",
  accent1: "#FFD6D6",
  accent2: "#FFE5E5",
  accent3: "#FFA8A8",
  highlight1: "#FF0033",
  highlight2: "#FF6600",
};

// const blue = {
//   primary: "#4460C5",
//   secondary: "#6F74AC",
//   accent1: "#D5FDB9",
//   accent2: "#E4F9FF",
//   accent3: "#5367CE",
//   highlight1: "#5B82E1",
//   highlight2: "#5165CC",
// };

// const black = {
//   primary: "#222222",
//   secondary: "#555555",
//   accent1: "#999999",
//   accent2: "#DDDDDD",
//   accent3: "#FFFFFF",
//   highlight1: "#000000",
//   highlight2: "#888888",
// };

// const purple = {
//   primary: "#7D5FFF",
//   secondary: "#A29BFE",
//   accent1: "#DCD0FF",
//   accent2: "#F3EFFF",
//   accent3: "#E57EFF",
//   highlight1: "#B300FF",
//   highlight2: "#FF00AA",
// };

// const green = {
//   primary: "#4ADE80",
//   secondary: "#34D399",
//   accent1: "#D9F99D",
//   accent2: "#ECFDF5",
//   accent3: "#86EFAC",
//   highlight1: "#15803D",
//   highlight2: "#65A30D",
// };

// const gold = {
//   primary: "#FFD700",
//   secondary: "#FFE066",
//   accent1: "#FFF8DC",
//   accent2: "#FFF5E1",
//   accent3: "#FFECB3",
//   highlight1: "#FFA500",
//   highlight2: "#FFB300",
// };

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div>
        <p className="text-[60px] font-bold z- absolute top-24 left-0 text- ml-12">
          Generate and edit high
        </p>
        <p className="text-[60px] font-bold z-10 absolute top-24 right-0 text- ">
          quality images in seconds!
        </p>
      </div>
      <div className="relative -mt-10 h-[105vh]">
        <Image
          className="h-full w-full object-scale-down"
          src={"/images/landing/hero3.png"}
          width={800}
          height={800}
          alt="Cover of an high quality AI images"
        />
        <div className="z-10 absolute inset-x-0 bottom-0 h-[400px] bg-black/20 [mask-image:linear-gradient(to_top,white,transparent)] !backdrop-blur-sm" />
        <div className="absolute inset-x-0 bottom-32 z-10 w-screen flex justify-center">
          <InputBox />
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[-1]">
        <GradientComponent colors={red} sizeVW={150} />
      </div>
      <div className="relative w-full h-full">
        <GlassPaneBG paneWidth={50}>
          <div className="flex flex-col items-center p-4">
            <h1 className="text-[45px] text-accent text-center mt-4">
              Generate anything in any style
            </h1>
            <div className="mt-4">
              <CardScroll cardData={cardData1} />
            </div>
            <div className="mt-4">
              <CardScroll cardData={cardData2} />
            </div>
          </div>
        </GlassPaneBG>
      </div>
    </div>
  );
};

export default Hero;
