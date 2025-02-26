"use client";

import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/styles";
import { Item } from "@/types/ui";
import Label from "../Label";

import "./Radio.scss";

const radioVariants = cva(
  "grow-0 shrink-0 appearance-none bg-transparent outline-none rounded-full border cursor-pointer disabled:cursor-default relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-2/3 before:h-2/3 before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 data-[disabled=disabled]:cursor-default data-[disabled=disabled]:opacity-40 focus-outline",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:border-primary data-[state=checked]:before:bg-primary",
        info: "data-[state=checked]:border-info data-[state=checked]:before:bg-info",

        defaultP:
          "peer border border-pub-lightE bg-pub-lightE data-[state=checked]:bg-pub-red data-[state=checked]:border-pub-redD",
      },
      size: {
        default: "w-3 h-3",
        sm: "w-3 h-3",
        lg: "w-5 h-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof radioVariants> {
  itemValue?: Item["value"];
  onCheckedChange?: (value?: Item["value"]) => void;
}

const Radio: FC<RadioProps> = ({
  itemValue,
  checked,
  disabled = false,
  variant,
  size,
  className,
  onChange,
  onCheckedChange,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange && onChange(e);
    onCheckedChange && onCheckedChange(itemValue);
  };

  return (
    <input
      type="radio"
      readOnly
      className={cn(radioVariants({ variant, size }), className)}
      data-state={disabled ? "disabled" : checked ? "checked" : "unchecked"}
      checked={checked}
      disabled={disabled}
      aria-checked={checked}
      aria-disabled={disabled}
      autoComplete="off"
      onChange={handleChange}
      {...props}
    />
  );
};

interface RadioItemProps extends RadioProps {
  item: Item;
  checked?: boolean;
}

const RadioGroupItem: FC<RadioItemProps> = ({ item, checked, ...props }) => {
  return (
    <Label className="flex items-center gap-3 font-normal flex-wrap">
      <Radio
        variant="default"
        id={item.value ? item.value?.toString() || "" : item.value.toString() || ""}
        checked={checked}
        itemValue={item.value}
        {...props}
      />
      {typeof item.label === "string" ? <span>{item.label}</span> : item.label}
    </Label>
  );
};

interface RadioGroupProps extends Pick<RadioProps, "variant" | "size" | "onChange"> {
  name?: string;
  disabled?: boolean;
  list: Item[];
  currentItem?: Item | null;
  currentValue?: Item["value"] | null;
  direction?: "horizontal" | "vertical";
  disabledDrag?: boolean;
  className?: string;
  onCheckedChange?: RadioProps["onCheckedChange"];
}

const RadioGroup: FC<RadioGroupProps & VariantProps<typeof radioVariants>> = ({
  list,
  name,
  currentItem,
  currentValue,
  direction = "horizontal",
  className,
  disabledDrag = true,
  onChange,
  onCheckedChange,
  ...props
}) => {
  const [checkedValue, setCheckedValue] = useState<Item["value"] | null>(
    (currentValue ?? currentItem?.value ?? list.length) ? list[0].value : null,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, itemValue: Item["value"]) => {
    setCheckedValue(itemValue ?? null);
    onCheckedChange?.(itemValue);
  };

  useEffect(() => {
    setCheckedValue(currentValue ?? null);
  }, [currentValue]);

  return (
    <div
      role="radiogroup"
      aria-label="radiogroup"
      className={cn(
        "flex",
        {
          "select-none": disabledDrag,
          "flex-row gap-3 gap-y-2": direction === "horizontal",
          "flex-col gap-2": direction === "vertical",
        },
        className,
      )}
      onChange={onChange}
    >
      {list.map((item, index) => (
        <RadioGroupItem
          key={item.value ? `${item.value.toString()}-${index}` : index}
          id={`radio-${name}-${typeof item.label === "string" ? item.label : ""}-${index}`}
          checked={checkedValue === item.value}
          item={item}
          name={name}
          value={typeof item.value === "boolean" ? item.value.toString() : item.value}
          onChange={e => handleChange(e, item.value)}
          {...props}
        />
      ))}
    </div>
  );
};

export { Radio, RadioGroup };
