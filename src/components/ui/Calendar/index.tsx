"use client";

import { Component, ComponentProps, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { DayPicker, CustomComponents, DateRange } from "react-day-picker";

import { cn } from "@/utils/styles";
import Button, { buttonVariants } from "@/components/ui/Button";
import { format, min } from "date-fns";

type MonthNavProps = Parameters<CustomComponents["Nav"]>[0] & {
  mode: ComponentProps<typeof DayPicker>["mode"];
  startMonth?: ComponentProps<typeof DayPicker>["startMonth"];
  endMonth?: ComponentProps<typeof DayPicker>["endMonth"];
  numberOfMonths?: ComponentProps<typeof DayPicker>["numberOfMonths"];
  monthList: Date[];
  currMonth: Date;
  onMonthChange: (date: Date) => void;
};

const MonthNav = ({
  mode,
  startMonth: inputStartMonth,
  endMonth: inputEndMonth,
  numberOfMonths,
  currMonth,
  monthList,
  className,
  onMonthChange,
  children,
}: MonthNavProps) => {
  const startMonth = useMemo(() => inputStartMonth || monthList[0], [monthList]);
  const endMonth = useMemo(() => {
    const diffMonth = (numberOfMonths || 1) - 1;
    const endIndex = monthList.length - 1 - diffMonth;

    return inputEndMonth
      ? new Date(inputEndMonth.getFullYear(), inputEndMonth.getMonth() - diffMonth)
      : monthList[endIndex] || monthList[monthList.length - 1];
  }, [monthList]);

  const handleMonthNavClick = (type: "prev" | "next") => {
    const addMonth = type === "next" ? 1 : -1;

    if (mode === "single") {
      if (type === "prev" && startMonth.getTime() === currMonth.getTime()) return;
      if (type === "next" && endMonth.getTime() === currMonth.getTime()) return;
    }

    if (mode === "range") {
      if (type === "prev" && startMonth.getTime() === currMonth.getTime()) return;
      if (type === "next" && endMonth.getTime() === currMonth.getTime()) return;
    }

    onMonthChange(new Date(currMonth.getFullYear(), currMonth.getMonth() + addMonth));
  };

  const handleYearNavClick = (type: "prev" | "next") => {
    const addYear = type === "next" ? 1 : -1;

    const nextYear = currMonth.getFullYear() + addYear;
    const nextMonth = currMonth.getMonth();
    const nextDate = new Date(nextYear, nextMonth);

    if (type === "prev" && nextDate.getTime() < startMonth.getTime()) {
      onMonthChange(startMonth);
      return;
    }

    if (type === "next" && nextDate.getTime() > endMonth.getTime()) {
      onMonthChange(endMonth);
      return;
    }

    onMonthChange(new Date(currMonth.getFullYear() + addYear, currMonth.getMonth()));
  };

  return (
    <div
      className={cn(className, "absolute top-0 left-0 w-full flex justify-between items-center")}
    >
      <div className="absolute left-1 top-0 space-x-1 ">
        {mode === "range" && (
          <Button
            variant="outline"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 "
            onClick={() => handleYearNavClick("prev")}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          onClick={() => handleMonthNavClick("prev")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      {children}
      <div className="absolute right-1 top-0 space-x-1">
        <Button
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          onClick={() => handleMonthNavClick("next")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        {mode === "range" && (
          <Button
            variant="outline"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            onClick={() => handleYearNavClick("next")}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

type MonthGridProps = Parameters<CustomComponents["MonthGrid"]>[0] & {
  monthList: Date[];
  selectedYear: boolean;
  currMonth: Date;
  onMonthChange: (date: Date) => void;
  onYearClose: () => void;
};

const MonthGrid = ({
  monthList,
  selectedYear,
  currMonth,
  onMonthChange,
  onYearClose,
}: MonthGridProps) => {
  const optionRef = useRef<HTMLDivElement>(null);

  const handleMonthChange = (date: Date) => {
    onMonthChange(date);
    onYearClose();
  };

  const isSameYearMonth = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
  };

  useEffect(() => {
    if (selectedYear && optionRef.current) {
      const targetIndex = monthList.findIndex(month => isSameYearMonth(month, currMonth));

      if (targetIndex === -1) return;

      // 한 줄에 3개씩 표시중...
      const itemIndex = Math.floor(targetIndex / 3);
      const itemHeight = optionRef.current.scrollHeight / Math.ceil(monthList.length / 3);

      // 선택 년/월을 중간에 위치시키기 위한 계산
      const clientMaxIndex = Math.ceil(optionRef.current.clientHeight / itemHeight);
      const clientCenterIndex = Math.floor(clientMaxIndex / 2);

      const scrollPosition = itemIndex * itemHeight - itemHeight * clientCenterIndex;
      optionRef.current.scrollTop = scrollPosition;
    }
  }, [selectedYear, optionRef]);

  return (
    <div
      ref={optionRef}
      className="grid grid-cols-3 w-[15.75rem] h-56 overflow-auto pointer-events-auto touch-auto"
    >
      {monthList.map(month => (
        <Button
          key={month.getTime()}
          className={cn("h-10 text-sm text-center content-center cursor-pointer", {
            "bg-info text-white hover:bg-info hover:text-white": isSameYearMonth(month, currMonth),
          })}
          variant="text"
          onClick={() => handleMonthChange(month)}
        >
          {month.getFullYear()}-
          {month.getMonth() + 1 < 10 ? `0${month.getMonth() + 1}` : month.getMonth() + 1}
        </Button>
      ))}
    </div>
  );
};

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  month,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const mode = props.mode;

  const [selectedYear, setSelectedYear] = useState(false);
  const [currMonth, setCurrMonth] = useState<Date>(
    month || new Date(new Date().getFullYear(), new Date().getMonth()),
  );

  const onMonthChange = (date: Date) => {
    setCurrMonth(date);
  };

  const monthList = useMemo(() => {
    const offsetYear = 3;
    const offsetMonth = 12;
    const offset = offsetYear * offsetMonth;

    const today = new Date();
    const startDate = props.startMonth || new Date(today.getFullYear(), today.getMonth() - offset);
    const endDate = props.endMonth || new Date(today.getFullYear(), today.getMonth() + offset);

    const months = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      months.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  }, []);

  return (
    <DayPicker
      mode={mode}
      showOutsideDays={showOutsideDays}
      month={currMonth}
      className={cn("text-sm p-3", className)}
      classNames={{
        // caption: "flex justify-center pt-1 relative items-center",
        // caption_label: cn(
        //   props.captionLayout?.startsWith("dropdown") ? "hidden" : "text-sm font-medium",
        // ),
        // nav: "space-x-1 flex items-center",
        // nav_button: cn(
        //   buttonVariants({ variant: "outline" }),
        //   "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        // ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-main-gray rounded-md w-9 text-xs",
        week: "flex w-full mt-1",
        day: "group h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 group-aria-selected:opacity-100 hover:bg-muted",
        ),
        selected:
          "*:font-normal bg-muted *:bg-info *:text-primary-foreground hover:*:bg-info hover:*:text-primary-foreground focus:*:bg-info focus:*:text-primary-foreground first:rounded-l-md last:rounded-r-md",
        today:
          "font-semibold relative *:after:content-[''] *:after:absolute *:after:left-1/2 *:after:bottom-0 *:after:-translate-x-1/2 *:after:w-3/4 *:after:h-0.5 *:after:bg-info/90",
        range_end: "rounded-r-md",
        outside:
          "day-outside text-primary opacity-50 group-aria-selected:bg-muted/50 group-aria-selected:text-primary group-aria-selected:opacity-30",
        disabled: "text-primary opacity-50",
        range_middle: "*:!bg-muted *:!text-primary",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Months: ({ className, ...props }) => (
          <div
            className={cn(
              className,
              "relative flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 sm:gap-y-0",
            )}
            {...props}
          />
        ),
        Nav: props => (
          <MonthNav
            mode={mode}
            currMonth={currMonth}
            monthList={monthList}
            onMonthChange={onMonthChange}
            {...props}
          />
        ),
        Month: ({ displayIndex, calendarMonth, className, ...props }) => (
          <div className={cn(className, "space-y-3")} {...props} />
        ),
        MonthCaption: ({ displayIndex, calendarMonth, className, ...props }) => {
          return (
            <div className={cn(className, "h-7 text-base flex items-center justify-center")}>
              <div className="space-x-1">
                <span>{format(calendarMonth.date, "yyyy MM")}</span>
                {mode === "single" && (
                  <Button
                    variant="text"
                    className="w-4 h-[1.2rem] p-0 rounded-sm"
                    onClick={() => setSelectedYear(prev => !prev)}
                  >
                    <ChevronDown
                      className={cn("w-full h-full", {
                        "rotate-180": selectedYear,
                      })}
                    />
                  </Button>
                )}
              </div>
            </div>
          );
        },
        MonthGrid: ({ className, ...props }) =>
          selectedYear ? (
            <MonthGrid
              className={className}
              currMonth={currMonth}
              selectedYear={selectedYear}
              monthList={monthList}
              onMonthChange={onMonthChange}
              onYearClose={() => setSelectedYear(false)}
              {...props}
            />
          ) : (
            <table {...props} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export default Calendar;
