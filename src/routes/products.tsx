import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/products")({
  component: ProductsLayout,
  head: () => ({
    meta: [
      { title: "Shop All — Ori Gold Naturals Shea Butter Skincare" },
      {
        name: "description",
        content:
          "Browse our full collection of small-batch shea butter body butters, oils, and natural skincare essentials.",
      },
    ],
  }),
});

function ProductsLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
