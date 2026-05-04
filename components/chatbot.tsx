"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  reply: string;
  shouldRedirect: boolean;
  whatsappUrl: string | null;
};

const starters = ["I need a website", "CRM for leads", "Automate reports", "Not sure yet"];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I am the Rubynox assistant. Tell me what you want to build or what problem you want to solve. I will help you clarify the project type, useful first-version features, budget/timeline factors, and whether Rubynox should build a website, CRM, dashboard, automation, mobile app, SaaS product, API integration, or AI support tool."
    }
  ]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const fallbackUrl = useMemo(
    () => buildWhatsAppUrl("Hi Rubynox, I have a requirement. Let's discuss it."),
    []
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, loading]);

  async function submitMessage(text: string) {
    const message = text.trim();
    if (!message || loading) return;

    setInput("");
    setLoading(true);
    setMessages((current) => [...current, { role: "user", content: message }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: messages.slice(-8) })
      });
      const data = (await response.json()) as ChatResponse;

      setMessages((current) => [...current, { role: "assistant", content: data.reply }]);

      const redirectUrl = data.whatsappUrl;

      if (data.shouldRedirect && redirectUrl) {
        window.setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1400);
      }
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Let's continue this on WhatsApp" }
      ]);
      window.setTimeout(() => {
        window.location.href = fallbackUrl;
      }, 900);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(input);
  }

  const hasUserMessage = messages.some((message) => message.role === "user");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "focus-ring fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full",
          "border border-line bg-accent text-white shadow-glow transition hover:scale-105 hover:bg-accent-soft"
        )}
        aria-label="Open Rubynox chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open ? (
        <div className="fixed inset-x-3 bottom-40 z-50 mx-auto max-w-md sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[28rem]">
          <div className="flex max-h-[calc(100vh-11rem)] flex-col overflow-hidden rounded-lg border border-line bg-card/95 shadow-2xl backdrop-blur-xl sm:max-h-[38rem]">
            <div className="flex items-center justify-between border-b border-line px-4 py-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-soft">
                  <Bot className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">Rubynox Assistant</p>
                  <p className="truncate text-xs text-muted">Services, pricing, timelines, and next steps</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="focus-ring rounded-full p-2 text-muted transition hover:bg-accent/10 hover:text-accent"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={messagesRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "max-w-[92%] whitespace-pre-line rounded-lg px-4 py-3 text-sm leading-6 sm:max-w-[88%]",
                    message.role === "assistant"
                      ? "bg-midnight/70 text-ink"
                      : "ml-auto bg-accent text-white"
                  )}
                >
                  {message.content}
                </div>
              ))}
              {loading ? (
                <div className="inline-flex items-center gap-2 rounded-lg bg-midnight/70 px-4 py-3 text-sm text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking
                </div>
              ) : null}
              <div ref={endRef} className="h-px" />
            </div>

            {!hasUserMessage ? (
              <div className="grid grid-cols-2 gap-2 border-t border-line px-4 py-3 sm:px-5">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => void submitMessage(starter)}
                    className="focus-ring min-h-9 rounded-lg border border-line px-3 py-2 text-left text-xs leading-4 text-muted transition hover:border-accent/70 hover:text-accent"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3 sm:p-4">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Describe your requirement or business problem"
                className="min-w-0 flex-1 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition hover:bg-accent-soft"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
