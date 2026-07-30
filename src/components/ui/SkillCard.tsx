import { LucideIcon } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

interface SkillCardProps {
    title: string;
    icon: LucideIcon;
    skills: string[];
}

export default function SkillCard({
    title,
    icon: Icon,
    skills,
}: SkillCardProps) {
    return (
        <Reveal
            direction="scale"
        >
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="mb-6 flex items-center gap-3">

                    <Icon
                        size={28}
                        className="text-black"
                    />

                    <h3 className="text-xl font-semibold">
                        {title}
                    </h3>

                </div>

                <div className="flex flex-wrap gap-3">

                    {skills.map((skill) => (

                        <span
                            key={skill}
                            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
                        >
                            {skill}
                        </span>

                    ))}

                </div>

            </div>
        </Reveal>
    );
}