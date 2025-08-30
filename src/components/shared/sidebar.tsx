"use client";

import Image from "next/image";
import Link from "next/link";
import { navLinks } from "../constants/data";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[90px] h-screen bg-sidebar-bg pt-6 pb-[34px] flex flex-col gap-10 items-center shrink-0">
      {/* Ellipsis */}
      <div className="cursor-pointer">
        <Image src={"/icons/ovals.svg"} alt="ellipses" width={34} height={6} />
      </div>
      {/* Logo */}
      <Link href={"/"}>
        <Image src={"/images/logo.svg"} alt="logo" width={24} height={26} />
      </Link>

      {/* Nav Links */}
      {navLinks.map((navItem) => {
        const isActive = pathname === navItem.path;
        return (
          <Tooltip key={navItem.id}>
            <TooltipTrigger asChild>
              <Link
                href={navItem.path}
                className={`rounded-full transition-all duration-200 ${
                  isActive ? "bg-white/10 p-3" : ""
                }`}
              >
                <Image
                  src={navItem.icon}
                  alt={`${navItem.name} icon`}
                  width={22}
                  height={22}
                  className={`transition-colors duration-200 ${
                    isActive ? "brightness-0 invert" : "opacity-50"
                  }`}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-sm">
              {navItem.name}
            </TooltipContent>
          </Tooltip>
        );
      })}

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mt-auto cursor-pointer p-3 rounded-full transition-all duration-200 hover:bg-white/5">
            <Image
              src={"/icons/logout.svg"}
              alt="Logout Icon"
              width={22}
              height={22}
              className="opacity-50 transition-colors duration-200 hover:opacity-75"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-sm">
          Log Out
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
