"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-orange-600 z-50 text-white transition-transform duration-300 ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="navbar px-4 flex justify-between items-center">
        <div className="flex-1">
          <a href="/" className="text-lg font-bold">Suitmedia</a>
        </div>
        <div className="flex-none">
          <button
            className="lg:hidden text-white"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <ul
            className={`menu menu-horizontal p-0 lg:flex hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:block`}
          >
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
      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-orange-600`}
      >
        <ul className="flex flex-col items-start p-4">
          <li>
            <a
              href="/work"
              className={`block py-2 ${pathname === "/work" ? "navactive" : ""}`}
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={`block py-2 ${pathname === "/about" ? "navactive" : ""}`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/services"
              className={`block py-2 ${pathname === "/services" ? "navactive" : ""}`}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/ideas"
              className={`block py-2 ${pathname === "/ideas" ? "navactive" : ""}`}
            >
              Ideas
            </a>
          </li>
          <li>
            <a
              href="/careers"
              className={`block py-2 ${pathname === "/careers" ? "navactive" : ""}`}
            >
              Careers
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className={`block py-2 ${pathname === "/contact" ? "navactive" : ""}`}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
