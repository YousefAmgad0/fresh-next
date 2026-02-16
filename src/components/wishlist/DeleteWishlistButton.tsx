"use client";

import { reomveWishlistItem } from "@/app/_actions/wishlist.action";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteWishlistButton({ prodID }: { prodID: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await reomveWishlistItem(prodID);
      router.refresh(); // 🔥 يعمل re-fetch للـ server component
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      variant="destructive"
      className="flex items-center gap-2 cursor-pointer w-full mt-3"
    >
      Remove
      {loading && <Loader2 className="animate-spin"/>}
    </Button>
  );
}
