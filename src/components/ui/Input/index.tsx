"use client";

import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  RefObject,
  useCallback,
  useRef,
} from "react";
import { cva, VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Button } from "@/components/ui";
import { useError } from "@/hooks";
import { Validator } from "@/types/ui";
import { cn } from "@/utils/styles";

const inputVariants = cva(
  "flex w-full border border-pub-grayD bg-background ring-offset-background font-medium placeholder:text-[1.25rem] placeholder:text-pub-grayA placeholder:font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium focus-border disabled:cursor-not-allowed disabled:opacity-50 focus:border-pub-red",
  {
    variants: {
      size: {
        sm: "h-8 text-sm px-2 py-1",
        md: "h-9 text-sm px-2 py-1",
        lg: "text-[1.25rem] px-[1.75rem] py-[0.844rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  errorMessage?: string;
  errorIcon?: boolean;
  validate?: (inputValue: string) => boolean;
  validator?: Validator;
  onClear?: () => void;
  onEnter?: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      className,
      type,
      error,
      errorMessage,
      errorIcon = true,
      size,
      validator,
      validate,
      onClear,
      onEnter,
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputRef = (ref as RefObject<HTMLInputElement>) || useRef<HTMLInputElement | null>(null);

    const { isError, setIsError, validatorMessage, validateValue } = useError({
      error,
      value,
      validator,
      validate,
    });

    const isNonEmptyValue = (value: Props["value"]) =>
      onClear && value !== "" && value !== undefined;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      if (isError && validate) {
        const isValid = validateValue(e.target.value);
        setIsError(!isValid);
      }
    };

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          onEnter?.();
        }
      },
      [onEnter],
    );

    const handleClear = () => {
      onClear?.();
      inputRef?.current?.focus();
    };

    return (
      <div
        className={cn("relative", {
          "w-full": className?.includes("w-full"),
        })}
      >
        <input
          type={type}
          className={cn(
            inputVariants({ size }),
            {
              "pr-8": onClear,
              "border-error focus:border-error": isError,
            },
            className,
          )}
          value={value}
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {isNonEmptyValue(value) && (
          <Button
            variant={"text"}
            className="absolute top-1/2 right-0 -translate-y-1/2 hover:bg-transparent text-main-gray"
            size="icon-sm"
            onClick={handleClear}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
        {isError && (validatorMessage || errorMessage) && (
          <span className="w-max absolute top-full translate-y-0.5 text-error text-2xs leading-none">
            {validatorMessage || errorMessage}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
