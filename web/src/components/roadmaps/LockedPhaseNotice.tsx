import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/locale";
import type { LocalizedText } from "@/lib/types";
import { BuyButton } from "./BuyButton";

type LockedPhaseNoticeProps = {
  title: LocalizedText;
  locale: Locale;
  roadmapId: string;
  paddlePriceId: string | null;
  userId: string | null;
  lockedLabel: string;
  lockedBody: string;
  enrollLabel: string;
  signInLabel: string;
};

export function LockedPhaseNotice({
  title,
  locale,
  roadmapId,
  paddlePriceId,
  userId,
  lockedLabel,
  lockedBody,
  enrollLabel,
  signInLabel,
}: LockedPhaseNoticeProps) {
  return (
    <Card padding="lg" shadow="subtle" radius="panel" className="text-center">
      <p className="text-sm text-neutral-400">{lockedLabel}</p>
      <h1 className="mt-1 text-xl font-semibold text-neutral-900">{title[locale]}</h1>
      <p className="mt-3 leading-[1.7] text-neutral-600">{lockedBody}</p>
      {paddlePriceId && (
        <div className="mt-6 flex justify-center">
          <BuyButton
            paddlePriceId={paddlePriceId}
            roadmapId={roadmapId}
            userId={userId}
            label={enrollLabel}
            signInLabel={signInLabel}
            className={buttonVariants({ variant: "accent" })}
          />
        </div>
      )}
    </Card>
  );
}
