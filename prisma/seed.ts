import bcrypt from "bcryptjs";
import { PrismaClient, RoleName, DrawingFormat, ProductSupport, OrderStatus, PaymentStatus, DrawingType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [adminRole, customerRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: RoleName.ADMIN },
      update: {},
      create: { name: RoleName.ADMIN },
    }),
    prisma.role.upsert({
      where: { name: RoleName.CUSTOMER },
      update: {},
      create: { name: RoleName.CUSTOMER },
    }),
  ]);

  const passwordHash = await bcrypt.hash("demo1234", 10);

  const [adminUser, customerUser] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@artofpaul.fr" },
      update: {},
      create: {
        name: "Paul Atelier",
        email: "admin@artofpaul.fr",
        passwordHash,
        roleId: adminRole.id,
      },
    }),
    prisma.user.upsert({
      where: { email: "client@artofpaul.fr" },
      update: {},
      create: {
        name: "Client Démo",
        email: "client@artofpaul.fr",
        passwordHash,
        roleId: customerRole.id,
      },
    }),
  ]);

  const portrait = await prisma.category.upsert({
    where: { slug: "portrait" },
    update: {},
    create: {
      name: "Portrait",
      slug: "portrait",
      description: "Dessins de portrait sur commande.",
    },
  });

  const animal = await prisma.category.upsert({
    where: { slug: "animal" },
    update: {},
    create: {
      name: "Animal",
      slug: "animal",
      description: "Compagnons et portraits animaliers.",
    },
  });

  const paysage = await prisma.category.upsert({
    where: { slug: "paysage" },
    update: {},
    create: {
      name: "Paysage",
      slug: "paysage",
      description: "Scènes urbaines, naturelles et poétiques.",
    },
  });

  const manga = await prisma.category.upsert({
    where: { slug: "manga" },
    update: {},
    create: {
      name: "Manga",
      slug: "manga",
      description: "Illustrations inspirées manga et pop culture.",
    },
  });

  const collector = await prisma.category.upsert({
    where: { slug: "edition-limitee" },
    update: {},
    create: {
      name: "Édition limitée",
      slug: "edition-limitee",
      description: "Œuvres en édition limitée et collections premium.",
    },
  });

  await prisma.artwork.upsert({
    where: { slug: "eclat-dambre" },
    update: {},
    create: {
      title: "Éclat d'ambre",
      slug: "eclat-dambre",
      description: "Portrait au fusain et rehauts dorés.",
      coverImage: "/artwork-1.svg",
      tags: ["portrait", "fusain", "lumière"],
      featured: true,
      categoryId: portrait.id,
    },
  });

  await prisma.artwork.upsert({
    where: { slug: "complicite-sauvage" },
    update: {},
    create: {
      title: "Complicité sauvage",
      slug: "complicite-sauvage",
      description: "Portrait animalier détaillé sur papier premium.",
      coverImage: "/artwork-2.svg",
      tags: ["animal", "texture"],
      featured: true,
      categoryId: animal.id,
    },
  });

  await prisma.artwork.upsert({
    where: { slug: "brume-sur-kyoto" },
    update: {},
    create: {
      title: "Brume sur Kyoto",
      slug: "brume-sur-kyoto",
      description: "Paysage urbain aux encres douces.",
      coverImage: "/artwork-3.svg",
      tags: ["paysage", "encre"],
      featured: true,
      categoryId: paysage.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "portrait-signature-a4" },
    update: {},
    create: {
      name: "Portrait signature A4",
      slug: "portrait-signature-a4",
      description: "Portrait artistique noir et blanc sur papier premium.",
      imageUrl: "/artwork-1.svg",
      price: 149,
      support: ProductSupport.PAPIER_PREMIUM,
      categoryId: portrait.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "poster-illustre-galerie" },
    update: {},
    create: {
      name: "Poster illustré galerie",
      slug: "poster-illustre-galerie",
      description: "Poster fine art d'une œuvre originale signée.",
      imageUrl: "/artwork-3.svg",
      price: 59,
      support: ProductSupport.POSTER,
      categoryId: paysage.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "toile-collector" },
    update: {},
    create: {
      name: "Toile collector",
      slug: "toile-collector",
      description: "Impression sur toile premium en série limitée.",
      imageUrl: "/artwork-5.svg",
      price: 219,
      support: ProductSupport.TOILE,
      categoryId: collector.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "pack-numerique-hd" },
    update: {},
    create: {
      name: "Pack numérique HD",
      slug: "pack-numerique-hd",
      description: "Fichier HD optimisé impression et réseaux sociaux.",
      imageUrl: "/artwork-4.svg",
      price: 89,
      support: ProductSupport.NUMERIQUE_HD,
      categoryId: manga.id,
    },
  });

  const pricingEntries = [
    {
      name: "Papier classique A5",
      format: DrawingFormat.A5,
      support: ProductSupport.PAPIER_CLASSIQUE,
      basePrice: 75,
      extraPersonPrice: 20,
      rushFee: 25,
    },
    {
      name: "Papier premium A4",
      format: DrawingFormat.A4,
      support: ProductSupport.PAPIER_PREMIUM,
      basePrice: 125,
      extraPersonPrice: 28,
      rushFee: 35,
    },
    {
      name: "Toile A3",
      format: DrawingFormat.A3,
      support: ProductSupport.TOILE,
      basePrice: 220,
      extraPersonPrice: 35,
      rushFee: 50,
    },
    {
      name: "Version numérique HD",
      format: DrawingFormat.CUSTOM,
      support: ProductSupport.NUMERIQUE_HD,
      basePrice: 90,
      extraPersonPrice: 18,
      rushFee: 20,
    },
  ];

  for (const entry of pricingEntries) {
    await prisma.pricingRule.upsert({
      where: {
        id: `${entry.name}-${entry.format}-${entry.support}`.replace(/\s+/g, "-").toLowerCase(),
      },
      update: {
        name: entry.name,
        format: entry.format,
        support: entry.support,
        basePrice: entry.basePrice,
        extraPersonPrice: entry.extraPersonPrice,
        rushFee: entry.rushFee,
      },
      create: {
        id: `${entry.name}-${entry.format}-${entry.support}`.replace(/\s+/g, "-").toLowerCase(),
        ...entry,
      },
    });
  }

  await prisma.review.createMany({
    data: [
      {
        authorName: "Camille R.",
        authorCity: "Lyon",
        rating: 5,
        content: "Un portrait bouleversant de justesse.",
        userId: customerUser.id,
      },
      {
        authorName: "Nadia T.",
        authorCity: "Paris",
        rating: 5,
        content: "Commande fluide, échanges chaleureux et résultat sublime.",
      },
    ],
    skipDuplicates: true,
  });

  const demoOrder = await prisma.order.upsert({
    where: { number: "ART-240901" },
    update: {},
    create: {
      number: "ART-240901",
      customerId: customerUser.id,
      total: 184,
      shippingFee: 12,
      status: OrderStatus.IN_PROGRESS,
      notes: "Portrait de couple en cours de finalisation.",
      estimatedDelivery: new Date("2026-10-05"),
      items: {
        create: [
          {
            name: "Portrait signature A4",
            quantity: 1,
            unitPrice: 149,
          },
        ],
      },
    },
  });

  await prisma.customOrder.upsert({
    where: { orderId: demoOrder.id },
    update: {},
    create: {
      orderId: demoOrder.id,
      firstName: "Client",
      lastName: "Démo",
      email: customerUser.email,
      phone: "+33600000000",
      drawingType: DrawingType.PORTRAIT,
      format: DrawingFormat.A4,
      support: ProductSupport.PAPIER_PREMIUM,
      peopleCount: 2,
      description: "Portrait de couple lumineux avec ambiance douce.",
      referenceImages: ["/artwork-1.svg"],
      desiredDate: new Date("2026-10-05"),
      shippingAddress: "15 rue de l'Atelier, Lyon",
      totalPrice: 184,
      status: OrderStatus.IN_PROGRESS,
    },
  });

  await prisma.payment.upsert({
    where: { orderId: demoOrder.id },
    update: {},
    create: {
      orderId: demoOrder.id,
      amount: 184,
      currency: "eur",
      status: PaymentStatus.SUCCEEDED,
      stripePaymentIntentId: "pi_demo_success",
    },
  });

  console.log({ adminUser: adminUser.email, customerUser: customerUser.email });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

