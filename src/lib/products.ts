import vanillaShea from "@/assets/imgs/vanilla.png";
import lavenderShea from "@/assets/imgs/lavender.jpeg";
import roseShea from "@/assets/imgs/rose.jpeg";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  category: string;
  description: string;
  badge?: string;
  comingSoon?: boolean;
};

export const products: Product[] = [
  {
    slug: "lavender-shea-butter",
    name: "Lavender Shea Butter",
    tagline: "Calming & Soothing",
    price: 1650,
    rating: 5,
    reviews: 0,
    image: lavenderShea,
    gallery: [lavenderShea],
    category: "Body Butters",
    description: "Calms and soothes the skin",
  },
  {
    slug: "vanilla-shea-butter",
    name: "Vanilla Shea Butter",
    tagline: "Warm & Luxurious",
    price: 1650,
    rating: 5,
    reviews: 0,
    image: vanillaShea,
    gallery: [vanillaShea],
    category: "Body Butters",
    description: "Rich, creamy shea butter with vanilla essence",
  },
  {
    slug: "rose-shea-butter",
    name: "Rose Shea Butter",
    tagline: "Romantic & Hydrating",
    price: 1650,
    rating: 5,
    reviews: 0,
    image: roseShea,
    gallery: [roseShea],
    category: "Body Butters",
    description: "Hydrates and nourishes deeply",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
