import Hero from "../components/landing/Hero";
import { NavbarLander } from "../components/landing/Navbar";
import PrivacySection from "../components/landing/PrivacySection";

const page = async () => {
  return (
    <main>
      <div className="relative overflow-hidden">
        <NavbarLander />
        <Hero />
        <PrivacySection/>
      </div>
    </main>
  );
};

export default page;
