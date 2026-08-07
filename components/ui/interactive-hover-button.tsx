import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  forceDark?: boolean;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", forceDark = false, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto min-w-[8.5rem] cursor-pointer overflow-hidden rounded-full border px-8 py-2.5 text-center font-semibold",
        forceDark
          ? "border-white/30 bg-black text-white"
          : "border-foreground/30 bg-background text-foreground",
        className,
      )}
      {...props}
    >
      <span className="inline-block translate-x-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className={cn("absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100", forceDark ? "text-black" : "text-background")}>
        <span>{text}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className={cn("absolute left-[1.2rem] top-[50%] h-2 w-2 -translate-y-1/2 scale-[1] rounded-lg transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:-translate-y-0", forceDark ? "bg-white" : "bg-foreground")}></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
