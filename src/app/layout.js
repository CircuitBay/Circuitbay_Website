import "./globals.css";
import localFont from "next/font/local";

const openSans = localFont({
  src: [
    {
      path: "/fonts/OpenSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "CircuitBay",
  description:
    "CircuitBay is an e-commerce marketplace for IoT modules, sensors, microcontrollers, robotics parts, development boards, and electronics accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.className}`}>
        {children}
      </body>
    </html>
  );
}
