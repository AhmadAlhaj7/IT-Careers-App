import { Card } from "@/components/ui/Card";
import type { Locale } from "@/lib/i18n/locale";
import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  label: string;
};

export function ProjectCard({ project, locale, label }: ProjectCardProps) {
  return (
    <Card padding="md" shadow="subtle" radius="panel">
      <p className="text-sm font-medium text-primary">{label}</p>
      <h3 className="mt-1 font-semibold text-neutral-900">{project.title[locale]}</h3>
      <p className="mt-2 leading-[1.7] text-neutral-600">{project.description[locale]}</p>
    </Card>
  );
}
