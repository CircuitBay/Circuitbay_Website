import Image from "next/image";

export default function PreLoader() {
  return (
    <div className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-brand/20 animate-ping" />
        <div className="relative animate-pulse-soft">
          <Image
            src="/images/Icon_ blue.png"
            alt="CircuitBay"
            width={48}
            height={48}
            priority
          />
        </div>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-brand"
            style={{
              animation: `pulse-soft 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
