"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcnui/navigation-menu";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { Menu, X } from "lucide-react";

export default function Navbar2() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navbarLinks = [
    { name: "link1", href: "/" },
    { name: "link2", href: "/about" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="p-3 bg-secondary flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src="/images/Hero_Logo.png" alt="Logo" className="w-[180px]" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navbarLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuLink
                    className="bg-secondary text-secondary-foreground"
                    asChild
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden">
          <Button variant="secondary" size="icon" className="size-8" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            <Menu />
          </Button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden z-50`}
      >
        <div className="flex flex-row items-center border-b pb-4">
          <Link
            href="/"
            className="cursor-pointer text-red-600 font-bold text-xl pt-4 ps-4"
          >
            NEXTNEWS
          </Link>

          {/* Close btn */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Close menu"
            className="absolute top-4 right-4 text-slate-600 hover:text-red-500"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <ul className="flex flex-col h-full gap-4 p-4">
          {navbarLinks.map((item) => (
            <li
              key={item.name}
              className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-red-500"
            >
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
