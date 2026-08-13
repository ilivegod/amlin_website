import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const { name, email, projectDetails } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof projectDetails !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid form payload" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeDetails = escapeHtml(projectDetails.trim()).replaceAll(
      "\n",
      "<br />"
    );

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      to: "amlintechnologies@gmail.com",
      subject: `New Form Submission from ${name.trim()}`,
      text: `
New Amlin Technologies form submission:

- Name: ${name.trim()}
- Email: ${email.trim()}
- Project Details: ${projectDetails.trim()}
      `,
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #00A991;">New Amlin Technologies form submission</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="padding: 8px; font-weight: bold; background: #f9f9f9;">Name</td>
        <td style="padding: 8px; background: #f9f9f9;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; background: #f1f1f1;">Email</td>
        <td style="padding: 8px; background: #f1f1f1;">${safeEmail}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; background: #f1f1f1;">Project details</td>
        <td style="padding: 8px; background: #f1f1f1;">${safeDetails}</td>
      </tr>
    </table>
    <p style="margin-top: 20px; font-size: 13px; color: #666;">
      This message was automatically sent from the Amlin Technologies website contact form.
    </p>
  </div>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" });
  }
}
