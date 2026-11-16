"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { ArtworkCard, OrderSummary, PricingRuleRecord, UserSummary } from "@/types/app";

type AdminTab = "orders" | "gallery" | "pricing" | "users";

interface AdminConsoleProps {
  initialOrders: OrderSummary[];
  initialPricing: PricingRuleRecord[];
  initialUsers: UserSummary[];
  initialGallery: ArtworkCard[];
}

export function AdminConsole({
  initialOrders,
  initialPricing,
  initialUsers,
  initialGallery,
}: Readonly<AdminConsoleProps>) {
  const [tab, setTab] = useState<AdminTab>("orders");
  const [ordersState, setOrdersState] = useState(initialOrders);
  const [pricingState, setPricingState] = useState(initialPricing);
  const [usersState, setUsersState] = useState(initialUsers);
  const [galleryState, setGalleryState] = useState(initialGallery);
  const [editingArtworkId, setEditingArtworkId] = useState<string | null>(null);
  const [editingArtwork, setEditingArtwork] = useState({
    title: "",
    category: "",
    imageUrl: "",
    tags: "",
  });
  const [query, setQuery] = useState("");

  const filteredOrders = useMemo(
    () => ordersState.filter((order) => order.number.toLowerCase().includes(query.toLowerCase())),
    [ordersState, query],
  );

  async function updateOrderStatus(id: string, status: string) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      toast.error("Impossible de mettre à jour le statut.");
      return;
    }

    setOrdersState((current) =>
      current.map((order) => (order.id === id ? { ...order, status: status as OrderSummary["status"] } : order)),
    );
    toast.success("Statut mis à jour.");
  }

  async function createPricingRule(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/pricing-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      toast.error("Impossible d'ajouter le tarif.");
      return;
    }

    const created = (await response.json()) as PricingRuleRecord;
    setPricingState((current) => [created, ...current]);
    toast.success("Tarif ajouté.");
  }

  async function createUser(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      toast.error("Impossible d'ajouter l'utilisateur.");
      return;
    }

    const created = (await response.json()) as UserSummary;
    setUsersState((current) => [created, ...current]);
    toast.success("Utilisateur ajouté.");
  }

  async function createGalleryEntry(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/gallery-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      toast.error("Impossible d'ajouter l'œuvre.");
      return;
    }

    const created = (await response.json()) as ArtworkCard;
    setGalleryState((current) => [created, ...current]);
    toast.success("Œuvre ajoutée à la galerie.");
  }

  function startEditingArtwork(artwork: ArtworkCard) {
    setEditingArtworkId(artwork.id);
    setEditingArtwork({
      title: artwork.title,
      category: artwork.category,
      imageUrl: artwork.imageUrl,
      tags: artwork.tags.join(", "),
    });
  }

  async function saveArtworkChanges(id: string) {
    const response = await fetch(`/api/gallery-images/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editingArtwork.title,
        category: editingArtwork.category,
        imageUrl: editingArtwork.imageUrl,
        tags: editingArtwork.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });

    if (!response.ok) {
      toast.error("Impossible de modifier l’œuvre.");
      return;
    }

    const updated = (await response.json()) as ArtworkCard;
    setGalleryState((current) => current.map((item) => (item.id === id ? updated : item)));
    setEditingArtworkId(null);
    toast.success("Œuvre mise à jour.");
  }

  async function deleteArtwork(id: string) {
    const response = await fetch(`/api/gallery-images/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Impossible de supprimer.");
      return;
    }

    setGalleryState((current) => current.filter((item) => item.id !== id));
    if (editingArtworkId === id) {
      setEditingArtworkId(null);
    }
    toast.success("Œuvre supprimée.");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {[
          ["orders", "Commandes"],
          ["gallery", "Galerie"],
          ["pricing", "Tarifs"],
          ["users", "Utilisateurs"],
        ].map(([value, label]) => (
          <Button
            key={value}
            variant={tab === value ? "default" : "secondary"}
            onClick={() => setTab(value as AdminTab)}
          >
            {label}
          </Button>
        ))}
      </div>

      {tab === "orders" ? (
        <Card>
          <CardHeader>
            <CardTitle>Gestion des commandes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Recherche par numéro de commande" value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-stone-200 p-4">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-stone-950">{order.number}</p>
                      <p className="text-sm text-stone-500">{formatPrice(order.total)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>{order.status}</Badge>
                      <Select
                        defaultValue={order.status}
                        options={[
                          { label: "En attente", value: "PENDING" },
                          { label: "En cours", value: "IN_PROGRESS" },
                          { label: "Validation client", value: "CLIENT_REVIEW" },
                          { label: "Expédiée", value: "SHIPPED" },
                          { label: "Terminée", value: "COMPLETED" },
                        ]}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-stone-600">
                    {order.items.map((item) => (
                      <div key={item.name} className="flex justify-between gap-4">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{formatPrice(item.quantity * item.unitPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {tab === "gallery" ? (
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une œuvre</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  await createGalleryEntry(new FormData(form));
                  form.reset();
                }}
              >
                <div>
                  <Label htmlFor="gallery-title">Titre</Label>
                  <Input id="gallery-title" name="title" required />
                </div>
                <div>
                  <Label htmlFor="gallery-category">Catégorie</Label>
                  <Input id="gallery-category" name="category" required />
                </div>
                <div>
                  <Label htmlFor="gallery-image">URL image</Label>
                  <Input id="gallery-image" name="imageUrl" placeholder="/artwork-1.svg" required />
                  <p className="mt-2 text-xs leading-5 text-stone-500">
                    Les URLs directes d’image fonctionnent. Les miniatures Google peuvent s’afficher mais restent parfois temporaires ou instables.
                  </p>
                </div>
                <div>
                  <Label htmlFor="gallery-tags">Tags</Label>
                  <Textarea id="gallery-tags" name="tags" placeholder="portrait, fusain, premium" />
                </div>
                <Button type="submit" className="w-full">Ajouter à la galerie</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Œuvres publiées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {galleryState.map((item) => (
                <div key={item.id} className="rounded-3xl bg-stone-50 px-4 py-4 text-sm">
                  {editingArtworkId === item.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editingArtwork.title}
                        onChange={(event) =>
                          setEditingArtwork((current) => ({ ...current, title: event.target.value }))
                        }
                        placeholder="Titre"
                      />
                      <Input
                        value={editingArtwork.category}
                        onChange={(event) =>
                          setEditingArtwork((current) => ({ ...current, category: event.target.value }))
                        }
                        placeholder="Catégorie"
                      />
                      <Input
                        value={editingArtwork.imageUrl}
                        onChange={(event) =>
                          setEditingArtwork((current) => ({ ...current, imageUrl: event.target.value }))
                        }
                        placeholder="URL image"
                      />
                      <Input
                        value={editingArtwork.tags}
                        onChange={(event) =>
                          setEditingArtwork((current) => ({ ...current, tags: event.target.value }))
                        }
                        placeholder="tags séparés par des virgules"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveArtworkChanges(item.id)}>Enregistrer</Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditingArtworkId(null)}>
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-stone-900">{item.title}</p>
                        <p className="text-stone-500">{item.category}</p>
                        <p className="mt-1 text-xs text-stone-400">{item.tags.join(" • ")}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => startEditingArtwork(item)}>
                          Modifier
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteArtwork(item.id)}>
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {tab === "pricing" ? (
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Nouveau tarif</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  await createPricingRule(new FormData(form));
                  form.reset();
                }}
              >
                <div>
                  <Label htmlFor="pricing-name">Nom</Label>
                  <Input id="pricing-name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="pricing-format">Format</Label>
                  <Select
                    id="pricing-format"
                    name="format"
                    options={[
                      { label: "A5", value: "A5" },
                      { label: "A4", value: "A4" },
                      { label: "A3", value: "A3" },
                      { label: "Personnalisé", value: "CUSTOM" },
                    ]}
                  />
                </div>
                <div>
                  <Label htmlFor="pricing-support">Support</Label>
                  <Select
                    id="pricing-support"
                    name="support"
                    options={[
                      { label: "Papier classique", value: "PAPIER_CLASSIQUE" },
                      { label: "Papier premium", value: "PAPIER_PREMIUM" },
                      { label: "Toile", value: "TOILE" },
                      { label: "Poster", value: "POSTER" },
                      { label: "Version numérique HD", value: "NUMERIQUE_HD" },
                    ]}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input name="basePrice" type="number" min={0} placeholder="Base" required />
                  <Input name="extraPersonPrice" type="number" min={0} placeholder="Personne supp." required />
                  <Input name="rushFee" type="number" min={0} placeholder="Express" required />
                </div>
                <Button type="submit" className="w-full">Créer le tarif</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tarifs existants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pricingState.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between rounded-3xl bg-stone-50 px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-stone-900">{rule.name}</p>
                    <p className="text-stone-500">{rule.format} • {rule.support}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-stone-900">{formatPrice(rule.basePrice)}</p>
                    <p className="text-stone-500">+ pers. {formatPrice(rule.extraPersonPrice)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {tab === "users" ? (
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Créer un utilisateur</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  await createUser(new FormData(form));
                  form.reset();
                }}
              >
                <div>
                  <Label htmlFor="user-name">Nom</Label>
                  <Input id="user-name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="user-email">Email</Label>
                  <Input id="user-email" name="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="user-role">Rôle</Label>
                  <Select
                    id="user-role"
                    name="role"
                    options={[
                      { label: "Client", value: "CUSTOMER" },
                      { label: "Admin", value: "ADMIN" },
                    ]}
                  />
                </div>
                <Button type="submit" className="w-full">Créer l’utilisateur</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {usersState.map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-3xl bg-stone-50 px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-stone-900">{user.name}</p>
                    <p className="text-stone-500">{user.email}</p>
                  </div>
                  <Badge>{user.role}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

