const bool = (value?: string) => value === "true";

export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  databaseUrl: process.env.DATABASE_URL,
  nextAuthSecret: process.env.NEXTAUTH_SECRET ?? "dev-secret-artofpaul",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  uploadThingToken: process.env.UPLOADTHING_TOKEN,
  uploadThingAppId: process.env.UPLOADTHING_APP_ID,
  isDemoMode: bool(process.env.NEXT_PUBLIC_DEMO_MODE) || !process.env.DATABASE_URL,
};

export const integrations = {
  stripeEnabled: Boolean(env.stripeSecretKey),
  uploadThingEnabled: Boolean(env.uploadThingToken && env.uploadThingAppId),
  databaseEnabled: Boolean(env.databaseUrl) && !env.isDemoMode,
};

