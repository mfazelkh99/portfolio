"use client";

import { delay, motion, MotionValue } from "framer-motion";
import {fadeLeft, fadeRight, staggerContainer } from "@/lib/motion";
import type { Project } from "./types";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext"; // وارد کردن کانتکست زبان

interface ProjectContentProps {
    project: Project;
    isActive: boolean;
    opacity: MotionValue<number>;
    x: MotionValue<number>;
    reverse: boolean;
}

export default function ProjectContent({
    project,
    isActive,
    opacity,
    x,
    reverse,
}: ProjectContentProps) {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const { isFa } = useLanguage(); // استفاده از هوک زبان

    // 👈 برعکس کردن نقطه شروع انیمیشن برای زبان فارسی
    const baseInitialX = reverse ? 120 : -120;
    const finalInitialX = isFa ? -baseInitialX : baseInitialX;
    const variant = isFa ? fadeLeft : fadeRight;

    return (
        <motion.div
            onViewportEnter={() => setIsContentVisible(true)}
            onViewportLeave={() => setIsContentVisible(false)}
            initial={{ x: finalInitialX, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.5, once: false }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            animate={isContentVisible ? "visible" : "hidden"}
        >
            <motion.h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600 mb-4">
                {project.subtitle}
            </motion.h3>

            <motion.h2 className="text-5xl font-black leading-tight tracking-tight text-zinc-900 mb-6">
                {project.title}
            </motion.h2>

            <motion.p className="max-w-xl text-lg leading-8 text-zinc-600 mb-1">
                {project.description}
            </motion.p>

            {/* Features */}
            <motion.ul variants={staggerContainer} className="mb-8 space-y-4 my-10">
                {project.features.map((feature) => (
                    <motion.li
                        key={feature.title}
                        variants={variant}
                        className="flex items-center gap-3 text-zinc-700"
                    >
                        <span className="text-emerald-500"> ✓ </span>{feature.title}
                    </motion.li>
                ))}
            </motion.ul>

            {/* Tech Stack */}
            <motion.div className="flex flex-wrap gap-3 mb-8">
                {project.technologies.map((tech) => (
                    <motion.span
                        key={tech.name}
                        className="rounded-full bg-white/70 border border-zinc-200 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur"
                        dir="ltr"
                    >
                        {tech.name}
                    </motion.span>
                ))}
            </motion.div>

            {/* Buttons */}
            <motion.div className="flex gap-4">
                {project.github && (
                    <Button href={project.github} target="_blank">
                        {isFa ? "گیت‌هاب" : "GitHub"}
                    </Button>
                )}

                {project.live && (
                    <Button href={project.live} variant="secondary" target="_blank">
                        {isFa ? "مشاهده آنلاین" : "Live Demo"}
                    </Button>
                )}
            </motion.div>
        </motion.div>
    );
}