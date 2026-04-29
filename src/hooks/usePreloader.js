"use client";

import { useState, useEffect } from "react";

export function usePreloader(timeout = 2500) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onLoad = () => setIsLoading(false);
    window.addEventListener("load", onLoad);
    const timer = setTimeout(() => setIsLoading(false), timeout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, [timeout]);

  return isLoading;
}
