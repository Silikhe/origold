import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Heart, Users, Leaf, Award, Sparkles, Droplet } from "lucide-react";
import sheaLifestyle2 from "@/assets/shea-lifestyle-2.jpg";
import sheaCollection from "@/assets/shea-collection.jpg";

export const Route = createFileRoute("/our-story")({
  component: OurStory,
  head: () => ({
    meta: [
      { title: "Our Story — Ori Gold Naturals" },
      {
        name: "description",
        content:
          "Learn about Ori Gold Naturals' commitment to premium, natural shea butter skincare.",
      },
    ],
  }),
});

function OurStory() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-cream border-b border-border">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28">
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Our Story</span>
              <h1 className="font-display text-6xl text-emerald mt-4 leading-tight">
                Rooted in Natural Luxury
              </h1>
              <p className="text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed text-lg">
                Ori Gold Naturals was founded to honor the rich tradition of shea butter skincare
                with premium ingredients, thoughtful sourcing, and quiet elegance. Every jar tells a
                story of craftsmanship, community, and care.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story - Text Left, Image Right */}
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Our Journey</p>
            <h2 className="font-display text-5xl text-emerald mt-4 leading-tight">
              Handcrafted from Seed to Jar
            </h2>
            <p className="text-muted-foreground mt-8 leading-relaxed text-lg">
              Every batch begins with fair-trade shea butter sourced directly from women's
              cooperatives in West Africa. We blend it with pure botanical oils and hand-finish each
              product to preserve its natural richness.
            </p>
            <p className="text-muted-foreground mt-6 leading-relaxed text-lg">
              Our approach is minimal, thoughtful, and premium. We trust the ingredients to speak
              for themselves, and design our skincare around nourishment, ritual, and timeless
              beauty. No shortcuts, no fillers—just pure results.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-gold shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Hand-whipped in small batches every week
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Leaf className="w-6 h-6 text-gold shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  100% natural ingredients, never synthetic
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-gold shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Fair-trade support for farming communities
                </span>
              </li>
            </ul>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-cream">
            <img
              src={sheaLifestyle2}
              alt="Hands holding shea nuts"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={1280}
            />
          </div>
        </section>

        {/* Ingredients & Sourcing - Image Left, Text Right */}
        <section className="bg-cream border-y border-border">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="aspect-[4/5] overflow-hidden bg-background order-2 md:order-1">
              <img
                src={sheaCollection}
                alt="Ori Gold Naturals shea butter collection"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={1280}
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
                Ingredients & Sourcing
              </p>
              <h2 className="font-display text-5xl text-emerald mt-4 leading-tight">
                Pure Shea, Pure Glow
              </h2>
              <p className="text-muted-foreground mt-8 leading-relaxed text-lg">
                Raw shea butter is the heart of every Ori Gold Naturals product. We source from
                women-led cooperatives across West Africa, ensuring fair prices, sustainable
                harvests, and positive community impact.
              </p>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-display text-xl text-emerald mb-2">The Shea Nut</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Hand-harvested and sun-dried to preserve natural nutrients. The butter is
                    extracted slowly, without heat, to maintain its healing properties.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-emerald mb-2">Botanical Oils</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Carefully selected cold-pressed oils—jojoba, argan, rosehip—complement shea with
                    additional nourishment and lightweight texture.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-emerald mb-2">No Synthetic Additives</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We never use parabens, sulfates, artificial fragrances, or stabilizers. What you
                    see is what you get.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Craftsmanship & Process - Text Left, Image Right */}
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Craftsmanship</p>
            <h2 className="font-display text-5xl text-emerald mt-4 leading-tight">
              The Art of Making
            </h2>
            <p className="text-muted-foreground mt-8 leading-relaxed text-lg">
              Our studio in Portland is where tradition meets technique. Every product is
              hand-whipped, individually finished, and tested for consistency and purity. We work in
              small batches to maintain control over every detail.
            </p>
            <div className="mt-8 space-y-6">
              <div className="bg-cream p-8 border border-border">
                <h3 className="font-display text-lg text-emerald mb-3">Whipping</h3>
                <p className="text-muted-foreground text-sm">
                  Fresh shea butter is whipped with botanical oils to create a cloud-like texture
                  that absorbs quickly without greasiness.
                </p>
              </div>
              <div className="bg-cream p-8 border border-border">
                <h3 className="font-display text-lg text-emerald mb-3">Finishing</h3>
                <p className="text-muted-foreground text-sm">
                  Hand-poured into glass jars and sealed with care. Each jar is a work of individual
                  attention.
                </p>
              </div>
              <div className="bg-cream p-8 border border-border">
                <h3 className="font-display text-lg text-emerald mb-3">Testing</h3>
                <p className="text-muted-foreground text-sm">
                  Every batch is tested for stability, fragrance consistency, and skin feel. We
                  never compromise on quality.
                </p>
              </div>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-cream">
            <img
              src={sheaLifestyle2}
              alt="Ori Gold Naturals product crafting"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={1280}
            />
          </div>
        </section>

        {/* Mission & Values */}
        <section className="bg-cream border-t border-border">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28">
            <div className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Our Mission</p>
              <h2 className="font-display text-5xl text-emerald mt-4">Beauty With Purpose</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-background p-12 border border-border">
                <Users className="w-12 h-12 text-gold mb-6" />
                <h3 className="font-display text-2xl text-emerald mb-4">Fair Sourcing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We work directly with farming cooperatives to ensure fair prices, sustainable
                  practices, and positive community impact. Every jar supports families and
                  traditions.
                </p>
              </div>
              <div className="bg-background p-12 border border-border">
                <Leaf className="w-12 h-12 text-gold mb-6" />
                <h3 className="font-display text-2xl text-emerald mb-4">Environmental Care</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We use recyclable glass packaging, support reforestation efforts, and minimize
                  waste in every step of production. Skincare should nurture the planet, too.
                </p>
              </div>
              <div className="bg-background p-12 border border-border">
                <Award className="w-12 h-12 text-gold mb-6" />
                <h3 className="font-display text-2xl text-emerald mb-4">Premium Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  No shortcuts, no compromises. We obsess over ingredient purity, texture, and
                  results. Premium skincare means premium responsibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
              Experience the Difference
            </p>
            <h2 className="font-display text-4xl text-emerald mt-4">
              Feel the Ori Gold Naturals Ritual
            </h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              Every product is designed to be more than skincare. It's a moment to slow down, care
              for yourself, and experience the luxury of pure, natural ingredients.
            </p>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              Explore our collection and discover why customers keep Ori Gold Naturals as part of
              their daily ritual.
            </p>
          </div>
          <div className="bg-emerald/5 p-12 border border-border text-center">
            <Droplet className="w-16 h-16 text-gold mx-auto mb-6" />
            <h3 className="font-display text-2xl text-emerald mb-4">One Jar. Pure Results.</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Start your transformation with our bestselling Whipped Shea Body Butter.
            </p>
            <a
              href="/products"
              className="inline-flex items-center justify-center bg-emerald text-primary-foreground px-12 py-4 uppercase tracking-widest text-xs hover:bg-emerald/90 transition"
            >
              Shop Collection
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
