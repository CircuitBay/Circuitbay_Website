import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "CircuitBay - Quality Electronics & IoT Components",
  description:
    "India's trusted marketplace for IoT modules, sensors, microcontrollers, robotics parts, development boards, and electronics accessories. Quality components for students, hobbyists, and developers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
