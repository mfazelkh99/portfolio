// src/sections/Skills.tsx
"use client";

import SkillCard from "@/components/ui/SkillCard";
import Reveal from "@/components/animations/Reveal";
import { Code2, ServerCog, Database, Bot, Blocks, Wrench } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
    const { isFa } = useLanguage();

    const skillCategories = [
        {
            title: isFa ? "فرانت‌اند" : "Frontend",
            icon: Code2,
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
            title: isFa ? "بک‌اند" : "Backend",
            icon: ServerCog,
            skills: ["Python", "PHP", "Flask", "REST API" , "Node.js"],
        },
        {
            title: isFa ? "اتوماسیون" : "Automation",
            icon: Bot,
            skills: ["Telegram Bots", "Bale Bots", "Eitaa Mini Apps", "AI Agents"],
        },
        {
            title: isFa ? "پایگاه داده" : "Database",
            icon: Database,
            skills: ["MySQL", "SQLite"],
        },
        {
            title: isFa ? "بلاک‌چین" : "Blockchain",
            icon: Blocks,
            skills: ["Cryptocurrency", "DeFi", "Web3"],
        },
        {
            title: isFa ? "ابزارها" : "Tools",
            icon: Wrench,
            skills: ["Git", "GitHub", "Linux"],
        },
    ];

    return (
        <Reveal direction="up">
            <section id="skills" className="scroll-mt-24 bg-gray-50 py-28">
                <div className="mx-auto max-w-7xl px-8">
                    <div className="mb-16 text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                            {isFa ? "مهارت‌ها" : "Skills"}
                        </p>

                        <h2 className="text-4xl font-bold">
                            {isFa ? "فناوری‌هایی که با آن‌ها کار می‌کنم" : "Technologies I Work With"}
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                            {isFa
                                ? "ابزارها و فناوری‌های اصلی من برای ساخت وب‌اپلیکیشن‌های مدرن، سیستم‌های اتوماسیون و راه‌حل‌های مبتنی بر هوش مصنوعی."
                                : "My main technologies and tools for building modern web applications, automation systems and AI-powered solutions."}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {skillCategories.map((category) => (
                            <SkillCard
                                key={category.title}
                                title={category.title}
                                icon={category.icon}
                                skills={category.skills}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Reveal>
    );
}