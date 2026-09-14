"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { SignInButton } from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/Button";

type BuyButtonProps = {
  paddlePriceId: string;
  roadmapId: string;
  userId: string | null;
  label?: string;
  signInLabel?: string;
  className?: string;
};

// Signed-out visitors get a sign-in prompt instead — a purchase has to be tied to a real
// Clerk user id so the webhook (the only thing that ever actually grants access) knows who
// to enroll. `label`/`signInLabel` default to Arabic as a last resort only — real call sites
// should always pass locale-aware dictionary strings.
export function BuyButton({ paddlePriceId, roadmapId, userId, label = "اشترك الآن", signInLabel = "سجّل الدخول للشراء", className }: BuyButtonProps) {
  const [paddle, setPaddle] = useState<Paddle>();
  const buttonClassName = className ?? buttonVariants({ variant: "accent" });

  useEffect(() => {
    if (!userId) {
      return;
    }

    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token) {
      return;
    }

    const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production" ? "production" : "sandbox";

    initializePaddle({ environment, token }).then(setPaddle);
  }, [userId]);

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <button className={buttonClassName}>{signInLabel}</button>
      </SignInButton>
    );
  }

  return (
    <button
      type="button"
      disabled={!paddle}
      onClick={() =>
        paddle?.Checkout.open({
          items: [{ priceId: paddlePriceId, quantity: 1 }],
          customData: { roadmapId, userId },
        })
      }
      className={buttonClassName}
    >
      {label}
    </button>
  );
}
