"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, Sun, Moon } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const openDaySchedule = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-dayschedule"));
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background border-b border-border-subtle ${
        isScrolled
          ? "py-3 shadow-xl"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Using actual uploaded image logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/Logo_SparkMedia_dark.png"
              alt="SparkMedia logo"
              className="logo-dark-theme h-[36px] sm:h-[40px] md:h-[44px] lg:h-[46px] w-auto object-contain transition-all duration-300"
            />
            <img
              src="/Logo_SparkMedia_light.png"
              alt="SparkMedia logo"
              className="logo-light-theme h-[36px] sm:h-[40px] md:h-[44px] lg:h-[46px] w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Right Actions (CTA & Theme Toggle swapped) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={openDaySchedule}
              className="btn-yellow px-5 py-2.5 text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 text-text-secondary hover:text-text-primary transition-colors bg-white/5 hover:bg-white/10 rounded-lg border border-border-subtle cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-text-primary" />}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors bg-white/5 rounded-lg border border-border-subtle cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5 text-accent" /> : <Moon className="w-4.5 h-4.5 text-text-primary" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Minimalistic, no middle links) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border-subtle px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDaySchedule();
              }}
              className="w-full btn-yellow py-3 text-center text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
