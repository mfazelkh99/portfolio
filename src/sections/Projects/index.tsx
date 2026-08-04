"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, } from "framer-motion";
import { getActiveProject } from "./utils"
import ProjectCard from "./ProjectCard";
import { projects } from "./Projects";

export default function Projects() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    const [progress, setProgress] = useState(0);
    const activeProject = getActiveProject(
        progress,
        projects.length
    );
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgress(latest);
    });
    return (
        <section
            ref={sectionRef}
            id="projects"
            className="bg-white py-28"
        >
            <div className="mx-auto max-w-7xl px-8">

                <div className="mb-24 text-center">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                        Portfolio
                    </p>

                    <h2 className="text-5xl font-bold">
                        Selected Projects
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        A selection of projects that showcase my experience in
                        CRM systems, business automation, AI solutions and
                        modern web development.
                    </p>

                </div>

                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        reverse={index % 2 === 1}
                        isActive={index === activeProject}
                    />
                ))}

            </div>
            <div className="fixed right-6 top-24 z-50 rounded-lg bg-black px-4 py-2 text-white">
                Active: {activeProject + 1}
            </div>
        </section>
    );
}