import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/common/section-heading";
import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "À propos",
  description: "Biographie, parcours artistique et philosophie de travail de l'artiste derrière Art of Paul.",
};

export default function AboutPage() {
  return (
    <Container className="space-y-14 py-14 lg:py-20">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] border border-white/70 bg-white shadow-xl">
          <Image src="/artist-studio.svg" alt="Artiste dans son atelier" fill className="object-cover" />
        </div>
        <SectionHeading
          eyebrow="Biographie"
          title="Une artiste qui compose chaque dessin comme une pièce intime et mémorable."
          description="Après un parcours entre arts graphiques, illustration éditoriale et commande privée, Paul a créé un atelier dédié aux œuvres émotionnelles sur mesure. Son approche mêle précision, douceur et scénographie visuelle."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Parcours artistique",
            text: "Formée au dessin académique puis enrichie par des collaborations créatives, Paul développe une signature entre réalisme, narration et modernité visuelle.",
          },
          {
            title: "Philosophie de travail",
            text: "Chaque commande commence par l'écoute. Le brief créatif, la lecture émotionnelle des références et le choix des matières guident la composition finale.",
          },
          {
            title: "Promesse atelier",
            text: "Un rendu premium, des échanges fluides, des délais annoncés avec clarté et une expérience pensée autant pour offrir que pour collectionner.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="space-y-3 p-6">
              <h2 className="text-xl font-semibold text-stone-950">{item.title}</h2>
              <p className="text-sm leading-7 text-stone-600">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </Container>
  );
}

