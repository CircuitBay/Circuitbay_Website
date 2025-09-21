"use client";

import { Button } from "@/components/shadcnui/button";
import {
    MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import PreLoader from "@/components/PreLoader";
import Navbar from "@/components/Navbar";

export default function Products() {

    const [isLoading, setIsLoading] = useState(true);
    const [stockList, setStocklist] = useState([]);

    // Preloader on page load, 3 sec
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

    // Gets stack list when page loads
    useEffect(() => {
        getStockList();
    }, []);

    // Added preloader
    if (isLoading) {
        return <PreLoader />
    }

    return (
        <>
            <Navbar />
            <section
                id="products"
                className="bg-foreground-secondary px-6 md:px-12 py-16"
            >
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Products
                    </h1>
                    <p className="text-base text-muted-foreground">
                        &ldquo;We are pleased to share our currently available products. Simply choose one, send us a message, and we&apos;ll have it delivered right to your doorstep.&quot;
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mt-12">
                    {stockList.length === 0 ? (
                        <p className="text-center text-gray-500 animate-pulse text-sm">Loading stock list...</p>
                    ) : (
                        <>
                            {stockList
                                .filter((item) => item["Stock Left"] > 0) // remove items with 0 stock
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
                        <Link href="/">Go to home</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}