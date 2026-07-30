"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./Button";
import {
    fadeLeft,
    fadeRight,
    fadeUp,
    staggerContainer,
} from "@/lib/motion";
import Reveal from "../animations/Reveal";

interface ProjectCardProps {
    title: string;
    subtitle: string;
    description: string;

    image: string;

    technologies: string[];

    features: string[];

    github?: string;
    demo?: string;

    reverse?: boolean;
}

export default function ProjectCard({
    title,
    subtitle,
    description,
    image,
    technologies,
    features,
    github,
    demo,
    reverse = false,
}: ProjectCardProps) {
    return (
        <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
                amount: 0.3,
            }}
            transition={{
                duration: 1,
            }}
            className={`grid items-center gap-16 py-24 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
        >
            {/* Image */}

            <Reveal
                direction={reverse ? "left" : "right"}
                className="overflow-hidden rounded-3xl border border-gray-200 shadow-lg"
            >

                <Image
                    src={image}
                    alt={title}
                    width={1200}
                    height={700}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

            </Reveal>

            {/* Content */}

            <Reveal
                direction={reverse ? "left" : "right"}
            >

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                    {subtitle}
                </p>

                <h3 className="mb-6 text-4xl font-bold">
                    {title}
                </h3>

                <p className="mb-8 text-lg leading-8 text-gray-600">
                    {description}
                </p>

                {/* Features */}

                <motion.ul variants={staggerContainer} transition={{ duration: 1, }} initial="hidden" whileInView="visible" className="mb-8 space-y-3">

                    {features.map((feature) => (

                        <motion.li
                            variants={fadeRight}
                            transition={{ duration: 1.8, }}
                            key={feature}
                            className="flex items-center gap-3"
                        >
                            <span className="text-xl">
                                ✓
                            </span>

                            <span>
                                {feature}
                            </span>

                        </motion.li>

                    ))}

                </motion.ul>

                {/* Tech Stack */}

                <motion.div variants={staggerContainer} transition={{ duration: 1, }} initial="hidden" whileInView="visible"
                    className="mb-8 flex flex-wrap gap-3">

                    {technologies.map((tech) => (

                        <motion.span
                            variants={fadeRight}
                            transition={{ duration: 1.8, }}
                            key={tech}
                            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium"
                        >
                            {tech}
                        </motion.span>

                    ))}

                </motion.div>

                {/* Buttons */}

                <div className="flex gap-4">

                    {github && (
                        <Button href={github}>
                            GitHub
                        </Button>
                    )}

                    {demo && (
                        <Button
                            href={demo}
                            variant="secondary"
                        >
                            Live Demo
                        </Button>
                    )}

                </div>

            </Reveal>

        </motion.article>
    );
}