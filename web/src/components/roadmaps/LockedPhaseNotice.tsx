import type { LocalizedText } from "@/lib/types";
import { BuyButton } from "./BuyButton";

type LockedPhaseNoticeProps = {
  title: LocalizedText;
  roadmapId: string;
  paddlePriceId: string | null;
  userId: string | null;
};

export function LockedPhaseNotice({ title, roadmapId, paddlePriceId, userId }: LockedPhaseNoticeProps) {
  return (
    <div className="rounded-lg border border-neutral-200 p-6 text-center">
      <p className="text-sm text-neutral-400">مرحلة مقفلة</p>
      <h1 className="mt-1 text-xl font-semibold text-neutral-900">{title.ar}</h1>
      <p className="mt-3 leading-[1.7] text-neutral-600">
        هذه المرحلة متاحة فقط للمشتركين. اشترك في المسار للوصول إلى كامل المحتوى.
      </p>
      {paddlePriceId && (
        <div className="mt-6 flex justify-center">
          <BuyButton paddlePriceId={paddlePriceId} roadmapId={roadmapId} userId={userId} />
        </div>
      )}
    </div>
  );
}
