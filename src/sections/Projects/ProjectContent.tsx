import { delay, motion, MotionValue } from "framer-motion";
import {
    fadeLeft,
    fadeRight,
    fadeUp,
    staggerContainer,
} from "@/lib/motion";
import type { Project } from "./types";
import Button from "@/components/ui/Button";
import { useState } from "react";

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
    return (
        <motion.div
            onViewportEnter={() => setIsContentVisible(true)}
            onViewportLeave={() => setIsContentVisible(false)}
            initial={{
                x: reverse ? 120 : -120,
                opacity: 0,
            }}
            whileInView={{
                x: 0,
                opacity: 1,
            }}

            viewport={{
                amount: 0.6,
                once: false,
            }}
            // variants={staggerContainer}
            animate={isContentVisible ? "visible" : "hidden"}
        >

            <motion.h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600 mb-4"
            // variants={fadeRight}
            >
                {project.subtitle}
            </motion.h3>

            <motion.h2 className=" text-5xl font-black leading-tight tracking-tight text-zinc-900 mb-6"
            // variants={fadeRight}
            >
                {project.title}
            </motion.h2>

            <motion.p className="max-w-xl text-lg leading-8 text-zinc-600 mb-1"
            // variants={fadeRight}
            >
                {project.description}
            </motion.p>

            {/* Features */}

            <motion.ul variants={staggerContainer}
                className="mb-8 space-y-4 my-10">

                {project.features.map((feature, index) => (
                    <motion.li
                        key={feature.title}
                        variants={fadeRight}
                        // animate={isActive ? "visible" : "hidden"}
                        className="flex items-center gap-3 text-zinc-700"
                    >
                        <span className="text-emerald-500"> ✓ </span>{feature.title}
                    </motion.li>
                ))}

            </motion.ul>

            {/* Tech Stack */}

            <motion.div

                className="flex flex-wrap gap-3 mb-8"
            >

                {project.technologies.map((tech, index) => (
                    <motion.span
                        key={tech.name}
                        // variants={fadeRight}
                        className="rounded-full bg-white/70 border border-zinc-200 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur"
                    >
                        {tech.name}
                    </motion.span>
                ))}

            </motion.div>

            {/* Buttons */}

            <motion.div

                className="flex gap-4"
            // variants={fadeRight}
            >

                {project.github && (
                    <Button href={project.github}>
                        GitHub
                    </Button>
                )}

                {project.live && (
                    <Button
                        href={project.live}
                        variant="secondary"
                    >
                        Live Demo
                    </Button>
                )}

            </motion.div>

        </motion.div>
    );
}