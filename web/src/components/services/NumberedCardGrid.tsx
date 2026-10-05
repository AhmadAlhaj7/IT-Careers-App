import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type NumberedCardItem = { title: string; body: string };

// A titled grid of numbered cards — used for both "what you get" and "how the process works".
export function NumberedCardGrid({
  title,
  items,
  badgeVariant = "accent",
}: {
  title: string;
  items: readonly NumberedCardItem[];
  badgeVariant?: "accent" | "primary";
}) {
  return (
    <>
      <h2 className="text-center text-2xl font-bold text-neutral-900">{title}</h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <Card key={item.title} padding="md" shadow="subtle" radius="panel">
            <Badge variant={badgeVariant} size="sm">
              {index + 1}
            </Badge>
            <p className="mt-2 font-bold text-neutral-900">{item.title}</p>
            <p className="mt-1 text-sm leading-[1.8] text-neutral-600">{item.body}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
