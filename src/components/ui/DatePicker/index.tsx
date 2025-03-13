"use client";

import { FC, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { OnSelectHandler } from "react-day-picker";
import { Button, Calendar } from "@/components/ui";
import { useError } from "@/hooks";
import { Validator } from "@/types/ui";
import { cn } from "@/utils/styles";
import { Props as ButtonProps } from "../Button";
import TimeSelector from "./TimeSelector";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared/Popover";
import Image from "next/image";
import CalendarImg from "public/images/icon_calendar.svg";

interface Props {
  className?: string;
  placeholder?: string;
  date?: Date;
  size?: ButtonProps["size"];
  dateFormatPattern?: string;
  timeFormatPattern?: string;
  showTime?: boolean;
  minuteStep?: number;
  error?: boolean;
  errorMessage?: string;
  validate?: (inputValue: string) => boolean;
  validator?: Validator;
  onDateSelect?: (date: Date) => void;
  width?: string;
}

const DatePicker: FC<Props> = ({
  placeholder,
  date,
  className,
  dateFormatPattern = "yyyy-MM-dd",
  timeFormatPattern = "HH:mm",
  size,
  minuteStep = 5,
  showTime = false,
  error,
  errorMessage,
  validate,
  validator,
  onDateSelect,
  width,
}) => {
  const { isError, validatorMessage, setIsError, validateValue } = useError({
    error,
    value: date?.toISOString(),
    validate,
    validator,
  });
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  const handleDateSelect: OnSelectHandler<Date> = (selected: Date) => {
    onDateSelect?.(selected);

    if (isError && validate) {
      const isValid = validateValue(selected.toISOString());
      setIsError(!isValid);
    }

    if (
      selectedDate?.getFullYear() === selected.getFullYear() &&
      selectedDate?.getMonth() === selected.getMonth() &&
      selectedDate?.getDate() === selected.getDate()
    ) {
      setOpen(false);
      return;
    }

    const newDate = selectedDate ? new Date(selectedDate) : new Date();

    if (!selectedDate) {
      newDate.setHours(0, 0, 0, 0);
    }

    newDate.setFullYear(selected.getFullYear());
    newDate.setMonth(selected.getMonth());
    newDate.setDate(selected.getDate());

    setSelectedDate(newDate);
  };

  const handleTimeSelect = (time: Date) => {
    const newDate = selectedDate ? new Date(selectedDate) : new Date();

    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate.setSeconds(time.getSeconds());

    setSelectedDate(newDate);
    onDateSelect?.(newDate);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <div className={`relative ${width ? width : ""}`}>
          <Button
            variant={"selectBox"}
            size={size}
            className={cn(
              "relative min-w-44 justify-start text-left font-normal hover:bg-transparent hover:text-main-gray border-pub-grayC focus:border-pub-red text-[1.25rem]",
              {
                "border-error focus:border-error": isError,
                "text-muted-foreground": !selectedDate,
              },
              className,
            )}
            onClick={() => setOpen(!open)}
          >
            {selectedDate ? (
              format(
                selectedDate,
                showTime ? `${dateFormatPattern} ${timeFormatPattern}` : dateFormatPattern,
              )
            ) : (
              <span className="text-[1.25rem] text-pub-grayA">{placeholder || "Pick a date"}</span>
            )}
            {/* <CalendarIcon className="shrink-0 mr-2 h-4 w-4" /> */}
            <Image
              src={CalendarImg}
              width={24}
              height={24}
              style={{ width: "1.5rem", height: "1.5rem" }}
              alt="calendar icon"
            />
          </Button>
          {isError && (validatorMessage || errorMessage) && (
            <span className="w-max absolute top-full left-0 translate-y-0.5 text-error text-2xs leading-none">
              {validatorMessage || errorMessage}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-auto p-0", {
          flex: showTime,
        })}
        align="start"
      >
        <Calendar
          required
          mode="single"
          selected={selectedDate}
          month={selectedDate}
          onSelect={handleDateSelect}
        />
        {showTime && (
          <>
            <div className="border-l" />
            <div className="flex flex-col h-full justify-between gap-3 p-3">
              <div className="h-7 text-[1.25rem] flex items-center justify-center gap-5">
                <span>{selectedDate?.getHours() ?? 0}시</span>
                <span>{selectedDate?.getMinutes() ?? 0}분</span>
              </div>
              <TimeSelector
                className="h-36"
                time={selectedDate}
                minuteStep={minuteStep}
                onTimeSelect={handleTimeSelect}
              />
              <div className="w-full flex justify-end">
                <Button variant="info" size="xs" onClick={() => setOpen(false)}>
                  확인
                </Button>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
