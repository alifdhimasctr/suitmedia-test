
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-orange-600 z-50 text-white transition-transform duration-300 ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="navbar px-4">
        <div className="flex-1">
          <a href="/">Suitmedia</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0 mr-14">
            <li>
              <a
                href="/work"
                className={`${pathname === "/work" ? "navactive" : ""}`}
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={`${pathname === "/about" ? "navactive" : ""}`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className={`${pathname === "/services" ? "navactive" : ""}`}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/ideas"
                className={`${pathname === "/ideas" ? "navactive" : ""}`}
              >
                Ideas
              </a>
            </li>
            <li>
              <a
                href="/careers"
                className={`${pathname === "/careers" ? "navactive" : ""}`}
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className={`${pathname === "/contact" ? "navactive" : ""}`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
