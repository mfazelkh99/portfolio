"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, } from "framer-motion";
import Button from "@/components/ui/Button";
import {
    fadeLeft,
    fadeRight,
    fadeUp,
    staggerContainer,
} from "@/lib/motion";
import Reveal from "@/components/animations/Reveal";
import type { Project } from "./types";
import ProjectImage from "./ProjectImage";
import ProjectContent from "./ProjectContent";

interface ProjectCardProps {
    project: Project;

    reverse?: boolean;

    isActive: boolean;

    // onActive: () => void;
}

export default function ProjectCard({
    reverse = false,
    project,
    isActive,
    // onActive,
}: ProjectCardProps) {
    const ref = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const offset = 120;
    const startX = reverse ? 120 : -120;

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.25],
        [0, 1]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.35],
        [0.92, 1]
    );

    const imageX = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [offset, 0, 0, 0, offset]
    );

    const contentX = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [-offset, 0, 0, 0, -offset]
    );

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [40, -40]
    );

    const activeScale = isActive ? 1 : 0.94;

    const activeOpacity = isActive ? 1 : 0.45;
    return (
        <section
            className="
                relative
                min-h-screen
            "
        >
            <motion.article
                // onViewportEnter={onActive}
                viewport={{

                    once: false,

                    amount: 0.6,

                }}
                initial={{
                    scale: 0.94,
                    opacity: 0.45,
                }}
                whileInView={{
                    scale: 1,
                    opacity: 1,
                }}
                ref={ref}
                // animate={{
                //     scale: activeScale,
                //     opacity: activeOpacity,
                // }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                }}
                // style={{
                //     backgroundColor: project.color,
                // }}
                // this shadow is for this className
                // shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                className={`
                    sticky
                    top-24

                    grid
                    lg:grid-cols-2
                    gap-20
                    items-center

                    rounded-[40px]

                    px-12
                    py-12

                    border
                    border-white/60

                    backdrop-blur-sm

                    ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
                `}
            >

                <ProjectContent
                    project={project}
                    isActive={isActive}
                    opacity={opacity}
                    x={reverse ? imageX : contentX}
                    reverse={reverse}
                />

                <ProjectImage
                    media={project.media}
                    title={project.title}
                    scale={scale}
                    y={y}
                    x={reverse ? contentX : imageX}
                    reverse={reverse}
                />

            </motion.article>
        </section>
    );
}