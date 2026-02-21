"use client";

import { Button } from "@/components/shadcnui/button";
import {
  ArrowLeft,
  Search,
  X,
  PackageOpen,
} from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import PreLoader from "@/components/PreLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductCard, ProductSkeleton } from "@/components/ProductCard";
import { usePreloader } from "@/hooks/usePreloader";
import { API_BASE, CATEGORIES } from "@/lib/constants";

export default function Products() {
  const isLoading = usePreloader();
  const [allProducts, setAllProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${API_BASE}/products?limit=200`);
        const data = await res.json();
        setAllProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchAllProducts();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 250);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setActiveCategory("all");
    searchInputRef.current?.focus();
  };

  const filteredProducts = useMemo(() => {
    let results = allProducts;

    if (activeCategory !== "all") {
      results = results.filter((p) => p.category === activeCategory);
    }

    const q = debouncedSearch.trim().toLowerCase();
    if (q) {
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    return results;
  }, [allProducts, activeCategory, debouncedSearch]);

  const categoryCounts = useMemo(() => {
    const counts = { all: allProducts.length };
    for (const p of allProducts) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [allProducts]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || activeCategory !== "all";

  if (isLoading) return <PreLoader />;

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="hero-gradient pt-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Home
              </Link>
            </Button>
          </div>

          <div className="max-w-2xl mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
              Products
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Browse our catalog of electronics and IoT components. Pick what
              you need, message us on WhatsApp, and we&apos;ll deliver it to
              your doorstep.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for Arduino, sensors, cables..."
              className="w-full h-12 pl-12 pr-12 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-white/30 backdrop-blur-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDebouncedSearch("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category filters */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count = categoryCounts[cat.key] || 0;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-brand text-white shadow-md shadow-brand/25"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                  {!fetching && (
                    <span
                      className={`text-xs ml-0.5 ${
                        isActive ? "text-white/70" : "text-muted-foreground/60"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition-colors whitespace-nowrap ml-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="py-8 lg:py-12 bg-surface min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {fetching ? (
                "Loading products..."
              ) : (
                <>
                  <span className="font-medium text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  {hasActiveFilters &&
                    filteredProducts.length !== allProducts.length && (
                      <>
                        of{" "}
                        <span className="font-medium text-foreground">
                          {allProducts.length}
                        </span>{" "}
                      </>
                    )}
                  product{filteredProducts.length !== 1 ? "s" : ""}
                  {hasActiveFilters && (
                    <span className="text-muted-foreground/70">
                      {" "}
                      &middot; filtered
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {fetching ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <PackageOpen className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No products found
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                {searchQuery
                  ? `Nothing matches "${searchQuery}". Try a different search term or category.`
                  : "No products in this category yet. Check back soon!"}
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="rounded-xl"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((item, index) => (
                <ProductCard key={item.slug || index} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
