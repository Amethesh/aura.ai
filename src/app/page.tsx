import HistoryCard from "../components/home/HistoryCard";
import SidebarMain from "../components/home/Sidebar";

const page = () => {
  return (
    <div className="relative flex h-full w-full flex-row">
      <SidebarMain />
      <div className="w-full h-screen flex flex-col bg-background overflow-y-scroll">
        <HistoryCard
          imageUrl="https://rh-images.xiaoyaoyou.com/de341d98bcc516a1e9639e4abeb44e9f/output/ComfyUI_00008_qrfsy_1751710630.png"
          title="Image Generation"
          prompt="Create an anime eyes with an green safoash fsaoijf ashfjsaio fjsafjsa ifjsaijf safh"
        />
      </div>
    </div>
  );
};

export default page;
