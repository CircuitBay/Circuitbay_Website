"use client";

import { Button } from "@/components/shadcnui/button";
import {
  ArrowLeft,
  Search,
  X,
  Package,
  PackageOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import PreLoader from "@/components/PreLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductCard, ProductSkeleton } from "@/components/ProductCard";
import { usePreloader } from "@/hooks/usePreloader";
import { API_BASE, getCategoryIcon } from "@/lib/constants";

const PAGE_SIZE = 12;

export default function Products() {
  const isLoading = usePreloader();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [fetching, setFetching] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [page, setPage] = useState(1);
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);

  const fetchProducts = useCallback(async (currentPage, category, search) => {
    try {
      setFetching(true);
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(PAGE_SIZE),
      });
      if (category) {
        params.set("category", category);
      }
      const q = search.trim();
      if (q) {
        params.set("search", q);
      }
      const res = await fetch(`${API_BASE}/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setMeta(data.metadata || null);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(page, activeCategory, debouncedSearch);
  }, [page, activeCategory, debouncedSearch, fetchProducts]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 350);
  };

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setActiveCategory("");
    setPage(1);
    searchInputRef.current?.focus();
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || activeCategory !== "";

  const totalPages = meta?.totalPages || 1;
  const totalDocs = meta?.totalDocs || 0;
  const apiCategories = meta?.categories || [];

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
            {/* "All" pill */}
            <button
              onClick={() => handleCategoryChange("")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === ""
                  ? "bg-brand text-white shadow-md shadow-brand/25"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              All
              {totalDocs > 0 && (
                <span
                  className={`text-xs tabular-nums ${
                    activeCategory === ""
                      ? "text-white/70"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {totalDocs}
                </span>
              )}
            </button>

            {apiCategories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              const Icon = getCategoryIcon(cat.name);
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-brand text-white shadow-md shadow-brand/25"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                  <span
                    className={`text-xs tabular-nums ${
                      isActive
                        ? "text-white/70"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {cat.count}
                  </span>
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
                    {totalDocs}
                  </span>{" "}
                  product{totalDocs !== 1 ? "s" : ""}
                  {hasActiveFilters && (
                    <span className="text-muted-foreground/70">
                      {" "}
                      &middot; filtered
                    </span>
                  )}
                  {totalPages > 1 && (
                    <span className="text-muted-foreground/70">
                      {" "}
                      &middot; page {page} of {totalPages}
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {fetching ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
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
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {products.map((item, index) => (
                  <ProductCard key={item.slug || index} item={item} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    let start = Math.max(2, page - 1);
    let end = Math.min(totalPages - 1, page + 1);

    if (page <= 3) {
      end = Math.min(4, totalPages - 1);
    } else if (page >= totalPages - 2) {
      start = Math.max(totalPages - 3, 2);
    }

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10 pt-6 border-t border-border/40">
      <button
        onClick={() => {
          onPageChange(page - 1);
          scrollUp();
        }}
        disabled={page <= 1}
        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {getPageNumbers().map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => {
              onPageChange(p);
              scrollUp();
            }}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
              p === page
                ? "bg-brand text-white shadow-sm shadow-brand/25"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => {
          onPageChange(page + 1);
          scrollUp();
        }}
        disabled={page >= totalPages}
        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary text-muted-foreground hover:text-foreground"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
