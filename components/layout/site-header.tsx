"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { LogoutButton } from "./logout-button";

const primaryLinks = [
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "À propos" },
  { href: "/boutique", label: "Boutique" },
];

const mobileLinks = [
  { href: "/", label: "Accueil" },
  ...primaryLinks,
];

const adminLink = { href: "/admin", label: "Administration" };
const instagramUrl = "https://www.instagram.com/art_ofpaul/";

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const accountHref = session ? "/compte" : "/sign-in";

  return (
    <header className="sticky top-0 z-40 border-b border-stone-300 bg-[#f7f4ec]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700"
          aria-label="Art of Paul — accueil"
        >
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-stone-950 bg-[#f5b04c] shadow-[2px_2px_0_#292524]">
            <Image
              src="/images/profil.jpg"
              alt=""
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-stone-500">Art of Paul</span>
            <span className="hidden text-sm font-semibold text-stone-950 sm:block">Illustration &amp; BD</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 xl:flex">
          {primaryLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-white hover:text-stone-950",
                  active && "bg-stone-950 text-white hover:bg-stone-900 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {isAdmin ? (
            <Link
              href={adminLink.href}
              aria-current={isActivePath(pathname, adminLink.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-white hover:text-stone-950",
                isActivePath(pathname, adminLink.href) && "bg-stone-950 text-white hover:bg-stone-900 hover:text-white",
              )}
            >
              {adminLink.label}
            </Link>
          ) : null}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <Button
            asChild
            size="sm"
            className="h-10 rounded-full bg-stone-950 px-5 text-white shadow-[3px_3px_0_#d97745] hover:bg-stone-800"
          >
            <Link href="/commande">Commander un dessin</Link>
          </Button>
          <span aria-hidden="true" className="mx-1 h-7 w-px bg-stone-300" />
          <Button asChild variant="ghost" size="sm" className="h-10 gap-2 rounded-full px-3 hover:bg-white">
            <Link href={accountHref} aria-label="Espace client">
              <UserRound className="size-4" />
              Espace client
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="relative h-10 gap-2 rounded-full border-stone-300 bg-[#fffdf8] px-3 hover:bg-white"
          >
            <Link href="/panier" aria-label={`Panier, ${cartCount} article${cartCount === 1 ? "" : "s"}`}>
              <ShoppingBag className="size-4" />
              Panier
              <span className="flex size-5 items-center justify-center rounded-full bg-[#f5b04c] text-[10px] font-bold text-stone-950">
                {cartCount}
              </span>
            </Link>
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-10 gap-2 rounded-full border-stone-300 bg-[#fffdf8] px-3 hover:bg-white"
          >
            <Link href="/panier" aria-label={`Panier, ${cartCount} article${cartCount === 1 ? "" : "s"}`}>
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Panier</span>
              <span className="flex size-5 items-center justify-center rounded-full bg-[#f5b04c] text-[10px] font-bold text-stone-950">
                {cartCount}
              </span>
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-10 rounded-full border-stone-300 bg-[#fffdf8] hover:bg-white"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Navigation"
          className="border-t border-stone-300 bg-[#f7f4ec] px-4 py-4 sm:px-6 xl:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {mobileLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-white",
                    active && "bg-stone-950 text-white hover:bg-stone-900",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAdmin ? (
              <Link
                href={adminLink.href}
                aria-current={isActivePath(pathname, adminLink.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-white",
                  isActivePath(pathname, adminLink.href) && "bg-stone-950 text-white hover:bg-stone-900",
                )}
                onClick={() => setOpen(false)}
              >
                {adminLink.label}
              </Link>
            ) : null}

            <Button
              asChild
              size="lg"
              className="mt-3 h-12 justify-between rounded-xl bg-stone-950 px-4 text-white hover:bg-stone-800"
            >
              <Link href="/commande" onClick={() => setOpen(false)}>
                <span>Commander un dessin</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Link
              href={accountHref}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-white"
              onClick={() => setOpen(false)}
            >
              <UserRound className="size-4" />
              Espace client
            </Link>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-xl px-4 py-3 text-sm font-medium text-stone-600 transition hover:bg-white"
            >
              Instagram · @art_ofpaul
            </a>
            {session ? (
              <div className="mt-1 px-2">
                <LogoutButton />
              </div>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
