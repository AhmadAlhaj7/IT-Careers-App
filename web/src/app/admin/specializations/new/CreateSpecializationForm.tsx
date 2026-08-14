"use client";

import { useActionState } from "react";
import { createSpecializationAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";

const initialState: ActionState = {};

export function CreateSpecializationForm() {
  const [state, formAction, pending] = useActionState(createSpecializationAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <LocalizedTextInput label="الاسم" name="name" required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الرابط المختصر (Slug)</span>
        <input name="slug" required dir="ltr" className="rounded-md border border-neutral-300 px-3 py-2 text-sm" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">التصنيف</span>
        <select name="category" defaultValue="Development" className="rounded-md border border-neutral-300 px-3 py-2 text-sm">
          <option value="Development">تطوير</option>
          <option value="Data">بيانات</option>
          <option value="Security">أمن</option>
          <option value="Infrastructure">بنية تحتية</option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">مؤشّر الطلب</span>
        <select name="demandLevel" defaultValue="Good" className="rounded-md border border-neutral-300 px-3 py-2 text-sm">
          <option value="High">طلب مرتفع</option>
          <option value="Good">طلب جيد</option>
          <option value="Stable">طلب مستقر</option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الحالة</span>
        <select name="status" defaultValue="Draft" className="rounded-md border border-neutral-300 px-3 py-2 text-sm">
          <option value="Draft">مسودة (Draft)</option>
          <option value="Published">منشور (Published)</option>
        </select>
      </label>

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </button>
    </form>
  );
}
