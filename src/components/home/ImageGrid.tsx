"use client";
import Masonry from "react-masonry-css";
import ImageCard from "../ui/ImageCard";
import { ImageCardType } from "@/src/types/BaseType";

type ImageGalleryProps = {
  images: ImageCardType[] | null;
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images || images.length === 0) return <p>No images to show.</p>;

  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image) => (
        <ImageCard
          key={image.id}
          imageUrl={image.image_url}
          prompt={image.prompt}
          width={800}
          height={800}
        />
      ))}
    </Masonry>
  );
};

export default ImageGallery;
