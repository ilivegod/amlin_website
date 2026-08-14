"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Copy, Linkedin, Phone } from "lucide-react";
import { useState } from "react";

import { ContactLink } from "@/components/ContactLink";

const footerEmail = "info@amlintechnco.com";
const footerPhoneDisplay = "+44 (0)7770 475717";
const footerPhoneHref = "tel:+447770475717";
const whatsappHref = "https://wa.me/447770475717";
const linkedinHref = "https://www.linkedin.com/company/amlin-technologies/";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

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
    <div className="relative mx-auto flex min-h-screen flex-col border-t border-[#2a2a2a] bg-[#050505] px-4 pt-14 text-white md:items-center md:px-0 md:pt-28">
      <div className="grid grid-cols-1 md:w-3/4 md:grid-cols-3">
        {/* left side */}
        <div className="flex flex-col gap-6">
          <Image
            className="hidden md:block"
            src="/svg/footerLogo.svg"
            alt="amlin logo"
            width={230}
            height={230}
          />
          <Image
            className="block md:hidden"
            src="/svg/footerLogo.svg"
            alt="amlin logo"
            width={120}
            height={120}
          />

          <div className="flex flex-col gap-3 font-inter">
            <div className="flex items-center gap-2">
              <p className="text-xl md:text-2xl">{footerEmail}</p>
              <Copy
                onClick={handleCopy}
                className="h-4 w-4 cursor-pointer text-gray-200 hover:text-white"
              />
              {copied && (
                <span className="text-sm text-green-400">Copied!</span>
              )}
            </div>

            <a
              href={footerPhoneHref}
              className="inline-flex items-center gap-2 text-base text-white/75 transition-colors hover:text-white md:text-lg"
            >
              <Phone
                className="h-4 w-4 shrink-0 text-white/45"
                aria-hidden="true"
              />
              {footerPhoneDisplay}
            </a>

            <div className="mt-1 flex items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="amlin-cta-fill inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amlin Technologies on LinkedIn"
                className="amlin-cta-fill inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <p className="mt-2 font-inter text-sm text-white/45">
              © {year} Amlin Technologies · Accra, Ghana
            </p>
          </div>
        </div>

        {/* center */}
        <div className="flex flex-col gap-6 pt-16 md:pt-0">
          <div className="flex flex-col gap-3">
            <p className="font-jakarta text-4xl font-semibold md:text-5xl">
              Stay <br className="hidden md:block" /> connected
            </p>
            <p className="font-inter text-lg font-medium text-[#5E646F]">
              Join our newsletter and stay updated <br /> on the latest trends
              in digital design
            </p>
          </div>
          <div className="relative mx-auto w-full">
            <div className="relative flex items-center border-b-2 border-white py-4">
              <span className="font-inter text-lg text-gray-700">
                Coming Soon!
              </span>
              <span
                className="absolute right-0 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/20"
                aria-hidden="true"
              >
                <ArrowRight className="h-3 w-3 text-white/50" />
              </span>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col pt-16 md:items-center md:pt-0">
          <div className="mt-4 flex w-1/2 flex-col space-y-4 md:mt-0 md:items-end">
            <div className="flex flex-col items-start space-y-3 font-inter md:space-y-5">
              <h2 className="text-xl font-medium text-[#A3A3A3]">
                Quick Links
              </h2>
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Services
                </Link>
                <Link
                  href="/solutions"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Industries
                </Link>
                <Link
                  href="/work"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Work
                </Link>
                <ContactLink className="text-sm text-white/80 transition-colors hover:text-white">
                  Contact
                </ContactLink>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 w-5/6 -translate-x-1/2">
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
