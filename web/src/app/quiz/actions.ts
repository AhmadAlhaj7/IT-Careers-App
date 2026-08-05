"use server";

import { auth } from "@clerk/nextjs/server";
import type { CareerQuizResult } from "@/lib/types";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

export type CareerQuizSubmitState = { result?: CareerQuizResult; message?: string };

// Deliberately never requires sign-in — the career quiz is a frictionless entry point for
// undecided visitors. A token is attached only if the visitor happens to already be signed in.
export async function submitCareerQuizAction(
  _prevState: CareerQuizSubmitState,
  formData: FormData,
): Promise<CareerQuizSubmitState> {
  const { getToken } = await auth();
  const token = await getToken();

  const email = String(formData.get("email") ?? "").trim();
  const questionIds = formData.getAll("questionId").map(String);
  const answers = questionIds.map((questionId) => ({
    questionId,
    selectedOptionIndex: Number(formData.get(`answer-${questionId}`) ?? -1),
  }));

  const response = await fetch(`${API_URL}/api/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ email: email.length > 0 ? email : null, answers }),
  });

  if (response.status === 404) {
    return { message: "لا يوجد اختبار متاح حاليًا." };
  }

  if (!response.ok) {
    return { message: `تعذّر إرسال الإجابات (${response.status}).` };
  }

  const result: CareerQuizResult = await response.json();
  return { result };
}
