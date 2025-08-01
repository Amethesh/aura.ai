import { ImageCard3D } from "../components/landing/3dImageCard";
import Hero from "../components/landing/Hero";
import { NavbarLander } from "../components/landing/Navbar";

const page = async () => {
  return (
    <main>
      <div className="relative w-full">
        <NavbarLander />
        <Hero />
        <ImageCard3D
          bottomImageUrl="/images/landing/bluegirl.png"
          topImageUrl="/images/landing/bluegirltop.png"
          cardText="Anime"
          rotateDepth={10} // Optional: control the tilt amount
          parallaxDepth={10} // Optional: control how much layers move
        />
        <div className="bg-black h-32 w-full"></div>
      </div>
    </main>
  );
};

export default page;
