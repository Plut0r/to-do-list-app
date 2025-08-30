import { Ellipsis, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { BoardIcon } from "../icons/board";

export const TaskToolbar = () => {
  return (
    <div className="flex items-center justify-between border-b-2 border-b-sidebar-bg/8 dark:border-b-white/10">
      <div className="flex items-center gap-3.5">
        <button className="text-sidebar-bg dark:text-white font-semibold flex items-center gap-2 cursor-pointer px-3.5 pb-[18px] border-b-2 border-b-sidebar-bg dark:border-b-white">
          <BoardIcon />
          <p>Board view</p>
        </button>
        <button className="text-sidebar-bg/50 dark:text-white/50 font-semibold flex items-center gap-2 cursor-pointer px-3.5 pb-[18px]">
          <div className="w-[18px] h-[18px] rounded-full bg-sidebar-bg/8 dark:bg-white/8 flex items-center justify-center">
            <Plus size={12} className="text-sidebar-bg/40 dark:text-white/40" />
          </div>
          <p>Add view</p>
        </button>
      </div>

      <div className="flex items-center">
        <Button
          variant={"ghost"}
          className="text-sidebar-bg dark:text-white font-semibold px-2 py-2"
        >
          Filter
        </Button>
        <Button
          variant={"ghost"}
          className="text-sidebar-bg/50 dark:text-white/50 font-semibold w-fit px-2 py-2"
        >
          Sort
        </Button>
        <Button className="ml-2 w-[26px] h-[26px] rounded-full border-2 border-sidebar-bg/10 dark:border-white/10 bg-transparent text-sidebar-bg dark:text-white hover:bg-sidebar-bg dark:hover:bg-white hover:text-white dark:hover:text-black">
          <Ellipsis />
        </Button>
        <Button className="ml-4 bg-sidebar-bg dark:bg-[#4B69FF] w-[140px] h-[38px] rounded-[19px] text-white text-sm font-semibold">
          New template
        </Button>
      </div>
    </div>
  );
};
