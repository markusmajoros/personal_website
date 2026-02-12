import type { Route } from "./+types/contact";

import nodemailer from "nodemailer";
import { Form, useActionData } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email")?.toString();
  let subject = formData.get("subject");
  let message = formData.get("message");

  if (!name || !email || !subject || !message) {
    return { error: "Alle Felder müssen ausgefüllt werden!" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "markus.majoros@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    replyTo: email,
    to: "markus.majoros@protonmail.com",
    subject: `${subject} via markusmajoros.com`,
    text: `Absender: ${name} (${email})\n\nNachricht:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Fehler beim E-Mail-Versand:", error);
    return { error: "E-Mail konnte nicht gesendet werden." };
  }
}

export default function Contact({}: Route.ComponentProps) {
  const actionData = useActionData();

  return (
    <div>
      <h1>Kontakt</h1>
      <p>Bitte kontaktieren Sie mich über das untenstehende Formular.</p>

      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      {actionData?.success && (
        <p style={{ color: "green" }}>E-Mail wurde erfolgreich versendet!</p>
      )}

      <Form method="post" className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail *</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Betreff *</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Nachricht *</label>
          <textarea id="message" name="message" required rows={5} />
        </div>

        <button type="submit">Absenden</button>
      </Form>
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control":
      "max-age=3600,s-maxage=7200,stale-while-revalidate=2592000",
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kontakt" },
    { name: "description", content: "Kontaktmöglichkeit für Markus Majoros" },
  ];
}
