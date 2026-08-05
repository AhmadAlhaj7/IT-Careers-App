"use server";

import { auth } from "@clerk/nextjs/server";
import type { QuizResult } from "@/lib/types";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

export type QuizSubmitState = { result?: QuizResult; message?: string };

export async function submitQuizAction(_prevState: QuizSubmitState, formData: FormData): Promise<QuizSubmitState> {
  const slug = String(formData.get("slug") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));

  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    return { message: "يجب تسجيل الدخول لتقديم الاختبار." };
  }

  const questionIds = formData.getAll("questionId").map(String);
  const answers = questionIds.map((questionId) => ({
    questionId,
    selectedOptionIndex: Number(formData.get(`answer-${questionId}`) ?? -1),
  }));

  const response = await fetch(`${API_URL}/api/roadmaps/${slug}/phases/${orderIndex}/quiz/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    return { message: `تعذّر إرسال الاختبار (${response.status}).` };
  }

  const result: QuizResult = await response.json();
  return { result };
}
