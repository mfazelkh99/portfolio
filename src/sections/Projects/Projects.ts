import { Project } from "./types";

export const projects: Project[] = [
    {
        id: 1,
        order: 1,

        title: "Irancell CRM",
        subtitle: "Customer Management Platform",

        description:
            "A complete CRM platform for managing customers, requests, and sales workflows.",

        media: {
            type: "image",
            src: "/images/projects/irancell-crm.png",
        },

        technologies: [
            { name: "HTML", icon: "html" },
            { name: "CSS", icon: "css" },
            { name: "JavaScript", icon: "javascript" },
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

        media: {
            type: "image",
            src: "/images/projects/miniapp.jpg",
        },

        technologies: [
            { name: "Eitaa API", icon: "eitaa" },
            { name: "HTML", icon: "hyml" },
            { name: "CSS", icon: "css" },
            { name: "PHP", icon: "php" },
            { name: "MySQL", icon: "mysql" },
        ],

        features: [
            { title: "Reservation" },
            { title: "Responsive UI" },
            { title: "Real-time Validation" },
            { title: "API Integration" },
        ],

        github: "https://github.com/mfazelkh99/irancell-eitaa-miniapp",

        live: "https://eitaa.com/yazdirancell_app",

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

        media: {
            type: "video",
            src: "/videos/zarfund-bot.mp4",
        },

        technologies: [
            { name: "Python", icon: "python" },
            { name: "SQLite", icon: "sqlite" },
            { name: "Telegram", icon: "telegram" },
            { name: "Bale", icon: "bale" },
        ],

        features: [
            { title: "Automation" },
            { title: "Auto Reports" },
            { title: "Bulk Messaging" },
            { title: "Admin Panel" },
        ],

        github: "https://github.com/mfazelkh99/zarfund-bale-bot",

        live: "https://ble.ir/zarfundbot",

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
            "Modern animated portfolio built with Next.js, React, Tailwind CSS and node.js.",

        media: {
            type: "image",
            src: "/images/projects/portfolio.png",
        },

        technologies: [
            { name: "Next.js", icon: "nextjs" },
            { name: "React", icon: "react" },
            { name: "TypeScript", icon: "typescript" },
            { name: "Node.js", icon: "nodejs" },
            { name: "Tailwind CSS", icon: "tailwind" },
        ],

        features: [
            { title: "Online Chat" },
            { title: "Animations" },
            { title: "Responsive" },
            { title: "Language Switcher" },
        ],

        github: "https://github.com/mfazelkh99/portfolio",

        live: "#portfolio",

        year: "2026",

        status: "In Progress",

        color: "#F8F3FF",
    },
];