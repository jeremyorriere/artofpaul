import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { AppError, handleApiError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      items: Array<{ name: string; quantity: number; price: number }>;
      total: number;
      shippingFee: number;
    };

    if (!body.items?.length) {
      throw new AppError("Le panier est vide.", 422, "EMPTY_CART");
    }

    const orderNumber = `ART-${Date.now().toString().slice(-6)}`;

    if (!stripe) {
      return NextResponse.json({ orderNumber, mode: "demo" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: body.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
      })),
      metadata: { orderNumber },
      success_url: `${env.appUrl}/confirmation?order=${orderNumber}`,
      cancel_url: `${env.appUrl}/panier`,
      shipping_options: body.shippingFee
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: Math.round(body.shippingFee * 100),
                  currency: "eur",
                },
                display_name: "Livraison atelier",
              },
            },
          ]
        : undefined,
    });

    return NextResponse.json({ url: session.url, orderNumber });
  } catch (error) {
    return handleApiError(error);
  }
}

