import EditBranding from "../components/landing/EditBranding";
import EditSection from "../components/landing/EditSection";
import EditShowcase from "../components/landing/EditShowcase";
import Hero from "../components/landing/Hero";
import { NavbarLander } from "../components/landing/Navbar";
import PrivacySection from "../components/landing/PrivacySection";
import Takecontrol from "../components/landing/Takecontrol";

const page = () => {
  return (
    <main>
      <div className="relative overflow-hidden">
        <NavbarLander />
        <Hero />
        <PrivacySection/>
        <EditSection />
        <EditBranding />
        <EditShowcase />
        <Takecontrol />
      </div>
    </main>
  );
};

export default page;
