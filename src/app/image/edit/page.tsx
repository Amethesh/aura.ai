import { IconSparkles, IconWand } from "@tabler/icons-react";
import { createClient } from "@/src/lib/supabase/server";
import BackgroundImage from "@/src/components/home/BackgroundImage";
import InputBox from "@/src/components/inputBox/InputBox";
import ImageGallery from "@/src/components/home/ImageGrid";
import DragAndDropBox from "@/src/components/ui/DragAndDropBox";

const page = async () => {
  const supabase = createClient();

  const { data: images, error } = await (
    await supabase
  ).rpc("get_random_images", {
    limit_count: 15,
  });

  if (error) {
    console.error("Error fetching random images:", error);
    return (
      <p className="text-center">
        Failed to load images. Please try again later.
      </p>
    );
  }
  return (
    <div className="relative w-full h-screen flex flex-col bg-background overflow-y-scroll items-center">
      <BackgroundImage src="/images/edit_bg.png" width={600} height={600} />
      <div className="z-10 my-8 mt-6 flex flex-col justify-center items-center">
        <h1 className="flex items-center gap-2 font-semibold text-2xl mb-6">
          <IconWand /> Edit images with text instructions
        </h1>
        <DragAndDropBox />
      </div>
      <InputBox />
    </div>
  );
};

export default page;
