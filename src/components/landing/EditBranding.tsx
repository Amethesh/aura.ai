import GlassPaneBG from "./GlassPaneBG";
import * as motion from "motion/react-client";
import BackgroundImage from "../home/BackgroundImage";
import { Variants } from "motion/react";

// Define animation variants outside the component for better performance and readability
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textSlideDown: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageScaleUp: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const textSlideUp: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const EditBranding = () => {
  return (
    <section className="mt-20">
      <GlassPaneBG paneWidth={55}>
        {/* Main animation container */}
        <motion.div
          className="relative mx-auto m-4 flex justify-center items-center p-10 max-w-[1500px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Triggers animation when the component enters the viewport
          viewport={{ once: true, amount: 0.3 }} // Animation runs once, triggers at 30% visibility
        >
          <motion.p
            className="z-1 absolute top-12 left-0 ml-12 text-[120px] text-accent font-bold"
            variants={textSlideDown} // Apply the "slide down" variant
          >
            EDIT WITH
          </motion.p>

          {/* We wrap the custom component in a motion.div to animate it */}
          <motion.div variants={imageScaleUp}>
            <BackgroundImage
              src={"/images/landing/edit/cane.png"}
              width={400}
              height={800}
              className="z-10 !relative"
              // The !relative from your original code is now on the wrapper
            />
          </motion.div>

          <motion.p
            className="z-20 absolute bottom-0 right-0 text-[100px] font-bold"
            variants={textSlideUp} // Apply the "slide up" variant
          >
            CONSISTENT BRANDING
          </motion.p>

          <motion.div
            className="z-10 absolute inset-x-0 -bottom-4 h-[400px] bg-black/20 [mask-image:linear-gradient(to_top,white,transparent)] !backdrop-blur-sm"
            variants={textSlideUp} // Reuse the slide up variant for a fade-in effect
          />
        </motion.div>
      </GlassPaneBG>
    </section>
  );
};

export default EditBranding;
