"use client";
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageCircle, X, Send, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
}

// تابع فرمت زمان حساس به زبان
const formatMessageTime = (dateString: string, isFa: boolean) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const locale = isFa ? 'fa-IR' : 'en-US';
  const time = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

  if (date.toDateString() === today.toDateString()) return time;
  if (date.toDateString() === yesterday.toDateString()) {
    return isFa ? `دیروز ${time}` : `Yesterday ${time}`;
  }
  return `${date.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} ${time}`;
};

export default function ChatWidget() {
  const { isFa } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "chat">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // استیت مربوط به تولتیپ پیام
  const [showTooltip, setShowTooltip] = useState(false);

  // بررسی نمایش پیام خوش‌آمدگویی با تغییر زبان
  useEffect(() => {
    // const isDismissed = localStorage.getItem('chatTooltipDismissed');
    // if (!isDismissed) {
    setShowTooltip(true);
    // }
  }, [isFa]);

  // بستن پیام با کلیک روی ضربدر
  const dismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    // localStorage.setItem('chatTooltipDismissed', 'true');
  };

  const socketRef = useRef<Socket | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // اسکرول نرم به پایین
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  // اسکرول خودکار هنگام باز کردن چت یا دریافت پیام جدید
  useEffect(() => {
    if (isOpen && step === "chat") {
      const timeout = setTimeout(scrollToBottom, 150); // کمی تاخیر برای رندر کامل DOM
      return () => clearTimeout(timeout);
    }
  }, [chatList, isOpen, step]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const initChat = async (tokenStr?: string) => {
    const actualToken = tokenStr || localStorage.getItem("token") || undefined;

    try {
      const response = await fetch("http://localhost:4000/api/chat/history", {
        method: "GET",
        headers: { "Authorization": actualToken ? `Bearer ${actualToken}` : "" },
        credentials: "include"
      });
      const data = await response.json();
      if (data.success && data.messages) {
        setChatList(data.messages);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:4000", {
        auth: { token: actualToken },
        withCredentials: true
      });

      socketRef.current.on("receive_message", (data: Message) => {
        setChatList((prev) => [...prev, data]);
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);

    const adminToken = localStorage.getItem("admin_token");
    if (adminToken) {
      setIsAdmin(true);
      return;
    }

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setCurrentUserId(JSON.parse(storedUser).id);
      setStep("chat");
      initChat(storedToken);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive_message");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const handleVisitorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
        credentials: "include"
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) localStorage.setItem("token", data.token);
        setCurrentUserId(data.user.id);
        setStep("chat");
        initChat(data.token);
      }
    } catch (error) {
      console.error("Visitor login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === "" || !socketRef.current) return;
    socketRef.current.emit("send_message", { content: message });
    setMessage("");
  };

  if (!isMounted || isAdmin) {
    return null;
  }

  return (
    // ۱. کانتینر اصلی: سایز آن را دقیقاً به اندازه دکمه (w-14 h-14) ثابت می‌کنیم
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 font-sans w-14 h-14" dir={isFa ? "rtl" : "ltr"}>

      {/* پیام چسبنده (Tooltip) */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: isFa ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isFa ? -20 : 20, transition: { duration: 0.2 } }}
            // ۲. جایگاه پیام: absolute بالا سر دکمه (bottom-[72px]) و چسبیده به راست (right-0). 
            // کلاس w-max باعث می‌شود متن در یک خط بماند.
            className="absolute bottom-[72px] right-0 w-max flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl border border-gray-100"
          >
            <span className="text-sm font-medium text-gray-700">
              {isFa
                ? 'از اینجا مستقیماً با من در ارتباط باش👇'
                : 'Contact me directly here👇'}
            </span>
            <button
              onClick={dismissTooltip}
              className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            // ۳. جایگاه پنجره چت: absolute و چسبیده به راست
            className="absolute bottom-[72px] right-0 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md z-10 shrink-0">
              <div className="flex items-center gap-2">
                {/* 👈 دایره سبز آنلاین بودن در اینجا اصلاح شد */}
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full shrink-0"></span>
                <h3 className="font-semibold text-sm m-0">
                  {isFa ? "ارتباط با فاضل" : "Chat with Fazel"}
                </h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
              {step === "form" ? (
                <div className="p-6 flex flex-col h-full overflow-y-auto">
                  <div className="text-center mb-6 mt-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform -rotate-6">
                      <MessageCircle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {isFa ? "خوش آمدید!" : "Welcome!"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {isFa ? "برای شروع گفتگو لطفاً اطلاعات خود را وارد کنید." : "Please enter your details to start chatting."}
                    </p>
                  </div>

                  <form onSubmit={handleVisitorSubmit} className="space-y-4 flex-1">
                    <div className="relative">
                      <User size={16} className={`absolute top-3 text-gray-400 ${isFa ? "right-3" : "left-3"}`} />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isFa ? "نام شما" : "Your Name"}
                        className={`w-full py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isFa ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                      />
                    </div>

                    <div className="relative">
                      <Mail size={16} className={`absolute top-3 text-gray-400 ${isFa ? "right-3" : "left-3"}`} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={isFa ? "ایمیل شما" : "Your Email"}
                        className={`w-full py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-left dir-ltr ${isFa ? "pr-10 pl-3 placeholder:text-right" : "pl-10 pr-3 placeholder:text-left"}`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 disabled:bg-gray-400 mt-2"
                    >
                      {isSubmitting
                        ? (isFa ? "در حال اتصال..." : "Connecting...")
                        : (isFa ? "شروع چت" : "Start Chat")}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                    <p className="text-center text-xs text-gray-400 mb-2 bg-gray-100 py-1 px-3 rounded-full w-fit mx-auto self-center">
                      {isFa ? "امروز" : "Today"}
                    </p>

                    {chatList.map((msg, index) => {
                      const isMine = msg.sender_id === currentUserId;
                      const alignmentClass = isMine ? 'self-start' : 'self-end';
                      const bubbleColor = isMine ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200';

                      let corners = "";
                      if (isMine) {
                        corners = isFa ? "rounded-tr-sm" : "rounded-tl-sm";
                      } else {
                        corners = isFa ? "rounded-tl-sm" : "rounded-tr-sm";
                      }

                      return (
                        <div
                          key={msg.id || index}
                          className={`max-w-[85%] p-3 text-sm break-words shadow-sm rounded-2xl ${alignmentClass} ${bubbleColor} ${corners}`}
                        >
                          <p className="leading-relaxed">{msg.content}</p>
                          <span className={`text-[10px] mt-1 block ${isMine ? 'text-blue-200' : 'text-gray-400'}`}>
                            {formatMessageTime(msg.created_at, isFa)}
                          </span>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} className="h-1" />
                  </div>

                  <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                    <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={isFa ? "پیام خود را بنویسید..." : "Type your message..."}
                        className="flex-1 bg-transparent p-2 text-sm outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className={`p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors ${isFa ? "rotate-180" : ""}`}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        // ۴. جایگاه دکمه: absolute و چسبیده به گوشه کانتینر
        className="absolute bottom-0 right-0 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </motion.button>
    </div>
  );
}