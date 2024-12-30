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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { poppins } from "@/fonts";

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
          <DialogTitle className="relative flex items-center">
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
        <ScrollArea className="dark:decoration-white dark:text-white">
          {data?.coins != undefined ? (
            <div>
              <h3 className="font-sans font-bold">Coins</h3>
              <Separator className="my-2" />
            </div>
          ) : (
            <div className="text-center font-bold font-mono my-10">
              No coin was found.
            </div>
          )}
          <div className="grid space-y-1 mt-2 max-h-[80vh]">

            {isFetching &&
              [...Array(7)].map((_, index) => <ResultsSkeleton key={index} />)}

            {data?.coins.map((coin: Coin) => (
              <button
                key={coin.id}
                className="flex space-x-3 items-center hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-sm py-2 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <Image
                  src={coin.thumb}
                  alt={coin.name}
                  width={15}
                  height={15}
                  className="ml-8"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex space-x-1 font-sans">
                    <div className="font-semibold text-xs">{coin.name}</div>
                    <div className="italic text-xs">{coin.symbol}</div>
                  </div>
                  <div className="ml-auto pr-10">
                    <Badge className="bg-zinc-300 group-hover:bg-zinc-500 dark:bg-zinc-600 dark:group-hover:bg-zinc-500 dark:text-white font-sans">
                      Rank:{" "}
                      <p className={`${poppins.className} pl-2`}>
                        {coin?.market_cap_rank ? coin.market_cap_rank : "-"}
                      </p>
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchInput;

function ResultsSkeleton() {
  return (
    <div className="flex space-x-2 items-center rounded py-1 border border-zinc-600">
      <Skeleton className="ml-2 rounded-full h-6 w-6 bg-zinc-300" />
      <Skeleton className="rounded-lg w-20 h-5 bg-zinc-300" />
      <Skeleton className="float-end rounded-lg w-10 h-5 bg-zinc-300" />
      <Skeleton className="absolute right-10 rounded-lg w-16 h-5 bg-zinc-300" />
    </div>
  );
}
