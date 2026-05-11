import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Leaf, Droplet, Sparkles, ShieldCheck } from "lucide-react";
import sheaCollection from "@/assets/shea-collection.png";

export const Route = createFileRoute("/ingredients")({
  component: Ingredients,
  head: () => ({
    meta: [
      { title: "Ingredients — Ori Gold Naturals" },
      {
        name: "description",
        content:
          "Discover the clean, natural ingredients behind Ori Gold Naturals Shea Body Butter.",
      },
    ],
  }),
});

function Ingredients() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-cream border-b border-border">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28 text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Ingredients</span>
            <h1 className="font-display text-6xl text-emerald mt-4">
              Pure Ingredients. Clean Performance.
            </h1>
            <p className="mt-8 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn what goes into every Ori Gold Naturals formula: hand-selected shea butter,
              botanicals, and plant-based oils crafted for luminous, hydrated skin.
            </p>
          </div>
        </section>

        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">What’s Inside</p>
            <h2 className="font-display text-5xl text-emerald mt-4 leading-tight">
              Key Ingredients for Nourished Skin
            </h2>
            <p className="text-muted-foreground mt-8 leading-relaxed text-lg">
              Every ingredient is chosen for its purity, efficacy, and sensory experience. We keep
              formulas minimal and meaningful so your skin receives only what it truly needs.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <Leaf className="w-8 h-8 text-gold shrink-0" />
                <div>
                  <h3 className="font-display text-xl text-emerald">Raw Shea Butter</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    Hand-harvested and gently processed to preserve vitamins A, E, and F for deeply
                    nourishing skin support.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Droplet className="w-8 h-8 text-gold shrink-0" />
                <div>
                  <h3 className="font-display text-xl text-emerald">Botanical Oils</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    Jojoba, argan, and rosehip oils create a silky texture while helping skin feel
                    supple and balanced.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Sparkles className="w-8 h-8 text-gold shrink-0" />
                <div>
                  <h3 className="font-display text-xl text-emerald">Vitamin-Rich Blends</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    Natural vitamins and antioxidants support radiance, resilience, and long-lasting
                    hydration.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="w-8 h-8 text-gold shrink-0" />
                <div>
                  <h3 className="font-display text-xl text-emerald">Clean Formulations</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    No parabens, sulfates, synthetic fragrances, or fillers. Just simple, effective
                    skincare ingredients.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-cream">
            <img
              src={sheaCollection}
              alt="Natural skincare ingredients"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={1280}
            />
          </div>
        </section>

        <section className="bg-cream border-t border-border">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-background p-10 border border-border">
              <p className="text-[11px] uppercase tracking-widest text-gold">
                Ingredient Philosophy
              </p>
              <h3 className="font-display text-3xl text-emerald mt-6">
                Minimal. Intentional. Effective.
              </h3>
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
                We formulate with purpose, keeping each ingredient count low so the skin feels
                clean, nourished, and renewed without excess additives.
              </p>
            </div>
            <div className="bg-background p-10 border border-border">
              <p className="text-[11px] uppercase tracking-widest text-gold">Pure Performance</p>
              <h3 className="font-display text-3xl text-emerald mt-6">Sustainably Sourced</h3>
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
                Our ingredients are sourced with care—supporting fair trade, ethical farming, and
                small-batch production that honors people and place.
              </p>
            </div>
            <div className="bg-background p-10 border border-border">
              <p className="text-[11px] uppercase tracking-widest text-gold">Skin Confidence</p>
              <h3 className="font-display text-3xl text-emerald mt-6">Transparent Beauty</h3>
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
                You can read every ingredient, understand every benefit, and trust that you're
                giving skin only what it truly needs.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
