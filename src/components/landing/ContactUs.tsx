"use client";

import Image from "next/image";
import GlassPaneBG from "./GlassPaneBG";

const ContactUs = () => {
  return (
    <section className="mt-60">
      {/* Main container for the two-column layout */}
      <GlassPaneBG paneWidth={45}>
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">  
        {/* Left Side: Contact Form */}
        <div className="flex w-full flex-col justify-center text-white lg:w-1/2">
          <h1 className="mb-12 text-[60px] font-bold uppercase text-[#CDFD38]">
            Contact Us
          </h1>
          <form className="flex flex-col space-y-10 pr-12">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="text-lg text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border-b-4 border-white/80 bg-transparent pt-2 text-white outline-none transition focus:border-[#CDFD38]"
                />
            </div>
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-lg text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border-b-4 border-white/80 bg-transparent pt-2 text-white outline-none transition focus:border-[#CDFD38]"
                />
            </div>
            
            {/* Message Input */}
            <div>
              <label htmlFor="message" className="text-lg text-gray-300">
                Message
              </label>
              <input
                id="message"
                type="text"
                className="w-full border-b-4 border-white/80 bg-transparent pt-2 text-white outline-none transition focus:border-[#CDFD38]"
                />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col justify-between pr-6 items-start space-y-4 pt-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="w-full rounded-lg border border-gray-600 px-8 py-3 text-gray-300 transition hover:bg-gray-800 sm:w-auto"
                >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-[#CDFD38] to-[#a8b855] px-10 py-3 font-semibold text-black transition hover:opacity-90 sm:w-auto"
                >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="mt-8 w-full lg:mt-0 lg:w-1/2">
          <div className="relative">
            <Image
              src="/images/landing/contactus/contact.png"
              alt="An astronaut and an anime-style girl with wings sitting on a spaceship"
							width={300}
							height={300}
							className="object-cover rounded-3xl w-[800px] h-[600px] aspect-square object-bottom mb-4 mt-4"
							/>
						<div
							className="absolute inset-0 z-1 overflow-hidden pointer-events-none opacity-60"
							style={{
								backgroundImage: "url(/images/landing/grain.png)",
								backgroundSize: "100px 100px",
								backgroundRepeat: "repeat",
								backgroundBlendMode: "overlay",
								backgroundPosition: "left top",
								}}
						/>
            <Image
              src="/images/landing/contactus/contact-trans2.png"
              alt="An astronaut and an anime-style girl with wings sitting on a spaceship"
							width={300}
							height={300}
							className="absolute w-[900px] bottom-0 left-0 "
            />
          </div>
        </div>
      </div>
    </GlassPaneBG>
    </section>
  );
};

export default ContactUs;