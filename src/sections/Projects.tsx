import ProjectCard from "@/components/ui/ProjectCard";

import { projects } from "@/data/projects";

export default function Projects() {
    return (
        <section
            id="projects"
            className="bg-white py-28"
        >
            <div className="mx-auto max-w-7xl px-8">

                <div className="mb-24 text-center">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                        Portfolio
                    </p>

                    <h2 className="text-5xl font-bold">
                        Selected Projects
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        A selection of projects that showcase my experience in
                        CRM systems, business automation, AI solutions and
                        modern web development.
                    </p>

                </div>

                {projects.map((project) => (

                    <ProjectCard
                        key={project.title}
                        {...project}
                    />

                ))}

            </div>
        </section>
    );
}