"use client";

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  forwardRef,
} from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/styles";
import { Tab as TabType, DynamicTab as DynamicTabType } from "@/types/ui";
import { DynamicComponent } from "@/components/shared";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-main-gray border",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "w-full h-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

interface TabPanelProps extends ComponentProps<typeof Tabs> {
  tabs: TabType[];
  defaultTab: TabType | null;
  gap?: 1 | 2 | 3 | 4;
}

const gapStyle = {
  1: "mb-1",
  2: "mb-2",
  3: "mb-3",
  4: "mb-4",
};

const TabPanel: FC<TabPanelProps> = ({ tabs, defaultTab, gap = 2, ...props }) => {
  return (
    <Tabs
      defaultValue={defaultTab ? (defaultTab?.value || "").toString() : undefined}
      className="h-full flex flex-col items-start"
      {...props}
    >
      <TabsList className={gapStyle[gap]}>
        {tabs.length > 0 &&
          tabs.map(tab => (
            <TabsTrigger key={(tab?.value || "").toString()} value={(tab?.value || "").toString()}>
              {tab.label}
            </TabsTrigger>
          ))}
      </TabsList>
      {tabs.length > 0 &&
        tabs.map(tab => (
          <TabsContent key={(tab?.value || "").toString()} value={(tab?.value || "").toString()}>
            {tab.content}
          </TabsContent>
        ))}
    </Tabs>
  );
};

interface DynamicTabPanelProps extends ComponentProps<typeof Tabs> {
  tabs: DynamicTabType[];
  defaultTab: DynamicTabType | null;
  gap?: 1 | 2 | 3 | 4;
}

const DynamicTabPanel: FC<DynamicTabPanelProps> = ({ tabs, defaultTab, gap = 2, ...props }) => {
  return (
    <Tabs
      defaultValue={defaultTab ? (defaultTab?.label || "").toString() : undefined}
      className="h-full flex flex-col items-start"
      {...props}
    >
      <TabsList className={gapStyle[gap]}>
        {tabs.length > 0 &&
          tabs.map(tab => (
            <TabsTrigger key={(tab?.path || "").toString()} value={(tab?.label || "").toString()}>
              {tab.label}
            </TabsTrigger>
          ))}
      </TabsList>
      {tabs.length > 0 &&
        tabs.map(tab => (
          <TabsContent key={(tab?.path || "").toString()} value={(tab?.label || "").toString()}>
            <DynamicComponent path={tab.path} />
          </TabsContent>
        ))}
    </Tabs>
  );
};

export { TabPanel, DynamicTabPanel };
