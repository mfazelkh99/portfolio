// src/sections/Hero.tsx
"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const skills = ["Python", "PHP", "React", "Next.js", "MySQL"];

export default function Hero() {
    const { isFa } = useLanguage();

    return (
        <section className="scroll-mt-24 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-between px-8">
            {/* Left Side */}
            <Reveal direction={isFa ? "right" : "left"} className="max-w-2xl">
                <p className="mb-4 text-lg text-gray-500">
                    {isFa ? "سلام، من" : "Hi, I'm"}
                </p>

                <h1 className="mb-6 text-7xl font-bold leading-tight">
                    {isFa ? "فاضل" : "Fazel"}
                </h1>

                <h2 className="mb-8 text-3xl font-medium text-gray-700 leading-12">
                    {isFa
                        ? <>هستم. یک مهندس نرم‌افزار با تمرکز بر اتوماسیون،<br /> هوش مصنوعی و وب‌اپلیکیشن‌های مدرن.</>
                        : <>Software Engineer focused on Automation,<br /> AI Agents & Modern Web Applications.</>}
                </h2>

                <p className="mb-10 leading-8 text-gray-500 w-8/10">
                    {isFa
                        ? "من سیستم‌های هوشمندی می‌سازم که کسب‌وکارها را خودکار کرده، در زمان صرفه‌جویی و مشکلات واقعی را حل می‌کنند."
                        : "I build intelligent systems that automate businesses, save time and solve real-world problems."}
                </p>

                <div className="flex gap-5">
                    <Button variant="secondary">
                        <a href="#contact">{isFa ? "ارتباط با من" : "Contact Me"}</a>
                    </Button>
                    <Button>
                        <a href="#projects">{isFa ? "مشاهده پروژه‌ها" : "View Projects"}</a>
                    </Button>
                </div>

                <div className="mt-14 flex flex-wrap gap-3">
                    {skills.map((item) => (
                        <span key={item} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700">
                            {item}
                        </span>
                    ))}
                </div>
            </Reveal>

            {/* Right Side */}
            <Reveal direction={isFa ? "left" : "right"} className="flex h-[500px] w-[450px] items-center justify-center">
                <Image
                    src="/images/profile.png"
                    alt="Fazel"
                    width={500}
                    height={500}
                    className={`aspect-square w-full max-w-md rounded-full object-cover transition-transform duration-500 ${isFa ? '-scale-x-100' : ''}`}
                />
            </Reveal>
        </section>
    );
}