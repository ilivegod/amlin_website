"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <nav className="bg-white lg:rounded-xl lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 mt-6 py-2 px-3 z-50 w-full lg:max-w-[90vh]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              className="dark:invert"
              src="/svg/logo.svg"
              alt="ehr logo"
              width={20}
              height={20}
            />
            <p className="font-semibold text-lg">EHR SYSTEM</p>
          </div>

          {/* Hamburger (mobile only) */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#0E121B] focus:outline-none"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Image
                  src="/svg/menu-3-fill.svg"
                  alt="hamburger"
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>

          {/* Links (desktop only) */}
          <ul className="hidden lg:flex gap-5 items-center">
            {links.map(({ href, label }) => (
              <li key={href} className="list-none">
                <Link
                  href={href}
                  className={clsx(
                    "text-md font-normal",
                    pathname === href
                      ? "text-[#0E121B] underline"
                      : "text-[#0E121B] hover:underline"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buttons (desktop only) */}
          <div className="hidden lg:flex">
            <Link
              href="#"
              className="ml-4 bg-white hover:bg-white hover:text-black hover:underline text-md font-normal text-[#0E121B] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              Login
            </Link>
            <Link
              href="#"
              className="ml-4 bg-[#00A991] hover:bg-[#3da697] text-white px-4 text-sm py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Dropdown absolutely positioned */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white z-40 shadow-lg p-4 space-y-4 lg:hidden">
            <ul className="flex flex-col gap-3">
              {links.map(({ href, label }) => (
                <li key={href} className="list-none">
                  <Link
                    href={href}
                    className={clsx(
                      "block text-md font-normal",
                      pathname === href
                        ? "text-[#0E121B] underline"
                        : "text-[#0E121B] hover:underline"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="bg-white hover:underline text-md font-normal text-[#0E121B] px-4 py-2 rounded-lg transition-colors text-left"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="#"
                className="bg-[#00A991] hover:bg-[#3da697] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
