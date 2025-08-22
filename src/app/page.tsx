import ContactUs from "../components/landing/ContactUs";
import EditBranding from "../components/landing/EditBranding";
import EditSection from "../components/landing/EditSection";
import EditShowcase from "../components/landing/EditShowcase";
import EndSection from "../components/landing/EndSection";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import { NavbarLander } from "../components/landing/Navbar";
import PrivacySection from "../components/landing/PrivacySection";
import Takecontrol from "../components/landing/Takecontrol";
import UpscaleSection from "../components/landing/UpscaleSection";

const page = () => {
  return (
    <main>
      <div className="relative smooth-scroll overflow-hidden">
        <NavbarLander />
        <Hero />
        <PrivacySection />
        <EditSection />
        <EditBranding />
        <EditShowcase />
        <Takecontrol />
        <UpscaleSection />
        <ContactUs />
        <EndSection />
        <Footer />
      </div>
    </main>
  );
};

export default page;
