import { Variants } from "framer-motion";

export const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
    },

    visible: {
        opacity: 1,
        y: 0,
    },
};

export const fadeLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -80,
    },

    visible: {
        opacity: 1,
        x: 0,
    },
};

export const fadeRight: Variants = {
    hidden: {
        opacity: 0,
        x: 80,
    },

    visible: {
        opacity: 1,
        x: 0,
    },
};

export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },

    visible: {
        opacity: 1,
        scale: 1,
    },
};

export const staggerContainer: Variants = {
    hidden: {},

    visible: {
        transition: {
            delayChildren: 1,
            staggerChildren: 0.3,
        },
    },
};

export const blurReveal: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(10px)",
    },

    visible: {
        opacity: 1,
        filter: "blur(0px)",
    },
};