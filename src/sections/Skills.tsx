import SkillCard from "@/components/ui/SkillCard";
import Reveal from "@/components/animations/Reveal";

import {
    Code2,
    ServerCog,
    Database,
    Bot,
    Blocks,
    Wrench,
} from "lucide-react";

const skillCategories = [
    {
        title: "Frontend",
        icon: Code2,
        skills: [
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
        ],
    },

    {
        title: "Backend",
        icon: ServerCog,
        skills: [
            "Python",
            "PHP",
            "Flask",
            "REST API",
        ],
    },

    {
        title: "Automation",
        icon: Bot,
        skills: [
            "Telegram Bots",
            "Bale Bots",
            "Eitaa Mini Apps",
            "AI Agents",
        ],
    },

    {
        title: "Database",
        icon: Database,
        skills: [
            "MySQL",
            "SQLite",
        ],
    },

    {
        title: "Blockchain",
        icon: Blocks,
        skills: [
            "Cryptocurrency",
            "DeFi",
            "Web3",
        ],
    },

    {
        title: "Tools",
        icon: Wrench,
        skills: [
            "Git",
            "GitHub",
            "Linux",
        ],
    },
];

export default function Skills() {
    return (
        <Reveal
            direction="up"
        >
            <section
                id="skills"
                className="bg-gray-50 py-28"
            >
                <div className="mx-auto max-w-7xl px-8">

                    <div className="mb-16 text-center">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                            Skills
                        </p>

                        <h2 className="text-4xl font-bold">
                            Technologies I Work With
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                            My main technologies and tools for building modern web
                            applications, automation systems and AI-powered
                            solutions.
                        </p>

                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                        {skillCategories.map((category) => (

                            <SkillCard
                                key={category.title}
                                title={category.title}
                                icon={category.icon}
                                skills={category.skills}
                            />

                        ))}

                    </div>

                </div>
            </section>
        </Reveal>
    );
}