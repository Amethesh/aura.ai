"use client";
import Masonry from "react-masonry-css";
import ImageCard from "../ui/ImageCard";

const ImageGallery = ({ images }) => {
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
          blurhash={image.blurhash}
        />
      ))}
    </Masonry>
  );
};

export default ImageGallery;
