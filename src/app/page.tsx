import InputBox from "../components/inputBox/InputBox";
import BackgroundImage from "../components/home/BackgroundImage";
import ImageCard from "../components/ui/ImageCard";
import ImageGrid from "../components/home/ImageGrid";
import { ArrowBigDown, ArrowDown, SparklesIcon } from "lucide-react";
import { IconSparkles } from "@tabler/icons-react";
import { createClient } from "../lib/supabase/server";

const page = async () => {
  const supabase = createClient();

  // Call the database function to get 15 random images
  const { data: images, error } = await (
    await supabase
  ).rpc("get_random_images", {
    limit_count: 15,
  });

  console.log(images);

  if (error) {
    console.error("Error fetching random images:", error);
    return (
      <p className="text-center">
        Failed to load images. Please try again later.
      </p>
    );
  }
  return (
    <div className="relative w-full h-full flex flex-col bg-background overflow-y-scroll justify-center items-center">
      <BackgroundImage />
      <div className="z-10 my-8 mt-44 flex flex-col justify-center items-center">
        <h1 className="flex items-center gap-2 font-semibold text-2xl mb-6">
          <IconSparkles /> Generate images from text and references
        </h1>
        <InputBox />
      </div>
      <div className="p-2 mt-16">
        <p className="p-2 ml-3 mb-2 flex font-medium">
          Examples
          {/* <ArrowDown /> */}
        </p>
        <ImageGrid images={images} />
      </div>
    </div>
  );
};

export default page;
