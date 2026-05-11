import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useEcommerce } from "@/contexts/ecommerce";
import { formatCurrency } from "@/lib/currency";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({
    meta: [
      { title: "Shopping Cart — Ori Gold Naturals" },
      { name: "description", content: "Review and manage your Ori Gold Naturals shopping cart." },
    ],
  }),
});

function Cart() {
  const { state, dispatch } = useEcommerce();
  const { cart } = state;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream">
          <section className="max-w-[1320px] mx-auto px-8 py-24">
            <div className="text-center mb-16">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">
                Shopping Cart
              </span>
              <h1 className="font-display text-5xl text-emerald mt-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Discover the products you love and add them to your cart for a seamless checkout
                experience.
              </p>
            </div>
            <div className="bg-background p-16 text-center">
              <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-8" />
              <p className="font-display text-xl text-foreground mb-6">Your cart is waiting.</p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-emerald text-primary-foreground px-10 py-4 uppercase tracking-widest text-xs hover:bg-foreground transition rounded-none"
              >
                Continue Shopping
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-24 pb-32 lg:pb-24">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Shopping Cart</span>
            <h1 className="font-display text-5xl text-emerald mt-4">Review Your Order</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Keep your selections organized and prepare for a premium checkout experience.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.product.slug}
                  className="grid md:grid-cols-[142px_minmax(0,1fr)] gap-6 bg-background p-6"
                >
                  <div className="aspect-square overflow-hidden bg-cream">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                        {item.product.category}
                      </p>
                      <h2 className="font-display text-2xl text-emerald mt-3">
                        {item.product.name}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-3">{item.product.tagline}</p>
                    </div>
                    <div className="flex flex-col gap-4 pt-4">
                      <div className="flex items-center justify-between text-foreground font-semibold">
                        <span>Price</span>
                        <span>{formatCurrency(item.product.price, state.currency)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_CART_QUANTITY",
                              productId: item.product.slug,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          }
                          className="h-11 w-11 rounded-none border border-border text-foreground hover:border-emerald transition"
                        >
                          <Minus className="mx-auto" />
                        </button>
                        <div className="h-11 min-w-[3rem] rounded-none border border-border flex items-center justify-center text-foreground">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_CART_QUANTITY",
                              productId: item.product.slug,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="h-11 w-11 rounded-none border border-border text-foreground hover:border-emerald transition"
                        >
                          <Plus className="mx-auto" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_FROM_CART", productId: item.product.slug })
                        }
                        className="inline-flex items-center justify-center w-full rounded-none border border-border bg-background px-4 py-3 text-sm text-foreground hover:border-destructive hover:text-destructive transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="bg-background p-8 h-fit">
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Order Summary</p>
                  <h2 className="font-display text-3xl text-emerald mt-4">Ready to Checkout</h2>
                </div>
                <div className="space-y-4 text-sm text-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal, state.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatCurrency(shipping, state.currency)}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total, state.currency)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="inline-flex items-center justify-center w-full bg-emerald text-primary-foreground px-8 py-4 uppercase tracking-widest text-xs hover:bg-foreground transition rounded-none"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center w-full rounded-none border border-emerald px-8 py-4 text-sm text-emerald hover:bg-emerald hover:text-primary-foreground transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        </section>
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Total</p>
              <p className="font-display text-xl text-emerald">{formatCurrency(total, state.currency)}</p>
            </div>
            <Link
              to="/checkout"
              className="min-h-[44px] flex-1 inline-flex items-center justify-center bg-emerald text-primary-foreground uppercase tracking-widest text-xs hover:bg-foreground transition"
            >
              Checkout
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
