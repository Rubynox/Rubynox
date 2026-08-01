"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  reply: string;
  shouldRedirect: boolean;
  whatsappUrl: string | null;
  chatMode?: "ai" | "manual";
};

const starters = ["I need a business website", "Improve online presence", "Get more enquiries", "Not sure yet"];
const openingMessage: Message = {
  role: "assistant",
  content:
    "Hi, I am the Rubynoxx AI Project Advisor. Describe your business goal and I will help identify the right website, software, automation, or AI solution."
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([openingMessage]);
  const [chatMode, setChatMode] = useState<"ai" | "manual">("ai");
  const messagesRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, loading, open]);

  useEffect(() => {
    try {
      window.localStorage.removeItem("rubunoxx-chat-session");
    } catch {
      // Some private browsing modes block localStorage access.
    }
    setMessages([openingMessage]);
  }, []);

  const submitMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const historySnapshot = [...messages, userMsg];

    setMessages(historySnapshot);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historySnapshot // FIXED: Sends full historical mapping to prevent model repetition
        })
      });

      if (!response.ok) {
        throw new Error("Target API runtime returned an unresponsive status.");
      }

      const data = (await response.json()) as Partial<ChatResponse>;

      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("Target API runtime returned an invalid chat response.");
      }

      setChatMode(data.chatMode === "manual" ? "manual" : "ai");

      const updatedWithReply: Message[] = [
        ...historySnapshot,
        { role: "assistant", content: data.reply.trim() }
      ];

      setMessages(updatedWithReply);

      if (data.shouldRedirect === true && data.whatsappUrl) {
        setTimeout(() => {
          window.open(data.whatsappUrl!, "_blank", "noopener,noreferrer");
        }, 1500);
      }

    } catch (error) {
      console.error("Chat communication failure sequence:", error);
      setChatMode("manual");
      const fallbackMsg: Message = {
        role: "assistant",
        content:
          "I had a connection issue, but we can keep shaping this here. What are you trying to build, and what should it help your business do?"
      };
      const absoluteFallback = [...historySnapshot, fallbackMsg];
      setMessages(absoluteFallback);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void submitMessage(input);
  };

  const clearSession = () => {
    setMessages([openingMessage]);
    setChatMode("ai");
  };

  return (
    <>
      {/* FIXED: Shifted bottom-5 up to bottom-24 to avoid overlapping your fixed WhatsApp floating buttons */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "focus-ring fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-glow transition duration-300 hover:scale-105 hover:bg-accent-soft",
          open ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
        aria-label="Open AI chat support tool"
      >
        <Bot className="h-6 w-6" />
      </button>

      {open ? (
        /* FIXED: Modal pane positioning adjusted to sit cleanly above floating elements */
        <div className="fixed bottom-0 right-0 z-50 h-full w-full p-0 sm:bottom-24 sm:right-5 sm:h-[540px] sm:w-[410px] sm:p-0">
          <div className="flex h-full w-full flex-col overflow-hidden border border-line bg-card shadow-glow sm:rounded-2xl">
            <div className="flex items-center justify-between bg-midnight-soft px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                  <Sparkles className="h-4 w-4 text-accent-contrast animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink leading-tight">
                    {chatMode === "manual" ? "Rubynoxx Advisor" : "AI Project Advisor"}
                  </h3>
                  <p className="text-[11px] text-success font-medium flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-ping" />
                    {chatMode === "manual" ? "Guided Chat Ready" : "Project Consultation"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 ? (
                  <button
                    onClick={clearSession}
                    className="rounded-md p-1.5 text-muted transition hover:bg-midnight hover:text-ink text-xs font-medium"
                  >
                    Reset Chat
                  </button>
                ) : null}
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1.5 text-muted transition hover:bg-midnight hover:text-ink"
                  aria-label="Close interactive viewport panels"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div ref={messagesRef} className="noise-layer flex-1 overflow-y-auto px-4 py-5 space-y-4 sm:px-5">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-full max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-3 text-sm shadow-sm transition-all duration-200",
                    msg.role === "user"
                      ? "ml-auto rounded-tr-none bg-accent text-white"
                      : "mr-auto rounded-tl-none border border-line bg-card-strong text-ink leading-relaxed"
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
              
              {loading ? (
                <div className="mr-auto flex max-w-[85%] items-center gap-2 rounded-2xl rounded-tl-none border border-line bg-card-strong px-4 py-3 text-sm text-muted shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-accent-soft" />
                  <span>{chatMode === "manual" ? "Preparing reply..." : "AI reading context..."}</span>
                </div>
              ) : null}
              <div ref={endRef} />
            </div>

            {messages.length === 1 && !loading ? (
              <div className="grid grid-cols-2 gap-2 border-t border-line px-4 py-3 sm:px-5">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => void submitMessage(starter)}
                    className="focus-ring min-h-9 rounded-lg border border-line bg-card/60 px-3 py-2 text-left text-xs leading-4 text-muted transition hover:border-accent/70 hover:text-accent hover:bg-card"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="flex gap-2 border-t border-line bg-card p-3 sm:p-4">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Describe your website or software goals..."
                disabled={loading}
                className="min-w-0 flex-1 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition hover:bg-accent-soft disabled:opacity-40"
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
