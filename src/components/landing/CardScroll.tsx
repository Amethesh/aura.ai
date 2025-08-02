"use client";

import { motion, useMotionValue, useSpring, useVelocity } from "motion/react";
import { useRef, useEffect, useState, ReactElement } from "react";
import { ImageCard3D } from "./3dImageCard"; // Adjust path if necessary
import useEmblaCarousel from "embla-carousel-react";
import { CustomCursor } from "./CustomCursor";
import { ImageCard3DType } from "@/src/types/BaseType";

interface CardScrollProps {
  cardData: ImageCard3DType[]
}

const CardScroll = ({cardData}:CardScrollProps): ReactElement => {
  // 1. Set up Embla Carousel with the loop option
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    dragFree: true,
    watchDrag: true,
  });

  const scrollVelocity = useMotionValue(0);
  
  const isDragging = useRef(false);

  const handleMouseEnter = () => {
    setIsCursorVisible(true);
  };

  const handleMouseLeave = () => {
    setIsCursorVisible(false);
  };
  useEffect(() => {
    if (!emblaApi) return;

    let lastPosition = emblaApi.scrollProgress();
    let lastTimestamp = Date.now();
    // 1. Use a ref to track interaction state without causing re-renders

    const updateVelocity = () => {
      const currentPosition = emblaApi.scrollProgress();
      const currentTimestamp = Date.now();
      const timeDelta = currentTimestamp - lastTimestamp;

      if (timeDelta > 0) {
        const positionDelta = currentPosition - lastPosition;
        const velocity = (positionDelta / timeDelta) * 100000;
        scrollVelocity.set(velocity);
      }

      lastPosition = currentPosition;
      lastTimestamp = currentTimestamp;
    };

    // The decay function remains the same, but we will control WHEN it's called
    const decayVelocity = () => {
      // 2. Add a guard clause: only decay if the user is not actively dragging
      if (isDragging.current) return;

      scrollVelocity.set(scrollVelocity.get() * 0.95);
      if (Math.abs(scrollVelocity.get()) > 0.01) {
        requestAnimationFrame(decayVelocity);
      } else {
        scrollVelocity.set(0);
      }
    };

    // 3. Set up event listeners to manage the interaction state
    const onPointerDown = () => {
      isDragging.current = true;
      // Stop any existing decay animation
      scrollVelocity.stop();
    };

    const onPointerUp = () => {
      isDragging.current = false;
      // Start the decay animation when the user lets go
      requestAnimationFrame(decayVelocity);
    };

    const onSettle = () => {
      // Ensure velocity is fully decayed when the carousel settles
      scrollVelocity.set(0);
    };

    emblaApi.on("scroll", updateVelocity);
    emblaApi.on("settle", onSettle);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    // Cleanup function
    return () => {
      emblaApi.off("scroll", updateVelocity);
      emblaApi.off("settle", onSettle);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, scrollVelocity]);

  return (
    <div
      className="relative w-screen h-[800px] overflow-hidden cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CustomCursor isVisible={isCursorVisible} />

      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black/30 to-transparent z-10 pointer-events-none" />
      <div className="embla w-full h-full" ref={emblaRef}>
        <div className="embla__container h-full items-center">
          {cardData.map((card, index) => (
            <div
              key={`${card.cardText}-${index}`}
              className="embla__slide px-20"
              // px-12 on each side = 96px gap * 2 = 192px total
            >
              <ImageCard3D
                width={card?.width}
                height={card?.height}
                topImageUrl={card.topImageUrl}
                bottomImageUrl={card.bottomImageUrl}
                cardText={card.cardText}
                topImageScale={card.topImageScale}
                scrollVelocity={scrollVelocity}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardScroll;
