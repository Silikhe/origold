import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useEcommerce } from "@/contexts/ecommerce";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  head: () => ({
    meta: [
      { title: "My Wishlist — Ori Gold Naturals" },
      { name: "description", content: "View and manage your favorite Ori Gold Naturals products." },
    ],
  }),
});

function Wishlist() {
  const { state, dispatch } = useEcommerce();
  const { wishlist } = state;

  if (wishlist.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream">
          <div className="max-w-[1320px] mx-auto px-8 py-24">
            <div className="text-center">
              <Heart className="w-24 h-24 text-muted-foreground mx-auto mb-8" />
              <h1 className="font-display text-4xl text-emerald mb-4">Your wishlist is empty</h1>
              <p className="text-muted-foreground mb-8">Save products you love for later.</p>
              <Link
                to="/products"
                className="bg-emerald text-primary-foreground px-8 py-3 uppercase tracking-widest text-sm hover:bg-foreground transition inline-block"
              >
                Shop Products
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="max-w-[1320px] mx-auto px-8 py-24">
          <div className="flex items-center gap-4 mb-12">
            <Heart className="w-8 h-8 text-emerald" />
            <h1 className="font-display text-4xl text-emerald">My Wishlist</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <div
                key={product.slug}
                className="bg-background border border-border overflow-hidden group"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_WISHLIST", productId: product.slug })
                    }
                    className="absolute top-4 right-4 w-8 h-8 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-emerald text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg text-emerald mt-1 group-hover:text-gold transition">
                    {product.name}
                  </h3>
                  <p className="text-base text-foreground mt-2">
                    KES {product.price.toFixed(2)}
                    {product.compareAt && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        KES {product.compareAt.toFixed(2)}
                      </span>
                    )}
                  </p>
                  <Button
                    className="w-full mt-4 bg-emerald text-primary-foreground hover:bg-foreground"
                    onClick={() => dispatch({ type: "ADD_TO_CART", product })}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
