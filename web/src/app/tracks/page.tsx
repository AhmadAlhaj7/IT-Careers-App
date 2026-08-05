import Link from "next/link";
import { listTracks } from "@/lib/api";
import { BackLink } from "@/components/layout/BackLink";

export default async function TracksPage() {
  const tracks = await listTracks();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/" label="الرئيسية" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">المسارات الرئيسية</h1>
      <p className="mt-2 text-sm leading-[1.7] text-neutral-600">
        تعرّف على كل مجال قبل أن تختار: طبيعة العمل، مسار التعلّم، وسوق العمل.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {tracks.length === 0 && <p className="text-sm text-neutral-500">لا توجد مسارات متاحة حاليًا.</p>}
        {tracks.map((track) => (
          <Link
            key={track.slug}
            href={`/tracks/${track.slug}`}
            className="rounded-lg border border-neutral-200 px-5 py-4 font-medium text-neutral-900 transition-colors hover:border-[#0F6E56]"
          >
            {track.name.ar}
          </Link>
        ))}
      </div>
    </div>
  );
}
