import { notFound } from "next/navigation";
import { getCertificate } from "@/lib/api";
import { BackLink } from "@/components/layout/BackLink";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const certificate = await getCertificate(code);

  if (!certificate) {
    notFound();
  }

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/" label="الرئيسية" />

      <div className="mt-6 rounded-lg border-2 border-[#0F6E56] p-10 text-center">
        <p className="text-sm text-neutral-500">شهادة إتمام</p>
        <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{certificate.learnerName}</h1>
        <p className="mt-4 text-neutral-600">لقد أتم بنجاح مسار</p>
        <p className="mt-1 text-xl font-medium text-[#0F6E56]">{certificate.roadmapTitle.ar}</p>
        <p className="mt-6 text-sm text-neutral-400">{issuedDate}</p>
        <p className="mt-2 text-xs text-neutral-400">رمز التحقق: {code}</p>
      </div>
    </div>
  );
}
