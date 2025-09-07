"use client";

import React, { useMemo } from "react";

// Helper to generate a random number within a range
const random = (max: number, min: number = 0): number =>
  Math.random() * (max - min) + min;

/**
 * A component that renders animated particles falling from the top,
 * with the screen being instantly populated.
 * @param {number} count - The number of particles to render.
 */
export const FloatingParticles = ({ count = 100 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      // Generate particles that start distributed across the entire screen
      const startY = -random(20, 10); // Start just above viewport
      const endY = random(20) + 100; // End just below viewport
      

      const startX = random(100);
      const endX = random(100);

      const duration = random(57000, 50000);
      const innerDuration = 5000;

      return {
        id: index,
        size: random(6, 2),
        "--from-x": `${startX}vw`,
        "--from-y": `${startY}vh`,
        "--to-x": `${endX}vw`,
        "--to-y": `${endY}vh`,

        // Use negative delay to distribute particles along their animation path
        // This creates the effect of particles being already in motion across the screen
        animationDuration: `${duration}ms`,
        animationDelay: `-${random(duration)}ms`,

        // Randomize inner animation timing as well
        innerAnimationDelay: `-${random(innerDuration)}ms`,
      };
    });
  }, [count]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 left-0"
          style={
            {
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `move-particle linear infinite`,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay, // Apply the negative delay
              "--from-x": p["--from-x"],
              "--from-y": p["--from-y"],
              "--to-x": p["--to-x"],
              "--to-y": p["--to-y"],
            } as React.CSSProperties
          }
        >
          <div
            className="w-full h-full rounded-full mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(hsl(180, 100%, 40%), hsl(180, 100%, 40%) 10%, hsla(180, 100%, 80%, 0) 46%)",
              animation: "fade-and-scale 2s infinite",
              animationDelay: p.innerAnimationDelay, // Apply the negative delay
            }}
          />
        </div>
      ))}
    </div>
  );
};
