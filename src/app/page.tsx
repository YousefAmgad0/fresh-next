
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-gray-50 px-6 py-24 text-center md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-gray-500">
          Your Shopping Destination
        </p>

        <h1
          id="hero-title"
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
        >
          Welcome to ShopMart
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl md:leading-8">
          Discover a wide range of products, explore the latest trends, and
          find everything you need in one place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-xl px-10 text-base sm:w-auto"
          >
            <Link href="/products">Shop Now</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 w-full rounded-xl border-2 px-10 text-base sm:w-auto"
          >
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
