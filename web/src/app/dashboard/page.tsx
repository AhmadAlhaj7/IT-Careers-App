import { auth } from "@clerk/nextjs/server";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

export default async function DashboardPage() {
  const { getToken } = await auth.protect();
  const token = await getToken();

  const response = await fetch(`${API_URL}/api/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data: { userId: string } = await response.json();

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <p>مرحبًا! معرّف المستخدم من واجهة برمجة التطبيقات: {data.userId}</p>
    </div>
  );
}
