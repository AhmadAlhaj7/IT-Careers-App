import { CreateSpecializationForm } from "./CreateSpecializationForm";

export default function NewSpecializationPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">تخصص جديد</h1>
      <CreateSpecializationForm />
    </div>
  );
}
