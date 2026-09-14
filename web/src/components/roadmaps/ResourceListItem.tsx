import { BookOpen, FileText, Newspaper, Video } from "lucide-react";
import type { Locale } from "@/lib/i18n/locale";
import type { Resource, ResourceType } from "@/lib/types";

const ICONS_BY_TYPE: Record<ResourceType, typeof Video> = {
  Video: Video,
  Article: Newspaper,
  Documentation: FileText,
  Course: BookOpen,
};

type ResourceListItemProps = {
  resource: Resource;
  locale: Locale;
};

export function ResourceListItem({ resource, locale }: ResourceListItemProps) {
  const Icon = ICONS_BY_TYPE[resource.resourceType];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 border-b border-neutral-100 py-3 text-neutral-700 transition last:border-b-0 hover:text-primary"
    >
      <Icon className="size-4 shrink-0 text-neutral-400" />
      <span>{resource.title[locale]}</span>
    </a>
  );
}
