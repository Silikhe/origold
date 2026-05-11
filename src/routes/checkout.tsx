import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useEcommerce } from "@/contexts/ecommerce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Ori Gold Naturals" },
      {
        name: "description",
        content: "Complete your premium wellness checkout for Ori Gold Naturals.",
      },
    ],
  }),
});

function Checkout() {
  const { state, dispatch } = useEcommerce();
  const { cart } = state;
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [formValues, setFormValues] = useState({
    contactPerson: "",
    fullName: "",
    phone: "",
    deliveryAddress: "",
    mpesaCode: "",
    paymentNumber: "",
    confirmationName: "",
  });
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderReference, setOrderReference] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart],
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const requiredFields: (keyof typeof formValues)[] = [
      "contactPerson",
      "fullName",
      "phone",
      "deliveryAddress",
      "mpesaCode",
      "paymentNumber",
      "confirmationName",
    ];

    const missing = requiredFields.filter((field) => !formValues[field].trim());
    if (missing.length > 0) {
      setOrderPlaced(false);
      setError("Please complete all fields before placing your order.");
      return;
    }

    const reference = `ORI-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setOrderReference(reference);
    setOrderPlaced(true);
    setShowSuccessModal(true);
    setError("");
    dispatch({ type: "CLEAR_CART" });
  };

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream">
          <div className="max-w-330 mx-auto px-8 py-24">
            <div className="text-center">
              <h1 className="font-display text-4xl text-[#2c2318] mb-4">Your cart is empty</h1>
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
      <main className="min-h-screen bg-[#f9f3eb] text-[#2c2318]">
        <div className="max-w-330 mx-auto px-6 py-20 lg:px-8">
          <section className="mb-14 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8f7c68]">Ori Gold Naturals</p>
            <h1 className="font-display mt-4 text-5xl leading-tight">A calm, refined checkout for premium skincare.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6d6257]">
              Complete your purchase using M-PESA and experience a luxurious checkout rooted in soft earth tones, minimalist wellness styling, and premium delivery care.
            </p>
          </section>

          <form className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <section className="rounded-none border border-[#d8c7b0] bg-white p-8 shadow-[0_18px_60px_rgba(44,32,23,0.08)]">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#8f7c68]">Payment Information</p>
                  <h2 className="font-display mt-4 text-3xl">Complete your M-PESA transfer</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-none border border-[#e4d2b5] bg-[#fcf7f0] p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#9b8c7c]">Paybill</p>
                    <p className="mt-3 text-2xl font-semibold">247247</p>
                  </div>
                  <div className="rounded-none border border-[#e4d2b5] bg-[#fcf7f0] p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#9b8c7c]">Account Number</p>
                    <p className="mt-3 text-2xl font-semibold">ORIGOLD1OPXQD</p>
                  </div>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-6 text-[#6d6257]">
                  Please use the account number above for your M-PESA payment.
                </p>
              </section>

              <section className="rounded-none border border-[#d8c7b0] bg-white p-8 shadow-[0_18px_60px_rgba(44,32,23,0.08)]">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#8f7c68]">Delivery Information</p>
                  <h2 className="font-display mt-4 text-3xl">Where should we deliver your order?</h2>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="contactPerson" className="text-sm text-[#5c574e]">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        value={formValues.contactPerson}
                        onChange={(event) => handleChange("contactPerson", event.target.value)}
                        placeholder="Recipient name"
                        className="rounded-none border-[#d7c7b0] bg-[#fcf7f0] text-[#2c2318]"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fullName" className="text-sm text-[#5c574e]">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formValues.fullName}
                        onChange={(event) => handleChange("fullName", event.target.value)}
                        placeholder="Buyer name"
                        className="rounded-none border-[#d7c7b0] bg-[#fcf7f0] text-[#2c2318]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="phone" className="text-sm text-[#5c574e]">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formValues.phone}
                        onChange={(event) => handleChange("phone", event.target.value)}
                        placeholder="e.g. 0712 345 678"
                        className="rounded-none border-[#d7c7b0] bg-[#fcf7f0] text-[#2c2318]"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryAddress" className="text-sm text-[#5c574e]">Delivery Address</Label>
                      <Input
                        id="deliveryAddress"
                        value={formValues.deliveryAddress}
                        onChange={(event) => handleChange("deliveryAddress", event.target.value)}
                        placeholder="Enter your full delivery address"
                        className="rounded-none border-[#d7c7b0] bg-[#fcf7f0] text-[#2c2318]"
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-none border border-[#d8c7b0] bg-white p-8 shadow-[0_18px_60px_rgba(44,32,23,0.08)]">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#8f7c68]">Payment Confirmation</p>
                  <h2 className="font-display mt-4 text-3xl">Confirm your M-PESA details</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label htmlFor="mpesaCode" className="text-sm text-[#5c574e]">M-PESA Code</Label>
                    <Input
                      id="mpesaCode"
                      value={formValues.mpesaCode}
                      onChange={(event) => handleChange("mpesaCode", event.target.value)}
                      placeholder="Enter the transaction code"
                      className="rounded-none border-[#d7c7b0] bg-[#fcf7f0] text-[#2c2318]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentNumber" className="text-sm text-[#5c574e]">Payment Number</Label>
                    <Input
                      id="paymentNumber"
                      value={formValues.paymentNumber}
                      onChange={(event) => handleChange("paymentNumber", event.target.value)}
                      placeholder="e.g. 0712 345 678"
                      className="rounded-none border-[#d7c7b0] bg-[#fcf7f0] text-[#2c2318]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmationName" className="text-sm text-[#5c574e]">Full Name</Label>
                    <Input
                      id="confirmationName"
                      value={formValues.confirmationName}
                      onChange={(event) => handleChange("confirmationName", event.target.value)}
                      placeholder="Name associated with payment"
                      className="rounded-none border-[#d7c7b0] bg-[#fcf7f0] text-[#2c2318]"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-none border border-[#d8c7b0] bg-white p-8 shadow-[0_18px_60px_rgba(44,32,23,0.08)]">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#8f7c68]">Shipping Method</p>
                  <h2 className="font-display mt-4 text-3xl">Choose your delivery pace</h2>
                </div>

                <RadioGroup
                  value={shippingMethod}
                  onValueChange={(value) => setShippingMethod(value)}
                  className="space-y-4"
                >
                  <label className="group flex cursor-pointer items-start gap-4 rounded-none border border-[#e4d2b5] bg-[#fcf7f0] p-5 transition hover:border-[#b8a68f]">
                    <RadioGroupItem value="standard" id="standard" className="mt-1 border-[#a18f78]" />
                    <div>
                      <p className="font-semibold text-[#2c2318]">Standard Shipping</p>
                      <p className="text-sm leading-6 text-[#6d6257]">Free, 5-7 business days</p>
                    </div>
                  </label>
                  <label className="group flex cursor-pointer items-start gap-4 rounded-none border border-[#e4d2b5] bg-[#fcf7f0] p-5 transition hover:border-[#b8a68f]">
                    <RadioGroupItem value="express" id="express" className="mt-1 border-[#a18f78]" />
                    <div>
                      <p className="font-semibold text-[#2c2318]">Express Shipping</p>
                      <p className="text-sm leading-6 text-[#6d6257]">KES 19.99, 2-3 business days</p>
                    </div>
                  </label>
                </RadioGroup>
              </section>
            </div>

            <aside className="space-y-8">
              <section className="rounded-none border border-[#d8c7b0] bg-white p-8 shadow-[0_18px_60px_rgba(44,32,23,0.08)]">
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#8f7c68]">Order Summary</p>
                  <h2 className="font-display mt-4 text-3xl">Your curated selection</h2>
                  <p className="mt-3 text-sm leading-6 text-[#6d6257]">A refined overview of the products in your basket and final total.</p>
                </div>

                <div className="space-y-5">
                  {cart.map((item) => (
                    <div
                      key={item.product.slug}
                      className="flex items-center justify-between gap-4 border-b border-[#e4d2b5] pb-4"
                    >
                      <div>
                        <p className="font-semibold text-[#2c2318]">{item.product.name}</p>
                        <p className="text-sm text-[#6d6257]">Qty {item.quantity}</p>
                      </div>
                      <p className="font-medium text-[#2c2318]">KES {(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3 text-sm text-[#5c574e]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KES {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `KES ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t border-[#e4d2b5] pt-4 flex justify-between text-base font-semibold text-[#2c2318]">
                    <span>Total</span>
                    <span>KES {total.toFixed(2)}</span>
                  </div>
                </div>

                {error && <p className="text-sm text-destructive mt-6">{error}</p>}
                {orderPlaced && (
                  <p className="text-sm text-emerald mt-6">Order placed successfully. Thank you for shopping with us!</p>
                )}

                <Button
                  type="submit"
                  className="mt-8 w-full rounded-none bg-[#2c2318] py-4 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#191511] transition"
                >
                  Complete Purchase
                </Button>
              </section>
            </aside>
          </form>
        </div>
      </main>
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogOverlay className="bg-black/55" />
        <DialogContent className="rounded-none border border-[#d8c7b0] bg-[#f8f3e8] p-8 shadow-[0_28px_80px_rgba(44,32,23,0.16)] text-[#2c2318] max-w-xl mx-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#d8c7b0] bg-[#fff7ea] text-[#b1843d]">
            <CheckCircle className="h-8 w-8" />
          </div>
          <div className="space-y-4 text-center">
            <h2 className="font-display text-3xl uppercase tracking-[0.18em] text-[#2c2318]">
              Order Confirmed
            </h2>
            <p className="mx-auto max-w-104 text-sm leading-7 text-[#5f5345]">
              Thank you for your purchase. Your order has been received successfully and is now being processed.
            </p>
            <div className="space-y-3 rounded-none border border-[#e4d2b5] bg-[#fff8ed] p-5 text-left text-sm text-[#5c5447]">
              <div className="flex justify-between uppercase tracking-[0.2em] text-[#8f7c68]">
                <span>Reference</span>
                <span>{orderReference}</span>
              </div>
              <div className="flex justify-between uppercase tracking-[0.2em] text-[#8f7c68]">
                <span>Status</span>
                <span className="text-[#2c2318] font-semibold">Payment confirmed</span>
              </div>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center w-full bg-[#2c2318] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#1a1915] transition"
              onClick={() => setShowSuccessModal(false)}
            >
              Continue Shopping
            </Link>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
}
