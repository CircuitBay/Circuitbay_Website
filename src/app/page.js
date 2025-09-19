"use client"

import { useEffect, useState } from "react";
import Index from "./index/page";
import PreLoader from "@/components/PreLoader";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading ? <PreLoader /> : <Index />}
    </>
  );
}
