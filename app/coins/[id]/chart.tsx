"use client";
import React from "react";
import { LoaderCircle } from "lucide-react";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { CoinMarketData } from "@/lib/schemas";
import { getCoinMarketDataById } from "@/lib/fetchers";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Curve,
} from "recharts";
import { montserrat, inter } from "@/lib/fonts";

function Chart({
  coinId,
  vs_currency,
  days,
}: {
  coinId: string;
  vs_currency: string;
  days: number;
}) {
  const { data, isFetching } = useQuery<CoinMarketData>({
    queryKey: ["coinMarketData"],
    queryFn: () => getCoinMarketDataById(coinId, vs_currency, days),
    // enabled: false,
  });
  const chartConfig = {
    value: {
      label: `${vs_currency.toLocaleUpperCase()}:`,
      color: "text-blue-500",
    },
  };

  const dataFormat = data?.prices.map((price) => {
    const date = new Date(price[0] * 1000);
    const formattedDate = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });
    return {
      date: formattedDate,
      value: price[1],
    };
  });
  const prices = data?.prices.map((price) => price[1]);
  const maxPrice = Math.max(...(prices || []));
  const minPrice = Math.min(...(prices || []));

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-2xl text-center font-sans font-bold">
        No data available
      </div>
    );
  }

  return (
    <div className="">
      <ChartContainer config={chartConfig} className={`max-w-full p-4`}>
        <LineChart data={dataFormat}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" />
          <YAxis
            orientation={`right`}
            domain={[minPrice * 0.99, maxPrice * 1.01]}
            tickFormatter={(value) =>
              `${value.toFixed(2)} ${vs_currency.toUpperCase()}`
            }
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideIndicator={true}
                className="font-sans font-bold"
              />
            }
          />
          <Line dataKey="value" dot={false} strokeWidth={2} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default Chart;

