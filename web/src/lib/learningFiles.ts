import { File, FileArchive, FileText, Image, Music, Video, type LucideIcon } from "lucide-react";

// The browser talks to the file endpoints directly (they stream bytes, and admin uploads can be far
// bigger than Vercel lets a request through the Next.js server), so this one is public by design.
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5212";

// Mirrors LearningFileLimits.MaxFileBytes in the API — the server is the real gate, this just lets
// the admin form fail fast before pushing 50MB+ over the wire.
export const MAX_FILE_BYTES = 50 * 1024 * 1024;

export type PreviewKind = "pdf" | "image" | "video" | "audio" | "text" | "none";

// Mirrors FilePreviewRules.CanPreview in the API (the API decides; this only picks which element
// renders the bytes).
export function previewKind(contentType: string): PreviewKind {
  const type = contentType.toLowerCase();
  if (type === "application/pdf") return "pdf";
  if (["image/png", "image/jpeg", "image/gif", "image/webp"].includes(type)) return "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (type === "text/plain") return "text";
  return "none";
}

export function canPreviewType(contentType: string): boolean {
  return previewKind(contentType) !== "none";
}

export function fileIcon(contentType: string): LucideIcon {
  switch (previewKind(contentType)) {
    case "pdf":
    case "text":
      return FileText;
    case "image":
      return Image;
    case "video":
      return Video;
    case "audio":
      return Music;
    default:
      return /zip|compressed|rar|7z|tar/i.test(contentType) ? FileArchive : File;
  }
}

export function fileContentUrl(id: string): string {
  return `${PUBLIC_API_URL}/api/files/${id}/content`;
}

export function fileDownloadUrl(id: string): string {
  return `${PUBLIC_API_URL}/api/files/${id}/download`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
