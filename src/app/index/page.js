"use client"

import Navbar from "@/components/navbar/navbar";
import { Component, Microchip, WifiHigh, Zap } from "lucide-react";

export default function Index() {
  return (
    <>
      <Navbar />
      {/* Hero section */}
      <div className="bg-linear-to-r from-blue-500 to-blue-400 px-5 h-[400px] flex items-center">
        <div className="grid grid-cols-2 gap-8">
          {/* Left side */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-primary-foreground">
              Power your Innovation
            </h1>
            <h1 className="text-4xl font-bold text-primary-foreground">
              with quality components
            </h1>
            <p className="text-md text-primary-foreground">
              From Arduino boards to sensors, we provide premium electronics and IoT components
              for your project. If you're a student, hobbyist, or developer who wishes to build circuits,
              build your next breakthrough project with CircuitBay.
            </p>
          </div>

          {/* Right side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary h-24 flex flex-col items-center justify-center rounded-sm">
              <Microchip  size={28} />
              <p>Microcontrollers</p>
            </div>
            <div className="bg-secondary h-24 flex flex-col items-center justify-center rounded-sm">
              <WifiHigh  size={28}  />
              <p>IoT</p>
            </div>
            <div className="bg-secondary h-24 flex flex-col items-center justify-center rounded-sm">
              <Zap  size={28}  />
              <p>Sensors</p>
            </div>
            <div className="bg-secondary h-24 flex flex-col items-center justify-center rounded-sm">
              <Component  size={28}  />
              <p>Components</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
