import { LocalizedTextInput } from "./LocalizedTextInput";
import { OutcomesFieldset } from "./OutcomesFieldset";
import type { AdminRoadmapDetail } from "@/lib/types";

// The Details tab's actual input fields — no <form> tag or action hook here, both live in
// RoadmapEditor.tsx (the one form spans Details + the Exam tab's pass-threshold field + the
// Settings tab's toggle, joined via the `form` attribute rather than DOM nesting, since a
// roadmap update is a full replace and all three tabs' fields need to submit together).
export function RoadmapDetailsFields({ roadmap, pending }: { roadmap: AdminRoadmapDetail; pending: boolean }) {
  return (
    <fieldset disabled={pending} className="flex flex-col gap-5">
      <input type="hidden" name="id" value={roadmap.id} />

      <LocalizedTextInput label="العنوان" name="title" defaultValue={roadmap.title} required />

      <div className="flex flex-col gap-1">
        <LocalizedTextInput label="وصف قصير (اختياري)" name="description" defaultValue={roadmap.description ?? undefined} multiline />
        <span className="text-xs text-neutral-400">يظهر تحت العنوان في بطاقة المسار — يُفضَّل ألا يتجاوز سطرين.</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700">الرابط المختصر (Slug)</span>
          <input
            name="slug"
            required
            dir="ltr"
            defaultValue={roadmap.slug}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700">السعر</span>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            dir="ltr"
            defaultValue={roadmap.price}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700">السعر قبل الخصم (اختياري)</span>
          <input
            name="originalPrice"
            type="number"
            step="0.01"
            min="0"
            dir="ltr"
            defaultValue={roadmap.originalPrice ?? ""}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <LocalizedTextInput label="المستوى (اختياري)" name="level" defaultValue={roadmap.level ?? undefined} />
        <span className="text-xs text-neutral-400">مثال: مبتدئ ← متقدّم</span>
      </div>

      <OutcomesFieldset existingOutcomes={roadmap.outcomes} />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">معرّف السعر في Paddle (اختياري)</span>
        <input
          name="paddlePriceId"
          dir="ltr"
          defaultValue={roadmap.paddlePriceId ?? ""}
          placeholder="pri_01xxxxxxxxxxxxxxxxxxxxxxxx"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <span className="text-xs text-neutral-400">يُنشأ يدويًا من لوحة Paddle، ويُستخدم لفتح صفحة الدفع لهذا المسار.</span>
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-neutral-700">صورة الغلاف (اختياري)</span>
        <input type="hidden" name="currentImageUrl" value={roadmap.imageUrl ?? ""} />

        {roadmap.imageUrl && (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-supplied external URL, not a fixed set of domains next/image can allowlist */}
            <img
              src={roadmap.imageUrl}
              alt=""
              className="h-20 w-28 rounded-lg border border-neutral-200 bg-white object-contain p-1"
            />
            <label className="flex items-center gap-2 text-xs text-neutral-600">
              <input name="removeImage" type="checkbox" className="h-4 w-4" />
              إزالة الصورة الحالية
            </label>
          </div>
        )}

        <input
          name="imageFile"
          type="file"
          accept="image/*"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm file:me-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium"
        />
        <span className="text-xs text-neutral-400">
          تظهر على خلفية بيضاء في بطاقة المسار — الصور بدون خلفية (PNG شفاف) تناسبها أكثر. بدون صورة، تبقى الخلفية بيضاء فقط.
        </span>
      </div>
    </fieldset>
  );
}
