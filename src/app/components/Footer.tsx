import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <div className="min-h-screen mx-auto bg-[#08221E] text-white items-center  flex flex-col">
      <div className="flex-col mx-auto md:mt-14 md:pl-0 pl-3">
        {/* top side */}
        <div className="  pt-8 justify-between flex md:flex-row flex-col">
          {/* left side */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-1.5">
              <Image
                className="dark:invert"
                src="/svg/logo.svg"
                alt="ehr logo"
                width={20}
                height={20}
              />
              <span className="font-medium  text-2xl ">EHR SYSTEM</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-regular leading-tight">
              The EHR software that does more.
            </h1>
            <div className="flex items-center gap-4 pt-6">
              <Link
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6 fill-white" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6 fill-white text-[#08221E]" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6 fill-white" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6 fill-white" />
                <span className="sr-only">Facebook</span>
              </Link>

              <Link
                href="#"
                className="ml-4 bg-[#00A991] hover:bg-[#3da697] text-white px-4 text-sm py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          {/* right side */}

          <div className="space-y-4  w-1/2 flex flex-col md:items-end md:mt-0 mt-5">
            <div className="flex flex-col items-start md:space-y-5 space-y-3">
              <h2 className="text-xl font-medium text-[#A3A3A3]">
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
                  href="#"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  Product
                </Link>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-white/80 hover:text-white text-sm  transition-colors"
                >
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <hr className="my-8 border-t border-[#343434] container mx-auto w-full" />
        <div className="container mx-auto px-4 py-8 ">
          <div className="text-sm text-[#818285] space-y-2">
            <p>
              *EHR System is a healthcare technology product of EHR System, a
              company duly incorporated in [Your Country] (Incorporation No.
              [XXXXXX]).
            </p>
            <p>
              Health data management and digital record services are provided by
              EHR System.
            </p>
            <p>© 2025 EHR System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
