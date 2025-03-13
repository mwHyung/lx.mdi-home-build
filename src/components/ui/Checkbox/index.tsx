"use client";

import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import { cn } from "@/utils/styles";
import { Item } from "@/types/ui";
import Label from "../Label";

const checkboxVariants = cva(
  "relative peer h-4 w-4 shrink-0 bg-main-white rounded-sm border data-[disabled=true]:opacity-50 border-primary",
  {
    variants: {
      variant: {
        default:
          "border-main-black data-[state=checked]:bg-main-black data-[state=checked]:text-snow-white",
        primary:
          "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        info: "border-main-gray/40 text-main-gray data-[state=checked]:bg-info data-[state=checked]:border-info data-[state=checked]:text-info-foreground",

        defaultP:
          "w-8 h-8 rounded-none border border-pub-grayC text-pub-grayC data-[state=checked]:border-pub-redD data-[state=checked]:text-pub-red",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "checked">,
    VariantProps<typeof checkboxVariants> {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean, name?: CheckboxProps["name"]) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  variant,
  checked,
  disabled,
  onCheckedChange,
  onChange,
  ...props
}) => {
  const [checkedValue, setCheckedValue] = useState(checked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked, e.target.name);
    onChange?.(e);
  };

  useEffect(() => {
    setCheckedValue(checked);
  }, [checked]);

  return (
    <div
      className={cn(checkboxVariants({ variant }))}
      data-state={checkedValue ? "checked" : "unchecked"}
      data-disabled={disabled}
    >
      <input
        type="checkbox"
        className="w-full h-full appearance-none absolute top-0 left-0 cursor-pointer disabled:cursor-default focus-outline focus-visible:outline-offset-[3px] rounded-[3px]"
        checked={checkedValue ? true : false}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
      {checkedValue === "indeterminate" && <Minus width={"100%"} height={"100%"} />}
      <Check width={"100%"} height={"100%"} />
      {/* {checkedValue === true && <Check width={"100%"} height={"100%"} />} */}
    </div>
  );
};

interface GroupProps extends Pick<CheckboxProps, "variant"> {
  list: Item[];
  checkedList?: Item["value"][];
  direction?: "horizontal" | "vertical";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange?: (values: Item["value"][]) => void;
}

const CheckboxGroup: FC<GroupProps> = ({
  variant,
  list,
  checkedList,
  direction = "horizontal",
  onChange,
  onCheckedChange,
}) => {
  const [checkedValues, setCheckedValues] = useState<Item["value"][]>(checkedList || []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    const { value, checked } = e.target; // string value
    const originValue = list.find(item => item.value.toString() === value)?.value;
    if (originValue === undefined) return;

    const updatedValues = checked
      ? [...checkedValues, originValue]
      : checkedValues.filter(item => item !== originValue);

    setCheckedValues(updatedValues);
    onCheckedChange?.(updatedValues);
  };

  return (
    <div
      className={cn("flex items-center flex-wrap", {
        "flex-row gap-10": direction === "horizontal",
        "flex-col gap-2": direction === "vertical",
      })}
      onChange={handleChange}
    >
      {list.map((item, index) => (
        <Label
          key={item.value.toString()}
          className="flex items-center gap-3 text-pub-grayA text-[1.25rem] font-bold"
        >
          <Checkbox
            id={`checkbox-${item.value}-${index}`}
            variant={variant}
            name={typeof item.label === "string" ? item.label : item.value.toString()}
            checked={checkedValues.includes(item.value)}
            value={item.value.toString()}
          />
          <span
            className={`select-none ${checkedValues.find(e => e === item.value) && "text-pub-red"}`}
          >
            {item.label}
          </span>
        </Label>
      ))}
    </div>
  );
};

export { Checkbox, CheckboxGroup };
