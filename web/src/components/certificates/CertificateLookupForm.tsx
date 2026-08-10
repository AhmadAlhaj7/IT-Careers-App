"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CertificateLookupFormProps = {
  placeholder: string;
  submitLabel: string;
};

export function CertificateLookupForm({ placeholder, submitLabel }: CertificateLookupFormProps) {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = code.trim();
        if (trimmed.length > 0) {
          router.push(`/certificates/${encodeURIComponent(trimmed)}`);
        }
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="text"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder={placeholder}
        dir="ltr"
        required
        className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm sm:text-start"
      />
      <button
        type="submit"
        className="w-full shrink-0 rounded-xl bg-[#0F6E56] px-6 py-3 text-sm font-bold text-white transition active:scale-95 sm:w-auto"
      >
        {submitLabel}
      </button>
    </form>
  );
}
