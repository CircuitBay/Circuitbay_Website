"use client";

import { Button } from "@/components/shadcnui/button";
import {
  Award,
  Braces,
  Component,
  GraduationCap,
  Hammer,
  Instagram,
  Lightbulb,
  Mail,
  Microchip,
  Phone,
  ShoppingCart,
  Truck,
  UsersRound,
  WifiHigh,
  Zap,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import PreLoader from "@/components/PreLoader";
import Navbar from "@/components/Navbar";

export default function Index() {

  const [isLoading, setIsLoading] = useState(true);

  // Preloader
  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Get stock list
  const [stockList, setStocklist] = useState([]);

  const getStockList = async () => {
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbxEpq5vk7RTlfxiSlZDqa8xIGbNre_c_rSxdpEeRXpuDIn4PFb-zRx6V11QsaV-1zmfww/exec?path=Stock%20Status%20List");
      const listItems = await res.json();
      // console.log("listItems: ", listItems);
      setStocklist(listItems.data);
    } catch (err) {
      console.error("Error fetching stock list:", err);
    }
  };

  useEffect(() => {
    getStockList();
  }, []); // run once when component mounts

  // Avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  // Added preloader
  if (isLoading) {
    return <PreLoader />
  }

  return (
    <>
      <Navbar />
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-400 px-6 md:px-12 lg:px-20 py-16 md:py-24 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          {/* Left side */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Power your Innovation <br className="hidden sm:block" />
              with Quality Components
            </h1>
            <p className="text-base lg:text-lg text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From Arduino boards to sensors, we provide premium electronics and
              IoT components for your projects. Whether you&apos;re a student,
              hobbyist, or developer, build your next breakthrough project with{" "}
              <span className="font-semibold">CircuitBay</span>.
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                className="bg-white text-blue-color w-full sm:w-48 lg:w-56 hover:bg-white/20 hover:text-white transition"
              >
                <Link href="#contact">
                  <Phone className="mr-1" /> Contact Us
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-48 lg:w-56 bg-white/20 border-white text-white hover:bg-white hover:text-blue-color transition"
              >
                <Link href="/">
                  <ShoppingCart className="mr-1" /> Shop Components
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: Microchip, label: "Microcontrollers" },
              { icon: WifiHigh, label: "IoT" },
              { icon: Zap, label: "Sensors" },
              { icon: Component, label: "Components" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-secondary h-28 sm:h-32 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition hover:bg-secondary/20"
              >
                <item.icon size={28} className="mb-2 sm:mb-3 text-blue-color" />
                <p className="text-sm sm:text-base font-medium text-blue-color">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-foreground-secondary px-6 md:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Why choose CircuitBay?
          </h1>
          <p className="text-base text-muted-foreground">
            We understand the needs of makers, students, and developers.
            That&apos;s why we curate only the best components for your
            projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {[
            {
              icon: Truck,
              title: "Fast Delivery",
              desc: "Quick and reliable shipping to get your components when you need them.",
              color: "bg-blue-color",
            },
            {
              icon: Award,
              title: "Quality Assured",
              desc: "All components are tested and verified to ensure top-notch standards.",
              color: "bg-blue-color",
            },
            {
              icon: UsersRound,
              title: "Community Support",
              desc: "Join our community of makers and get help with projects and parts.",
              color: "bg-blue-color",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-secondary p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${card.color} text-white mb-4 shadow-md`}
              >
                <card.icon />
              </div>
              <h2 className="font-semibold text-lg mb-2">{card.title}</h2>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="bg-foreground-secondary px-6 md:px-12 py-16"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h1>
          <p className="text-base text-muted-foreground">
            Explore our most popular electronics and IoT components
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mt-12">
          {stockList.length === 0 ? (
            <p className="text-center text-gray-500 animate-pulse text-sm">Loading stock list...</p>
          ) : (
            <>
              {stockList
                .filter((item) => item["Stock Left"] > 0) // remove items with 0 stock
                .slice(0, 4) // still limit to 4
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100"
                  >
                    {/* Image */}
                    <div className="h-44 flex items-center justify-center bg-gray-50">
                      <Image
                        src={item["Image"]}
                        alt={item["Component Name"]}
                        width={180}
                        height={180}
                        className="h-full object-contain p-4"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 text-left">
                      <h2 className="font-semibold text-lg mb-2 text-gray-800">
                        {item["Component Name"]}{" "}
                        <span className="text-sm text-gray-500">({item.Category})</span>
                      </h2>

                      {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        Lorem Ipsum has been the industry&apos;s standard dummy text ever
                        since the 1500s.
                      </p> */}

                      <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                        <h3 className="text-lg font-bold text-blue-color">
                          ₹{item.Price}{" "}
                          <span className="text-sm font-medium text-gray-500">
                            | Stock: {item["Stock Left"]}
                          </span>
                        </h3>
                        <Button asChild className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-color text-white hover:bg-blue-color/90 transition-colors">
                          <a
                            href={`//api.whatsapp.com/send?phone=918281461307&text=Hi, I would love to buy/know about this ${encodeURIComponent(item["Component Name"])}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        {/* View all */}
        <div className="flex justify-center mt-12">
          <Button asChild className="w-full sm:w-auto px-6 bg-blue-color text:white hover:bg-blue-color/90">
            <Link href="/products">View all products</Link>
          </Button>
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="bg-white/20 p-4 rounded-full">
              <Instagram className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Follow us on Instagram
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed">
            Stay updated with our latest products, project ideas, and
            electronics tips. Join our community of makers and innovators!
          </p>
          <Button
            asChild
            className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-pink-100 transition"
          >
            <a href="https://www.instagram.com/circuitbayofficial">
              <Instagram className="mr-1" /> circuitbayofficial
            </a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="px-6 md:px-12 lg:px-20 py-16 bg-foreground-secondary"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground leading-tight">
              About CircuitBay
            </h1>
            <p className="text-base lg:text-lg text-secondary-foreground/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              CircuitBay was founded with a simple mission: to make quality
              electronics and IoT components accessible to students, hobbyists,
              and developers across India. <br />
              <br />
              We understand the challenges of finding reliable components for
              your projects. That&apos;s why we carefully curate our inventory
              to include only the best products from trusted manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: GraduationCap,
                label: "Students",
                color: "text-blue-color",
              },
              { icon: Hammer, label: "Hobbyists", color: "text-blue-color" },
              { icon: Braces, label: "Developers", color: "text-blue-color" },
              { icon: Lightbulb, label: "Tinkerers", color: "text-blue-color" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-secondary h-28 sm:h-32 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition"
              >
                <item.icon size={32} className={`mb-2 sm:mb-3 ${item.color}`} />
                <p className="text-sm sm:text-base font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section id="contact" className="bg-muted px-6 sm:px-10 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-secondary-foreground">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Have questions about our products or need help with your project?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
          {[
            {
              icon: Instagram,
              title: "Instagram",
              desc: "Follow us for updates",
              detail: "circuitbayofficial",
              link: "https://www.instagram.com/circuitbayofficial",
              color: "bg-blue-color",
            },
            {
              icon: Mail,
              title: "Email",
              desc: "Send us an email",
              detail: "circuitbayofficial@gmail.com",
              link: "mailto:circuitbayofficial@gmail.com",
              color: "bg-blue-color",
            },
            {
              icon: Phone,
              title: "Phone",
              desc: "Call us directly",
              detail: "+91 8281461307",
              link: "tel:+91 8281461307",
              color: "bg-blue-color",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${card.color} text-white mb-4 shadow-md`}
              >
                <card.icon size={24} />
              </div>
              <h2 className="font-semibold text-lg text-secondary-foreground mb-2">
                {card.title}
              </h2>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
              <p className="text-sm font-medium mt-1 text-blue-color hover:font-bold">
                <a href={card.link}>{card.detail}</a>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand + About */}
          <div>
            <Image
              src="/images/Hero_Logo.png"
              alt="Logo"
              width={160}
              height={50}
              priority
              className="mb-4"
            />
            <p className="text-sm leading-relaxed">
              Empowering innovation with quality electronics and IoT components.
            </p>

            {/* Socials */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/circuitbayofficial"
                className="hover:text-blue-500 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sky-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="hover:text-blue-500 transition"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-blue-500 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-blue-500 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 hover:text-blue-color">
                <Instagram className="w-4 h-4" />
                <a href="https://www.instagram.com/circuitbayofficial">
                  circuitbayofficial
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-color">
                <Phone className="w-4 h-4" />
                <a href="tel:+91 8281461307">+91 8281461307</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-color">
                <Mail className="w-4 h-4" />
                <a href="mailto:circuitbayofficial@gmail.com">
                  circuitbayofficial@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
          © 2025 <span className="text-white font-semibold">CircuitBay</span>.
          All rights reserved.
          <span className="block sm:inline">
            {" "}
            Built with ❤️ for makers and innovators.
          </span>
        </div>
      </footer>
    </>
  );
}
