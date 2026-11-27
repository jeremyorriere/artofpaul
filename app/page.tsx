import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Instagram, PencilLine, Sparkles } from "lucide-react";
import { MediaImage } from "@/components/common/media-image";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getGalleryData } from "@/services/gallery.service";

const processSteps = [
  ["01", "Vous racontez", "Une idée, une photo, un souvenir : on échange autour de ce que vous imaginez."],
  ["02", "Je donne vie", "Je compose et dessine votre pièce à la main, avec vous à chaque étape."],
  ["03", "Vous recevez", "Une création unique, soigneusement préparée pour vous ou pour offrir."],
];

const instagramUrl = "https://www.instagram.com/art_ofpaul/";

export default async function Home() {
  const { artworks } = await getGalleryData();
  const portfolio = artworks.slice(0, 6);

  const artistSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Paul",
    alternateName: "Art of Paul",
    jobTitle: "Auteur de bande dessinée et illustrateur",
    description:
      "Paul imagine et dessine des histoires illustrées, des bandes dessinées et des créations sur mesure.",
    url: "http://localhost:3000",
    image: "http://localhost:3000/og-cover.svg",
    sameAs: [instagramUrl],
    knowsAbout: ["Bande dessinée", "Illustration", "Récit graphique"],
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }}
      />

      <section className="relative isolate overflow-hidden border-b border-stone-300/70 bg-[#f7f4ec]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(173,211,198,0.42),transparent_34%),radial-gradient(ellipse_at_7%_88%,rgba(231,153,87,0.16),transparent_32%)]" />
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div className="animate-fade-up space-y-7">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-stone-300 bg-[#fffdf8]/85 py-1.5 pl-1.5 pr-4 text-sm text-stone-700 shadow-sm transition hover:border-stone-400 hover:shadow-md"
            >
              <span className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#fffdf8]">
                  <Instagram className="size-4 text-stone-900" />
                </span>
              </span>
              <span className="font-medium">L’atelier sur Instagram</span>
              <ArrowUpRight className="size-4 text-stone-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-stone-900" />
            </a>

            <div className="space-y-5">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-800">
                <Sparkles className="size-4" />
                Dessin original · commande sur mesure
              </p>
              <h1 className="max-w-2xl text-balance font-serif text-5xl font-bold leading-[1.02] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
                Une idée en tête.
                <br />
                <span className="text-orange-800">Un dessin à vous.</span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-stone-600 sm:text-xl">
                Moi, c’est Paul. Je transforme vos idées, vos personnages et vos souvenirs en dessins faits à la main — des pièces uniques à garder ou à offrir.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 gap-2 rounded-full bg-stone-950 px-6 text-white shadow-[4px_4px_0_#d97745] hover:bg-stone-800"
              >
                <Link href="/commande">
                  Imaginer mon dessin <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-stone-400 bg-[#fffdf8]/70 px-6 text-stone-900 hover:bg-white"
              >
                <Link href="/galerie">Découvrir le portfolio</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-stone-300 pt-5 text-sm font-medium text-stone-600">
              <span>Portraits</span>
              <span className="text-orange-700">✳</span>
              <span>Animaux</span>
              <span className="text-orange-700">✳</span>
              <span>Univers imaginaires</span>
            </div>
          </div>

          <div className="animate-fade-up-delay-2 relative mx-auto w-full max-w-[560px]">
            <div className="absolute -left-3 top-12 z-10 hidden -rotate-6 rounded-sm border-2 border-stone-900 bg-[#fffdf8] px-4 py-3 font-serif text-lg font-bold text-stone-900 shadow-[3px_3px_0_#292524] sm:block">
              Fait pour vous, à la main
            </div>
            <div className="relative aspect-[5/5.4] rotate-1 overflow-hidden border-[5px] border-stone-900 bg-[#fffdf8] p-1 shadow-[10px_10px_0_#d8cfc0]">
              <Image
                src="/hero-art.svg"
                alt="Illustration originale : un enfant rencontre un renard dans un pré"
                fill
                priority
                className="object-cover"
              />
            </div>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute -bottom-5 right-2 z-10 flex -rotate-3 items-center gap-3 rounded-full border-2 border-stone-900 bg-[#fffdf8] px-3 py-2 shadow-[3px_3px_0_#292524] transition hover:-translate-y-1 sm:right-6"
            >
              <span className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                <span className="relative block size-9 overflow-hidden rounded-full border border-white">
                  <Image
                    src="/images/profil.jpg"
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
              </span>
              <span className="pr-1 text-left leading-tight">
                <span className="block text-xs text-stone-500">Suivre le carnet</span>
                <span className="font-semibold text-stone-900">@art_ofpaul</span>
              </span>
              <ArrowUpRight className="mr-1 size-4 text-stone-500" />
            </a>
          </div>
        </Container>
      </section>

      <Container className="space-y-24 py-20 sm:py-24">
        <section className="space-y-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Le portfolio"
              title="Des dessins, chacun avec son histoire."
              description="Quelques créations de l’atelier — un aperçu des univers qu’on peut imaginer ensemble."
            />
            <Button asChild variant="outline" className="w-fit rounded-full border-stone-400">
              <Link href="/galerie">
                Tout le portfolio <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((artwork, index) => (
              <Link
                href="/galerie"
                key={artwork.id}
                className={`group block ${index === 1 ? "lg:translate-y-8" : ""} ${index === 4 ? "lg:-translate-y-4" : ""}`}
              >
                <div className="relative aspect-[4/4.5] overflow-hidden border-2 border-stone-900 bg-[#fffdf8] shadow-[5px_5px_0_#d8cfc0] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_#d8cfc0]">
                  <MediaImage
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-stone-900 bg-[#fffdf8] px-3 py-1 text-xs font-semibold text-stone-800">
                    {artwork.category}
                  </span>
                  <span className="absolute bottom-3 right-3 flex size-10 translate-y-2 items-center justify-center rounded-full bg-[#fffdf8] text-stone-900 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 px-1 pt-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-950">{artwork.title}</h3>
                    <p className="mt-1 text-sm text-stone-500">{artwork.tags.join(" · ")}</p>
                  </div>
                  <span className="mt-1 font-mono text-xs text-stone-400">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-9 border-y border-stone-300 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:py-16">
          <div className="space-y-5">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-800">
              <PencilLine className="size-4" />
              Votre projet, du premier trait au dernier
            </p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
              Un dessin personnalisé, ça commence par votre histoire.
            </h2>
            <p className="max-w-xl leading-7 text-stone-600">
              Un portrait, votre compagnon à quatre pattes ou un personnage sorti de votre imagination : racontez-moi ce qui compte, je m’occupe de le dessiner.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-stone-950 px-6 text-white shadow-[4px_4px_0_#d97745] hover:bg-stone-800"
            >
              <Link href="/commande">
                Parler de mon idée <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {processSteps.map(([step, title, text]) => (
              <div key={step} className="rounded-sm border border-stone-300 bg-[#fffdf8] p-5 shadow-sm">
                <p className="font-mono text-sm font-bold text-orange-800">{step}</p>
                <h3 className="mt-3 font-serif text-lg font-bold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-sm border-2 border-stone-900 bg-[#dcebe3] shadow-[7px_7px_0_#292524]">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px]">
                <span className="flex size-full items-center justify-center rounded-full bg-[#dcebe3]">
                  <Instagram className="size-6 text-stone-950" />
                </span>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-600">Le carnet continue ici</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
                Croquis, coulisses & nouveaux dessins.
              </h2>
              <p className="mt-4 leading-7 text-stone-700">
                Retrouvez la vie de l’atelier et les dernières créations sur Instagram.
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-stone-950 underline decoration-orange-700 decoration-2 underline-offset-4 transition hover:text-orange-800"
              >
                @art_ofpaul <ArrowUpRight className="size-4" />
              </a>
            </div>

            <div className="grid grid-cols-3 border-t-2 border-stone-900 lg:border-l-2 lg:border-t-0">
              {portfolio.slice(0, 3).map((artwork) => (
                <Link
                  key={artwork.id}
                  href="/galerie"
                  aria-label={`Découvrir ${artwork.title} dans la galerie`}
                  className="group relative aspect-square overflow-hidden border-r-2 border-stone-900 last:border-r-0"
                >
                  <MediaImage
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-stone-950/0 text-white transition group-hover:bg-stone-950/35">
                    <ArrowUpRight className="size-7 opacity-0 transition group-hover:opacity-100" />
                  </span>
                </Link>
              ))}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="col-span-3 flex items-center justify-between border-t-2 border-stone-900 bg-[#fffdf8] px-5 py-4 text-sm font-semibold text-stone-800 transition hover:bg-white"
              >
                <span>Voir l’atelier sur Instagram</span>
                <span className="flex items-center gap-2">
                  Suivre <ArrowUpRight className="size-4" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-sm border-2 border-stone-900 bg-stone-950 px-6 py-10 text-[#fffdf8] shadow-[7px_7px_0_#d8cfc0] sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full border-[30px] border-orange-500/20" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">À vous de jouer</p>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">On dessine votre idée ?</h2>
              <p className="leading-7 text-stone-300">
                Décrivez votre projet en quelques mots. On échange, puis je lui donne vie, trait après trait.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-[#f5b04c] px-6 font-semibold text-stone-950 hover:bg-orange-300">
                <Link href="/commande">
                  Démarrer ma commande <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-stone-500 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/boutique">
                  Voir la boutique <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
