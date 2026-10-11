import nodemailer, { type Transporter } from "nodemailer";

// Server-only: imported from Server Actions, never from a client component (it reads the Gmail App
// Password). Mail goes out through Gmail's SMTP from the Next.js server on Vercel — Railway's plan
// blocks outbound SMTP, so the .NET API can't send it.
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const SENDER_NAME = "حلقة | Halaqa";

export type OutgoingEmail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

let transporter: Transporter | null = null;

// The address leads are announced to — your own inbox. Defaults to the sending Gmail account.
export const OWNER_EMAIL = process.env.LEAD_NOTIFY_EMAIL ?? GMAIL_USER;

export function isEmailConfigured(): boolean {
  return Boolean(GMAIL_USER && GMAIL_APP_PASSWORD);
}

export async function sendEmail(email: OutgoingEmail): Promise<void> {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    // Local dev without credentials: skip quietly instead of failing the form submission.
    console.warn(`[email] GMAIL_USER / GMAIL_APP_PASSWORD not set — not sending "${email.subject}" to ${email.to}`);
    return;
  }

  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({ from: { name: SENDER_NAME, address: GMAIL_USER }, ...email });
}
