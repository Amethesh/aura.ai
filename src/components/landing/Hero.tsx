import Image from "next/image";
import { GradientComponent } from "./Gradient";

const Hero = () => {
  const red = {
    primary: "#FF4E4E",
    secondary: "#FF7373",
    accent1: "#FFD6D6",
    accent2: "#FFE5E5",
    accent3: "#FFA8A8",
    highlight1: "#FF0033",
    highlight2: "#FF6600",
  };

 const blue = {
   primary: "#4460C5",
   secondary: "#6F74AC",
   accent1: "#D5FDB9",
   accent2: "#E4F9FF",
   accent3: "#5367CE",
   highlight1: "#5B82E1",
   highlight2: "#5165CC",
 };


  const black = {
    primary: "#222222",
    secondary: "#555555",
    accent1: "#999999",
    accent2: "#DDDDDD",
    accent3: "#FFFFFF",
    highlight1: "#000000",
    highlight2: "#888888",
  };

  const purple = {
    primary: "#7D5FFF",
    secondary: "#A29BFE",
    accent1: "#DCD0FF",
    accent2: "#F3EFFF",
    accent3: "#E57EFF",
    highlight1: "#B300FF",
    highlight2: "#FF00AA",
  };

  const green = {
    primary: "#4ADE80", // emerald green
    secondary: "#34D399", // mint
    accent1: "#D9F99D", // light lime
    accent2: "#ECFDF5", // pale green
    accent3: "#86EFAC", // leaf green
    highlight1: "#15803D", // deep green
    highlight2: "#65A30D", // olive
  };

  const gold = {
    primary: "#FFD700", // classic gold
    secondary: "#FFE066", // soft yellow
    accent1: "#FFF8DC", // corn silk
    accent2: "#FFF5E1", // light gold
    accent3: "#FFECB3", // amber
    highlight1: "#FFA500", // orange gold
    highlight2: "#FFB300", // rich amber
  };

  return (
    <div className="overflow-hidden">
      <div className="-mt-10 h-[105vh]">
        <Image
          className="z-[-1] h-full w-full object-scale-down"
          src={"/images/landing/hero1.png"}
          width={800}
          height={800}
          alt="hero1"
        />
      </div>
      <div className="w-full h-screen relative">
        <div className="absolute inset-0 flex items-center justify-center z-[-1]">
          <GradientComponent colors={blue} sizeVW={150} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
