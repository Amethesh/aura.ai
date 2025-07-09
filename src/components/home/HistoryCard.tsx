import { Image as ImageIcon } from "lucide-react";

// Define props for reusability
interface HistoryCardProps {
  title: string;
  prompt: string;
  imageUrl: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  title,
  prompt,
  imageUrl,
}) => {
  return (
    <div className="group relative max-w-80 w-full h-[100px] rounded-xl mb-2 overflow-hidden font-sans border border-[rgba(85,85,84,0.67)] bg-black cursor-pointer">
      <img
        src={imageUrl}
        alt={prompt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.61)] transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
        <div className="absolute top-0 left-0 w-full h-[45px] bg-gradient-to-t from-[rgba(47,47,47,0.07)] to-transparent backdrop-blur-[2.85px] transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
      </div>
      <div className="absolute inset-0 p-3 flex items-start gap-x-2 text-white transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
        {/* Icon Container */}
        <div className="flex-shrink-0 flex items-center justify-center w-[33.21px] h-[33.21px] bg-[rgba(26,26,26,0.5)] rounded-[11px]">
          <ImageIcon className="w-5 h-5 text-[#C0C0C0]" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col group-hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.6)] transition-all duration-300">
          {/* Title Text */}
          <h3 className="font-medium text-xs leading-[15px]">{title}</h3>
          {/* Prompt Text */}
          <p className="pt-0.5 font-normal text-[11px] leading-[14px] text-white/90 w-[159px] truncate">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
