"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { SearchCoins, Coin } from "@/lib/schemas";
import { getCoins } from "@/lib/fetchers";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchTrigger from "./searchtrigger";
import { Search, LoaderCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const { data, isFetching, refetch } = useQuery<SearchCoins>({
    queryKey: ["coins", debouncedValue],
    queryFn: () => getCoins(debouncedValue),
    enabled: false,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue.trim()) {
      refetch();
    }
  }, [debouncedValue, refetch]);

  useEffect(() => console.log(data), [data]);
  return (
    <Dialog>
      <DialogTrigger>
        <SearchTrigger />
      </DialogTrigger>
        <DialogContent className="dark:bg-zinc-800">
        <DialogHeader className="flex">
          <DialogTitle className="flex items-center">
            <Search className="absolute pl-2 text-gray-300" />
            <input
              placeholder="Search coin"
              className="pl-8 border-none outline-none focus:ring-0 focus:outline-none font-sans text-sm font-light placeholder:text-gray-300 light:text-gray-500 dark:bg-transparent"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isFetching ? (
                <LoaderCircle className="w-5 h-5 animate-spin text-gray-400" />
              ) : null}
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <h3 className="font-sans font-bold">Coins</h3>
          <Separator className="my-2"/>
          <div className="grid space-y-1 mt-2 max-h-[80vh]">
            {data?.coins.map((coin: Coin) => (
              <div
                key={coin.id}
                className="flex space-x-3 items-center hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-sm py-2"
              >
                <Image
                  src={coin.thumb}
                  alt={coin.name}
                  width={15}
                  height={15}
                  className="ml-8"
                />
                <div className="flex space-x-1 font-sans">
                  <div className="font-semibold text-xs">{coin.name}</div>
                  <div className="italic text-xs">{coin.symbol}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchInput;
