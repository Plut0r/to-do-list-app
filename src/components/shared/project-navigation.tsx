"use client";

import { ChevronRight, Moon, Plus, SunMedium } from "lucide-react";
import { Button } from "../ui/button";
import { homeQuickLinks } from "../constants/data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/theme-manager";

export const ProjectNavigation = () => {
  const pathname = usePathname();
  const [openTabs, setOpenTabs] = useState<number[]>([]);
  const isHomePage = pathname === "/";

  const isTabOpen = (tabId: number) => openTabs.includes(tabId);

  const { theme, updateTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true);
    } else if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    } else {
      setIsDark(false);
    }
  }, [theme]);

  const toggleTab = (tabId: number) => {
    setOpenTabs((prev) =>
      prev.includes(tabId)
        ? prev.filter((id) => id !== tabId)
        : [...prev, tabId]
    );
  };

  return (
    <div
      className={`w-[318px] h-screen bg-white dark:bg-dark-bg pt-8 px-6 pb-6 flex flex-col transition-all duration-300 ease-in-out shrink-0`}
      style={{
        filter: "drop-shadow(40px 180px 80px rgba(28, 29, 34, 0.06))",
      }}
    >
      <div className="flex items-center justify-between shrink-0">
        <p className="text-sidebar-bg dark:text-white text-[30px] font-bold">
          Projects
        </p>
        <Button className="w-7 h-7 rounded-full bg-sidebar-bg/8 dark:bg-white/8 hover:bg-sidebar-bg dark:hover:bg-white text-sidebar-bg/40 dark:text-white/40 hover:text-white dark:hover:text-black [&_svg:not([class*='size-'])]:size-5">
          <Plus size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden my-8">
        <div className="flex flex-col gap-7">
          {homeQuickLinks.map((item) => (
            <Collapsible
              key={item.id}
              open={isTabOpen(item.id)}
              onOpenChange={() => toggleTab(item.id)}
              className="w-full"
            >
              <div className="flex items-center justify-between">
                <p
                  className={`${
                    isTabOpen(item.id)
                      ? "text-sidebar-bg dark:text-white"
                      : "text-sidebar-bg/50 dark:text-white/50"
                  } font-bold`}
                >
                  {item.name}
                </p>
                <CollapsibleTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="size-[18px] transition-transform duration-200"
                    disabled={!isHomePage}
                  >
                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-200 ${
                        isTabOpen(item.id)
                          ? "text-sidebar-bg dark:text-white rotate-90"
                          : "text-sidebar-bg/50 dark:text-white/50"
                      }`}
                    />
                    <span className="sr-only">Toggle {item.name}</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-4 flex flex-col gap-0">
                {/* Timeline container with continuous left border */}
                <div className="relative border-l-2 border-l-sidebar-bg/10 dark:border-l-white/10">
                  {/* "All [Category]" item */}
                  <div className="relative pl-6">
                    {/* connector */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-sidebar-bg/10 dark:bg-white/10"></span>
                    <div className="py-2.5 px-4 bg-white dark:bg-dark-bg w-fit hover:bg-sidebar-bg/4 dark:hover:bg-white/4 rounded-[18px] transition-colors duration-200 cursor-pointer">
                      <p className="text-sidebar-bg/50 dark:text-white/50 font-semibold">
                        All {item.name.toLowerCase()} ({item.data.length})
                      </p>
                    </div>
                  </div>

                  {/* Individual items */}
                  {item.data.map((dataItem, index) => (
                    <div key={index} className="relative pl-6">
                      {/* connector */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-sidebar-bg/10 dark:bg-white/10"></span>

                      <div className="py-2.5 px-4 bg-white dark:bg-dark-bg w-fit hover:bg-sidebar-bg/4 dark:hover:bg-white/4 rounded-[18px] transition-colors duration-200 cursor-pointer">
                        <p className="text-sidebar-bg/50 dark:text-white/50 font-semibold">
                          {dataItem}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      <div className="shrink-0 w-full h-[42px] rounded-[22px] bg-sidebar-bg/4 dark:bg-white/4 p-1 grid grid-cols-2">
        <div
          onClick={() => updateTheme("light")}
          className={`${
            isDark ? "bg-transparent text-white/50" : "bg-white text-sidebar-bg"
          } rounded-[18px] w-full h-full cursor-pointer flex items-center justify-center gap-[6px]`}
        >
          <SunMedium size={20} />
          <p className="text-sm font-semibold">Light</p>
        </div>
        <div
          onClick={() => updateTheme("dark")}
          className={`${
            isDark
              ? "bg-white/6 text-white shadow-[0_8px_6px_0_rgba(28,_29,_34,_0.16)]"
              : "bg-transparent text-sidebar-bg/50"
          } rounded-[18px] w-full h-full cursor-pointer flex items-center justify-center gap-[6px]`}
        >
          <Moon size={20} />
          <p className="text-sm font-semibold">Dark</p>
        </div>
      </div>
    </div>
  );
};
