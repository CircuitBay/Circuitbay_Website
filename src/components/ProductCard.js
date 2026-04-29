import { Button } from "@/components/shadcnui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { getCategoryIcon, getWhatsAppUrl } from "@/lib/constants";

export function ProductCard({ item }) {
  const inStock = item.stock.status === "in_stock";
  const hasImage = item.images && item.images.length > 0 && item.images[0];
  const FallbackIcon = getCategoryIcon(item.category);

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-slate-250 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 ${
        !inStock ? "opacity-55 grayscale-[30%]" : ""
      }`}
    >
      <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100/80 overflow-hidden">
        {hasImage ? (
          <Image
            src={item.images[0]}
            alt={item.name}
            width={200}
            height={200}
            className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2.5 text-slate-300">
            <FallbackIcon className="w-14 h-14" strokeWidth={1} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              {item.category}
            </span>
          </div>
        )}

        {!inStock && (
          <span className="absolute top-3 left-3 bg-red-500/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">
            Sold Out
          </span>
        )}
        {inStock && item.stock.quantity > 0 && item.stock.quantity <= 2 && (
          <span className="absolute top-3 left-3 bg-amber-500/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">
            Only {item.stock.quantity} left
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="inline-block text-[11px] font-semibold text-brand/70 uppercase tracking-wider mb-1.5">
          {item.category}
        </span>
        <h3 className="font-semibold text-foreground leading-snug line-clamp-2 mb-auto">
          {item.name}
        </h3>

        <div className="flex items-end justify-between gap-3 mt-4 pt-4 border-t border-border/40">
          <div>
            <span className="text-2xl font-bold text-foreground tracking-tight">
              ₹{item.price}
            </span>
            {inStock && (
              <span className="block text-[11px] text-emerald-600 font-medium mt-0.5">
                {item.stock.quantity} in stock
              </span>
            )}
          </div>
          {inStock ? (
            <Button
              asChild
              size="sm"
              className="bg-[#25D366] hover:bg-[#1fb855] text-white rounded-xl h-9 px-4 shadow-sm"
            >
              <a
                href={getWhatsAppUrl(item.name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-1.5" />
                Order
              </a>
            </Button>
          ) : (
            <Button
              disabled
              size="sm"
              variant="outline"
              className="rounded-xl h-9 text-muted-foreground cursor-not-allowed"
            >
              Sold Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border/50 bg-white">
      <div className="aspect-square skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-3 skeleton rounded-full w-1/4" />
        <div className="h-5 skeleton rounded-full w-4/5" />
        <div className="h-4 skeleton rounded-full w-3/5" />
        <div className="border-t border-border/40 pt-4 mt-4 flex justify-between items-center">
          <div className="h-7 skeleton rounded-full w-16" />
          <div className="h-9 skeleton rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}
