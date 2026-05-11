import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Minus, Plus, Heart, Truck, Package, Check, ShieldCheck } from "lucide-react";
import { getProduct, products, type Product } from "@/lib/products";
import { useEcommerce } from "@/contexts/ecommerce";
import { formatCurrency } from "@/lib/currency";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl text-emerald">Product not found</h1>
        <Link to="/products" className="mt-6 inline-block text-gold underline">
          Back to shop
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — Ori Gold Naturals` },
      {
        name: "description",
        content: loaderData?.description ?? "Premium fitness supplement product details.",
      },
    ],
  }),
});

function ProductDetail() {
  const product = Route.useLoaderData() as Product;
  const { state, dispatch } = useEcommerce();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  const isInWishlist = state.wishlist.some((p) => p.slug === product.slug);

  const sizeOptions = [
    { id: "50g", label: "50g", price: 600, note: "Single serving" },
    { id: "250g", label: "250g", price: 1680, note: "Best value" },
  ];
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-330 mx-auto px-6 sm:px-8 pt-8 pb-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        <Link to="/" className="hover:text-emerald">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/products" className="hover:text-emerald">
          Products
        </Link>{" "}
        / <span className="text-foreground font-medium">{product.name}</span>
      </div>

      <section className="max-w-330 mx-auto px-6 sm:px-8 py-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-[96px_1fr]">
            <div className="grid gap-4">
              {product.gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden h-28 border border-border transition ${index === activeImage ? "border-gold" : "hover:border-foreground"}`}
                >
                  <img
                    src={src}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={120}
                    height={120}
                  />
                </button>
              ))}
            </div>
            <div className="overflow-hidden border border-border bg-background min-h-140 sm:min-h-170">
              <img
                src={product.gallery[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={1200}
                height={1500}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Signature Shea</p>
              <h1 className="font-display text-5xl md:text-6xl leading-tight text-foreground">
                {product.name}
              </h1>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${index < product.rating ? "fill-foreground text-foreground" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
              </div>
              <span className="border border-border px-3 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Nourishing blend
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-4xl font-semibold text-foreground">
                {formatCurrency(selectedSize.price, state.currency)}
              </p>
              <span className="text-sm uppercase tracking-[0.3em] text-gold">
                Pure. Handmade. Clean.
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Choose size
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedSize(option)}
                      className={`border p-4 text-left transition ${selectedSize.id === option.id ? "border-gold bg-cream" : "border-border bg-background hover:border-foreground"}`}
                    >
                      <p className="font-medium text-foreground">{option.label}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {formatCurrency(option.price, state.currency)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_CART",
                      product: { ...product, price: selectedSize.price },
                      quantity: qty,
                    })
                  }
                  className="flex-1 min-h-14 bg-gold text-primary-foreground uppercase tracking-[0.3em] text-sm hover:brightness-95 transition"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: isInWishlist ? "REMOVE_FROM_WISHLIST" : "ADD_TO_WISHLIST",
                      product,
                    })
                  }
                  className="flex-1 min-h-14 border border-border bg-background text-foreground uppercase tracking-[0.3em] text-sm hover:bg-cream transition"
                >
                  {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Moisture-rich formula",
              "Sustainably sourced",
              "Lightweight texture",
              "Everyday glow",
            ].map((benefit) => (
              <div key={benefit} className="border border-border bg-cream p-5">
                <p className="text-sm font-medium text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-330 mx-auto px-6 sm:px-8 pb-20 space-y-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border border-border bg-cream p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Details</p>
            <h2 className="font-display text-3xl text-foreground mt-4">
              Minimal care, maximum results
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-7">
              Pure shea butter, botanical oils, and gentle actives combine to restore softness while
              leaving skin smooth and luminous.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold mt-1" /> Natural nourishment for dry skin.
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold mt-1" /> Lightweight, non-greasy finish.
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold mt-1" /> Free from parabens and harsh additives.
              </li>
            </ul>
          </div>
          <div className="border border-border p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Shipping</p>
            <h2 className="font-display text-3xl text-foreground mt-4">Fast & careful delivery</h2>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gold mt-1" /> Orders ship same day when placed before
                3PM.
              </p>
              <p className="flex items-start gap-3">
                <Package className="w-5 h-5 text-gold mt-1" /> Secure packaging for every order.
              </p>
              <p className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-gold mt-1" /> Satisfaction guaranteed.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Related products</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {products
              .filter((p) => p.slug !== product.slug)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.slug}
                  to="/products/$slug"
                  params={{ slug: related.slug }}
                  className="group border border-border bg-background p-5 transition hover:border-gold"
                >
                  <div className="aspect-square overflow-hidden bg-cream mb-4">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    {related.category}
                  </p>
                  <h3 className="font-display text-xl text-foreground mt-3 group-hover:text-gold">
                    {related.name}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    {formatCurrency(related.price, state.currency)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
