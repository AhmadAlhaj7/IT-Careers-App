import { notFound } from "next/navigation";
import Link from "next/link";
import { getTrack } from "@/lib/api";
import { BackLink } from "@/components/layout/BackLink";

export default async function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const track = await getTrack(slug);

  if (!track) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/tracks" label="المسارات الرئيسية" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">{track.name.ar}</h1>
      <p className="mt-4 leading-[1.7] text-neutral-600">{track.description.ar}</p>

      {track.roadmaps.length > 0 && (
        <>
          <h2 className="mt-10 text-sm font-medium text-neutral-500">المسارات التعليمية المتاحة</h2>
          <div className="mt-3 flex flex-col gap-3">
            {track.roadmaps.map((roadmap) => (
              <Link
                key={roadmap.slug}
                href={`/roadmaps/${roadmap.slug}`}
                className="flex items-center justify-between rounded-lg border border-neutral-200 px-5 py-4 transition-colors hover:border-[#0F6E56]"
              >
                <span className="font-medium text-neutral-900">{roadmap.title.ar}</span>
                <span className="text-sm text-[#0F6E56]">${roadmap.price.toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
