import { BookOpen, FileText, Newspaper, Video } from "lucide-react";
import type { Resource, ResourceType } from "@/lib/types";

const ICONS_BY_TYPE: Record<ResourceType, typeof Video> = {
  Video: Video,
  Article: Newspaper,
  Documentation: FileText,
  Course: BookOpen,
};

type ResourceListItemProps = {
  resource: Resource;
};

export function ResourceListItem({ resource }: ResourceListItemProps) {
  const Icon = ICONS_BY_TYPE[resource.resourceType];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 border-b border-neutral-100 py-3 text-neutral-700 last:border-b-0 hover:text-[#0F6E56]"
    >
      <Icon className="size-4 shrink-0 text-neutral-400" />
      <span>{resource.title.ar}</span>
    </a>
  );
}
