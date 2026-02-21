"use client";

import { Button } from "@/components/shadcnui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navbarLinks =
    pathName === "/products"
      ? [{ name: "Home", href: "/" }]
      : [
          { name: "Home", href: "/" },
          { name: "About", href: "#about" },
          { name: "Products", href: "#products" },
          { name: "Contact", href: "#contact" },
        ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/Hero_Logo2.png"
                alt="CircuitBay"
                width={140}
                height={40}
                priority
                className={`h-auto transition-all duration-300 ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navbarLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    scrolled
                      ? "text-foreground/70 hover:text-foreground hover:bg-secondary"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                asChild
                size="sm"
                className="ml-3 bg-brand hover:bg-brand-dark text-white rounded-lg"
              >
                <Link href="/products">
                  <ShoppingCart className="w-4 h-4 mr-1.5" />
                  Shop
                </Link>
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-foreground hover:bg-secondary"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Image
            src="/images/Hero_Logo2.png"
            alt="CircuitBay"
            width={120}
            height={36}
            className="h-auto"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-1">
          {navbarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-border mt-3 pt-4">
            <Button
              asChild
              className="w-full bg-brand hover:bg-brand-dark text-white rounded-lg"
            >
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Shop All Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
