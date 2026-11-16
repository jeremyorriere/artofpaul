import type {
  ArtworkCard,
  CategoryOption,
  DashboardMetric,
  DashboardSeriesPoint,
  OrderSummary,
  PricingRuleRecord,
  ProductCard,
  ReviewCard,
  UserSummary,
} from "@/types/app";

export const categories: CategoryOption[] = [
  { id: "cat-1", name: "Portrait", slug: "portrait" },
  { id: "cat-2", name: "Animal", slug: "animal" },
  { id: "cat-3", name: "Paysage", slug: "paysage" },
  { id: "cat-4", name: "Manga", slug: "manga" },
  { id: "cat-5", name: "Édition limitée", slug: "edition-limitee" },
];

export const artworks: ArtworkCard[] = [
  {
    id: "art-1",
    title: "Éclat d'ambre",
    slug: "eclat-dambre",
    imageUrl: "/artwork-1.svg",
    category: "Portrait",
    tags: ["fusain", "peau", "émotion"],
    year: 2026,
    featured: true,
  },
  {
    id: "art-2",
    title: "Complicité sauvage",
    slug: "complicite-sauvage",
    imageUrl: "/artwork-2.svg",
    category: "Animal",
    tags: ["loup", "crayon", "texture"],
    year: 2026,
    featured: true,
  },
  {
    id: "art-3",
    title: "Brume sur Kyoto",
    slug: "brume-sur-kyoto",
    imageUrl: "/artwork-3.svg",
    category: "Paysage",
    tags: ["aquarelle", "urbain", "lumière"],
    year: 2025,
    featured: true,
  },
  {
    id: "art-4",
    title: "Neon Sensei",
    slug: "neon-sensei",
    imageUrl: "/artwork-4.svg",
    category: "Manga",
    tags: ["anime", "ink", "street"],
    year: 2026,
  },
  {
    id: "art-5",
    title: "Rituel doré",
    slug: "rituel-dore",
    imageUrl: "/artwork-5.svg",
    category: "Édition limitée",
    tags: ["gold leaf", "collector"],
    year: 2024,
  },
  {
    id: "art-6",
    title: "Mémoire d'été",
    slug: "memoire-dete",
    imageUrl: "/artwork-6.svg",
    category: "Portrait",
    tags: ["famille", "tendresse"],
    year: 2026,
  },
];

export const products: ProductCard[] = [
  {
    id: "prod-1",
    name: "Portrait signature A4",
    slug: "portrait-signature-a4",
    description: "Portrait artistique noir et blanc sur papier premium, finition atelier.",
    imageUrl: "/artwork-1.svg",
    price: 149,
    category: "Portrait",
    support: "PAPIER_PREMIUM",
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Poster illustré galerie",
    slug: "poster-illustre-galerie",
    description: "Tirage poster grand format d'une œuvre originale signée.",
    imageUrl: "/artwork-3.svg",
    price: 59,
    category: "Paysage",
    support: "POSTER",
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Toile collector",
    slug: "toile-collector",
    description: "Impression giclée sur toile premium prête à encadrer.",
    imageUrl: "/artwork-5.svg",
    price: 219,
    category: "Édition limitée",
    support: "TOILE",
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Pack numérique HD",
    slug: "pack-numerique-hd",
    description: "Livraison instantanée d'un fichier HD optimisé impression et réseaux.",
    imageUrl: "/artwork-4.svg",
    price: 89,
    category: "Manga",
    support: "NUMERIQUE_HD",
    inStock: true,
  },
];

export const reviews: ReviewCard[] = [
  {
    id: "rev-1",
    author: "Camille R.",
    rating: 5,
    city: "Lyon",
    content: "Un portrait bouleversant de justesse. Le niveau de détail est incroyable.",
  },
  {
    id: "rev-2",
    author: "Nadia T.",
    rating: 5,
    city: "Paris",
    content: "Commande fluide, échanges chaleureux et résultat encore plus beau que prévu.",
  },
  {
    id: "rev-3",
    author: "Julien M.",
    rating: 4,
    city: "Bruxelles",
    content: "Livraison soignée et toile magnifique. Je recommande pour un cadeau premium.",
  },
];

export const pricingRules: PricingRuleRecord[] = [
  {
    id: "price-1",
    name: "Papier classique A5",
    format: "A5",
    support: "PAPIER_CLASSIQUE",
    basePrice: 75,
    extraPersonPrice: 20,
    rushFee: 25,
  },
  {
    id: "price-2",
    name: "Papier premium A4",
    format: "A4",
    support: "PAPIER_PREMIUM",
    basePrice: 125,
    extraPersonPrice: 28,
    rushFee: 35,
  },
  {
    id: "price-3",
    name: "Toile A3",
    format: "A3",
    support: "TOILE",
    basePrice: 220,
    extraPersonPrice: 35,
    rushFee: 50,
  },
  {
    id: "price-4",
    name: "Version numérique HD",
    format: "CUSTOM",
    support: "NUMERIQUE_HD",
    basePrice: 90,
    extraPersonPrice: 18,
    rushFee: 20,
  },
];

export const orders: OrderSummary[] = [
  {
    id: "order-1",
    number: "ART-240901",
    total: 184,
    status: "IN_PROGRESS",
    createdAt: "2026-09-05T10:00:00.000Z",
    deliveryDate: "2026-10-05T10:00:00.000Z",
    items: [{ name: "Portrait signature A4", quantity: 1, unitPrice: 149 }],
  },
  {
    id: "order-2",
    number: "ART-240845",
    total: 89,
    status: "COMPLETED",
    createdAt: "2026-08-20T10:00:00.000Z",
    items: [{ name: "Pack numérique HD", quantity: 1, unitPrice: 89 }],
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "CA mensuel", value: "8 420 €", delta: "+18%" },
  { label: "Commandes", value: "46", delta: "+9%" },
  { label: "En cours", value: "12", delta: "+2" },
  { label: "Panier moyen", value: "183 €", delta: "+6%" },
];

export const dashboardSeries: DashboardSeriesPoint[] = [
  { month: "Avr", revenue: 3600, orders: 18 },
  { month: "Mai", revenue: 4400, orders: 24 },
  { month: "Juin", revenue: 5200, orders: 28 },
  { month: "Juil", revenue: 6100, orders: 32 },
  { month: "Aoû", revenue: 7100, orders: 39 },
  { month: "Sep", revenue: 8420, orders: 46 },
];

export const users: UserSummary[] = [
  {
    id: "user-admin",
    name: "Paul Atelier",
    email: "admin@artofpaul.fr",
    role: "ADMIN",
  },
  {
    id: "user-demo",
    name: "Client Démo",
    email: "client@artofpaul.fr",
    role: "CUSTOMER",
  },
];

