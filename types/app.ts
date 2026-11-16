export type OrderStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "CLIENT_REVIEW"
  | "SHIPPED"
  | "COMPLETED";

export type ArtworkCategory =
  | "Portrait"
  | "Animal"
  | "Paysage"
  | "Manga"
  | "Édition limitée";

export type ProductSupport =
  | "PAPIER_CLASSIQUE"
  | "PAPIER_PREMIUM"
  | "TOILE"
  | "POSTER"
  | "NUMERIQUE_HD";

export type DrawingFormat = "A5" | "A4" | "A3" | "CUSTOM";

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export interface ArtworkCard {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: ArtworkCategory;
  tags: string[];
  year: number;
  featured?: boolean;
}

export interface ProductCard {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  support: ProductSupport;
  inStock: boolean;
}

export interface ReviewCard {
  id: string;
  author: string;
  rating: number;
  content: string;
  city: string;
}

export interface PricingRuleRecord {
  id: string;
  name: string;
  format: DrawingFormat;
  support: ProductSupport;
  basePrice: number;
  extraPersonPrice: number;
  rushFee: number;
}

export interface OrderTimelineStep {
  label: string;
  status: OrderStatus;
  description: string;
}

export interface OrderSummary {
  id: string;
  number: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryDate?: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
}

export interface DashboardSeriesPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER";
}

export interface CustomOrderPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  drawingType: "Portrait" | "Animal" | "Paysage" | "Manga" | "Autre";
  format: DrawingFormat;
  support: ProductSupport;
  peopleCount: number;
  description: string;
  referenceImages: string[];
  desiredDate?: string;
  shippingAddress?: string;
}

