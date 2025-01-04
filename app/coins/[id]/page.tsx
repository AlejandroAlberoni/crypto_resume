import { CoinDataById } from "@/lib/schemas";
import Hero from "./heroinfo";
import About from "./about";
import { getCoinDataById } from "@/lib/fetchers";

interface CoinPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CoinPage = async ({ params }: CoinPageProps) => {
  const { id: coinId } = await params;

  try {
    const data: CoinDataById | null = await getCoinDataById(coinId);

    if (!data) {
      return (
        <div className="text-center text-2xl font-sans">Coin not found</div>
      );
    }

    return (
      <div className="">
        <div className="p-10">
          <Hero data={data} />
        </div>
        <About data={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return (
      <div className="text-center text-2xl font-sans pt-10">
        Error loading coin
      </div>
    );
  }
};

export default CoinPage;
