"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import Button from "../Button";
import { cn } from "@/utils/styles";

interface Props {
  className?: string;
  time?: Date;
  minuteStep: number;
  onTimeSelect?: (time: Date) => void;
}

const TimeSelector: FC<Props> = ({ time, minuteStep, className, onTimeSelect }) => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const [currTime, setCurrTime] = useState<Date>(() => {
    if (time) {
      return time;
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const hourList = useMemo(() => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  }, []);

  const minuteList = useMemo(() => {
    const minutes = [];
    for (let i = 0; i < 60; i += minuteStep) {
      minutes.push(i);
    }
    return minutes;
  }, []);

  const handleTimeSelect = ({
    hour,
    minute,
    secound,
  }: {
    hour?: number;
    minute?: number;
    secound?: number;
  }) => {
    const newTime = new Date(currTime);

    if (hour !== undefined) newTime.setHours(hour);
    if (minute !== undefined) newTime.setMinutes(minute);
    if (secound !== undefined) newTime.setSeconds(secound);

    onTimeSelect?.(newTime);
    setCurrTime(newTime);
  };

  useEffect(() => {
    if (!hourRef.current || !minuteRef.current) return;

    const hourItemHeight = hourRef.current.children[0].clientHeight;
    const minuteItemHeight = minuteRef.current.children[0].clientHeight;
    const hourScrollTop = hourItemHeight * currTime.getHours();
    const minuteScrollTop = minuteItemHeight * Math.floor(currTime.getMinutes() / minuteStep);

    hourRef.current.scrollTop = hourScrollTop;
    minuteRef.current.scrollTop = minuteScrollTop;
  }, [hourRef, minuteRef]);

  return (
    <div className={cn("grow min-h-0 flex space-x-1", className)}>
      <div ref={hourRef} className="h-full grid overflow-y-scroll">
        {hourList.map(hour => (
          <Button
            key={hour}
            className={cn("text-center content-center", {
              "bg-info text-white hover:bg-info hover:text-white": hour === currTime.getHours(),
            })}
            size="md"
            variant="text"
            onClick={() => handleTimeSelect({ hour })}
          >
            {hour < 10 ? `0${hour}` : hour}
          </Button>
        ))}
      </div>
      <div ref={minuteRef} className="h-full grid overflow-y-scroll">
        {minuteList.map(minute => (
          <Button
            key={minute}
            className={cn("text-center content-center", {
              "bg-info text-white hover:bg-info hover:text-white": minute === currTime.getMinutes(),
            })}
            size="md"
            variant="text"
            onClick={() => handleTimeSelect({ minute })}
          >
            {minute < 10 ? `0${minute}` : minute}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
