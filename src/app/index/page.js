"use client";

import { Button } from "@/components/shadcnui/button";
import {
  Award,
  ArrowRight,
  Cpu,
  Component,
  Instagram,
  Mail,
  Phone,
  Rocket,
  ShoppingCart,
  Truck,
  UsersRound,
  Wifi,
  Zap,
  GraduationCap,
  Wrench,
  Code2,
  Lightbulb,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import PreLoader from "@/components/PreLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductCard, ProductSkeleton } from "@/components/ProductCard";
import { usePreloader } from "@/hooks/usePreloader";
import {
  API_BASE,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  EMAIL,
  PHONE,
  PHONE_DISPLAY,
} from "@/lib/constants";

export default function Index() {
  const isLoading = usePreloader();
  const [stockList, setStocklist] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products?limit=4&featured=true`);
        const data = await res.json();
        setStocklist(data.products);
      } catch (err) {
        console.error("Error fetching stock list:", err);
      }
    };
    fetchProducts();
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  if (isLoading) return <PreLoader />;

  return (
    <>
      <Navbar />

      {/* ───── Hero ───── */}
      <section className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-sm text-blue-200 backdrop-blur-sm">
                <Zap className="w-3.5 h-3.5" />
                Trusted by makers across India
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Build the Future
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  One Circuit at a Time
                </span>
              </h1>

              <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Premium electronics and IoT components for students, hobbyists,
                and developers. From Arduino boards to sensors &mdash;
                everything you need to bring your ideas to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand hover:bg-brand-dark text-white rounded-xl text-base px-8 h-12 shadow-lg shadow-blue-500/25"
                >
                  <Link href="/products">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Browse Components
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl text-base px-8 h-12 border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                >
                  <Link href="#contact">
                    <Phone className="w-4 h-4 mr-2" />
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                {
                  icon: Cpu,
                  label: "Microcontrollers",
                  desc: "Arduino, ESP32 & more",
                  gradient: "from-blue-500/20 to-blue-600/10",
                },
                {
                  icon: Wifi,
                  label: "IoT Modules",
                  desc: "WiFi, Bluetooth, LoRa",
                  gradient: "from-purple-500/20 to-purple-600/10",
                },
                {
                  icon: Zap,
                  label: "Sensors",
                  desc: "Temperature, motion & more",
                  gradient: "from-cyan-500/20 to-cyan-600/10",
                },
                {
                  icon: Component,
                  label: "Components",
                  desc: "Resistors, capacitors, LEDs",
                  gradient: "from-emerald-500/20 to-emerald-600/10",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${item.gradient} border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group cursor-pointer`}
                >
                  <item.icon className="w-8 h-8 text-blue-300 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Why Choose Us ───── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
              Why CircuitBay
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Built for builders like you
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We understand what makers need &mdash; quality components,
              reliable delivery, and a community that has your back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Quality Assured",
                desc: "Every component is tested and verified. We source only from trusted manufacturers so you can build with confidence.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Quick and reliable shipping across India. Get your components on time, every time, so your projects stay on schedule.",
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: UsersRound,
                title: "Community Driven",
                desc: "Join a growing community of electronics enthusiasts. Get help, share projects, and discover new ideas together.",
                color: "bg-purple-50 text-purple-600",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-2xl p-8 border border-border/50"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.color} mb-5`}
                >
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Featured Products ───── */}
      <section id="products" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
                Featured
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Popular Components
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="text-brand hover:text-brand-dark group"
            >
              <Link href="/products">
                View all products
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {stockList.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : stockList.map((item, index) => (
                  <ProductCard key={item.slug || index} item={item} />
                ))}
          </div>
        </div>
      </section>

      {/* ───── Social CTA ───── */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-brand via-blue-600 to-indigo-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white rounded-full" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-6">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join the Community
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Follow us on Instagram for project ideas, new arrivals, electronics
            tips, and behind-the-scenes content.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-brand hover:bg-blue-50 rounded-xl text-base px-8 h-12 shadow-lg"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-4 h-4 mr-2" />
              {INSTAGRAM_HANDLE}
              <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-50" />
            </a>
          </Button>
        </div>
      </section>

      {/* ───── About ───── */}
      <section id="about" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
                Making quality electronics
                <br className="hidden sm:block" />
                accessible to everyone
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                CircuitBay was born from a simple idea: students and hobbyists
                in India deserve access to reliable, affordable electronics
                components without the guesswork.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                We carefully curate our inventory from trusted manufacturers,
                test every batch, and ship fast &mdash; so you can focus on what
                matters: building incredible things.
              </p>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-brand/30 text-brand hover:bg-brand hover:text-white transition-colors"
              >
                <Link href="#contact">
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Building
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: GraduationCap,
                  label: "Students",
                  desc: "College projects & learning",
                  color: "bg-blue-50 text-blue-600 border-blue-100",
                },
                {
                  icon: Wrench,
                  label: "Hobbyists",
                  desc: "DIY builds & experiments",
                  color: "bg-amber-50 text-amber-600 border-amber-100",
                },
                {
                  icon: Code2,
                  label: "Developers",
                  desc: "IoT & embedded systems",
                  color: "bg-emerald-50 text-emerald-600 border-emerald-100",
                },
                {
                  icon: Lightbulb,
                  label: "Innovators",
                  desc: "Prototypes & startups",
                  color: "bg-purple-50 text-purple-600 border-purple-100",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`card-hover border rounded-2xl p-6 flex flex-col items-center text-center ${item.color}`}
                >
                  <item.icon className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Contact ───── */}
      <section id="contact" className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Let&apos;s connect
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Have questions about a product, need bulk ordering, or want help
              picking the right components? We&apos;re here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Instagram,
                title: "Instagram",
                detail: INSTAGRAM_HANDLE,
                desc: "DM us anytime",
                link: INSTAGRAM_URL,
                color: "bg-pink-50 text-pink-600",
              },
              {
                icon: Mail,
                title: "Email",
                detail: EMAIL,
                desc: "We reply within 24 hours",
                link: `mailto:${EMAIL}`,
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Phone,
                title: "Phone",
                detail: PHONE_DISPLAY,
                desc: "Mon-Sat, 10am - 6pm",
                link: `tel:${PHONE}`,
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((card, i) => (
              <a
                key={i}
                href={card.link}
                target={card.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="card-hover bg-white rounded-2xl p-8 border border-border/50 flex flex-col items-center text-center group"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.color} mb-5`}
                >
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {card.desc}
                </p>
                <span className="text-sm font-medium text-brand group-hover:underline flex items-center gap-1">
                  {card.detail}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
