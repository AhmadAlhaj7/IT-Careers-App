"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

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
      <Input
        type="text"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder={placeholder}
        dir="ltr"
        required
        className="text-center sm:text-start"
      />
      <Button type="submit" size="lg" className="w-full shrink-0 sm:w-auto">
        {submitLabel}
      </Button>
    </form>
  );
}
