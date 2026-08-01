import { auth } from "@clerk/nextjs/server";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

export default async function AdminPage() {
  const { getToken } = await auth.protect();
  const token = await getToken();

  const response = await fetch(`${API_URL}/api/admin/ping`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <p>ليست لديك صلاحية الوصول إلى هذه الصفحة.</p>
      </div>
    );
  }

  const data: { message: string } = await response.json();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <p>{data.message}</p>
    </div>
  );
}
