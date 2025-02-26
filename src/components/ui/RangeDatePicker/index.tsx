"use client";

import { FC, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange, OnSelectHandler } from "react-day-picker";
import { Button, Calendar } from "@/components/ui";
import { cn } from "@/utils/styles";
import { Props as ButtonProps } from "../Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared/Popover";

interface Props {
  dateRange?: DateRange;
  placeholder?: string;
  size?: ButtonProps["size"];
  formatPattern?: string;
  className?: string;
  onRangeSelect?: (range: DateRange) => void;
}

const RangeDatePicker: FC<Props> = ({
  dateRange,
  placeholder,
  className,
  formatPattern = "yyyy-MM-dd",
  size,
  onRangeSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(dateRange);

  const handleSelect: OnSelectHandler<DateRange> = (selected, triggerDate) => {
    setDate(range => {
      if (!range?.from || range.to || triggerDate.getTime() < range.from.getTime()) {
        return { from: triggerDate, to: undefined };
      }

      if (selected.from?.getTime() === triggerDate.getTime()) {
        return { from: triggerDate, to: triggerDate };
      }

      return selected as DateRange;
    });
  };

  const handleClose = () => {
    if (date && !date.to) {
      return;
    }

    setOpen(false);
  };

  const handleTriggerClick = (open: boolean) => {
    if (open) {
      setOpen(true);
      return;
    }

    handleClose();
  };

  const handleReset = () => {
    setDate(undefined);
  };

  const handleOkClick = () => {
    handleClose();
    date && onRangeSelect?.(date);
  };

  const renderInfoMessage = () => {
    if (!date) {
      return "시작일을 선택해주세요.";
    }

    if (!date.to) {
      return "종료일을 선택해주세요.";
    }

    return "";
  };

  return (
    <Popover open={open} onOpenChange={handleTriggerClick} modal>
      <PopoverTrigger asChild>
        <Button
          variant={"selectBox"}
          size={size}
          className={cn(
            "w-[240px] justify-start text-left font-normal hover:bg-transparent hover:text-main-gray space-x-2",
            !date && "text-muted-foreground",
            className,
          )}
          // onClick={handleTriggerClick}
        >
          <CalendarIcon className="h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                <span>{format(date.from, formatPattern)}</span>
                <span>-</span>
                <span>{format(date.to, formatPattern)}</span>
              </>
            ) : (
              <span>{format(date.from, formatPattern)}</span>
            )
          ) : (
            <span>{placeholder || "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onInteractOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <Calendar
          required
          mode="range"
          captionLayout="dropdown"
          startMonth={new Date(2019, 8)}
          endMonth={new Date(2026, 5)}
          selected={date}
          month={date?.from}
          numberOfMonths={2}
          onSelect={handleSelect}
          showOutsideDays={false}
        />
        <div className="flex items-center justify-between px-3 pb-3">
          <span className="text-xs mx-1">{renderInfoMessage()}</span>
          <div className="space-x-2">
            <Button variant="muted" size="xs" onClick={handleReset}>
              초기화
            </Button>
            <Button variant="info" size="xs" disabled={date && !date.to} onClick={handleOkClick}>
              확인
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RangeDatePicker;
