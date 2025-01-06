"use client";
import React from "react";
import { Settings, CircleUserRound, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { montserrat } from "@/lib/fonts";
import { redirect } from "next/navigation";

const SettingsMenu = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="dark:bg-zinc-800 hover:dark:bg-zinc-700"
        >
          <Settings className="scale-[140%]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min p-2 grid dark:bg-zinc-800 rounded-md">
        <OptionItem option="Account" action={() => redirect("/account")}>
          <CircleUserRound className="h-5 w-5" />
        </OptionItem>
        <OptionItem
          option="Theme"
          action={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </OptionItem>
        <OptionItem option="Logout" action={() => redirect("/logout")}>
          <LogOut className="h-5 w-5" />
        </OptionItem>
      </PopoverContent>
    </Popover>
  );
};

function OptionItem({
  action,
  option,
  children,
}: {
  action?: () => void;
  option: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className="grid grid-cols-[auto_1fr] items-center gap-2 p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition duration-150"
      onClick={() => action && action()}
    >
      {children}
      <h3 className={`${montserrat.className}`}>{option}</h3>
    </button>
  );
}

export default SettingsMenu;
