"use client";
import { useState } from "react";
import Footer from "@/src/components/landing/Footer";
import {
  MouseParallaxItem,
  MouseParallaxProvider,
} from "@/src/components/landing/MouseParallax";
import { NavbarLander } from "@/src/components/landing/Navbar";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import TrustedBy from "@/src/components/landing/pricing/TrustedBy";

const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    description: "Best for individuals and personal use.",
    priceMonthly: "Free",
    priceAnnually: "Free",
    buttonText: "Get Started",
    features: [
      "Employee directory",
      "Task management",
      "Calendar integration",
      "File storage (5GB)",
      "Communication tools",
      "Basic reporting",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    description: "Perfect for small teams and growing businesses.",
    priceMonthly: "$10",
    priceAnnually: "$8",
    priceSubtext: "/user/month",
    buttonText: "Start Free Trial",
    features: [
      "Everything in Basic",
      "Advanced analytics",
      "Team collaboration",
      "Priority support",
      "Custom integrations",
      "Unlimited file storage",
      "Advanced security",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    description: "For large organizations with custom needs.",
    priceMonthly: "$25",
    priceAnnually: "$20",
    priceSubtext: "/user/month",
    buttonText: "Contact Sales",
    features: [
      "Everything in Pro",
      "Advanced reporting",
      "Custom workflows & API access",
      "Dedicated account manager",
      "SSO integration",
      "Advanced permissions & compliance",
      "Custom branding",
    ],
    popular: false,
  },
];

// Reusable Badge Component for "Most Popular"
const PopularBadge = () => (
  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
    <div className="flex items-center gap-2 bg-cyan-400 text-black px-4 py-1.5 rounded-full text-sm font-semibold">
      <Star className="w-4 h-4" />
      <span>Most Popular</span>
    </div>
  </div>
);

