import vanillaShea from "@/assets/imgs/Vanilla Shea Butter - Luxury Mockup.png";
import pureShea from "@/assets/imgs/Pure Shea Butter - Luxury Mockup.png";
import whippedShea from "@/assets/imgs/Whipped Shea Butter - Luxury Mockup.png";
import lavenderShea from "@/assets/imgs/Lavender Shea Butter - Luxury Mockup.png";
import roseShea from "@/assets/imgs/Rose Shea Butter - Luxury Mockup.png";
import singleJar from "@/assets/imgs/ORI GOLD Single Jar Product Shot.png";
import multiProduct from "@/assets/imgs/ORI GOLD Multi-Product Mockup.png";
import bathroomLifestyle from "@/assets/imgs/ORI GOLD Lifestyle Bathroom Scene.png";
import sheaHero from "@/assets/shea-hero.jpg";
import sheaDetail from "@/assets/shea-detail-main.jpg";
import sheaCollection from "@/assets/shea-collection.jpg";

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
    slug: "vanilla-shea-butter",
    name: "Vanilla Shea Butter",
    tagline: "Warm & Luxurious",
    price: 600,
    rating: 5,
    reviews: 0,
    image: vanillaShea,
    gallery: [vanillaShea, singleJar, multiProduct],
    category: "Body Butters",
    description: "Rich, creamy shea butter with vanilla essence",
  },
  {
    slug: "pure-shea-butter",
    name: "Pure Shea Butter",
    tagline: "Simple & Natural",
    price: 600,
    rating: 5,
    reviews: 0,
    image: pureShea,
    gallery: [pureShea, bathroomLifestyle, singleJar],
    category: "Body Butters",
    description: "100% pure, unrefined Shea Butter",
  },
  {
    slug: "whipped-shea-butter",
    name: "Whipped Shea Butter",
    tagline: "Light & Fluffy",
    price: 600,
    rating: 5,
    reviews: 0,
    image: whippedShea,
    gallery: [whippedShea, multiProduct, vanillaShea],
    category: "Body Butters",
    description: "Whipped to perfection for light texture",
  },
  {
    slug: "lavender-shea-butter",
    name: "Lavender Shea Butter",
    tagline: "Calming & Soothing",
    price: 600,
    rating: 5,
    reviews: 0,
    image: lavenderShea,
    gallery: [lavenderShea, bathroomLifestyle, whippedShea],
    category: "Body Butters",
    description: "Calms and soothes the skin",
    badge: "Coming Soon",
    comingSoon: true,
  },
  {
    slug: "rose-shea-butter",
    name: "Rose Shea Butter",
    tagline: "Romantic & Hydrating",
    price: 600,
    rating: 5,
    reviews: 0,
    image: roseShea,
    gallery: [roseShea, multiProduct, singleJar],
    category: "Body Butters",
    description: "Hydrates and nourishes deeply",
    badge: "Coming Soon",
    comingSoon: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
