"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import AnimatedCounter from "../ui/AnimatedCounter";
import { InputBoxParameter } from "@/src/types/BaseType";

interface DynamicParametersProps {
  inputParameters: Record<string, InputBoxParameter>;
  outputParameters: Record<string, any>;
  onValuesChange: (values: Record<string, any>) => void;
}

const DynamicParameters = ({
  inputParameters,
  outputParameters,
  onValuesChange,
}: DynamicParametersProps) => {
  const numOfOutputsParam = inputParameters["num_of_outputs"];
  const promptUpsamplingParam =
    inputParameters["prompt_upsampling"] ||
    inputParameters["prompt_enhancement"];
  const aspect_ratio = inputParameters["aspect_ratio"];

  let steps;
  if (inputParameters["steps"]) {
    steps = "steps";
  } else if (inputParameters["inference_steps"]) {
    steps = "inference_steps";
  } else {
    steps = "steps";
  }

  const handleParamChange = (key: string, value: any) => {
    onValuesChange({
      ...outputParameters,
      [key]: value,
    });
  };

  const qualitySettings = (value: string) => {
    console.log("Quality setting changed to:", value);

    switch (value) {
      case "high":
        if (inputParameters[steps]) {
          const maxSteps = inputParameters[steps].maximum ?? 50;
          handleParamChange(steps, Math.floor(maxSteps));
        }
        break;

      case "medium":
        if (inputParameters[steps]) {
          const defaultSteps = inputParameters[steps].default ?? 25;
          handleParamChange(steps, Math.floor(defaultSteps));
        }
        break;

      case "low":
        if (inputParameters[steps]) {
          const defaultSteps = inputParameters[steps].default ?? 20;
          handleParamChange(steps, Math.floor(defaultSteps / 2));
        }
        break;

      default:
        console.log("Unknown quality setting");
        break;
    }
  };
  return (
    <div className="grid grid-cols-2 lg:flex lg: items-center justify-center gap-x-6 gap-y-4">
      {numOfOutputsParam && (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-xs text-gray-300 font-medium tracking-wide">
            Batch
          </p>
          <AnimatedCounter
            initialValue={numOfOutputsParam.default ?? 1}
            min={numOfOutputsParam.minimum ?? 1}
            max={numOfOutputsParam.maximum ?? 4}
            onChange={(value) => handleParamChange("num_of_outputs", value)}
          />
        </div>
      )}

      {aspect_ratio && aspect_ratio.enum && (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-xs text-gray-300 font-medium tracking-wide">
            Aspect Ratio
          </p>
          <Select
            onValueChange={(value) => handleParamChange("aspect_ratio", value)}
            defaultValue={aspect_ratio.default || "1:1"}
          >
            <SelectTrigger className="w-full min-w-[110px]">
              <SelectValue placeholder="Select a Ratio" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ratios</SelectLabel>
                {aspect_ratio.enum
                  .filter((ratio: string) => ratio !== "custom")
                  .map((ratio: string) => (
                    <SelectItem key={ratio} value={ratio}>
                      {ratio}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xs text-gray-300 font-medium tracking-wide">
          Quality
        </p>
        <Select
          onValueChange={(value) => qualitySettings(value)}
          defaultValue="medium"
        >
          {/* Smaller trigger width on mobile */}
          <SelectTrigger className="w-full min-w-[90px]">
            <SelectValue placeholder="Medium" />
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

      {promptUpsamplingParam && (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-xs text-gray-300 font-medium tracking-wide">
            Enhance prompt
          </p>
          <Switch
            checked={outputParameters["prompt_upsampling"] ?? false}
            onCheckedChange={(value) =>
              handleParamChange("prompt_upsampling", value)
            }
          />
        </div>
      )}
    </div>
  );
};

export default DynamicParameters;
