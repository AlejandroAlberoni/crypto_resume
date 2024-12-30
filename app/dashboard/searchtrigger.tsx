import { Button } from "@/components/ui/button";
import { Plus, Command, Search } from "lucide-react";

const SearchTrigger = () => {
  return (
    <Button variant={"outline"} asChild>
      <div className="flex space-between space-x-20 items-center">
        <div className="flex items-center space-x-2">
          <Search />
          <p className="font-sans font-light">Search</p>
        </div>
        <div className="flex items-center border-1 rounded-sm bg-zinc-200 dark:bg-zinc-800 py-1 px-3">
          <Command />
          <Plus className="scale-50" />
          <div>K</div>
        </div>
      </div>
    </Button>
  );
};

export default SearchTrigger;
