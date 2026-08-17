"use client";
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, User, Clock, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Conversation {
    conversation_id: number;
    user_id: number;
    name: string;
    email: string;
    status: string;
    updated_at: string;
    unread_count: number; // این فیلد اضافه شد
}

interface Message {
    id: number;
    conversation_id: number;
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

export default function AdminChatPanel() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [adminId, setAdminId] = useState<number | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const activeConvIdRef = useRef<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        // 👈 تغییر مهم: استفاده از کلیدهای اختصاصی ادمین
        const token = localStorage.getItem("admin_token");
        const storedUser = localStorage.getItem("admin_user");

        if (storedUser) {
            setAdminId(JSON.parse(storedUser).id);
        }

        if (!token) {
            router.push("/admin/login");
            return;
        }

        const fetchConversations = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/admin/conversations", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await response.json();

                console.log("پاسخ بک‌اند برای لیست گفتگوها:", data); // 👈 برای دیباگ

                if (data.success) {
                    setConversations(data.conversations);
                } else {
                    alert("خطا از بک‌اند: " + data.message); // 👈 نمایش خطای احتمالی
                }
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        fetchConversations();

        if (!socketRef.current) {
            socketRef.current = io("http://localhost:4000", {
                auth: { token: token },
                withCredentials: true
            });

            socketRef.current.on("receive_message", (data: Message) => {
                if (data.conversation_id === activeConvIdRef.current) {
                    setMessages((prev) => [...prev, data]);
                }
                // رفرش کردن لیست گفتگوها برای آپدیت شدن زمان
                fetchConversations();
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off("receive_message");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    const loadMessages = async (conv: Conversation) => {
        setSelectedConv(conv);
        activeConvIdRef.current = conv.conversation_id;
        const token = localStorage.getItem("admin_token"); //  تغییر به admin_token

        //  تغییر جدید: صفر کردن آنی تعداد پیام‌های خوانده‌نشده در لیست فرانت‌اند
        setConversations(prevConversations =>
            prevConversations.map(c =>
                c.conversation_id === conv.conversation_id
                    ? { ...c, unread_count: 0 }
                    : c
            )
        );

        try {
            const response = await fetch(`http://localhost:4000/api/admin/conversations/${conv.conversation_id}/messages`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === "" || !selectedConv || !socketRef.current) return;

        socketRef.current.emit("send_message", {
            content: newMessage,
            conversationId: selectedConv.conversation_id
        });

        setNewMessage("");
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
            {/* ستون راست: لیست گفتگوها */}
            <div className="w-1/3 bg-white border-l border-gray-200 flex flex-col">
                <div className="p-5 bg-blue-600 text-white shadow-sm">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <MessageSquare size={20} />
                        پنل مدیریت پیام‌ها
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {conversations.map((conv) => (
                        <div
                            key={conv.conversation_id}
                            onClick={() => loadMessages(conv)}
                            className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedConv?.conversation_id === conv.conversation_id
                                ? 'bg-blue-50 border-blue-200 shadow-sm'
                                : 'bg-white border-gray-100 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-gray-800 flex items-center gap-1.5">
                                    <User size={16} className="text-gray-400" />
                                    {conv.name}
                                    {/* نمایش دایره پیام‌های خوانده نشده */}
                                    {conv.unread_count > 0 && (
                                        <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-2">
                                            {conv.unread_count}
                                        </span>
                                    )}
                                </h3>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <Clock size={12} />
                                    {formatMessageTime(conv.updated_at)}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mr-5">{conv.email}</p>
                        </div>
                    ))}
                    {conversations.length === 0 && (
                        <p className="text-center text-sm text-gray-400 mt-10">هیچ گفتگویی یافت نشد.</p>
                    )}
                </div>
            </div>

            {/* ستون چپ: محیط چت */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {selectedConv ? (
                    <>
                        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm">
                            <div>
                                <h2 className="font-semibold text-gray-800">{selectedConv.name}</h2>
                                <span className="text-xs text-green-500 flex items-center gap-1 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    در حال گفتگو
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                            {messages.map((msg, index) => {
                                const isAdmin = msg.sender_id === adminId;
                                return (
                                    <div
                                        key={index}
                                        className={`max-w-[70%] p-3 text-sm break-words ${isAdmin
                                            ? 'bg-blue-600 text-white self-start rounded-2xl rounded-tr-sm shadow-sm'
                                            : 'bg-white text-gray-800 self-end rounded-2xl rounded-tl-sm shadow-sm border border-gray-200'
                                            }`}
                                    >
                                        <p className="leading-relaxed">{msg.content}</p>
                                        <span className={`text-[10px] mt-1 block ${isAdmin ? 'text-blue-200' : 'text-gray-400'}`}>
                                            {formatMessageTime(msg.created_at)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-xl border border-gray-200">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="پاسخ خود را بنویسید..."
                                    className="flex-1 bg-transparent p-2 text-sm outline-none"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={18} className="transform rotate-180" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <MessageSquare size={64} className="mb-4 text-gray-300" />
                        <p>برای مشاهده پیام‌ها، یک گفتگو را از لیست انتخاب کنید.</p>
                    </div>
                )}
            </div>
        </div>
    );
}