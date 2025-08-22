import Image from "next/image";
import GlassPaneBG from "./GlassPaneBG";
import { GradientComponent } from "./Gradient";
import * as motion from "motion/react-client";

const gradientColors = {
  primary: "#4E93FF",
  secondary: "#639CF2",
  accent1: "#D5FDB9",
  accent2: "#E4F9FF",
  accent3: "#ED74E2",
  highlight1: "#F3001D",
  highlight2: "#FF7EEA",
};

const Footer = () => {
  return (
    <footer className="relative mt-56">
      <GlassPaneBG paneWidth={55} className="z-10">
        <div className="w-full flex justify-between">
          <div className="m-8 mt-20">
            <a
              href="#"
              className="relative mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              <img
                src="/images/newlogo.png"
                alt="logo"
                width={40}
                height={40}
              />
              <p className="text-4xl font-bold text-white">
                Aura<span className="text-accent">.</span>ai
              </p>
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative flex items-center justify-center p-4 px-6 mt-4
								border-2 border-[#d8e825bd]
								backdrop-blur-xl
								rounded-[13px]
								bg-[linear-gradient(260deg,rgba(217,232,37,0.25)_1%,rgba(217,232,37,0.25)_20%,rgba(26,26,29,0.025)_100%)]
								shadow-[inset_0px_2px_4px_rgba(255,255,255,0.16)]"
								>
              <span className="font-century-gothic font-semibold text-xs leading-[17px] text-[#D9E825]">
                GET STARTED
              </span>
            </motion.button>
          </div>
          <Image
            src={"/images/landing/footer/footerMain.png"}
            width={600}
            height={600}
            alt="footer"
          />
        </div>
      </GlassPaneBG>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 -z[-1]">
        <GradientComponent
          colors={gradientColors}
          sizeVW={150}
          isAnimated={false}
        />
      </div>
    </footer>
  );
};

export default Footer;
