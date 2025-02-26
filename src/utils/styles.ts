import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const positionVariant = cva("absolute left-1/2 -translate-x-1/2 w-[80%] md:w-auto", {
  variants: {
    position: {
      "top-center": "top-10",
      "top-right": "top-10 md:right-10 md:left-auto md:translate-x-0",
      "bottom-right": "bottom-10 md:right-10 md:left-auto md:translate-x-0",
    },
  },
  defaultVariants: { position: "top-center" },
});

export const widthVariant = cva("", {
  variants: {
    width: {
      default: "",
      auto: "w-auto min-w-auto",
      fit: "w-fit min-w-fit max-w-fit",
    },
  },
  defaultVariants: { width: "default" },
});

export const alignVariants = cva("", {
  variants: {
    align: {
      left: "text-left justify-start",
      center: "text-center flex items-center justify-center",
      right: "text-right justify-end",
    },
  },
  defaultVariants: {
    align: "left",
  },
});
