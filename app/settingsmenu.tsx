"use client";
import React from "react";
import { Settings, CircleUserRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

const SettingsMenu = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="dark:bg-zinc-800 hover:dark:bg-zinc-700">
          <Settings className="scale-[140%]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min mx-3 grid dark:bg-zinc-800">
        <div className="flex items-center space-x-2">
          <CircleUserRound className="h-4 w-4" />
          <p>Account</p>
        </div>
        <div className="flex items-center space-x-2 dark:bg-zinc-800">
          <Switch
            checked={isDark}
            onCheckedChange={(checked) =>
              setTheme(checked ? "dark" : "light")
            }
          />
          <p>Theme</p>
        </div>
        <div className="flex space-x-2 space-y-2 items-center"><LogOut /><p>Logout</p></div>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsMenu;
