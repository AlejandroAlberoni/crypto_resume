import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/providers";
import SearchInput from "./search/search";
import SettingsMenu from "./settingsmenu";

export const metadata: Metadata = {
  title: "CryptoFides",
  description:
    "An AI powered app to make better decisions in cryptocurrency market ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col items-center mt-2 md:mt-3">
            <div className="flex items-center justify-end md:justify-between px-2 w-full">
              <div className="hidden md:block">CryptoResume</div>
              <div className="flex items-center space-x-2 md:scale-[85%]">
                <SearchInput />
                <SettingsMenu />
              </div>
            </div>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
