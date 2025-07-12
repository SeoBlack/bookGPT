import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { apiService } from "../services/api";

interface Message {
  from: "user" | "ai";
  text: string;
  contextUsed?: boolean;
  error?: boolean;
}

const quickActions = [
  {
    label: "Summarize Book",
    prompt: "Provide a comprehensive summary of this book.",
  },
  {
    label: "Key Concepts",
    prompt: "What are the main concepts and ideas in this book?",
  },
  {
    label: "Ask Questions",
    prompt: "What questions should I ask about this book?",
  },
];

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookTitle = location.state?.bookTitle || "Your Book";
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "ai",
      text: `Welcome! I'm your personal assistant for "${bookTitle}". I can help you understand, analyze, and discuss this book. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (msg: string) => {
    if (!msg.trim() || isLoading) return;

    // Add user message
    setMessages((msgs) => [...msgs, { from: "user", text: msg }]);
    setInput("");
    setIsLoading(true);

    try {
      // Send to AI API
      const response = await apiService.sendChatMessage(msg, bookTitle);

      // Add AI response
      setMessages((msgs) => [
        ...msgs,
        {
          from: "ai",
          text: response.response,
          contextUsed: response.contextUsed,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      // Add error message
      setMessages((msgs) => [
        ...msgs,
        {
          from: "ai",
          text: "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-white">
      <header className="p-4 bg-green-600 text-white text-center font-bold shadow flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-green-100 transition"
        >
          ← Home
        </button>
        <span>Chatting with {bookTitle}</span>
        <div className="w-16"></div>
      </header>

      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-xs text-sm shadow ${
                m.from === "user"
                  ? "bg-green-100 text-green-900"
                  : m.error
                  ? "bg-red-100 text-red-900"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {m.text.split("\n").map((line, index) => (
                <div key={index}>
                  {line}
                  {index < m.text.split("\n").length - 1 && <br />}
                </div>
              ))}
              {m.contextUsed && (
                <div className="text-xs text-blue-600 mt-1">
                  📚 Based on book content
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-700 rounded-2xl px-4 py-2 text-sm shadow">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-2 border-t bg-white">
        <div className="flex gap-2 mb-2 overflow-x-auto">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="bg-green-50 border border-green-200 text-green-700 rounded-full px-3 py-1 text-xs font-medium hover:bg-green-100 transition whitespace-nowrap disabled:opacity-50"
              onClick={() => sendMessage(action.prompt)}
              disabled={isLoading}
            >
              {action.label}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && !isLoading) {
              sendMessage(input.trim());
            }
          }}
        >
          <input
            className="flex-1 rounded-full border border-green-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
            placeholder={
              isLoading ? "Please wait..." : "Ask about your book..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded-full px-4 py-2 font-semibold shadow hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
