import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export function QualitySelect() {
  return (
    <div className="flex flex-col justify-center items-center ml-2 gap-4">
      <p className="text-sm text-gray-300 font-medium tracking-wide">Quality</p>
      <Select>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Quality" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quality</SelectLabel>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
