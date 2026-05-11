import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useEcommerce } from "@/contexts/ecommerce";
import { Heart, ShoppingBag, CreditCard, Edit3, Trash2, Eye } from "lucide-react";

export const Route = createFileRoute("/account")({
  component: Account,
  head: () => ({
    meta: [
      { title: "My Account — Ori Gold Naturals" },
      { name: "description", content: "Manage your Ori Gold Naturals account and preferences." },
    ],
  }),
});

function Account() {
  const { state, dispatch } = useEcommerce();

  const user = state.user || {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  };

  const mockOrders = [
    { id: 1, date: "Dec 15, 2024", total: 89.99, status: "Delivered", items: 2 },
    { id: 2, date: "Nov 28, 2024", total: 142.5, status: "Delivered", items: 3 },
    { id: 3, date: "Nov 10, 2024", total: 39.0, status: "Delivered", items: 1 },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-cream border-b border-border">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-8 py-24">
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">My Account</span>
              <h1 className="font-display text-6xl text-emerald mt-4">
                Welcome back, {user.name.split(" ")[0]}
              </h1>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
                Manage your profile, track orders, and curate your collection of premium shea butter
                rituals.
              </p>
            </div>
          </div>
        </section>

        {/* Account Overview */}
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20">
          <div className="text-left mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Account Overview</p>
            <h2 className="font-display text-4xl text-emerald mt-4">Your Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream p-10 border border-border">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Name</p>
              <p className="font-display text-2xl text-emerald mt-3">{user.name}</p>
            </div>
            <div className="bg-cream p-10 border border-border">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Email</p>
              <p className="font-display text-2xl text-emerald mt-3 break-all">{user.email}</p>
            </div>
            <div className="bg-cream p-10 border border-border">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Member Since
              </p>
              <p className="font-display text-2xl text-emerald mt-3">2024</p>
            </div>
          </div>
        </section>

        {/* Edit Profile */}
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 border-t border-border">
          <div className="text-left mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Edit Account</p>
            <h2 className="font-display text-4xl text-emerald mt-4">Update Your Profile</h2>
          </div>
          <div className="bg-cream p-12 border border-border max-w-2xl">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.3em] text-foreground font-medium mb-4">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name.split(" ")[0]}
                    className="w-full border border-border bg-background px-6 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.3em] text-foreground font-medium mb-4">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name.split(" ")[1] || ""}
                    className="w-full border border-border bg-background px-6 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.3em] text-foreground font-medium mb-4">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full border border-border bg-background px-6 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.3em] text-foreground font-medium mb-4">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full border border-border bg-background px-6 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-emerald text-primary-foreground px-12 py-4 uppercase tracking-widest text-xs hover:bg-emerald/90 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Order History */}
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 border-t border-border">
          <div className="text-left mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Order History</p>
            <h2 className="font-display text-4xl text-emerald mt-4">Your Purchases</h2>
          </div>
          {mockOrders.length === 0 ? (
            <div className="bg-cream p-12 text-center border border-border">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No orders yet. Start your Ori Gold Naturals journey with our collection.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-emerald text-primary-foreground px-10 py-4 uppercase tracking-widest text-xs hover:bg-emerald/90 transition mt-6"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-cream p-8 border border-border grid md:grid-cols-[1fr_auto_auto_auto] gap-8 items-center"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Order #{order.id}
                    </p>
                    <p className="font-display text-xl text-emerald mt-2">{order.date}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {order.items} item{order.items > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Total
                    </p>
                    <p className="font-display text-xl text-emerald mt-2">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Status
                    </p>
                    <p className="text-sm text-emerald mt-2 font-medium">{order.status}</p>
                  </div>
                  <button className="flex items-center justify-center w-12 h-12 bg-background border border-border hover:border-emerald transition">
                    <Eye className="w-4 h-4 text-emerald" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved Favorites */}
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 border-t border-border">
          <div className="text-left mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Saved Favorites</p>
            <h2 className="font-display text-4xl text-emerald mt-4">Your Wishlist</h2>
          </div>
          {state.wishlist.length === 0 ? (
            <div className="bg-cream p-12 text-center border border-border">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No favorites yet. Browse our collection to save your next ritual.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-emerald text-primary-foreground px-10 py-4 uppercase tracking-widest text-xs hover:bg-emerald/90 transition mt-6"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {state.wishlist.map((product) => (
                <div key={product.slug} className="group">
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
                    <div className="aspect-square overflow-hidden bg-cream border border-border relative mb-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch({ type: "REMOVE_FROM_WISHLIST", productId: product.slug });
                        }}
                        className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-3 border border-border hover:border-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {product.category}
                    </p>
                    <p className="font-display text-lg text-emerald mt-2 group-hover:text-gold transition">
                      {product.name}
                    </p>
                    <p className="text-base text-foreground mt-3">${product.price.toFixed(2)}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Security Section */}
        <section className="max-w-[1320px] mx-auto px-6 sm:px-8 py-20 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Security & Privacy</p>
              <h2 className="font-display text-4xl text-emerald mt-4">Your Account is Safe</h2>
              <p className="text-muted-foreground mt-8 leading-relaxed">
                We protect your payment information and personal details using industry-leading
                encryption. All transactions are secure, and your data is never shared with third
                parties.
              </p>
              <button className="mt-8 inline-flex items-center justify-center bg-background border border-emerald text-emerald px-10 py-4 uppercase tracking-widest text-xs hover:bg-emerald hover:text-primary-foreground transition">
                Change Password
              </button>
            </div>
            <div className="bg-cream p-12 border border-border text-center">
              <CreditCard className="w-16 h-16 text-gold mx-auto mb-6" />
              <h3 className="font-display text-2xl text-emerald mb-4">256-Bit Encryption</h3>
              <p className="text-muted-foreground text-sm">
                Bank-level security for every transaction
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
