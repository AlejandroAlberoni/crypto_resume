import { CoinMarketData } from "@/lib/schemas";
import { inter } from "@/lib/fonts";

export default function MarketInfo({
    data,
    vs_currency,
    days,
    title,
  }: {
    data: CoinMarketData;
    vs_currency: string;
    days: number;
    title: string;
  }) {
    const actual_price_value = data?.prices[data.prices.length - 1]?.[1].toFixed(4);
    const actual_market_cap = data?.market_caps[data.market_caps.length - 1]?.[1];
    const initial_price = data?.prices[0][1];
    const final_price = data?.prices[data.prices.length - 1][1];
    let time_variation_prices = ((final_price - initial_price)*100) / initial_price
    return (
      <div className="flex flex-wrap justify-center space-x-4">
        <MarketInfoLayout
          title={`${getTimeRepresentation(days)} Change`}
          content={
            <span
              className={`${inter.className} font-medium text-lg text-gray-300`}
            >
              {(final_price - initial_price) > 0 ? `+` : `-`}{time_variation_prices.toFixed(2)}%
            </span>
          }
        ></MarketInfoLayout>
        <MarketInfoLayout
          title="Price"
          content={
            <span
              className={`${inter.className} font-medium text-lg dark:text-gray-300`}
            >
              {vs_currency.toUpperCase()} {actual_price_value}
            </span>
          }
        />
        <MarketInfoLayout
          title="Market Cap"
          content={
            <span
              className={`${inter.className} font-medium text-lg dark:text-gray-300`}
            >
              {vs_currency.toUpperCase()} {formatNumber(actual_market_cap)}
            </span>
          }
        />
      </div>
    );
  }
  
  function MarketInfoLayout({
    title,
    content,
  }: {
    title: string;
    content: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col items-start">
        <div className="flex justify-start items-start px-20 py-5 rounded-lg bg-gray-200 dark:border-[1px] dark:border-gray-400 dark:bg-transparent">
          <div className="space-y-3">
            <h3
              className={`font-sans text-gray-400 dark:text-gray-400`}
            >
              {title}
            </h3>
            {content}
          </div>
        </div>
      </div>
    );
  }
  
  function getTimeRepresentation(days: number) {
    switch (days) {
      case 1:
        return "24h";
      case 7:
        return "7d";
      case 30:
        return "1m";
      case 90:
        return "3m";
      case 365:
        return "1y";
    }
  }
  
  function formatNumber(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'B';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'K';
    } else {
      return value.toString();
    }
  }