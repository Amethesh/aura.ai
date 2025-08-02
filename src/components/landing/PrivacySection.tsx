import Image from "next/image";
import React from "react";

const PrivacySection = () => {
  return (
    <div className="relative w-screen py-32 px-4">
      <Image
        className="w-full rounded-[200px]"
        src={"/images/landing/privacy_bottom.png"}
        quality={100}
        width={800}
        height={800}
        unoptimized
        alt="Privacy"
      />
      <Image
        className="w-full rounded-[200px] absolute left-0 -top-24"
        src={"/images/landing/privacy_top.png"}
        quality={100}
        width={800}
        height={800}
        unoptimized
        alt="Privacy"
      />
    </div>
  );
};

export default PrivacySection;
