import { CreateSpecializationForm } from "./CreateSpecializationForm";

export default function NewSpecializationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-neutral-900">تخصص جديد</h1>
      <CreateSpecializationForm />
    </div>
  );
}
