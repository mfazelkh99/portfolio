"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Mail, Loader2 } from 'lucide-react';
import { io, Socket } from 'socket.io-client';


interface Message {
  id?: number;
  sender_id: number;
  content: string;
  created_at: string;
}

const formatMessageTime = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const time = date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

  if (date.toDateString() === today.toDateString()) return time;
  if (date.toDateString() === yesterday.toDateString()) return `دیروز ${time}`;
  return `${date.toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })} ${time}`;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "chat">("form");

  // استیت‌های مربوط به فرم ورود
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // استیت‌های مربوط به چت
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // تابع راه‌اندازی چت (دریافت تاریخچه و اتصال سوکت)
  const initChat = async (tokenStr?: string) => {
    // پیدا کردن توکن: یا از ورودی تابع می‌گیرد، یا از لوکال استوریج
    const actualToken = tokenStr || localStorage.getItem("token") || undefined;

    // ۱. دریافت تاریخچه
    try {
      const response = await fetch("http://localhost:4000/api/chat/history", {
        method: "GET",
        headers: {
          "Authorization": actualToken ? `Bearer ${actualToken}` : ""
        },
        credentials: "include"
      });

      const data = await response.json();
      if (data.success && data.messages) {
        setChatList(data.messages);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }

    // ۲. اتصال سوکت
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:4000", {
        auth: { token: actualToken }, // 👈 توکن قطعی در اینجا پاس داده می‌شود
        withCredentials: true
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Socket Connection Error:", err.message);
      });

      socketRef.current.on("receive_message", (data: Message) => {
        setChatList((prev) => [...prev, data]);
      });
    }
  };

  // بررسی وضعیت کاربر هنگام لود شدن کامپوننت
  useEffect(() => {
    const token = localStorage.getItem("token") || undefined;
    const storedUser = localStorage.getItem("user");

    // اگر کاربر قبلاً لاگین کرده (چه به عنوان ادمین چه ویزیتور که یوزرش ذخیره شده)
    if (storedUser) {
      setCurrentUserId(JSON.parse(storedUser).id);
      setStep("chat");
      initChat(token);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive_message");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // هندل کردن فرم ورود مهمان
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
      console.log("پاسخ بک‌اند به لاگین مهمان:", data); // 👈 برای بررسی در کنسول

      if (data.success) {
        // ذخیره اطلاعات کاربر
        localStorage.setItem("user", JSON.stringify(data.user));

        // اگر بک‌اند توکن را برگردانده بود، آن را ذخیره می‌کنیم
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setCurrentUserId(data.user.id);
        setStep("chat");

        // فراخوانی چت با توکنی که از بک‌اند آمده
        initChat(data.token);
      }
    } catch (error) {
      console.error("Visitor login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // هندل کردن ارسال پیام
  const sendMessage = () => {
    if (message.trim() !== "" && socketRef.current) {
      socketRef.current.emit("send_message", { content: message });
      setMessage("");
    }
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end" dir="rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* هدر */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-sm">ارتباط با فاضل</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* بدنه: فرم یا چت */}
            {step === "form" ? (
              <div className="flex-1 p-6 flex flex-col justify-center bg-gray-50">
                <div className="text-center mb-6">
                  <MessageCircle size={40} className="mx-auto text-blue-600 mb-2" />
                  <h4 className="font-semibold text-gray-800">خوش آمدید!</h4>
                  <p className="text-xs text-gray-500 mt-1">برای شروع گفتگو لطفاً اطلاعات خود را وارد کنید.</p>
                </div>

                <form onSubmit={handleVisitorSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <User size={16} className="absolute right-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="نام شما"
                      className="w-full py-2.5 pr-10 pl-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <Mail size={16} className="absolute right-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ایمیل شما"
                      className="w-full py-2.5 pr-10 pl-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-left dir-ltr placeholder:text-right"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 mt-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 text-sm font-medium"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'شروع چت'}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                  {chatList.map((msg, index) => {
                    const isMine = msg.sender_id === currentUserId;
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: isMine ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={index}
                        className={`max-w-[80%] p-3 text-sm break-words ${isMine
                          ? 'bg-blue-600 text-white self-start rounded-2xl rounded-tr-sm shadow-md'
                          : 'bg-white text-gray-800 self-end rounded-2xl rounded-tl-sm shadow-sm border border-gray-200'
                          }`}
                      >
                        <p className="leading-relaxed">{msg.content}</p>
                        <span className={`text-[10px] mt-1 block ${isMine ? 'text-blue-200' : 'text-gray-400'}`}>
                          {formatMessageTime(msg.created_at)}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="p-3 bg-white border-t flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 p-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={18} className="transform rotate-180" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors mt-4 self-start"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </motion.button>
    </div>
  );
}