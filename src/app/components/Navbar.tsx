"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <nav className="bg-[#121212] md:flex font-inter md:justify-center py-5 px-3  w-full ">
        <div className="flex items-center justify-between md:max-w-6xl w-full ">
          {/* Logo */}
          <div className=" items-center hidden md:flex gap-2">
            <Image
              className="dark:invert"
              src="/svg/logo.svg"
              alt="ehr logo"
              width={180}
              height={180}
            />
          </div>
          <div className="flex items-center md:hidden gap-2">
            <Image
              className="dark:invert h-9 w-auto"
              src="/photos/logo.png"
              alt="ehr logo"
              width={130}
              height={130}
            />
          </div>

          {/* Hamburger (mobile only) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#0E121B] focus:outline-none"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Image
                  src="/svg/hamburgerMenu.svg"
                  alt="hamburger"
                  width={30}
                  height={30}
                />
              )}
            </button>
          </div>

          {/* Links (desktop only) */}
          <ul className="hidden md:flex gap-5 items-center ">
            {links.map(({ href, label }) => (
              <li key={href} className="list-none">
                <Link
                  href={href}
                  className={clsx(
                    "text-sm font-medium text-white",
                    pathname === href ? " underline" : " hover:underline"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dropdown absolutely positioned */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white z-40 shadow-lg p-4 space-y-4 md:hidden">
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
          </div>
        )}
      </nav>
    </div>
  );
}
