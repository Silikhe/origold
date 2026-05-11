import { Link } from "@tanstack/react-router";

export function Footer() {
  const cols = [
    {
      title: "Shop",
      links: [
        { label: "Body Butters", to: "/products" },
        { label: "Body Oils", to: "/products" },
        { label: "Soap Bars", to: "/products" },
        { label: "Lip Care", to: "/products" },
        { label: "Lotions", to: "/products" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Our Story", to: "/our-story" },
        { label: "Ingredients", to: "/ingredients" },
        { label: "Sustainability", to: "/our-story" },
        { label: "Press", to: "/our-story" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Contact", to: "/contact" },
        { label: "Shipping", to: "/contact" },
        { label: "Returns", to: "/contact" },
        { label: "FAQ", to: "/contact" },
      ],
    },
  ];
  return (
    <footer id="contact" className="bg-emerald text-primary-foreground mt-24">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <h3 className="font-display text-3xl">Ori Gold Naturals</h3>
          <p className="text-sm opacity-80 mt-4 max-w-xs leading-relaxed">
            Small-batch shea butter skincare, hand-crafted with raw, fair-trade ingredients from
            West Africa.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-[11px] uppercase tracking-widest mb-5 opacity-80">{c.title}</h4>
            <ul className="space-y-3 text-sm opacity-90">
              {c.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-6 text-center text-[11px] tracking-wider opacity-70">
          © 2026 Ori Gold Naturals. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
