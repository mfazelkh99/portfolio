"use client";
import {
    Mail,
    Send,
} from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { motion } from "framer-motion";

const LinkedInIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.85C21 10.1 19 8.25 16.25 8.25c-2.25 0-3.25 1.25-3.8 2.1V8.5H9V21h3.45v-6.2c0-1.65.3-3.25 2.4-3.25 2.05 0 2.1 1.9 2.1 3.35V21H21v-7.15Z" />
    </svg>
);

const InstagramIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
        />

        <circle
            cx="12"
            cy="12"
            r="4"
        />

        <circle
            cx="17.5"
            cy="6.5"
            r="0.8"
            fill="currentColor"
            stroke="none"
        />
    </svg>
);

const EitaaIcon = () => (
    <img
        src="/icons/social/eitaa.svg"
        alt=""
        className="h-5 w-5 object-contain grayscale brightness-0"
    />
);

const BaleIcon = () => (
    <img
        src="/icons/social/bale.png"
        alt=""
        className="h-5 w-5 object-contain"
    />
);

const contactLinks = [
    {
        name: "Email",
        value: "fazel.khorramii@gmail.com",
        href: "mailto:fazel.khorramii@gmail.com",
        icon: Mail,
        iconType: "component",
    },
    {
        name: "LinkedIn",
        value: "mohammadfazel-khorrami",
        href: "https://www.linkedin.com/in/mohammadfazel-khorrami",
        icon: LinkedInIcon,
        iconType: "component",
    },
    // {
    //     name: "Instagram",
    //     value: "@m.fazel_khorrami",
    //     href: "#",
    //     icon: InstagramIcon,
    //     iconType: "component",
    // },
    {
        name: "Telegram",
        value: "@fazel_khorrami",
        href: "https://t.me/fazel_khorrami",
        icon: Send,
        iconType: "component",
    },
    {
        name: "Eitaa",
        value: "@fazelkhorrami",
        href: "https://eitaa.com/fazelkhorrami",
        icon: EitaaIcon,
        iconType: "image",
    },
    {
        name: "Bale",
        value: "@m_fazel_kh99",
        href: "https://ble.ir/m_fazel_kh99",
        icon: BaleIcon,
        iconType: "image",
    },
];

export default function Contact() {
    return (
        <Reveal
            direction="up"
        >
            <section
                id="contact"
                className="scroll-mt-24 bg-white pb-18 pt-2"
            >
                <div className="mx-auto max-w-7xl px-8">

                    {/* Header */}

                    <motion.div
                        className="mb-20 text-center"
                    >
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                            Contact
                        </p>

                        <h2 className="text-5xl font-bold">
                            Let's Work Together
                        </h2>

                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                            Have a project in mind or want to work together?
                            Feel free to get in touch.
                        </p>
                    </motion.div>


                    {/* Contact Links */}

                    <div className="mx-auto max-w-7xl">

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">

                            {contactLinks.map((link) => {

                                const Icon = link.icon;

                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        target={
                                            link.href.startsWith("mailto:")
                                                ? undefined
                                                : "_blank"
                                        }
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-1 rounded-2xl border border-gray-200 px-4 py-2 hover:border-gray-400 hover:-translate-y-1 hover:shadow-xl duration-300"
                                    >

                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                            <Icon
                                                size={22}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <p className="whitespace-nowrap text-sm font-semibold">
                                            {link.value}
                                        </p>

                                    </motion.a>
                                );
                            })}

                        </div>

                    </div>

                </div>
            </section>
        </Reveal>
    );
}