import React from "react";
import {
  RiInstagramLine,
  RiFacebookFill,
  RiTwitterXLine,
  RiWhatsappLine,
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
  RiCopyrightLine,
} from "@remixicon/react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* BRAND */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[0.25em] uppercase">
              AXION
            </h1>

            <p className="mt-4 text-sm tracking-[0.25em] uppercase text-gray-400">
              Create. Conquer. Evolve.
            </p>

            <div className="flex justify-center md:justify-start gap-5 mt-6">
              <RiInstagramLine
                size={22}
                className="cursor-pointer hover:text-white transition"
              />

              <RiFacebookFill
                size={22}
                className="cursor-pointer hover:text-white transition"
              />

              <RiTwitterXLine
                size={22}
                className="cursor-pointer hover:text-white transition"
              />

              <RiWhatsappLine
                size={22}
                className="cursor-pointer hover:text-white transition"
              />
            </div>
          </div>

          {/* CONTACT */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold mb-5 uppercase tracking-wider">
              Contact
            </h2>

            <div className="space-y-4 text-gray-400 text-sm">
              <p className="flex justify-center md:justify-start items-center gap-3">
                <RiPhoneLine size={18} />
                +91 79399 1218
              </p>

              <p className="flex justify-center md:justify-start items-center gap-3 break-all">
                <RiMailLine size={18} />
                bommerlatarun@gmail.com
              </p>

              <p className="flex justify-center md:justify-start items-center gap-3">
                <RiMapPinLine size={18} />
                Anywhere, Any City, 123
              </p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold mb-5 uppercase tracking-wider">
              Explore
            </h2>

            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                New Arrivals
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Men's Collection
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Women's Collection
              </li>

              <li className="hover:text-white transition cursor-pointer">
                About AXION
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
          <RiCopyrightLine size={16} />

          <p className="text-center">
            AXION Fashion © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
