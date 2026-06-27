import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";

const contactInquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(180),
  company: z.string().trim().max(160).optional(),
  services: z.array(z.string().trim().min(1).max(80)).min(1).max(8),
  message: z.string().trim().min(20).max(4000),
  website: z.string().trim().max(240).optional(),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderInquiryText(data: z.infer<typeof contactInquirySchema>) {
  return [
    "New TRAFFODATA inquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : "Company: Not provided",
    `Services: ${data.services.join(", ")}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function renderInquiryHtml(data: z.infer<typeof contactInquirySchema>) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "Not provided"],
    ["Services", data.services.join(", ")],
  ];

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#111827;line-height:1.55">
      <h1 style="margin:0 0 18px;font-size:22px">New TRAFFODATA inquiry</h1>
      <table style="border-collapse:collapse;width:100%;max-width:620px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="border-top:1px solid #e5e7eb;padding:10px 12px 10px 0;color:#6b7280;width:120px">${escapeHtml(label)}</td>
                  <td style="border-top:1px solid #e5e7eb;padding:10px 0;font-weight:600">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="margin:26px 0 8px;font-size:15px;color:#6b7280">Message</h2>
      <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:14px;padding:16px;background:#f9fafb">${escapeHtml(data.message)}</div>
    </div>
  `;
}

export const sendContactInquiry = createServerFn({ method: "POST" })
  .validator(contactInquirySchema)
  .handler(async ({ data }) => {
    if (data.website) {
      return { ok: true as const, skipped: true as const };
    }

    const { resendApiKey, contactFromEmail, contactToEmail } = getServerConfig();
    if (!resendApiKey || !contactFromEmail || !contactToEmail) {
      return { ok: false as const, reason: "manual-email" as const };
    }

    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);
    const subject = `TRAFFODATA inquiry: ${data.services.join(", ")}`;
    const result = await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: data.email,
      subject,
      text: renderInquiryText(data),
      html: renderInquiryHtml(data),
    });

    if (result.error) {
      console.error("Resend contact inquiry failed", result.error);
      return { ok: false as const, reason: "send-failed" as const };
    }

    return { ok: true as const, id: result.data?.id };
  });
