export type EmailDeliveryResult = 
  | "SUCCESS" 
  | "DELIVERY_FAILED" 
  | "NOT_CONFIGURED" 
  | "RATE_LIMITED" 
  | "VALIDATION_ERROR";

export interface EmailPayload {
  name: string;
  email: string;
  type?: string;
  message: string;
}

export interface EmailAdapter {
  send(payload: EmailPayload): Promise<EmailDeliveryResult>;
}

export class DevelopmentEmailAdapter implements EmailAdapter {
  async send(payload: EmailPayload): Promise<EmailDeliveryResult> {
    console.log("----------------------------------------");
    console.log("DEVELOPMENT EMAIL ADAPTER (NO-OP)");
    console.log("Status: NOT_CONFIGURED - Capturing safely");
    console.log("Name:", payload.name);
    console.log("From:", payload.email);
    console.log("Type:", payload.type || "N/A");
    console.log("Message length:", payload.message.length, "characters");
    // Do not log the full message body in production
    if (process.env.NODE_ENV !== "production") {
      console.log("Message snippet:", payload.message.substring(0, 50) + "...");
    }
    console.log("----------------------------------------");
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return SUCCESS to let development proceed without a real provider
    // In a real production provider, this would be NOT_CONFIGURED or DELIVERY_FAILED 
    // if no API key is provided.
    return "SUCCESS";
  }
}

// Simple factory/resolver
export function getEmailAdapter(): EmailAdapter {
  // If we had a Resend or SendGrid adapter, we could check env vars here.
  // For now, always return development adapter.
  return new DevelopmentEmailAdapter();
}
