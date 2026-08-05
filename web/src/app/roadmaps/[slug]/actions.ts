"use server";

import { auth } from "@clerk/nextjs/server";
import type { FinalExamResult } from "@/lib/types";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

export type FinalExamSubmitState = { result?: FinalExamResult; message?: string };

export async function submitFinalExamAction(
  _prevState: FinalExamSubmitState,
  formData: FormData,
): Promise<FinalExamSubmitState> {
  const slug = String(formData.get("slug") ?? "");

  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    return { message: "يجب تسجيل الدخول لتقديم الامتحان." };
  }

  const questionIds = formData.getAll("questionId").map(String);
  const answers = questionIds.map((questionId) => ({
    questionId,
    selectedOptionIndex: Number(formData.get(`answer-${questionId}`) ?? -1),
  }));

  const response = await fetch(`${API_URL}/api/roadmaps/${slug}/final-exam/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    return { message: `تعذّر إرسال الامتحان (${response.status}).` };
  }

  const result: FinalExamResult = await response.json();
  return { result };
}
