"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/src/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      // Base styles from Radix for functionality and accessibility
      "peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",

      // New styles for the Track
      "rounded-xl border border-[#494949] bg-[#2D2D2D] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.37)]",

      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        // Base styles for the Thumb
        "pointer-events-none block h-3.5 w-3.5 rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.16)] ring-0",

        // Add transition for color and transform
        "transition-all", // This will animate both the color and position change

        // State-based positioning
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",

        // State-based colors for clear on/off indication
        "data-[state=checked]:bg-[#D9E825]", // Active "on" color
        "data-[state=unchecked]:bg-[#888888]" // Muted "off" color
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
