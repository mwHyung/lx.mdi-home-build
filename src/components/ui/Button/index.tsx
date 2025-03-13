import { forwardRef, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/styles";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-main-black text-snow-white hover:bg-primary/80 focus-outline",
        primary: "bg-primary text-primary-foreground hover:bg-primary/80 focus-outline",
        bsgNavy: "bg-bsg-navy text-snow-white hover:bg-bsg-navy/80 focus-outline",
        outline:
          "border bg-background hover:bg-muted hover:text-main-black focus-visible:outline-focus",
        muted: "bg-muted text-main-black hover:bg-muted/60 focus-outline",
        info: "bg-info text-info-foreground hover:bg-info/80 focus-outline",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80 focus-outline",
        success: "bg-success text-success-foreground hover:bg-success/80 focus-outline",
        error: "bg-error text-error-foreground hover:bg-error/80 focus-outline",
        text: "hover:bg-muted hover:text-main-black focus-visible:outline-focus disabled:text-pub-grayD",
        link: "text-main-black underline-offset-4 hover:underline focus-visible:outline-focus",
        ghost: "text-pub-gray9",
        selectBox: "border bg-background hover:bg-muted hover:text-main-black focus-border",

        defaultP:
          "bg-main-white text-pub-gray9 font-medium border border-pub-lightG rounded-none hover:bg-pub-red hover:border-pub-redD hover:text-main-white",
        textP: "text-xs text-pub-grayA font-light hover:text-black  hover:font-bold",
        boldP: "text-xs text-black font-semibold",
        fullO: "flex-1 bg-pub-red rounded-none text-white font-bold text-xl",
        fullC: "flex-1 bg-main-black rounded-none text-white font-bold",
        gray: "bg-pub-gray4 rounded-none text-main-white",
        brown:
          "border border-pub-grayC bg-white text-[1.188rem] text-pub-nav font-bold min-w-[7.5rem] rounded-none hover:border-pub-b-button hover:bg-pub-nav hover:text-white",
        red: "bg-pub-red border border-pub-redB rounded-none",
      },
      size: {
        xs: "h-7 px-3 text-2xs",
        sm: "h-7 px-3 text-xs",
        md: "h-[3.75rem] px-5",
        lg: "h-9 px-6 text-sm",
        icon: "h-8 min-w-8 w-fit",
        "icon-sm": "h-6 min-w-6 w-fit",
        "icon-xs": "h-8 min-w-8 w-fit",
        auto: "px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, isLoading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), {
          "after:font-light after:text-pub-grayA": className?.includes("page_button"),
        })}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children && children}
      </button>
    );
  },
);
Button.displayName = "Button";

export default Button;
