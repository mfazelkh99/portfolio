export interface Project {
    title: string;
    subtitle: string;
    description: string;

    image: string;

    technologies: string[];

    features: string[];

    github?: string;
    demo?: string;

    reverse?: boolean;
}

export const projects: Project[] = [

    {
        title: "Irancell CRM Platform",

        subtitle: "Customer Relationship Management",

        description:
            "A centralized CRM platform designed for Irancell agencies, featuring an integrated mini app, customer management system and admin dashboard.",

        image: "/images/projects/irancell-crm.png",

        technologies: [
            "Python",
            "PHP",
            "MySQL",
            "Bootstrap",
        ],

        features: [
            "Customer Registration",
            "Admin Dashboard",
            "Excel Export",
            "Multi-platform Integration",
        ],

        github: "https://github.com/mfazelkh99/irancell-crm",

        reverse: false,
    },

    {
        title: "Zarfund Automation Bot",

        subtitle: "Business Automation",

        description:
            "An automation bot developed for Zarfund Financial Group to manage customer requests and business workflows.",

        image: "/images/projects/zarfund-bot.png",

        technologies: [
            "Python",
            "Telegram Bot",
            "SQLite",
        ],

        features: [
            "Customer Workflow",
            "Admin Panel",
            "Excel Reporting",
            "Automation",
        ],

        reverse: true,
    },

    {
        title: "Portfolio Website",

        subtitle: "Personal Brand",

        description:
            "A modern portfolio website built with Next.js to showcase projects, skills and professional experience.",

        image: "/images/projects/portfolio.png",

        technologies: [
            "Next.js",
            "React",
            "Tailwind CSS",
        ],

        features: [
            "Responsive Design",
            "Dark Mode (Coming Soon)",
            "Animations",
            "Reusable Components",
        ],

        github: "https://github.com/mfazelkh99",

        reverse: false,
    },

    {
        title: "Irancell Mini App",

        subtitle: "Mini Application",

        description:
            "A lightweight customer registration mini app integrated with the CRM platform.",

        image: "/images/projects/miniapp.png",

        technologies: [
            "PHP",
            "MySQL",
            "JavaScript",
        ],

        features: [
            "Customer Registration",
            "CRM Integration",
            "Responsive UI",
        ],

        reverse: true,
    },

];