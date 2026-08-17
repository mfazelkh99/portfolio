"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");

        if (!email.trim() || !password.trim()) {
            setErrorMessage("لطفاً تمامی فیلدها را پر کنید.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // بررسی اینکه آیا کاربر واقعاً ادمین است یا خیر
                if (data.user.role === "admin") {
                    // ذخیره توکن و اطلاعات با کلیدهای اختصاصی ادمین
                    localStorage.setItem("admin_token", data.token);
                    localStorage.setItem("admin_user", JSON.stringify(data.user));

                    // هدایت خودکار به صفحه پنل چت
                    router.push("/admin/chat");
                } else {
                    // اگر بازدیدکننده عادی سعی کرد از اینجا لاگین کند
                    setErrorMessage("شما دسترسی ورود به پنل مدیریت را ندارید.");
                }
            } else {
                setErrorMessage(data.message || "ایمیل یا رمز عبور اشتباه است.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("خطا در برقراری ارتباط با سرور. لطفاً وضعیت بک‌اند را بررسی کنید.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans" dir="rtl">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                        <ShieldCheck size={32} className="text-white transform -rotate-3" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                    ورود به پنل مدیریت
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    برای پاسخگویی به پیام‌ها وارد حساب خود شوید
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
                    <form className="space-y-6" onSubmit={handleLogin}>

                        {/* نمایش پیغام خطا */}
                        {errorMessage && (
                            <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-md">
                                <p className="text-sm text-red-700">{errorMessage}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">ایمیل سازمانی</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pr-10 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-left dir-ltr transition-all"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pr-10 pl-10 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-left dir-ltr transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 left-0 pl-3 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:bg-blue-400"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 size={18} className="animate-spin" />
                                        در حال احراز هویت...
                                    </span>
                                ) : (
                                    "ورود به پنل"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}