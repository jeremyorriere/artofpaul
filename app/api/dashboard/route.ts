import { NextResponse } from "next/server";
import { getDashboardData } from "@/services/dashboard.service";
import { handleApiError } from "@/lib/errors";

export async function GET() {
  try {
    const dashboard = await getDashboardData();
    return NextResponse.json(dashboard);
  } catch (error) {
    return handleApiError(error);
  }
}

