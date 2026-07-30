import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-neutral-200 p-5">
      <p className="text-sm font-medium text-[#1D9E75]">مشروع مصغّر</p>
      <h3 className="mt-1 font-semibold text-neutral-900">{project.title.ar}</h3>
      <p className="mt-2 leading-[1.7] text-neutral-600">{project.description.ar}</p>
    </div>
  );
}
