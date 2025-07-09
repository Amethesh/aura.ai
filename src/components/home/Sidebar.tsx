"use client";
import {
  IconArrowUp,
  IconChevronDown,
  IconClock,
  IconColorSwatch,
  IconEdit,
  IconLayoutSidebar,
  IconSettings2,
  IconSparkles,
} from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Edit3, ImageIcon } from "lucide-react";
import HistoryCard from "./HistoryCard";
import clsx from "clsx";

const links = [
  {
    label: "New Chat",
    href: "#",
    icon: <IconEdit className="h-5 w-5 shrink-0" />,
  },
  {
    label: "Library",
    href: "#",
    icon: <IconColorSwatch className="h-5 w-5 shrink-0" />,
  },
];

const menuItems = [
  {
    icon: <IconSparkles className="h-5 w-5" />,
    label: "Generate",
    color: "text-accent",
  },
  {
    icon: <Edit3 className="h-5 w-5" />,
    label: "Edit",
    color: "text-gray-500",
  },
  {
    icon: <IconArrowUp className="h-5 w-5" />,
    label: "Upscale",
    color: "text-gray-500",
  },
  {
    icon: <IconSettings2 className="h-5 w-5" />,
    label: "Prepare",
    color: "text-gray-500",
  },
];

const historyData = [
  {
    id: 1,
    imageUrl:
      "https://rh-images.xiaoyaoyou.com/de341d98bcc516a1e9639e4abeb44e9f/output/ComfyUI_00008_qrfsy_1751710630.png",
    title: "Image Generation",
    prompt: "Create an anime eyes with green and detailed highlights.",
  },
  {
    id: 2,
    imageUrl:
      "https://rh-images.xiaoyaoyou.com/de341d98bcc516a1e9639e4abeb44e9f/output/ComfyUI_00200_gkvsq_1751205394.png?imageMogr2/format/jpeg/ignore-error/1",
    title: "Image Upscale",
    prompt: "Upscale a fantasy landscape with a dragon flying over mountains.",
  },
  {
    id: 3,
    imageUrl:
      "https://rh-images.xiaoyaoyou.com/de341d98bcc516a1e9639e4abeb44e9f/output/ComfyUI_00166_rrvdk_1750845610.png?imageMogr2/format/jpeg/ignore-error/1",
    title: "Image Edit",
    prompt: "Remove the background from a portrait photo.",
  },
];

const userLink = {
  label: "Manu Arora",
  href: "#",
  icon: (
    <Image
      src="/images/logo.png"
      className="h-8 w-8 shrink-0 rounded-full"
      width={32}
      height={32}
      alt="User Avatar"
    />
  ),
};

const CollapsibleSection = ({
  title,
  icon,
  children,
  defaultOpen = false,
  className = "", // Allow passing extra classes
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    // CHANGE 2: The wrapper for the section needs to be a flex container to allow children to fill height
    <div className={clsx("w-full text-neutral-200 flex flex-col", className)}>
      <button
        type="button"
        className="flex w-full flex-shrink-0 items-center justify-between py-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm">{title}</span>
        </div>
        <IconChevronDown
          className={clsx("h-5 w-5 transition-transform", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {/* CHANGE 3: The children wrapper needs to be flexible to grow and shrink */}
      {isOpen && <div className="min-h-0 flex-1">{children}</div>}
    </div>
  );
};

// --- Main Sidebar Component ---
export default function SidebarMain() {
  const [open, setOpen] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Reusable style object for consistent appearance
  const iconContainerStyle = {
    boxShadow: "inset 0px 0px 17.6px -4px rgba(200, 200, 200, 0.25)",
  };

  return (
    // The blur effect div is removed as it's likely for presentation and not part of the component logic
    <div className="flex h-screen text-sidebar-foreground">
      <Sidebar open={open}>
        <SidebarBody className="justify-between gap-10">
          {/* CHANGE 1: Main layout container. No longer scrolls itself. */}
          <div className="flex h-full flex-1 flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="relative p-1 bg-[#131312] border border-[#313131] rounded-[8px]"
                  style={iconContainerStyle}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <div className="relative h-[25px] w-[25px]">
                    <Image
                      src="/images/logo.png"
                      alt="Aura.ai Logo"
                      fill
                      className={clsx(
                        "transition-opacity absolute",
                        !open && hovered ? "opacity-0" : "opacity-100"
                      )}
                    />
                    {!open && (
                      <button
                        onClick={() => setOpen(true)}
                        aria-label="Open sidebar"
                      >
                        <IconLayoutSidebar
                          className={clsx(
                            "absolute top-0 left-0 h-[25px] w-[25px] cursor-pointer text-neutral-200 transition-opacity hover:text-accent",
                            hovered ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </button>
                    )}
                  </div>
                </div>
                {open && (
                  <p className="text-3xl font-bold">
                    Aura<span className="text-accent">.</span>ai
                  </p>
                )}
              </div>
              {open && (
                <button
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-lg p-1 text-neutral-200 transition-colors hover:text-accent"
                  aria-label="Collapse sidebar"
                >
                  <IconLayoutSidebar />
                </button>
              )}
            </div>

            {/* Links and Sections */}
            {/* Static Content Area (Links and Image Section) */}
            <div className="mt-8 flex flex-shrink-0 flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}

              <CollapsibleSection
                title="Image"
                icon={<ImageIcon className="p-0.5" />}
                defaultOpen={true}
              >
                <div className="border-l-2 border-gray-700 ml-2">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center gap-4 p-2 pl-5"
                    >
                      <div
                        className="p-1 bg-[#131312] border border-[#313131] rounded-[8px]"
                        style={iconContainerStyle}
                      >
                        {item.icon}
                      </div>
                      <span className={`text-sm ${item.color}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Scrollable History Section */}
            <CollapsibleSection
              title="Generation History"
              icon={<IconClock className="p-0.5" />}
              // CHANGE 2 (continued): Make this section a flex item that grows
              className="flex-1 min-h-0"
              defaultOpen={true}
            >
              {/* CHANGE 3 (continued): This container now handles the scrolling */}
              <div className="h-full overflow-y-auto pr-2">
                <div className="flex flex-col gap-2 py-2">
                  {historyData.map((history) => (
                    <HistoryCard
                      key={history.id}
                      imageUrl={history.imageUrl}
                      title={history.title}
                      prompt={history.prompt}
                    />
                  ))}
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Footer */}
          <div>
            <SidebarLink link={userLink} />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
