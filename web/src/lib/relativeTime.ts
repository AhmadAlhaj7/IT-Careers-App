// Small Arabic relative-time formatter for admin timestamps ("last updated" columns) —
// intentionally coarse (minutes/hours/days/weeks), not meant for anything precise.
export function formatRelativeTimeAr(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) {
    return "الآن";
  }
  if (minutes < 60) {
    return `قبل ${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `قبل ${hours} ${hours === 1 ? "ساعة" : "ساعات"}`;
  }

  const days = Math.floor(hours / 24);
  if (days === 1) {
    return "أمس";
  }
  if (days < 7) {
    return `قبل ${days} أيام`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 5) {
    return `قبل ${weeks} ${weeks === 1 ? "أسبوع" : "أسابيع"}`;
  }

  const months = Math.floor(days / 30);
  return `قبل ${months} ${months === 1 ? "شهر" : "أشهر"}`;
}
