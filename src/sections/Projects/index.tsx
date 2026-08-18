"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { getActiveProject } from "./utils";
import ProjectCard from "./ProjectCard";
import { getProjects } from "./Projects"; // وارد کردن تابع جدید
import { useLanguage } from "@/context/LanguageContext"; // وارد کردن کانتکست زبان

export default function Projects() {
    const { isFa } = useLanguage();
    const projects = getProjects(isFa); // دریافت لیست پروژه‌ها بر اساس زبان

    const projectRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeProject, setActiveProject] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const viewportCenter = window.innerHeight * 0.3;
            let closestProject = 1;
            let smallestDistance = Infinity;

            projectRefs.current.forEach((project, index) => {
                if (!project) return;
                const rect = project.getBoundingClientRect();
                const projectCenter = rect.top + rect.height / 2;
                const distance = Math.abs(projectCenter - viewportCenter);

                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestProject = index + 1;
                }
            });

            setActiveProject(closestProject);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <section id="projects" className="scroll-mt-24 bg-white py-18">
            <div className="mx-auto max-w-7xl px-8">
                <motion.div onViewportEnter={() => setActiveProject(0)} className="text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                        {isFa ? "پورتفولیو" : "Portfolio"}
                    </p>

                    <h2 className="text-5xl font-bold">
                        {isFa ? "پروژه‌های منتخب" : "Selected Projects"}
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        {isFa 
                            ? "مجموعه ای از پروژه ها که تجربه من را در سیستم‌های CRM، اتوماسیون کسب و کار، راه حل‌ های هوش مصنوعی و توسعه وبسایت های مدرن نشان می دهد." 
                            : "A selection of projects that showcase my experience in CRM systems, business automation, AI solutions and modern web development."}
                    </p>
                </motion.div>

                <div>
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => {
                                projectRefs.current[index] = el;
                            }}
                        >
                            <ProjectCard
                                project={project}
                                reverse={index % 2 === 1}
                                isActive={activeProject === project.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}