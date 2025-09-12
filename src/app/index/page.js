"use client"

import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/shadcnui/button";
import { Award, Component, Microchip, Phone, ShoppingCart, Truck, UsersRound, WifiHigh, Zap } from "lucide-react";

export default function Index() {
  return (
    <>
      <Navbar />
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          {/* Left side */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
              Power your Innovation <br className="hidden sm:block" />
              with Quality Components
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-primary-foreground/90 max-w-2xl mx-auto lg:mx-0">
              From Arduino boards to sensors, we provide premium electronics and IoT
              components for your projects. Whether you're a student, hobbyist, or
              developer, build your next breakthrough project with{" "}
              <span className="font-semibold">CircuitBay</span>.
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-secondary text-foreground-secondary w-full sm:w-48 lg:w-56 hover:bg-secondary/10 hover:text-secondary transition">
                <Phone className="mr-2" /> Contact Us
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-48 lg:w-56 bg-secondary/10 border-secondary text-secondary hover:bg-secondary hover:text-foreground transition"
              >
                <ShoppingCart className="mr-2" /> Shop Components
              </Button>
            </div>
          </div>

          {/* Right side */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-secondary h-28 sm:h-32 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition">
              <Microchip size={28} className="mb-2 sm:mb-3" />
              <p className="text-sm sm:text-base font-medium">Microcontrollers</p>
            </div>
            <div className="bg-secondary h-28 sm:h-32 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition">
              <WifiHigh size={28} className="mb-2 sm:mb-3" />
              <p className="text-sm sm:text-base font-medium">IoT</p>
            </div>
            <div className="bg-secondary h-28 sm:h-32 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition">
              <Zap size={28} className="mb-2 sm:mb-3" />
              <p className="text-sm sm:text-base font-medium">Sensors</p>
            </div>
            <div className="bg-secondary h-28 sm:h-32 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition">
              <Component size={28} className="mb-2 sm:mb-3" />
              <p className="text-sm sm:text-base font-medium">Components</p>
            </div>
          </div>
        </div>
      </div>



      {/* Why you choose us */}
      <div className="bg-foreground-secondary px-8 py-12 h-[500px] flex flex-col justify-between">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Why choose CircuitBay?</h1>
          <p className="text-base text-muted-foreground">
            We understand the needs of makers, students, and developers. That's why we
            curate only the best components for your projects.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
          {/* Card 1 */}
          <div className="bg-secondary p-6 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white mb-4">
              <Truck />
            </div>
            <h2 className="font-semibold mb-2">Fast Delivery</h2>
            <p className="text-sm text-muted-foreground">
              Quick and reliable shipping to get your components when you need them.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-secondary p-6 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white mb-4">
              <Award />
            </div>
            <h2 className="font-semibold mb-2">Quality Assured</h2>
            <p className="text-sm text-muted-foreground">
              All components are tested and verified to ensure top-notch standards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-secondary p-6 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white mb-4">
              <UsersRound />
            </div>
            <h2 className="font-semibold mb-2">Community Support</h2>
            <p className="text-sm text-muted-foreground">
              Join our community of makers and get help with projects and parts.
            </p>
          </div>
        </div>
      </div>


    </>
  );
}
