import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useEcommerce } from "@/contexts/ecommerce";
import { currencyOptions } from "@/lib/currency";
import logo from "@/assets/ori-gold-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Our Story", to: "/our-story" },
  { label: "Ingredients", to: "/ingredients" },
  { label: "Contact", to: "/contact" },
];

export function TopBar() {
  const { state, dispatch } = useEcommerce();

  return (
    <div className="bg-emerald text-primary-foreground text-[11px] hidden sm:block">
      <div className="max-w-330 mx-auto px-6 sm:px-8 py-2 flex items-center justify-between gap-6 tracking-widest uppercase">
        <span className="opacity-80">origoldnaturals@gmail.com</span>
        <div className="flex items-center gap-4">
          <label className="sr-only" htmlFor="currency-select">
            Select currency
          </label>
          <div className="relative inline-flex items-center border border-[#c7b89a] bg-[#f7f1e8] px-3 text-xs uppercase tracking-[0.22em] text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            <select
              id="currency-select"
              value={state.currency}
              onChange={(event) =>
                dispatch({ type: "SET_CURRENCY", currency: event.target.value as typeof state.currency })
              }
              className="appearance-none bg-transparent py-2 pr-8 text-xs uppercase tracking-[0.22em] text-foreground outline-none"
            >
              {currencyOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-white text-foreground">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-foreground/70" />
          </div>
          <Link to="/account" className="hover:opacity-80 transition">
            Login
          </Link>
          <Link to="/account" className="hover:opacity-80 transition">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

const linkClass =
  "text-xs uppercase tracking-[0.18em] text-foreground hover:text-gold transition-colors";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state } = useEcommerce();
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="max-w-330 mx-auto px-6 sm:px-8 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ori Gold Naturals" className="h-16 w-auto object-contain" />
          </Link>
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={linkClass}
                activeProps={{ className: "text-gold" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/products/$slug"
              params={{ slug: "shea-jojoba-lavender" }}
              className={linkClass}
              activeProps={{ className: "text-gold" }}
            >
              Bestseller
            </Link>
          </nav>
          <div className="flex items-center gap-4 md:gap-6 text-foreground">
            <Search className="w-4.5 h-4.5 cursor-pointer hover:text-gold" />
            <Link to="/account">
              <User className="w-4.5 h-4.5 cursor-pointer hover:text-gold" />
            </Link>
            <Link to="/wishlist">
              <Heart className="w-4.5 h-4.5 cursor-pointer hover:text-gold" />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-4.5 h-4.5 cursor-pointer hover:text-gold" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-gold-foreground text-[10px] w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center md:hidden h-11 w-11 border border-border text-foreground hover:border-emerald transition ml-auto"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute inset-x-0 top-full z-40 border-t border-border bg-background px-6 py-6 shadow-xl">
            <div className="space-y-6">
              <div className="space-y-3">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base uppercase tracking-[0.3em] text-foreground hover:text-gold"
                >
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block text-base uppercase tracking-[0.3em] text-foreground hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Support
                  </span>
                  <span className="text-xs text-foreground">origoldnaturals@gmail.com</span>
                </div>
                <div className="mt-6 grid gap-3">
                  <label className="sr-only" htmlFor="mobile-currency-select">
                    Select currency
                  </label>
                  <div className="relative w-full inline-flex items-center border border-[#c7b89a] bg-[#f7f1e8] px-4 text-sm uppercase tracking-[0.22em] text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
                    <select
                      id="mobile-currency-select"
                      value={state.currency}
                      onChange={(event) =>
                        dispatch({ type: "SET_CURRENCY", currency: event.target.value as typeof state.currency })
                      }
                      className="appearance-none w-full bg-transparent py-3 pr-10 text-sm uppercase tracking-[0.22em] text-foreground outline-none"
                    >
                      {currencyOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-white text-foreground">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-foreground/70" />
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center w-full bg-emerald text-primary-foreground px-4 py-4 uppercase tracking-widest text-xs hover:bg-emerald/90 transition"
                  >
                    Account
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center w-full border border-emerald px-4 py-4 uppercase tracking-widest text-xs text-emerald hover:bg-emerald hover:text-primary-foreground transition"
                  >
                    Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
