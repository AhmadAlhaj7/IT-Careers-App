import { Download, Lock } from "lucide-react";

// "Download available" (teal) vs "View only" (purple) — the one visual cue for a file's access level.
export function AccessChip({ allowDownload, labels }: { allowDownload: boolean; labels: { downloadable: string; viewOnly: string } }) {
  return allowDownload ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-medium text-primary">
      <Download className="h-3 w-3" aria-hidden />
      {labels.downloadable}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
      <Lock className="h-3 w-3" aria-hidden />
      {labels.viewOnly}
    </span>
  );
}
