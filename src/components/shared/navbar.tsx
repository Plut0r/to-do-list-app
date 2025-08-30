import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "../icons/search";
import { BellIcon } from "../icons/bell";

interface NavbarProps {
  userName?: string;
  currentDate?: string;
  onSearch?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
}

export const Navbar = ({
  userName = "Vincent",
  currentDate = "19 May 2022",
  onSearch,
  onNotifications,
  onProfile,
}: NavbarProps) => {
  return (
    <nav className="container h-[94px] flex items-center justify-between shrink-0">
      <h1 className="text-[20px] text-sidebar-bg dark:text-white font-bold">
        Welcome back, {userName} 👋
      </h1>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSearch}
          className="cursor-pointer [&_svg:not([class*='size-'])]:size-[22px]"
          aria-label="Search"
        >
          <SearchIcon />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNotifications}
          className="cursor-pointer relative [&_svg:not([class*='size-'])]:size-[22px]"
          aria-label="Notifications"
        >
          <BellIcon />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-orange-400 top-2 right-[10px]"
            aria-label="New notification"
          />
        </Button>

        <div className="flex items-center gap-2">
          <Calendar size={22} className="text-sidebar-bg dark:text-white/50" />
          <time className="text-sidebar-bg/50 dark:text-white/50 font-semibold">
            {currentDate}
          </time>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onProfile}
          className="cursor-pointer"
          aria-label="User profile"
        >
          <Avatar className="size-10">
            <AvatarImage
              src="/images/profile-pic.png"
              alt={`${userName}'s profile picture`}
            />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </nav>
  );
};
