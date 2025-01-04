import React from "react";
import Image from "next/image";
import { montserrat } from "@/lib/fonts";
import { Badge } from "@/components/ui/badge";
import { CoinDataById } from "@/lib/schemas";

const Hero = ({ data }: { data: CoinDataById }) => {
  return (
    <span className="flex items-center md:justify-start space-x-2">
      <Image
        src={data.image.large}
        width={40}
        height={40}
        alt="cryptocurrency logo image"
        className="rounded-full"
      />
      <h1 className={`${montserrat.className} font-extrabold text-2xl`}>
        {data.name}
      </h1>
      <p className="italic font-sans font-light place-self-end text-xs">
        {data.symbol.toUpperCase()}
      </p>
      <span>
        <Badge className={`font-sans bg-zinc-300`}>
          #{data.market_cap_rank}
        </Badge>
      </span>
    </span>
  );
};

export default Hero;
