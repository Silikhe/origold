import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import sheaLifestyle1 from "@/assets/shea-lifestyle-1.jpg";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact Us — Ori Gold Naturals" },
      {
        name: "description",
        content: "Get in touch with Ori Gold Naturals for premium shea butter skincare inquiries.",
      },
    ],
  }),
});

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 flex items-center justify-between hover:bg-cream/50 transition"
      >
        <span className="font-display text-lg text-emerald text-left">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gold shrink-0 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="p-6 border-t border-border bg-cream/50">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.subject || !form.message) {
      setSuccess(false);
      setError("Please complete all fields before sending your message.");
      return;
    }
    setSuccess(true);
    setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-cream border-b border-border">
          <div className="max-w-[1320px] mx-auto px-8 py-28">
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Get in Touch</span>
              <h1 className="font-display text-6xl text-emerald mt-4">Contact Ori Gold Naturals</h1>
              <p className="text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed text-lg">
                Share your questions, custom order requests, or skincare needs. We are here to help
                with thoughtful service and a premium experience.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="max-w-[1320px] mx-auto px-8 py-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-cream p-10 border border-border">
              <MapPin className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-display text-xl text-emerald mb-3">Visit Us</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                123 Artisan Way
                <br />
                Natural Beauty District
                <br />
                Portland, OR 97201
              </p>
            </div>
            <div className="bg-cream p-10 border border-border">
              <Phone className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-display text-xl text-emerald mb-3">Call Us</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <a href="tel:(555)123-4567" className="hover:text-emerald transition">
                  (555) 123-4567
                </a>
                <br />
                Mon-Fri: 9AM-6PM PT
              </p>
            </div>
            <div className="bg-cream p-10 border border-border">
              <Mail className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-display text-xl text-emerald mb-3">Email Us</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <a href="mailto:hello@origold.com" className="hover:text-emerald transition">
                  hello@origold.com
                </a>
                <br />
                Response within 24 hours
              </p>
            </div>
            <div className="bg-cream p-10 border border-border">
              <Clock className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-display text-xl text-emerald mb-3">Studio Hours</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Mon-Fri: 9AM-6PM
                <br />
                Sat: 10AM-4PM
                <br />
                Sun: Closed
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-cream border-y border-border">
          <div className="max-w-[1320px] mx-auto px-8 py-28">
            <div className="text-left mb-12">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Message Us</p>
              <h2 className="font-display text-4xl text-emerald mt-4">Send a Message</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-foreground font-medium mb-4">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(event) => handleChange("firstName", event.target.value)}
                        required
                        className="w-full border border-border bg-background px-6 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-foreground font-medium mb-4">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(event) => handleChange("lastName", event.target.value)}
                        required
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
                      value={form.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      required
                      className="w-full border border-border bg-background px-6 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.3em] text-foreground font-medium mb-4">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(event) => handleChange("subject", event.target.value)}
                      className="w-full border border-border bg-background px-6 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select a subject</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Custom Order">Custom Order</option>
                      <option value="Bulk Purchase">Bulk Purchase</option>
                      <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.3em] text-foreground font-medium mb-4">
                      Message
                    </label>
                    <textarea
                      rows={8}
                      value={form.message}
                      onChange={(event) => handleChange("message", event.target.value)}
                      required
                      className="w-full border border-border bg-background px-6 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-emerald text-primary-foreground px-12 py-4 uppercase tracking-widest text-xs hover:bg-emerald/90 transition"
                  >
                    Send Message
                  </button>
                </form>
                {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
                {success && (
                  <p className="mt-4 text-sm text-emerald">
                    Your message has been sent successfully.
                  </p>
                )}
              </div>
              <div className="aspect-[4/5] overflow-hidden bg-background">
                <img
                  src={sheaLifestyle1}
                  alt="Natural skincare"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[1320px] mx-auto px-8 py-28">
          <div className="text-left mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Help Center</p>
            <h2 className="font-display text-4xl text-emerald mt-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Find quick answers to common questions about products, orders, and skincare.
            </p>
          </div>
          <div className="max-w-full space-y-4">
            <FAQItem
              question="What's in Ori Gold Naturals products?"
              answer="All Ori Gold Naturals products are formulated with raw shea butter and pure botanical oils. We never use parabens, sulfates, synthetic fragrances, or artificial additives. Each product is hand-whipped in small batches and tested for consistency and purity."
            />
            <FAQItem
              question="How long does delivery take?"
              answer="Standard orders ship within 1-2 business days and typically arrive within 5-7 business days depending on your location. We offer free shipping on orders over $50."
            />
            <FAQItem
              question="Can I return or exchange a product?"
              answer="Yes! We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, contact our support team at hello@origold.com to arrange a return or exchange."
            />
            <FAQItem
              question="Is Ori Gold Naturals cruelty-free and vegan?"
              answer="We're cruelty-free and never test on animals. Most of our products are vegan, though some contain beeswax. Check individual product pages for specific ingredients."
            />
            <FAQItem
              question="How should I store my Ori Gold Naturals products?"
              answer="Keep products in a cool, dry place away from direct sunlight. Our whipped shea butters work best at room temperature. In hot climates, store in the refrigerator for a firmer texture."
            />
            <FAQItem
              question="Do you offer wholesale or bulk orders?"
              answer="Yes! We work with retailers and corporate buyers. Email hello@origold.com with details about your inquiry and we'll discuss wholesale pricing and minimum order requirements."
            />
            <FAQItem
              question="Can I customize products?"
              answer="We love custom requests! For bulk orders, scent blends, or special formulations, reach out to our team at hello@origold.com. We'll work with you to create something perfect."
            />
            <FAQItem
              question="Are your products suitable for sensitive skin?"
              answer="Our minimal formulations work well for most skin types. However, if you have allergies or extremely sensitive skin, review the ingredients carefully. We recommend doing a patch test first."
            />
            <FAQItem
              question="How do I use Ori Gold Naturals products?"
              answer="Apply a small amount to clean, damp skin and massage gently until absorbed. For best results, use daily as part of your skincare routine. Start with a pea-sized amount and adjust as needed."
            />
            <FAQItem
              question="Do you ship internationally?"
              answer="Yes, we ship worldwide! International orders may take 10-14 business days for delivery. Additional customs fees may apply depending on your location."
            />
            <FAQItem
              question="What's the shelf life of your products?"
              answer="Our products have a shelf life of 12-18 months when stored properly. Check the batch code on your packaging for the best-by date. Natural products may change texture over time but remain safe to use."
            />
            <FAQItem
              question="How can I track my order?"
              answer="Once your order ships, you'll receive a tracking number via email. You can use this to monitor your package's progress on our website or the carrier's site."
            />
            <FAQItem
              question="Are there any allergens in your products?"
              answer="Our products contain natural ingredients like shea butter, which may cause reactions in rare cases. If you have nut allergies, consult your physician before use. Full ingredient lists are available on each product page."
            />
            <FAQItem
              question="Do you offer gift wrapping?"
              answer="Yes! We offer complimentary gift wrapping for all orders. Add a personal note and we'll package your items beautifully for gifting."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald text-primary-foreground">
          <div className="max-w-[1320px] mx-auto px-8 py-28 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Quick Help</p>
            <h2 className="font-display text-4xl mt-4">Still have questions?</h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg opacity-90">
              Our support team is here to help. Chat with us, call, or send an email and we'll
              respond within 24 hours.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:hello@origold.com"
                className="inline-flex items-center justify-center bg-primary-foreground text-emerald px-12 py-4 uppercase tracking-widest text-xs hover:bg-gold transition"
              >
                Email Support
              </a>
              <a
                href="tel:(555)123-4567"
                className="inline-flex items-center justify-center border-2 border-primary-foreground text-primary-foreground px-12 py-4 uppercase tracking-widest text-xs hover:bg-primary-foreground/10 transition"
              >
                Call Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
