"use client";

import { FC, ChangeEvent, InputHTMLAttributes, useId } from "react";
import { cn } from "@/utils/styles";
import { cva, VariantProps } from "class-variance-authority";

const switchVariants = cva(
  "relative flex items-center w-7 !max-w-7 !min-w-7 h-4 rounded-2xl p-0.5 cursor-pointer data-[state=unchecked]:bg-main-gray/40 data-[disabled=disabled]:cursor-default data-[disabled=disabled]:opacity-40",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-info",
        primary: "data-[state=checked]:bg-primary",
        info: "data-[state=checked]:bg-info",

        defaultP:
          "w-11 h-6 !min-w-11 bg-pub-lightG border-pub-lightE data-[state=unchecked]:bg-pub-lightG data-[disabled=disabled]:cursor-default data-[disabled=disabled]:opacity-40 data-[state=checked]:bg-pub-red data-[state=checked]:border-pub-redD",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface Props extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof switchVariants> {
  label?: string;
  onCheckedChange?: (checked: boolean, value: Props["value"]) => void;
}

const Switch: FC<Props> = ({
  id,
  label,
  name,
  className = "",
  variant,
  disabled = false,
  checked = false,
  onChange,
  onCheckedChange,
  ...props
}) => {
  const labelId = id || `switch-${useId()}`;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { value, checked } = e.target;
    onChange && onChange(e);
    onCheckedChange && onCheckedChange(checked, value);
  };

  return (
    <div>
      <div
        className={cn(switchVariants({ variant }), className)}
        data-state={checked ? "checked" : "unchecked"}
        data-disabled={disabled ? "disabled" : "undisabled"}
      >
        <input
          id={labelId}
          type="checkbox"
          className={`w-full h-full appearance-none absolute top-0 left-0 cursor-pointer disabled:cursor-default focus-outline rounded-full`}
          name={name}
          onChange={handleChange}
          checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
          aria-checked={checked}
          aria-label={label}
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 rounded-full bg-main-white transition ease-linear pointer-events-none",
            {
              "transform translate-x-full": checked && !disabled,
            },
          )}
        />
        <label className="hidden" htmlFor={labelId}>
          {label}
        </label>
      </div>
    </div>
  );
};
export default Switch;
