import { Project } from "./types";

export const projects: Project[] = [
    {
        id: 1,
        order: 1,

        title: "Irancell CRM",
        subtitle: "Customer Management Platform",

        description:
            "A complete CRM platform for managing customers, requests, and sales workflows.",

        image: "/images/projects/irancell-crm.png",

        technologies: [
            { name: "Next.js", icon: "nextjs" },
            { name: "TypeScript", icon: "typescript" },
            { name: "Tailwind CSS", icon: "tailwind" },
            { name: "PHP", icon: "php" },
            { name: "MySQL", icon: "mysql" },
        ],

        features: [
            { title: "Customer Dashboard" },
            { title: "Admin Panel" },
            { title: "Excel Export" },
            { title: "Add Notes" },
        ],

        github: "https://github.com/mfazelkh99/irancell-crm",

        live: "",

        year: "2026",

        status: "In Progress",

        color: "#EAF5FF",
    },

    {
        id: 2,
        order: 2,

        title: "Irancell Mini App",
        subtitle: "Customer Registration",

        description:
            "A Mini App for customer registration and number reservation integrated with CRM.",

        image: "/images/projects/miniapp.png",

        technologies: [
            { name: "Next.js", icon: "nextjs" },
            { name: "TypeScript", icon: "typescript" },
            { name: "Tailwind CSS", icon: "tailwind" },
            { name: "PHP", icon: "php" },
        ],

        features: [
            { title: "Reservation" },
            { title: "Responsive UI" },
            { title: "Real-time Validation" },
            { title: "API Integration" },
        ],

        github: "https://github.com/mfazelkh99/irancell-eitaa-miniapp",

        live: "",

        year: "2026",

        status: "Completed",

        color: "#FFF8EA",
    },

    {
        id: 3,
        order: 3,

        title: "Zarfund Bot",
        subtitle: "Business Automation",

        description:
            "Telegram & Bale automation bot for customer management and financing requests.",

        image: "/images/projects/zarfund-bot.png",

        technologies: [
            { name: "Python", icon: "python" },
            { name: "SQLite", icon: "sqlite" },
            { name: "Telegram", icon: "telegram" },
            { name: "Bale", icon: "bale" },
        ],

        features: [
            { title: "Automation" },
            { title: "Reports" },
            { title: "JSON Export" },
            { title: "Admin Panel" },
        ],

        github: "https://github.com/mfazelkh99/zarfund-bale-bot",

        live: "",

        year: "2026",

        status: "Completed",

        color: "#F2FFF3",
    },

    {
        id: 4,
        order: 4,

        title: "Portfolio Website",
        subtitle: "Personal Website",

        description:
            "Modern animated portfolio built with Next.js, Framer Motion and Tailwind CSS.",

        image: "/images/projects/portfolio.png",

        technologies: [
            { name: "Next.js", icon: "nextjs" },
            { name: "TypeScript", icon: "typescript" },
            { name: "Framer Motion", icon: "framer" },
            { name: "Tailwind CSS", icon: "tailwind" },
        ],

        features: [
            { title: "Dark Mode" },
            { title: "Animations" },
            { title: "Responsive" },
            { title: "SEO Friendly" },
        ],

        github: "https://github.com/mfazelkh99/portfolio",

        live: "http://localhost:3000/",

        year: "2026",

        status: "In Progress",

        color: "#F8F3FF",
    },
];