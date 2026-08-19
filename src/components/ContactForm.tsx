 
"use client";

import { useState } from "react";
import { sendEmail } from "@/actions/sendEmail";
import { Loader2 } from "lucide-react";

export default function ContactForm({ 
  labels 
}: { 
  labels?: {
    name: string;
    email: string;
    type: string;
    message: string;
    send: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    errorPrefix: string;
  }
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    try {
      const res = await sendEmail(formData);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        // We could store res.error in state to show exact server error
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div 
        className="h-full min-h-100 flex flex-col items-center justify-center space-y-6 text-center bg-zinc-900/50 rounded-xl border border-white/5"
      >
        <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,184,0,0.3)]">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-white font-heading">{labels?.successTitle || "Transmission Sent"}</h3>
          <p className="text-zinc-400 text-lg">{labels?.successMessage || "Our producers will review your project and be in touch shortly."}</p>
        </div>
        <button 
          onClick={() => setStatus("idle")} 
          className="mt-4 text-sm text-amber-500 hover:text-amber-400 uppercase tracking-widest font-medium"
        >
          {labels?.sendAnother || "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <input 
          type="text" 
          name="name"
          required
          placeholder={labels?.name || "Name"}
          className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600"
        />
      </div>
      <div className="space-y-1">
        <input 
          type="email" 
          name="email"
          required
          placeholder={labels?.email || "Email"}
          className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600"
        />
      </div>
      <div className="space-y-1">
        <input 
          type="text" 
          name="type"
          placeholder={labels?.type || "Project Type (e.g. Commercial, VFX)"}
          className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600"
        />
      </div>
      <div className="space-y-1">
        <textarea 
          name="message"
          required
          placeholder={labels?.message || "Tell us about your project"}
          rows={4}
          className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 resize-none"
        ></textarea>
      </div>

      {/* Honeypot field - visually hidden */}
      <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      
      
      {status === "error" && (
        <p className="text-red-500 text-sm">{labels?.errorPrefix || "Failed to send message. Please try again."}</p>
      )}

      <button 
        type="submit" 
        disabled={status === "loading"}
        className="w-full bg-amber-500 text-black font-bold uppercase tracking-widest py-4 mt-8 hover:bg-amber-400 rounded disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {status === "loading" && <Loader2 className="animate-spin" size={20} />}
        {status === "loading" ? (labels?.sending || "Transmitting...") : (labels?.send || "Send Message")}
      </button>
    </form>
  );
}
