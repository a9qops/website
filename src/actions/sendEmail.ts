"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { getEmailAdapter } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  type: z.string().max(100).optional(),
  message: z.string().min(10, "Message is too short").max(5000),
  _honeypot: z.string().max(0, "Spam detected").optional(),
});

// Simple in-memory rate limiting map: IP -> timestamp
// PRODUCTION RATE LIMIT PROVIDER: UNKNOWN — REQUIRES DEPLOYMENT DECISION
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export async function sendEmail(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      type: formData.get("type"),
      message: formData.get("message"),
      _honeypot: formData.get("_honeypot"),
    };

    // 1. Zod Validation
    const validated = contactSchema.safeParse(rawData);
    if (!validated.success) {
      return { 
        success: false, 
        error: "Validation failed: " + validated.error.issues.map((e: z.ZodIssue) => e.message).join(", "),
        code: "VALIDATION_ERROR"
      };
    }

    // 2. Honeypot Check
    if (validated.data._honeypot) {
      // Silently succeed to trick bots
      return { success: true, message: "Message sent successfully!", code: "SUCCESS" };
    }

    // 3. Rate Limiting
    // CLIENT IP TRUST MODEL: REQUIRES DEPLOYMENT CONFIGURATION
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip) || 0;
    
    if (now - lastRequest < RATE_LIMIT_WINDOW) {
      return { 
        success: false, 
        error: "Rate limit exceeded. Please wait a minute before sending another message.",
        code: "RATE_LIMITED"
      };
    }
    rateLimitMap.set(ip, now);

    // 4. Email Delivery Provider boundary/interface
    const adapter = getEmailAdapter();
    const result = await adapter.send({
      name: validated.data.name,
      email: validated.data.email,
      type: validated.data.type,
      message: validated.data.message
    });

    if (result === "SUCCESS") {
      return { 
        success: true, 
        message: "Message sent successfully! Our producers will be in touch shortly.",
        code: "SUCCESS"
      };
    } else if (result === "NOT_CONFIGURED") {
      return {
        success: false,
        error: "Email provider is not configured. Please contact the administrator.",
        code: "NOT_CONFIGURED"
      };
    } else {
      return {
        success: false,
        error: "Failed to deliver message. Please try again later.",
        code: "DELIVERY_FAILED"
      };
    }
  } catch (err) {
    console.error("Email delivery failed:", err instanceof Error ? err.message : "Unknown error");
    return { success: false, error: "Server error occurred. Please try again later.", code: "DELIVERY_FAILED" };
  }
}

