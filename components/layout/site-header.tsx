"use client";

import Link from "next/link";
import { Menu, ShoppingBag, Heart, User2, LogIn } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { LogoutButton } from "./logout-button";

const baseLinks = [
  { href: "/", label: "Accueil" },
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "À propos" },
  { href: "/boutique", label: "Boutique" },
  { href: "/commande", label: "Commande personnalisée" },
  { href: "/compte", label: "Espace client" },
];

const adminLink = { href: "/admin", label: "Admin" };

function getLinks(isAdmin: boolean) {
  return isAdmin ? [...baseLinks, adminLink] : baseLinks;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";
  const links = getLinks(isAdmin);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-stone-950 text-sm font-semibold text-white">AP</div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">Art of Paul</div>
            <div className="text-lg font-semibold text-stone-950">Atelier sur mesure</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-all duration-200 hover:bg-stone-100 hover:text-stone-950",
                  active && "bg-stone-950 text-white hover:bg-stone-900 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-stone-100">
            <Link href="/galerie" aria-label="Favoris">
              <Heart className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-stone-100">
            <Link href="/compte" aria-label="Compte client">
              <User2 className="size-5" />
            </Link>
          </Button>

          {session ? (
            <LogoutButton />
          ) : (
            <Button asChild variant="ghost" size="sm" className="rounded-full gap-2 hover:bg-stone-100">
              <Link href="/sign-in" className="gap-2">
                <LogIn className="size-4" />
                Connexion
              </Link>
            </Button>
          )}

          <Button asChild variant="secondary" className="relative rounded-full px-4 shadow-sm transition-all hover:shadow-md">
            <Link href="/panier" className="flex items-center gap-2">
              <ShoppingBag className="size-4" />
              Panier
              <span className="flex size-6 items-center justify-center rounded-full bg-stone-950 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            </Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen((value) => !value)}>
          <Menu className="size-5" />
        </Button>
      </div>

      {open ? (
        <div className="border-t border-stone-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100",
                  pathname === link.href && "bg-stone-950 text-white hover:bg-stone-900",
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild variant="secondary" className="mt-2 rounded-2xl">
              <Link href="/panier" className="flex items-center gap-2">
                <ShoppingBag className="size-4" />
                Panier ({cartCount})
              </Link>
            </Button>

            <div className="mt-2 flex flex-col gap-2">
              {session ? (
                <LogoutButton />
              ) : (
                <Button asChild variant="default" className="rounded-2xl">
                  <Link href="/sign-in" className="gap-2">
                    <LogIn className="size-4" />
                    Connexion
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
