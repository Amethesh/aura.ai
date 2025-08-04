import { ImageCard3D } from "./3dImageCard";
import { InfiniteImageScroll } from "./SimpleCardScroll";

const imageList = [
  "/images/landing/edit/cane2.png",
  "/images/landing/edit/cane3.png",
  "/images/landing/edit/cane4.png",
];

const EditShowcase = () => {
  return (
    <div className="h-screen flex w-full justify-center gap-32 items-center">
      <div className="flex flex-col gap-12">
        <ImageCard3D
          topImageUrl="/images/landing/edit/cane6_top.png"
          bottomImageUrl="/images/landing/edit/cane6_bottom.png"
          width={300}
          height={300}
          cardText="Cane Floating"
        />
        <ImageCard3D
          topImageUrl="/images/landing/edit/cane5_top.png"
          bottomImageUrl="/images/landing/edit/cane5_bottom.png"
          width={300}
          height={300}
          cardText="Cane"
        />
      </div>
      <div className="flex flex-col gap-6">
        <InfiniteImageScroll
          images={imageList}
          direction="up"
          orientation="vertical"
          className="h-[800px]"
        />
      </div>
      <ImageCard3D
        topImageUrl="/images/landing/edit/cane_women_top.png"
        bottomImageUrl="/images/landing/edit/cane_women.jpg"
        width={600}
        height={600}
        cardText="Cane"
      />
    </div>
  );
};

export default EditShowcase;
