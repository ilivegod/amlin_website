import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, projectDetails } = await req.json();

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
      subject: `New Form Submission from ${name}`,
      text: `
📩 New amlin tech Form Submission:

- Name: ${name}
- Email: ${email}
- Project Details: ${projectDetails}

      `,
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #00A991;">📩 New Amlin Tech Form Submission</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="padding: 8px; font-weight: bold; background: #f9f9f9;">Name</td>
        <td style="padding: 8px; background: #f9f9f9;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; background: #f1f1f1;">Email</td>
        <td style="padding: 8px; background: #f1f1f1;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; background: #f1f1f1;">Project details</td>
        <td style="padding: 8px; background: #f1f1f1;">${projectDetails}</td>
      </tr>
      
      
    </table>
    <p style="margin-top: 20px; font-size: 13px; color: #666;">
      This message was automatically sent from your CrossMed EHR website form.
    </p>
  </div>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, error });
  }
}
