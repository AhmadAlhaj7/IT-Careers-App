import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { deletePhaseAction, deleteProjectAction, deleteQuizQuestionAction, deleteResourceAction } from "@/app/admin/actions";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { BackLink } from "@/components/layout/BackLink";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function AdminPhaseDetailPage({
  params,
}: {
  params: Promise<{ id: string; phaseId: string }>;
}) {
  const { id, phaseId } = await params;
  const result = await getPhase(phaseId);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const phase = result.data;

  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href={`/admin/roadmaps/${id}`} label="المسار" />

      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
        #{phase.orderIndex} {phase.title.ar}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">{phase.phaseType}</p>

      <div className="mt-4 flex items-center gap-4">
        <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/edit`} className="text-sm font-semibold text-primary hover:text-primary-hover">
          تعديل
        </Link>
        <DeleteButton
          action={deletePhaseAction}
          hiddenFields={{ id: phase.id, roadmapId: id }}
          confirmMessage={
            phase.resources.length > 0 || phase.projects.length > 0
              ? "سيتم حذف هذه المرحلة وجميع مواردها ومشاريعها. هل أنت متأكد؟"
              : "سيتم حذف هذه المرحلة نهائيًا. هل أنت متأكد؟"
          }
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold font-accent tracking-wide text-primary">الموارد</h2>
        <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/resources/new`} className="text-sm font-semibold text-primary hover:text-primary-hover">
          + مورد جديد
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {phase.resources.length === 0 && <p className="text-sm text-neutral-500">لا توجد موارد بعد.</p>}
        {phase.resources.map((resource) => (
          <Card key={resource.id} padding="sm" shadow="subtle" radius="panel">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-neutral-900">{resource.title.ar}</span>
              <Badge variant="neutral">
                {resource.resourceType} · {resource.accessType}
              </Badge>
            </div>
            <span dir="ltr" className="block truncate text-xs text-neutral-400">
              {resource.url}
            </span>
            <div className="mt-2 flex items-center gap-3">
              <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/resources/${resource.id}/edit`} className="text-xs font-semibold text-primary hover:text-primary-hover">
                تعديل
              </Link>
              <DeleteButton
                action={deleteResourceAction}
                hiddenFields={{ id: resource.id, roadmapId: id, phaseId: phase.id }}
                confirmMessage="سيتم حذف هذا المورد نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold font-accent tracking-wide text-primary">المشاريع</h2>
        <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/projects/new`} className="text-sm font-semibold text-primary hover:text-primary-hover">
          + مشروع جديد
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {phase.projects.length === 0 && <p className="text-sm text-neutral-500">لا توجد مشاريع بعد.</p>}
        {phase.projects.map((project) => (
          <Card key={project.id} padding="sm" shadow="subtle" radius="panel">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-neutral-900">{project.title.ar}</span>
              {project.isCapstone && <Badge variant="primary">مشروع ختامي</Badge>}
            </div>
            <div className="mt-2 flex items-center gap-3">
              <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/projects/${project.id}/edit`} className="text-xs font-semibold text-primary hover:text-primary-hover">
                تعديل
              </Link>
              <DeleteButton
                action={deleteProjectAction}
                hiddenFields={{ id: project.id, roadmapId: id, phaseId: phase.id }}
                confirmMessage="سيتم حذف هذا المشروع نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold font-accent tracking-wide text-primary">أسئلة الاختبار</h2>
        <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/quiz-questions/new`} className="text-sm font-semibold text-primary hover:text-primary-hover">
          + سؤال جديد
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {phase.quizQuestions.length === 0 && <p className="text-sm text-neutral-500">لا توجد أسئلة بعد.</p>}
        {phase.quizQuestions.map((question) => (
          <Card key={question.id} padding="sm" shadow="subtle" radius="panel">
            <span className="font-medium text-neutral-900">{question.text.ar}</span>
            <ul className="mt-2 flex flex-col gap-1">
              {question.options.map((option, index) => (
                <li key={index} className={option.isCorrect ? "text-sm font-medium text-primary" : "text-sm text-neutral-500"}>
                  {option.isCorrect ? "✓ " : "· "}
                  {option.text.ar}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center gap-3">
              <Link href={`/admin/roadmaps/${id}/phases/${phase.id}/quiz-questions/${question.id}/edit`} className="text-xs font-semibold text-primary hover:text-primary-hover">
                تعديل
              </Link>
              <DeleteButton
                action={deleteQuizQuestionAction}
                hiddenFields={{ id: question.id, roadmapId: id, phaseId: phase.id }}
                confirmMessage="سيتم حذف هذا السؤال نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
