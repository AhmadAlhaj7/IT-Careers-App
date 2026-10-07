import { fileIcon } from "@/lib/learningFiles";

// Teal-tinted tile behind the type icon — shared by the library cards and the viewer header.
export function FileTypeIcon({ contentType, className = "h-11 w-11" }: { contentType: string; className?: string }) {
  const Icon = fileIcon(contentType);

  return (
    <span className={`flex shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary ${className}`}>
      <Icon className="h-1/2 w-1/2" aria-hidden />
    </span>
  );
}
