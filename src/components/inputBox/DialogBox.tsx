import { IconSearch } from "@tabler/icons-react";
import { Input } from "../ui/input";
import ModelCard from "../ui/Modelcard";

const DialogBox = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p className="text-nowrap">Change model/checkpoint</p>
        <div className="relative">
          <Input
            placeholder="Search..."
            className="rounded-2xl min-w-52 py-1.5"
          />
          <IconSearch
            size={16}
            className="absolute top-2 right-2 text-white/60"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 mt-6 gap-4">
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
      </div>
    </div>
  );
};

export default DialogBox;
