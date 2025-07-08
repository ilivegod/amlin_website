"use client";

import Link from "next/link";
import Image from "next/image";
import { Copy } from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const footerEmail = "info@amlintechnco.com";

  const handleSubmit = () => {
    console.log("email:", email);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(footerEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  return (
    <div className="min-h-screen relative mx-auto bg-[#1D1D1D] text-white md:items-center md:px-0 px-4 md:pt-28 pt-14  flex flex-col">
      <div className="grid md:grid-cols-3 grid-cols-1  md:w-3/4">
        {/* left side */}
        <div className="flex flex-col gap-6  items-left ">
          <Image
            className="md:block hidden"
            src="/svg/footerLogo.svg"
            alt="amlin logo"
            width={230}
            height={230}
          />
          <Image
            className="md:hidden block"
            src="/svg/footerLogo.svg"
            alt="amlin logo"
            width={120}
            height={120}
          />
          <div className="flex gap-2 items-center">
            <p className="md:text-2xl font-inter text-xl">{footerEmail}</p>
            <Copy
              onClick={handleCopy}
              className="w-4 h-4 hover:cursor-pointer text-gray-200 hover:text-white"
            />
            {copied && <span className="text-sm text-green-400">Copied!</span>}
          </div>
        </div>
        {/* center */}
        <div className="flex flex-col gap-6  md:pt-0 pt-16">
          <div className="flex flex-col gap-3">
            <p className="font-semibold font-polysans md:text-5xl text-4xl">
              Stay <br className="hidden md:block" /> connected
            </p>
            <p className="font-medium font-inter text-lg text-[#5E646F]">
              Join our newsletter and stay updated <br /> on the latest trends
              in digital design
            </p>
          </div>
          <form onSubmit={handleSubmit} className="relative w-full mx-auto">
            <div className="relative">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-0 border-b-2 border-white rounded-none px-0 py-4 text-white placeholder:text-gray-400 text-lg focus-visible:ring-0 focus-visible:border-white"
                required
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#7563FC] hover:bg-purple-700 hover:cursor-pointer rounded-full w-5 h-5"
              >
                <ArrowRight className="w-5 h-5 text-black" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
          </form>
        </div>
        {/* right */}
        <div className="flex flex-col  md:items-center md:pt-0 pt-16">
          <div className="space-y-4  w-1/2 flex flex-col md:items-end md:mt-0 mt-5">
            <div className="flex flex-col font-inter items-start md:space-y-5 space-y-3">
              <h2 className="text-xl  font-medium text-[#A3A3A3]">
                Quick Links
              </h2>
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/solutions"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  Solutions
                </Link>
                <Link
                  href="#challenge"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2  w-5/6 ">
        <Image
          src="/svg/amlin.svg"
          alt="amlin text"
          className="w-full"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
