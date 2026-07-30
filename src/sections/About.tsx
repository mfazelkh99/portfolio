import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";

export default function About() {
    return (
        <Reveal
            direction="up"
        >


            <section
                id="about"
                className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-28"
            >
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                    About Me
                </span>

                <h2 className="max-w-3xl text-5xl font-bold leading-tight">
                    I love automation, AI, blockchain and modern web applications.
                </h2>

                <p className="max-w-3xl text-lg leading-9 text-gray-600">
                    My name is Mohammad Fazel Khorrami, but most people know me as Fazel.
                    I'm a Software Engineer passionate about automation and intelligent systems.
                    I enjoy building AI agents, bots, CRM platforms and web applications that simplify business processes.
                </p>

                <p className="max-w-3xl text-lg leading-9 text-gray-600">
                    Beyond software engineering, I have a strong interest in data science, cryptocurrencies, DeFi and blockchain technologies.
                    I'm always exploring new ways to combine these fields to build practical and innovative products.
                </p>

                <div className="flex gap-4">
                    <Button>
                        Download Resume
                    </Button>

                    <Button variant="secondary">
                        Contact Me
                    </Button>
                </div>
            </section>
        </Reveal>
    );
}