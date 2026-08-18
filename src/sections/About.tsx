// src/sections/About.tsx
"use client";

import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { isFa } = useLanguage();

    return (
        <Reveal direction="up" className="max-w-7xl mx-auto">
            <section id="about" className="scroll-mt-24 flex flex-col gap-8 px-8 py-28">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                    {isFa ? "درباره من" : "About Me"}
                </span>

                <h2 className="max-w-3xl text-5xl font-bold leading-tight">
                    {isFa
                        ? "من عاشق اتوماسیون، هوش مصنوعی، بلاک‌چین و وب‌اپلیکیشن‌های مدرن هستم."
                        : "I love automation, AI, blockchain and modern web applications."}
                </h2>

                <p className="max-w-3xl text-lg leading-9 text-gray-600">
                    {isFa
                        ? "نام من محمد فاضل خرمی است، اما بیشتر افراد مرا فاضل صدا می‌زنند. من یک مهندس نرم‌افزار علاقه‌مند به اتوماسیون و سیستم‌های هوشمند هستم. از ساخت ابزارهای هوش مصنوعی، ربات‌ها، پلتفرم‌های CRM و وب‌اپلیکیشن‌هایی که فرآیندهای تجاری را ساده می‌کنند لذت می‌برم."
                        : "My name is Mohammad Fazel Khorrami, but most people know me as Fazel. I'm a Software Engineer passionate about automation and intelligent systems. I enjoy building AI agents, bots, CRM platforms and web applications that simplify business processes."}
                </p>

                <p className="max-w-3xl text-lg leading-9 text-gray-600">
                    {isFa
                        ? "علاوه بر مهندسی نرم‌افزار، علاقه زیادی به علم داده(data science)، ارزهای دیجیتال، دیفای (DeFi) و فناوری‌های بلاک‌چین دارم. همیشه در حال جستجوی راه‌های جدید برای ترکیب این حوزه‌ها برای ساخت محصولات کاربردی و نوآورانه هستم."
                        : "Beyond software engineering, I have a strong interest in data science, cryptocurrencies, DeFi and blockchain technologies. I'm always exploring new ways to combine these fields to build practical and innovative products."}
                </p>

                <div className="flex gap-4">
                    <Button>
                        <a href="/resume.pdf" download="Mohammad-Fazel-Khorrami-Resume.pdf">
                            {isFa ? "دانلود رزومه" : "Download Resume"}
                        </a>
                    </Button>
                    <Button variant="secondary">
                        <a href="https://github.com/mfazelkh99" target="_blank" rel="noopener noreferrer">
                            {isFa ? "مشاهده گیت‌هاب" : "View Github"}
                        </a>
                    </Button>
                </div>
            </section>
        </Reveal>
    );
}