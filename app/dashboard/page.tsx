import SearchInput from "./search";
import SettingsMenu from "./settingsmenu";

const Page = () => {
  return (
    <div className="flex flex-col items-center mt-3 md:mt-6">
      <div className="flex items-center justify-center md:justify-between w-full px-10">
        <div className="invisible md:visible">CryptoResume</div>
        <div className="flex items-center space-x-4">
          <SearchInput />
          <SettingsMenu />
        </div>
      </div>
    </div>
  );
};

export default Page;
