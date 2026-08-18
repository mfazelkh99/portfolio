"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "English" | "فارسی";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isFa: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // ۱. مقدار اولیه را روی انگلیسی تنظیم می‌کنیم تا رندر اولیه در سرور بدون خطا انجام شود
    const [language, setLanguageState] = useState<Language>("English");
    const [isMounted, setIsMounted] = useState(false);

    // ۲. به محض لود شدن سایت در مرورگر، زبان ذخیره شده را از حافظه می‌خوانیم
    useEffect(() => {
        setIsMounted(true);
        const savedLanguage = localStorage.getItem("preferred_language") as Language;
        if (savedLanguage && (savedLanguage === "English" || savedLanguage === "فارسی")) {
            setLanguageState(savedLanguage);
        }
    }, []);

    // ۳. تابع جدید برای تغییر زبان که انتخاب کاربر را هم در State و هم در حافظه مرورگر ذخیره می‌کند
    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("preferred_language", lang);
    };

    const isFa = language === "فارسی";

    // ۴. تغییر جهت (RTL/LTR) و مشخصه lang در تگ HTML
    useEffect(() => {
        if (!isMounted) return; // تا زمانی که کلاینت کاملا لود نشده تغییرات DOM را اعمال نمی‌کنیم
        document.documentElement.dir = isFa ? "rtl" : "ltr";
        document.documentElement.lang = isFa ? "fa" : "en";
    }, [isFa, isMounted]);

    // ۵. برای جلوگیری از پرش سایت (Flash) قبل از خواندن حافظه
    if (!isMounted) {
        return null; // تا یک صدم ثانیه‌ای که حافظه خوانده می‌شود، چیزی رندر نمی‌کنیم
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, isFa }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}