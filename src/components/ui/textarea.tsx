import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  maxHeight?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxHeight, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current!);
    const adjustHeight = () => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    React.useEffect(() => {
      adjustHeight();
    }, [props.value]);

    return (
      <textarea
        className={cn(
          "flex w-full px-6 py-4 text-base",
          "resize-none",
          // Custom styling from your request
          "bg-[#111111]",
          "border border-white/10",
          "rounded-xl",
          "shadow-[inset_0px_0px_46.2px_3px_rgba(255,255,255,0.08)]",
          // States and other utilities
          "placeholder:text-neutral-500",
          "placeholder:text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={internalRef}
        rows={1}
        style={{
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        }}
        onInput={adjustHeight}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
