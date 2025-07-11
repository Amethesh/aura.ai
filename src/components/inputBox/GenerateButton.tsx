import * as motion from "motion/react-client";
import { Sparkles } from "lucide-react";

const GenerateButton = () => {
  return (
    <motion.button
      className="relative flex items-center justify-center bg-[#1D1D1D] border border-[rgba(68,68,68,0.67)] shadow-[inset_0px_0px_27.5px_4px_rgba(106,106,106,0.25)] rounded-[21px] overflow-hidden group cursor-pointer"
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      variants={{
        initial: {
          scale: 1,
          boxShadow:
            "inset 0px 0px 27.5px 4px rgba(106,106,106,0.25), 0px 4px 15px rgba(0,0,0,0.3)",
        },
        hover: {
          scale: 1.05,
          boxShadow:
            "inset 0px 0px 35px 6px rgba(106,106,106,0.4), 0px 8px 25px rgba(0,0,0,0.4)",
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
        tap: {
          scale: 0.98,
          transition: {
            duration: 0.1,
            ease: "easeInOut",
          },
        },
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-[21px]"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-[21px]"
        variants={{
          initial: { x: "-100%" },
          hover: { x: "100%" },
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Sparkles icon with animation */}
      <motion.span
        className="absolute left-4 top-1/3 -translate-y-1/2 w-[27.18px] h-[27.18px] flex items-center justify-center filter drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        variants={{
          initial: {
            rotate: 0,
            scale: 1,
            color: "rgba(255,255,255,0.9)",
          },
          hover: {
            rotate: 360,
            scale: 1.1,
            color: "rgba(139,92,246,1)",
          },
        }}
        transition={{
          rotate: { duration: 0.6, ease: "easeInOut" },
          scale: { duration: 0.3, ease: "easeOut" },
          color: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <Sparkles size={24} />
      </motion.span>

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          variants={{
            initial: {
              opacity: 0,
              scale: 0,
              y: 0,
            },
            hover: {
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -10, -20],
            },
          }}
          transition={{
            duration: 1.2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}

      {/* Text with enhanced animation */}
      <motion.span
        className="ml-[48px] mr-4 text-[16px] leading-[22px] font-normal relative z-10"
        style={{
          color: "rgba(255,255,255,0.9)",
          textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        }}
        variants={{
          initial: {
            x: 0,
            color: "rgba(255,255,255,0.9)",
          },
          hover: {
            x: 2,
            color: "rgba(255,255,255,1)",
          },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        Generate image
      </motion.span>

      {/* Pulsing border effect */}
      <motion.div
        className="absolute inset-0 border-2 border-purple-500/50 rounded-[21px]"
        variants={{
          initial: { opacity: 0, scale: 1 },
          hover: {
            opacity: [0, 0.5, 0],
            scale: [1, 1.02, 1],
          },
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-[21px] bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 blur-xl"
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          hover: { opacity: 0.6, scale: 1.1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ zIndex: -1 }}
      />
    </motion.button>
  );
};

export default GenerateButton;
