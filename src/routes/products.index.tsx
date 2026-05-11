import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { useEcommerce } from "@/contexts/ecommerce";
import { formatCurrency } from "@/lib/currency";
import { Heart, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/products/")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Shop All — Ori Gold Naturals Shea Butter Skincare" },
      {
        name: "description",
        content:
          "Browse our full collection of small-batch shea butter body butters, oils, and natural skincare essentials.",
      },
    ],
  }),
});

const categories = ["All", "Body Butters", "Body Oils", "Bath", "Lip Care", "Lotions", "Face"];

function ProductsPage() {
  const { state, dispatch } = useEcommerce();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory,
  );
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <section className="bg-cream">
        <div className="max-w-330 mx-auto px-6 sm:px-8 py-20 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Shop All</span>
          <h1 className="font-display text-5xl md:text-6xl text-emerald mt-4">
            The Full Collection
          </h1>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Hand-whipped shea butter skincare for face, body, and bath — crafted in small batches
            with raw, ethically sourced ingredients.
          </p>
        </div>
      </section>

      <section className="max-w-330 mx-auto px-6 sm:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 border-b border-border pb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={`text-[11px] uppercase tracking-widest px-4 py-2 transition ${activeCategory === c ? "bg-emerald text-primary-foreground" : "border border-border text-foreground hover:border-emerald"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="text-xs uppercase tracking-widest border-b border-foreground bg-transparent py-2"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14">
          {sortedProducts.map((p) => {
            const isInWishlist = state.wishlist.some((wp) => wp.slug === p.slug);
            return (
              <div key={p.slug} className="group relative">
                <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
                  <div className="aspect-4/5 overflow-hidden bg-cream relative">
                    {p.badge && (
                      <span className="absolute top-4 left-4 z-10 bg-emerald text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1">
                        {p.badge}
                      </span>
                    )}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      loading="lazy"
                      width={800}
                      height={1000}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        {p.comingSoon ? (
                          <div className="w-10 h-10 bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground text-xs">
                            Coming Soon
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch({ type: "ADD_TO_CART", product: p });
                            }}
                            className="w-10 h-10 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (isInWishlist) {
                              dispatch({ type: "REMOVE_FROM_WISHLIST", productId: p.slug });
                            } else {
                              dispatch({ type: "ADD_TO_WISHLIST", product: p });
                            }
                          }}
                          className={`w-10 h-10 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background ${isInWishlist ? "text-red-500" : ""}`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {p.tagline}
                    </p>
                    <h3 className="font-display text-lg text-emerald mt-1 group-hover:text-gold transition">
                      {p.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base text-foreground">
                        {formatCurrency(p.price, state.currency)}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
