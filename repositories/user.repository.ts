import bcrypt from "bcryptjs";
import { prisma, withPrismaFallback } from "@/lib/db";
import { users } from "@/lib/demo-data";

const DEMO_PASSWORD = "demo1234";

export class UserRepository {
  async verifyCredentials(email: string, password: string) {
    const demoFallback = () => {
      const user = users.find((item) => item.email === email);
      if (!user || password !== DEMO_PASSWORD) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    };

    return withPrismaFallback(
      async () => {
        const user = await prisma!.user.findUnique({
          where: { email },
          include: { role: true },
        });

        if (!user?.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name as "ADMIN" | "CUSTOMER",
        };
      },
      demoFallback,
    );
  }

  async createUser(input: { name: string; email: string; password: string }) {
    return withPrismaFallback(
      async () => {
        const passwordHash = await bcrypt.hash(input.password, 10);
        const customerRole = await prisma!.role.findFirst({ where: { name: "CUSTOMER" } });
        if (!customerRole) {
          throw new Error("Customer role not found. Seed the database first.");
        }

        return prisma!.user.create({
          data: {
            name: input.name,
            email: input.email,
            passwordHash,
            roleId: customerRole.id,
          },
          include: { role: true },
        });
      },
      () => ({
        id: crypto.randomUUID(),
        name: input.name,
        email: input.email,
        role: "CUSTOMER" as const,
      }),
    );
  }
}

