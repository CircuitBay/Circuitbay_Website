import Image from "next/image";

export default function PreLoader() {
    return (
        <div className="h-dvh w-full bg-white flex justify-center items-center text-center">
            <Image
                src="/images/Icon_ blue.png"
                alt="CircuitBay"
                width={60}
                height={60}
                className="animate-pulse"
            />
        </div>
    );
}