import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import Image from "next/image";
import React from "react";

const NewsLetterSection = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-8 md:py-10 px-6 md:px-12 max-w-frame mx-auto bg-[#12264D] border border-white/10 rounded-3xl shadow-xl">
      <p className="font-semibold text-xl sm:text-2xl md:text-3xl leading-snug text-white mb-6 md:mb-0 tracking-normal">
        Stay updated on latest gadgets and accessories
      </p>
      <div className="flex items-center">
        <div className="flex flex-col w-full max-w-[360px] mx-auto md:ml-auto md:mr-0">
          <InputGroup className="flex bg-white/10 border border-white/15 focus-within:border-[#2F6BFF] focus-within:bg-[#0B1B3A] transition-all rounded-full mb-3 overflow-hidden">
            <InputGroup.Text>
              <Image
                priority
                src="/icons/envelope.svg"
                height={20}
                width={20}
                alt="email"
                className="min-w-5 min-h-5 invert opacity-70"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="bg-transparent text-white placeholder:text-slate-400 text-sm focus:outline-none"
            />
          </InputGroup>
          <Button
            className="text-sm font-medium bg-[#2F6BFF] hover:bg-[#1E58E8] text-white h-11 rounded-full px-6 transition-all shadow-md shadow-[#2F6BFF]/20"
            aria-label="Subscribe to Newsletter"
            type="button"
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
