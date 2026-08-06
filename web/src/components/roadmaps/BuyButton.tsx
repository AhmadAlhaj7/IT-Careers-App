"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { SignInButton } from "@clerk/nextjs";

type BuyButtonProps = {
  paddlePriceId: string;
  roadmapId: string;
  userId: string | null;
  label?: string;
  className?: string;
};

const DEFAULT_CLASS_NAME = "rounded-md bg-[#0F6E56] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50";

// Signed-out visitors get a sign-in prompt instead — a purchase has to be tied to a real
// Clerk user id so the webhook (the only thing that ever actually grants access) knows who
// to enroll.
export function BuyButton({ paddlePriceId, roadmapId, userId, label = "اشترك الآن", className }: BuyButtonProps) {
  const [paddle, setPaddle] = useState<Paddle>();
  const buttonClassName = className ?? DEFAULT_CLASS_NAME;

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
        <button className={buttonClassName}>سجّل الدخول للشراء</button>
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