const page = () => {
  return (
    <main className="relative overflow-hidden">
      <NavbarLander />
      <div className="relative">
        <MouseParallaxProvider className="">
          <MouseParallaxItem strength={0}>
            <Image
              src={"/images/pricing/light-ray-boy.jpg"}
              className="w-full absolute top-0 left-0"
              width={800}
              height={800}
              alt="pricing image"
            />
          </MouseParallaxItem>
          <MouseParallaxItem strength={30} className="z-20">
            <div>
              <div
                className="absolute w-[197px] h-[578px] blur-[40px] -rotate-[8deg] bg-red-600 z-20"
                style={{
                  left: "980px",
                  top: "-180px",
                  background:
                    "linear-gradient(180deg, rgba(43, 255, 255, 0.24) 0%, rgba(43, 255, 255, 0) 100%)",
                }}
              />

              <div
                className="absolute w-[251px] h-[545px] blur-[40px] bg-red-600 z-20"
                style={{
                  left: "calc(50% - 251px/2 + 0.5px)",
                  top: "0px",
                  background:
                    "linear-gradient(180deg, rgba(43, 255, 255, 0.24) 0%, rgba(43, 255, 255, 0.1) 100%)",
                }}
              />

              <div
                className="absolute w-[205px] h-[578px] blur-[40px] rotate-[8deg] bg-red-600 z-20"
                style={{
                  left: "280px",
                  top: "-80px",
                  background:
                    "linear-gradient(180deg, rgba(43, 255, 255, 0.24) 0%, rgba(43, 255, 255, 0) 100%)",
                }}
              />
            </div>
          </MouseParallaxItem>
        </MouseParallaxProvider>
        <svg
          width="1287"
          height="624"
          viewBox="0 0 1287 624"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
        >
          <path
            d="M491.105 515.524H802.053M0.654756 -12.6318L0.654726 624M42.1145 -12.6318L42.1145 624M83.5742 -12.6318L83.5742 624M125.034 -12.6318L125.034 624M166.494 -12.6318L166.494 624M207.953 -12.6318L207.953 624M249.413 -12.6318L249.413 624M290.873 -12.6318L290.873 624M332.333 -12.6318L332.333 624M0.183594 598.659H1285.44M373.792 -12.6318L373.792 624M0.183594 559.537H1285.44M415.252 -12.6318L415.252 624M0.183594 520.414H1285.44M456.712 -12.6318L456.712 624M0.183594 481.291H1285.44M498.172 -12.6318L498.172 624M0.183594 442.169H1285.44M539.631 -12.6318L539.631 624M0.183594 403.046H1285.44M581.091 -12.6318L581.091 624M0.183594 363.923H1285.44M622.551 -12.6318L622.551 624M0.183594 324.801H1285.44M664.011 -12.6318L664.011 624M0.183594 285.678H1285.44M705.47 -12.6318L705.47 624M0.183594 246.556H1285.44M746.93 -12.6318L746.93 624M0.183594 207.433H1285.44M788.39 -12.6318L788.39 624M0.183594 168.31H1285.44M829.85 -12.6318L829.85 624M0.183594 129.188H1285.44M871.309 -12.6318L871.309 624M0.183594 90.0651H1285.44M912.769 -12.6318L912.769 624M0.183594 50.9425H1285.44M954.229 -12.6318L954.229 624M0.183594 11.8199H1285.44M995.689 -12.6318V624M0.183594 -27.3027L1285.44 -27.3027M1037.15 -12.6318V624M1078.61 -12.6318V624M1120.07 -12.6318V624M1161.53 -12.6318V624M1202.99 -12.6318V624M1244.45 -12.6318V624M1285.91 -12.6318V624"
            stroke="url(#paint0_radial_440_1118)"
            stroke-width="0.888544"
          />
          <defs>
            <radialGradient
              id="paint0_radial_440_1118"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(643.045 259.697) rotate(90) scale(364.303 719.163)"
            >
              <stop stop-color="white" stop-opacity="0.12" />
              <stop offset="0.6" stop-color="white" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div className="absolute left-1/2 top-0 mt-32 gap-10 z-20 -translate-x-1/2 flex flex-col justify-center items-center">
          <div className="z-20 flex flex-row border bg-[#2BFFFF]/20 border-[#2BFFFF]/50 justify-center items-center px-3 py-1.5 gap-2.5 w-[250px] h-7 rounded-full backdrop-blur-[12px]">
            <span className="w-[226px] h-4 font-bold text-xs leading-4 text-center tracking-[0.02em] text-black/70">
              Bring your business to the best scale
            </span>
          </div>
          <div
            className="z-20 w-[601px]  font-normal text-[70px] leading-[80px] text-center tracking-[-0.04em]"
            style={{
              fontFamily: "'Space Grotesk'",
              background: "linear-gradient(180deg, #FFFFFF 50%, #e4f13e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Discover Products With the Best Pricing
          </div>
          <p className="text-white w-[600px] text-center">
            Select from best plan, ensuring a perfect match. Need more or less?
            Customize your subscription for a seamless fit!
          </p>
        </div>
        <div className="w-[600px] h-[250px] bg-black blur-[200px] rounded-full absolute top-40 left-1/3 -translate-x-12 z-10"></div>

        {/* Pricing Cards Container */}
        <div className="relative pt-[500px] z-30 px-8">
          <Tabs defaultValue="monthly" className="w-full max-w-7xl mx-auto">
            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-xl">
                <TabsTrigger
                  value="monthly"
                  className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg px-6 py-2"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg px-6 py-2"
                >
                  Yearly
                  <span className="ml-2 bg-cyan-400 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                    Save 20%
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Monthly Pricing */}
            <TabsContent value="monthly">
              <div className="flex flex-wrap justify-center gap-8">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col p-10 gap-8 w-full max-w-[363px] min-h-fit rounded-[32px] backdrop-blur-[20px] ${
                      plan.popular ? "ring-2 ring-cyan-400/50" : ""
                    }`}
                    style={{
                      background:
                        "linear-gradient(195.05deg, rgba(43, 255, 255, 0.1) 0%, rgba(43, 255, 255, 0.02) 50%, rgba(43, 255, 255, 0.06) 100%)",
                    }}
                  >
                    {/* Popular Badge */}
                    {plan.popular && <PopularBadge />}

                    {/* Header Section */}
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-6">
                        <div className="relative w-10 h-10 bg-white/12 rounded-full flex items-center justify-center">
                          <div className="w-5 h-5 bg-white rounded-full" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-white text-xl font-medium leading-7">
                            {plan.name}
                          </h3>
                          <p className="text-white text-sm font-normal leading-5">
                            {plan.description}
                          </p>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-baseline gap-1">
                        <span className="text-white text-5xl font-medium leading-[56px]">
                          {plan.priceMonthly}
                        </span>
                        {plan.priceSubtext && (
                          <span className="text-white/60 text-lg font-normal">
                            {plan.priceSubtext}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      className="flex justify-center items-center px-[14px] py-3 w-full rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)",
                      }}
                    >
                      <span className="text-white text-sm font-medium leading-5">
                        {plan.buttonText}
                      </span>
                    </button>

                    {/* Divider */}
                    <div className="w-full border-t border-white/24" />

                    {/* Features Section */}
                    <div className="flex flex-col gap-4 flex-1">
                      <h4 className="text-white text-base font-medium leading-6">
                        What you will get
                      </h4>

                      <div className="flex flex-col gap-4">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-white/80 flex-shrink-0" />
                            <span className="text-white/80 text-[15px] font-normal leading-[22px]">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Yearly Pricing */}
            <TabsContent value="yearly">
              <div className="flex flex-wrap justify-center gap-8">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col p-10 gap-8 w-full max-w-[363px] min-h-fit rounded-[32px] backdrop-blur-[20px] ${
                      plan.popular ? "ring-2 ring-cyan-400/50" : ""
                    }`}
                    style={{
                      background:
                        "linear-gradient(195.05deg, rgba(43, 255, 255, 0.1) 0%, rgba(43, 255, 255, 0.02) 50%, rgba(43, 255, 255, 0.06) 100%)",
                    }}
                  >
                    {/* Popular Badge */}
                    {plan.popular && <PopularBadge />}

                    {/* Header Section */}
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-6">
                        <div className="relative w-10 h-10 bg-white/12 rounded-full flex items-center justify-center">
                          <div className="w-5 h-5 bg-white rounded-full" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-white text-xl font-medium leading-7">
                            {plan.name}
                          </h3>
                          <p className="text-white text-sm font-normal leading-5">
                            {plan.description}
                          </p>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-white text-5xl font-medium leading-[56px]">
                            {plan.priceAnnually}
                          </span>
                          {plan.priceSubtext && (
                            <span className="text-white/60 text-lg font-normal">
                              /user/year
                            </span>
                          )}
                        </div>
                        {plan.priceMonthly !== "Free" &&
                          plan.priceMonthly !== "Custom" && (
                            <div className="flex items-center gap-2">
                              <span className="text-white/40 text-sm line-through">
                                {plan.priceMonthly}/month
                              </span>
                              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                                Save 20%
                              </span>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      className="flex justify-center items-center px-[14px] py-3 w-full rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)",
                      }}
                    >
                      <span className="text-white text-sm font-medium leading-5">
                        {plan.buttonText}
                      </span>
                    </button>

                    {/* Divider */}
                    <div className="w-full border-t border-white/24" />

                    {/* Features Section */}
                    <div className="flex flex-col gap-4 flex-1">
                      <h4 className="text-white text-base font-medium leading-6">
                        What you will get
                      </h4>

                      <div className="flex flex-col gap-4">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-white/80 flex-shrink-0" />
                            <span className="text-white/80 text-[15px] font-normal leading-[22px]">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <TrustedBy />
      <Footer />
    </main>
  );
};

export default page;
