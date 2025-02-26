"use client";

import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/styles";
import { useError } from "@/hooks";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  validate?: (inputValue: string) => boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, errorMessage, validate, className, onChange, value, ...props }, ref) => {
    const { isError, setIsError } = useError({ error, value, validate });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);

      if (isError && validate) {
        const isValid = validate(e.target.value);
        setIsError(!isValid);
      }
    };

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "flex min-h-[80px] resize-none w-full border bg-background p-2 text-sm ring-offset-background placeholder:text-main-gray focus-border disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-error focus:border-error": isError,
            },
            className,
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {isError && errorMessage && (
          <span className="w-max absolute top-full translate-y-0.5 text-error text-2xs leading-none">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;
