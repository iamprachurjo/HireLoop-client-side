"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../public/assets/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Centralized navigation links for cleaner code
  const navLinks = [
    { name: "Find Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/for-recruiters" },
  ];

  // Framer Motion variants for the mobile menu animation
  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo - Left Aligned */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="Company Logo" width={100} height={32} priority />
            </Link>
          </div>

          {/* Desktop Navigation - Right Aligned */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-gray-700" />

            {/* Desktop Auth Section */}
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-sm font-medium text-purple-500 hover:text-purple-400 transition-colors"
              >
                Sign in
              </Link>
              <Button
                as={Link}
                href="/signup"
                className="bg-white text-black font-medium rounded-xl px-5"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-purple-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu with Framer Motion */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-gray-800 bg-black"
            >
              <ul className="flex flex-col gap-2 text-base font-medium px-2 py-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className="block py-3 px-4 hover:bg-gray-900 rounded-xl transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                
                <li className="mt-2 border-t border-gray-800 pt-2">
                  <Link
                    href="/signin"
                    onClick={toggleMenu}
                    className="block py-3 px-4 text-purple-400 hover:bg-gray-900 rounded-xl transition-colors"
                  >
                    Sign in
                  </Link>
                </li>
                <li className="mt-2 px-2">
                  <Button
                    as={Link}
                    href="/signup"
                    onClick={toggleMenu}
                    className="w-full bg-white text-black font-medium rounded-xl py-6"
                  >
                    Get Started
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}