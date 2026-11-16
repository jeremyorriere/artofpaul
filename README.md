# Art of Paul

Site e-commerce premium pour une artiste spécialisée dans les dessins sur commande.

## Aperçu

Le projet fournit une expérience complète autour de la commande d'œuvres personnalisées :

- présentation de l'artiste
- galerie filtrable avec favoris
- boutique avec panier
- commande personnalisée avec estimation automatique
- paiement Stripe prêt à brancher
- authentification client avec NextAuth
- espace client avec suivi de commande
- dashboard d'administration avec statistiques
- schéma Prisma complet pour PostgreSQL
- SEO : metadata, OpenGraph, `sitemap.xml`, `robots.txt`, Schema.org `Artist`

## Stack

- `Next.js 15`
- `TypeScript`
- `Tailwind CSS`
- composants style `shadcn/ui`
- `Prisma`
- `PostgreSQL`
- `Stripe`
- `NextAuth`
- `React Hook Form`
- `Zod`
- `UploadThing`
- `Recharts`

## Architecture

```text
app/
  api/
  admin/
  a-propos/
  boutique/
  commande/
  compte/
  galerie/
  paiement/
  panier/
components/
  cart/
  common/
  dashboard/
  forms/
  gallery/
  layout/
  orders/
  shop/
  ui/
lib/
repositories/
services/
schemas/
types/
prisma/
sql/
public/
```

### Organisation logique

- `components/` : UI réutilisable et sections métier
- `services/` : orchestration de la logique applicative
- `repositories/` : accès aux données / fallback démo
- `lib/` : utilitaires, auth, env, Stripe, DB
- `schemas/` : validations Zod
- `prisma/` : schéma et seed

## Mode de fonctionnement

Le projet fonctionne dans **deux modes** :

### 1. Mode démo immédiat
Aucune base de données obligatoire.

- les données viennent de `lib/demo-data.ts`
- les commandes personnalisées sont simulées
- le checkout renvoie vers la page de confirmation si Stripe n'est pas configuré
- l'authentification démo fonctionne avec comptes prévus

### 2. Mode connecté
Avec PostgreSQL + Prisma + Stripe.

- activez `DATABASE_URL`
- générez le client Prisma
- poussez le schéma
- seed la base
- configurez Stripe et NextAuth

## Installation

### Prérequis

- `Node.js 20+`
- `npm 10+`
- optionnel : `Docker Desktop` pour PostgreSQL

### 1) Installer les dépendances

```powershell
cd C:\DSI\artofpaul
npm install
```

### 2) Préparer les variables d'environnement

```powershell
Copy-Item .env.example .env
```

Le mode démo fonctionne avec ce minimum dans `.env` :

```env
NEXTAUTH_SECRET="change-me-in-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_DEMO_MODE="true"
```

### 3) Lancer le projet

```powershell
npm run dev
```

Puis ouvrez `http://localhost:3000`.

## PostgreSQL local avec Docker

```powershell
docker compose up -d
```

## Initialisation Prisma

### Génération du client Prisma

```powershell
npm run db:generate
```

Si votre machine bloque le téléchargement Prisma à cause du certificat local, utilisez temporairement :

```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
npm run db:generate
```

### Création des tables

```powershell
npm run db:push
```

### Seed de démonstration

```powershell
npm run db:seed
```

## Comptes démo

- Client : `client@artofpaul.fr` / `demo1234`
- Admin : `admin@artofpaul.fr` / `demo1234`

## Variables d'environnement

Voir `.env.example`.

Principales variables :

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_DEMO_MODE`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `UPLOADTHING_TOKEN`
- `UPLOADTHING_APP_ID`

## Pages disponibles

### Public

- `/`
- `/galerie`
- `/a-propos`
- `/boutique`
- `/commande`
- `/panier`
- `/paiement`
- `/confirmation`

### Auth / client

- `/sign-in`
- `/sign-up`
- `/forgot-password`
- `/compte`

### Admin

- `/admin`

## API

- `POST /api/auth/register`
- `GET|POST /api/auth/[...nextauth]`
- `GET /api/products`
- `POST /api/custom-orders`
- `POST /api/custom-orders/quote`
- `POST /api/checkout`
- `GET /api/dashboard`
- `GET|POST /api/uploadthing`

## Base de données Prisma

Le schéma couvre notamment :

- `User`
- `Role`
- `Artwork`
- `Category`
- `Product`
- `CustomOrder`
- `Order`
- `OrderItem`
- `PricingRule`
- `GalleryImage`
- `Review`
- `Payment`

Fichier principal : `prisma/schema.prisma`

## Vérifications réalisées

Les validations suivantes ont été exécutées avec succès sur ce workspace :

```powershell
npm run lint
npm run build
```

## Remarques d'intégration

### Stripe

- si `STRIPE_SECRET_KEY` est absente, le paiement reste en mode démonstration
- si elle est présente, une session Checkout Stripe est créée

### UploadThing

- le route handler est prêt dans `app/api/uploadthing`
- le formulaire de commande est actuellement prévu pour fallback local tant que les clés UploadThing ne sont pas renseignées

### Prisma

- l'application compile même sans client Prisma généré
- dès que la base est prête, vous pouvez activer le mode connecté avec `DATABASE_URL`

## Commandes utiles

```powershell
npm run dev
npm run lint
npm run build
npm run db:generate
npm run db:push
npm run db:seed
```
