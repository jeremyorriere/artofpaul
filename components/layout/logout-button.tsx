"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-stone-600 hover:text-stone-950"
    >
      <LogOut className="mr-2 size-4" />
      Se déconnecter
    </Button>
  );
}

