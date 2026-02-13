import type { Route } from "./+types/contact";

import nodemailer from "nodemailer";
import { Form, useActionData, useNavigation } from "react-router";
import { useEffect, useRef, useState } from "react";

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let name = formData.get("name")?.toString();
  let email = formData.get("email")?.toString();
  let subject = formData.get("subject")?.toString();
  let message = formData.get("message")?.toString();

  const errors: Record<string, string> = {};

  if (!name?.trim()) {
    errors.name = "Bitte geben Sie Ihren Namen ein.";
  }

  if (!email?.trim()) {
    errors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (!subject?.trim()) {
    errors.subject = "Bitte geben Sie einen Betreff ein.";
  }

  if (!message?.trim()) {
    errors.message = "Bitte geben Sie eine Nachricht ein.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { name, email, subject, message } };
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
    return {
      errors: {
        general:
          "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      },
      values: { name, email, subject, message },
    };
  }
}

export default function Contact({}: Route.ComponentProps) {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = navigation.state === "submitting";

  // Track which fields have been focused to clear their error styling
  const [clearedFields, setClearedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (actionData?.success) {
      // Delay reset slightly so user can see the success message
      const timer = setTimeout(() => {
        formRef.current?.reset();
        setClearedFields(new Set()); // Reset cleared fields on success
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [actionData?.success]);

  // Reset cleared fields when new errors appear
  useEffect(() => {
    if (actionData?.errors) {
      setClearedFields(new Set());
    }
  }, [actionData?.errors]);

  const handleFieldFocus = (fieldName: string) => {
    setClearedFields((prev) => new Set(prev).add(fieldName));
  };

  const getFieldStyle = (fieldName: string) => {
    const hasError =
      actionData?.errors?.[fieldName as keyof typeof actionData.errors];
    const isCleared = clearedFields.has(fieldName);

    if (hasError && !isCleared) {
      return {
        backgroundColor: "#fee",
        borderColor: "#dc3545",
        outline: "none",
      };
    }
    return {};
  };

  return (
    <div>
      <h1>Kontakt</h1>
      <p>Bitte kontaktieren Sie mich über das untenstehende Formular.</p>

      {actionData?.errors?.general && (
        <p
          style={{
            color: "red",
            padding: "10px",
            backgroundColor: "#fee",
            borderRadius: "4px",
          }}
        >
          {actionData.errors.general}
        </p>
      )}
      {actionData?.success && (
        <p
          style={{
            color: "green",
            padding: "10px",
            backgroundColor: "#efe",
            borderRadius: "4px",
          }}
        >
          ✓ E-Mail wurde erfolgreich versendet!
        </p>
      )}

      <Form method="post" className="contact-form" ref={formRef}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={actionData?.values?.name || ""}
            aria-invalid={actionData?.errors?.name ? "true" : "false"}
            aria-describedby={
              actionData?.errors?.name ? "name-error" : undefined
            }
            style={getFieldStyle("name")}
            onFocus={() => handleFieldFocus("name")}
          />
          {actionData?.errors?.name && !clearedFields.has("name") && (
            <span
              id="name-error"
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "4px",
                display: "block",
              }}
            >
              {actionData.errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-Mail *</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={actionData?.values?.email || ""}
            aria-invalid={actionData?.errors?.email ? "true" : "false"}
            aria-describedby={
              actionData?.errors?.email ? "email-error" : undefined
            }
            style={getFieldStyle("email")}
            onFocus={() => handleFieldFocus("email")}
          />
          {actionData?.errors?.email && !clearedFields.has("email") && (
            <span
              id="email-error"
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "4px",
                display: "block",
              }}
            >
              {actionData.errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Betreff *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            defaultValue={actionData?.values?.subject || ""}
            aria-invalid={actionData?.errors?.subject ? "true" : "false"}
            aria-describedby={
              actionData?.errors?.subject ? "subject-error" : undefined
            }
            style={getFieldStyle("subject")}
            onFocus={() => handleFieldFocus("subject")}
          />
          {actionData?.errors?.subject && !clearedFields.has("subject") && (
            <span
              id="subject-error"
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "4px",
                display: "block",
              }}
            >
              {actionData.errors.subject}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Nachricht *</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            defaultValue={actionData?.values?.message || ""}
            aria-invalid={actionData?.errors?.message ? "true" : "false"}
            aria-describedby={
              actionData?.errors?.message ? "message-error" : undefined
            }
            style={getFieldStyle("message")}
            onFocus={() => handleFieldFocus("message")}
          />
          {actionData?.errors?.message && !clearedFields.has("message") && (
            <span
              id="message-error"
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "4px",
                display: "block",
              }}
            >
              {actionData.errors.message}
            </span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Wird gesendet..." : "Absenden"}
        </button>
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
