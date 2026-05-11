import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Leaf, Truck, ShieldCheck, Star, ArrowRight, Droplet } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { products } from "@/lib/products";
import { useEcommerce } from "@/contexts/ecommerce";
import { formatCurrency } from "@/lib/currency";
import { Heart, ShoppingCart } from "lucide-react";
import sheaHero from "@/assets/imgs/img.jpeg";
import sheaCollection from "@/assets/shea-collection.png";
import sheaLifestyle1 from "@/assets/shea-lifestyle-1.jpg";
import sheaLifestyle2 from "@/assets/shea-lifestyle-2.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ori Gold Naturals" },
      {
        name: "description",
        content:
          "Small-batch, hand-crafted shea butter skincare made from raw, fair-trade ingredients.",
      },
    ],
  }),
});

function Hero() {
  return (
    <section className="bg-cream">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-24 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Hand-crafted in small batches
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-emerald leading-tight mt-6">
            Nourish Your Skin with Nature’s Gold
          </h1>
          <p className="mt-8 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Experience deep, lasting moisture with Ori Gold Naturals, hand-crafted Shea Body Butter
            collection made from pure, natural ingredients.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to="/products"
              className="w-full sm:w-auto bg-emerald text-primary-foreground px-10 py-4 uppercase tracking-widest text-xs text-center hover:bg-foreground transition"
            >
              Shop Collection
            </Link>
            <a
              href="#story"
              className="w-full sm:w-auto border border-emerald text-emerald px-10 py-4 uppercase tracking-widest text-xs text-center hover:bg-emerald hover:text-primary-foreground transition"
            >
              Our Story
            </a>
          </div>
        </div>
        <div className="aspect-square overflow-hidden">
          <img
            src={sheaHero}
            alt="Whipped shea butter jar"
            className="w-full h-auto object-cover"
            width={1024}
            height={1024}
          />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: Leaf,
      title: "Pure, hand-whipped Shea Butter",
      desc: "Nourishing every layer of skin with a silky finish.",
    },
    {
      icon: Droplet,
      title: "Natural essential oils for every skin need",
      desc: "Calming, brightening, and moisturizing with clean botanicals.",
    },
    {
      icon: Sparkles,
      title: "Enriched with vitamins for radiant skin",
      desc: "Vitamin-rich blends support softness and luminosity.",
    },
    {
      icon: ShieldCheck,
      title: "Luxurious moisture, naturally inspired",
      desc: "Deep hydration without synthetic additives or heaviness.",
    },
  ];
  return (
    <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-border">
      {items.map((it) => (
        <div key={it.title} className="flex items-start gap-4">
          <it.icon className="w-7 h-7 text-gold shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-lg text-emerald">{it.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{it.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function FeaturedProducts() {
  const { state, dispatch } = useEcommerce();

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-24">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Bestsellers</span>
        <h2 className="font-display text-5xl text-emerald mt-3">The Collection</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Discover our most-loved formulas, made from raw shea butter and pure botanical oils.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.slice(0, 6).map((p) => {
          const isInWishlist = state.wishlist.some((wp) => wp.slug === p.slug);
          return (
            <div key={p.slug} className="group relative">
              <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
                <div className="aspect-square overflow-hidden bg-cream relative">
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
                    height={800}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch({ type: "ADD_TO_CART", product: p });
                        }}
                        className="w-10 h-10 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
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
                    {p.category}
                  </p>
                  <h3 className="font-display text-lg text-emerald mt-1 group-hover:text-gold transition">
                    {p.name}
                  </h3>
                  <p className="text-base text-foreground mt-2">
                    {formatCurrency(p.price, state.currency)}
                    {p.compareAt && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        {formatCurrency(p.compareAt, state.currency)}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-16">
        <Link
          to="/products"
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-widest border border-emerald text-emerald px-10 py-4 hover:bg-emerald hover:text-primary-foreground transition"
        >
          View All Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="bg-cream">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28 grid gap-16 md:grid-cols-2 items-center">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={sheaLifestyle2}
            alt="Hands holding shea nuts"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1024}
            height={1280}
          />
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Why Ori Gold Naturals
          </span>
          <h2 className="font-display text-5xl text-emerald mt-4 leading-tight">
            A Ritual of Nourishment
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed text-lg">
            Ori Gold Naturals blends hand-whipped shea butter with natural essential oils and
            vitamin-rich botanicals. Each formula is designed to deliver deep, lasting moisture and
            radiant skin with a premium, minimal approach.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
            Our collection is made in small batches using clean, thoughtfully sourced ingredients.
            The result is skincare that feels luxurious, effective, and rooted in nature.
          </p>
          <Link
            to="/our-story"
            className="inline-flex items-center gap-3 mt-10 text-[11px] uppercase tracking-widest text-emerald border-b border-emerald pb-2 hover:text-gold hover:border-gold transition"
          >
            Read Our Journey <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PeopleAlsoLoved() {
  const { state } = useEcommerce();

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Trending</span>
          <h2 className="font-display text-4xl text-emerald mt-3">People Also Loved</h2>
        </div>
      </div>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-6">
          {products.map((p) => (
            <CarouselItem key={p.slug} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
              <Link to="/products/$slug" params={{ slug: p.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-cream">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                </div>
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg text-emerald group-hover:text-gold transition">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{p.category}</p>
                  </div>
                  <p className="text-base text-foreground">
                    {formatCurrency(p.price, state.currency)}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-12" />
        <CarouselNext className="-right-4 md:-right-12" />
      </Carousel>
    </section>
  );
}

function Banner() {
  const { state } = useEcommerce();

  return (
    <section className="bg-emerald text-primary-foreground">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-24 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Limited Edition</span>
          <h2 className="font-display text-5xl mt-4 leading-tight">The Ritual Set</h2>
          <p className="mt-6 opacity-80 max-w-md leading-relaxed">
            Body butter, body oil, and our signature soap — bundled together in a hand-stitched
            linen pouch. Save 20% when you bundle.
          </p>
          <button className="mt-10 bg-gold text-gold-foreground px-10 py-4 uppercase tracking-widest text-xs hover:opacity-90 transition">
            Shop The Set — {formatCurrency(79, state.currency)}
          </button>
        </div>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={sheaCollection}
            alt="Shea collection"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1280}
            height={896}
          />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Amelia R.",
      text: "The whipped body butter is the best moisturizer I've ever used. My skin feels like silk.",
      rating: 5,
    },
    {
      name: "Noor K.",
      text: "I've replaced every product on my shelf with Ori Gold Naturals. The quality is unreal.",
      rating: 5,
    },
    {
      name: "Sasha P.",
      text: "Beautifully made, beautifully scented, and you can feel the care in every jar.",
      rating: 5,
    },
  ];
  return (
    <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-24">
      <div className="text-center mb-16">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Reviews</span>
        <h2 className="font-display text-4xl text-emerald mt-3">Loved by Skin</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((r) => (
          <div key={r.name} className="bg-cream p-10">
            <div className="flex gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-6 text-foreground leading-relaxed font-display text-lg italic">
              "{r.text}"
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest text-emerald">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-cream">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-24 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="hidden md:block aspect-[3/4] overflow-hidden">
          <img
            src={sheaLifestyle1}
            alt="Glowing skin"
            className="w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={1024}
          />
        </div>
        <div className="md:col-span-2 text-center md:text-left">
          <h2 className="font-display text-4xl text-emerald">Subscribe to our newsletter</h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Be the first to hear about new launches, ingredient stories, and reader-only offers.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-background border border-border px-5 py-4 text-sm focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-emerald text-primary-foreground px-8 py-4 uppercase tracking-widest text-xs hover:bg-foreground transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <FeaturedProducts />
      <Story />
      <PeopleAlsoLoved />
      <Banner />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
