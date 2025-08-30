// app/api/contact/route.ts
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2).max(120),
  message: z.string().min(10),
  website: z
    .string()
    .optional()
    .transform(v => v?.trim())
    .refine(v => !v, 'bot'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: [process.env.CONTACT_TO!],
      replyTo: email,
      subject: `${subject}`,
      text: `Tên: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>Liên hệ mới</h2>
        <p><b>Tên:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Tiêu đề:</b> ${subject}</p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err: any) {
    return Response.json(
      { error: err?.message ?? 'Server error' },
      { status: 500 }
    );
  }
}
