import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
      <p className="text-5xl font-bold">ShopMart</p>
      <Loader className="animate-spin w-10 h-10 text-gray-500" />
    </div>
  );
}
