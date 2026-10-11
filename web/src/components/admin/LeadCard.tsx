import { Mail, MessageCircle, Phone } from "lucide-react";
import { deleteLeadAction } from "@/app/admin/actions";
import { websiteTypeLabel } from "@/lib/websiteOrderOptions";
import { LEAD_KIND_LABELS, whatsAppUrl, type InboxLead } from "@/lib/leads";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";

// One inbox row. The header and contact actions are shared; the body shows whatever that kind of
// lead actually asked for (a consultation idea vs. a website brief).
export function LeadCard({ lead }: { lead: InboxLead }) {
  const whatsApp = whatsAppUrl(lead.phone);

  return (
    <Card padding="md" shadow="subtle" radius="panel" className={lead.status === "New" ? "border-accent/30" : undefined}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-neutral-900">{lead.fullName}</span>
            <Badge variant={lead.kind === "consultation" ? "secondary" : "primary"} size="sm">
              {LEAD_KIND_LABELS[lead.kind]}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-neutral-400">{new Date(lead.submittedAt).toLocaleString("ar")}</p>
        </div>
        <LeadStatusSelect kind={lead.kind} id={lead.id} status={lead.status} />
      </div>

      <div className="mt-3 border-t border-neutral-100 pt-3 text-sm text-neutral-700">
        {lead.kind === "consultation" ? (
          <>
            <Badge variant={lead.hasPriorExperience ? "primary" : "neutral"} size="sm">
              {lead.hasPriorExperience ? "لديه خبرة سابقة" : "بدون خبرة سابقة"}
            </Badge>
            {lead.websiteIdea && (
              <p className="mt-2 whitespace-pre-line">
                <span className="font-semibold text-neutral-900">فكرة الموقع: </span>
                {lead.websiteIdea}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" size="sm">
                {websiteTypeLabel(lead.websiteType)}
              </Badge>
              <span className="font-semibold text-neutral-900">{lead.projectName}</span>
            </div>
            <p className="mt-2 whitespace-pre-line">{lead.description}</p>
          </>
        )}
        <p className="mt-2 text-neutral-600">الوقت المناسب للتواصل: {lead.preferredContactTime}</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-3">
        <a href={`mailto:${lead.email}`} className={buttonVariants({ variant: "outline", size: "sm" })} dir="ltr">
          <Mail className="h-3.5 w-3.5" aria-hidden />
          {lead.email}
        </a>
        <a href={`tel:${lead.phone}`} className={buttonVariants({ variant: "outline", size: "sm" })} dir="ltr">
          <Phone className="h-3.5 w-3.5" aria-hidden />
          {lead.phone}
        </a>
        {whatsApp && (
          <a href={whatsApp} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            واتساب
          </a>
        )}
        <div className="ms-auto">
          <DeleteButton
            action={deleteLeadAction}
            hiddenFields={{ kind: lead.kind, id: lead.id }}
            confirmMessage="سيتم حذف هذا الطلب نهائيًا. هل أنت متأكد؟"
          />
        </div>
      </div>
    </Card>
  );
}
