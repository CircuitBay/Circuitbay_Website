import { LoaderPinwheel } from "lucide-react";

export default function PreLoader() {
    return (
        <div className="h-dvh w-full bg-white flex justify-center items-center text-center text-blue-color">
            <LoaderPinwheel size={48} className="animate-spin" />
        </div>
    );
}