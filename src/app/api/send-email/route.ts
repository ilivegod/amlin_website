// app/api/send-email/route.ts
import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

// export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  try {
    const data = await resend.emails.send({
      from: "Amlin Tech <onboarding@resend.dev>", // or a verified domain email
      to: ["godwinampaw@amlintechco.com"],
      subject: "New Form Submission",

      react: EmailTemplate({ name: name, email: email, message: message }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    // console.log("Resend API Key2:", process.env.RESEND_API_KEY);

    console.error(error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
