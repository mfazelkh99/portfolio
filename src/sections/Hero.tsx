import Button from "@/components/ui/Button";
import Image from "next/image";
import Reveal from "@/components/animations/Reveal";

const skills = ["Python", "PHP", "React", "Next.js", "MySQL"]

export default function Hero() {
    return (
        <section className="scroll-mt-24 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-between px-8">

            {/* Left Side */}
            <Reveal direction="left" className="max-w-2xl">

                <p className="mb-4 text-lg text-gray-500">
                    Hi, I'm
                </p>

                <h1 className="mb-6 text-7xl font-bold leading-tight">
                    Fazel
                </h1>

                <h2 className="mb-8 text-3xl font-medium text-gray-700 leading-12">
                    Software Engineer focused on Automation,<br /> AI Agents & Modern Web Applications.
                </h2>

                <p className="mb-10 leading-8 text-gray-500 w-8/10">
                    I build intelligent systems that automate businesses,
                    save time and solve real-world problems.
                </p>

                <div className="flex gap-5">

                    <Button variant="secondary">
                        <a href="#contact">Contact Me</a>
                    </Button>

                    <Button>
                        <a href="#projects">View Projects</a>
                    </Button>
                </div>
                <div className="mt-14 flex flex-wrap gap-3">

                    {skills.map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700"
                        >
                            {item}
                        </span>
                    ))}

                </div>

            </Reveal>

            {/* Right Side */}

            <Reveal direction="right" className="flex h-[500px] w-[450px] items-center justify-center">

                <Image
                    src="/images/profile.png"
                    alt="Fazel"
                    width={500}
                    height={500}
                    className="aspect-square w-full max-w-md rounded-full object-cover"
                />

            </Reveal>

        </section>
    );
}