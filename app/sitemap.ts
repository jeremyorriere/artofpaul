import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";
  const routes = [
    "",
    "/galerie",
    "/a-propos",
    "/boutique",
    "/commande",
    "/panier",
    "/paiement",
    "/compte",
    "/admin",
    "/sign-in",
    "/sign-up",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

