import { Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  EMAIL,
  PHONE,
  PHONE_DISPLAY,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Image
              src="/images/Hero_Logo.png"
              alt="CircuitBay"
              width={140}
              height={40}
              className="h-auto mb-4"
            />
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              India&apos;s trusted source for quality electronics and IoT
              components. Built for students, hobbyists, and developers who want
              to create amazing things.
            </p>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-white transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a
                  href={`tel:${PHONE}`}
                  className="hover:text-white transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">CircuitBay</span>. All
            rights reserved.
          </p>
          <p className="text-slate-500">
            Built with care for makers and innovators.
          </p>
        </div>
      </div>
    </footer>
  );
}
