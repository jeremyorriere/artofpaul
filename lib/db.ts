/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";
import { integrations } from "@/lib/env";

type PrismaClientLike = {
  [key: string]: any;
};

declare global {
  var prismaGlobal: PrismaClientLike | null | undefined;
  var prismaUnavailable: boolean | undefined;
}

function createPrismaClient(): PrismaClientLike | null {
  return new PrismaClient({ log: ["error", "warn"] }) as unknown as PrismaClientLike;
}

export const prisma = integrations.databaseEnabled
  ? globalThis.prismaGlobal ?? createPrismaClient()
  : null;

if (prisma && process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export function isDatabaseUnavailableError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const candidate = error as {
    code?: string;
    name?: string;
    message?: string;
  };

  return (
    candidate.code === "P1001" ||
    candidate.name === "PrismaClientInitializationError" ||
    candidate.message?.includes("Can't reach database server") === true ||
    candidate.message?.includes("Can't connect to database server") === true
  );
}

export async function withPrismaFallback<T>(
  operation: () => Promise<T>,
  fallback: () => T | Promise<T>,
): Promise<T> {
  if (!prisma || globalThis.prismaUnavailable) {
    return await fallback();
  }

  try {
    return await operation();
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      globalThis.prismaUnavailable = true;
      console.warn("Database unavailable, switching to demo fallback.");
      return await fallback();
    }

    throw error;
  }
}

