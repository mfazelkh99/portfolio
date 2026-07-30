"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

import {
    fadeUp,
    fadeLeft,
    fadeRight,
    scaleIn,
} from "@/lib/motion";

interface RevealProps {
    children: ReactNode;

    variant?: Variants;

    direction?: "up" | "left" | "right" | "scale";

    delay?: number;

    duration?: number;

    amount?: number;

    className?: string;

    once?: boolean;
}

export default function Reveal({
    children,
    variant,
    direction = "up",
    delay = 0,
    duration = 0.8,
    amount = 0.35,
    className,
    once = false,
}: RevealProps) {
    const directionVariants = {
        up: fadeUp,
        left: fadeLeft,
        right: fadeRight,
        scale: scaleIn,
    };

    const variants = variant ?? directionVariants[direction];
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                amount,
                once,
            }}
            transition={{
                duration,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}