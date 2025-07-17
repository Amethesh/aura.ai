"use client";
import Masonry from "react-masonry-css";
import ImageCard from "../ui/ImageCard";
export interface ImageCardType {
  id: number;
  image_url: string;
  prompt: string;
  width: number;
  height: number;
  blurhash: string;
}

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
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          imageUrl={image.image_url}
          prompt={image.prompt}
          width={image.width}
          height={image.height}
          // blurhash={image.blurhash}
        />
      ))}
    </Masonry>
  );
};

export default ImageGallery;
