export interface Technology {
    name: string;
    icon: string;
    color?: string;
    url?: string;
}

export interface Feature {
    title: string;
}

export interface Project {
    id: number;

    order: number;

    title: string;

    subtitle: string;

    description: string;

    image: string;

    technologies: Technology[];

    features: Feature[];

    github: string;

    live?: string;

    year: string;

    status: "Completed" | "In Progress";

    color: string;
}