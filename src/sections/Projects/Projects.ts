import { Project } from "./types";

export const getProjects = (isFa: boolean): Project[] => [
    {
        id: 1,
        order: 1,
        title: isFa ? "سیستم مدیریت مشتریان ایرانسل" : "Irancell CRM",
        subtitle: isFa ? "پلتفرم مدیریت مشتری" : "Customer Management Platform",
        description: isFa
            ? "یک پلتفرم کامل CRM برای مدیریت مشتریان، درخواست‌ها و جریان‌های کاری فروش."
            : "A complete CRM platform for managing customers, requests, and sales workflows.",
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
        features: isFa
            ? [
                { title: "داشبورد مشتریان" },
                { title: "پنل مدیریت" },
                { title: "خروجی اکسل" },
                { title: "افزودن یادداشت" },
            ]
            : [
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
        title: isFa ? "برنامک ایتای ایرانسل" : "Irancell Mini App",
        subtitle: isFa ? "ثبت‌نام مشتریان" : "Customer Registration",
        description: isFa
            ? "یک برنامک برای ثبت‌نام مشتریان و رزرو شماره با اتصال مستقیم به سیستم CRM."
            : "A Mini App for customer registration and number reservation integrated with CRM.",
        media: {
            type: "image",
            src: "/images/projects/miniapp.jpg",
        },
        technologies: [
            { name: "Eitaa API", icon: "eitaa" },
            { name: "HTML", icon: "html" },
            { name: "CSS", icon: "css" },
            { name: "PHP", icon: "php" },
            { name: "MySQL", icon: "mysql" },
        ],
        features: isFa
            ? [
                { title: "رزرو شماره" },
                { title: "رابط کاربری واکنش‌گرا" },
                { title: "اعتبارسنجی آنی" },
                { title: "اتصال به API" },
            ]
            : [
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
        title: isFa ? "ربات زرفاند" : "Zarfund Bot",
        subtitle: isFa ? "اتوماسیون کسب‌وکار" : "Business Automation",
        description: isFa
            ? "ربات اتوماسیون پیام‌رسان‌های تلگرام و بله برای مدیریت مشتریان و درخواست‌های تامین مالی."
            : "Telegram & Bale automation bot for customer management and financing requests.",
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
        features: isFa
            ? [
                { title: "اتوماسیون فرآیندها" },
                { title: "گزارش‌های خودکار" },
                { title: "ارسال پیام انبوه" },
                { title: "پنل مدیریت" },
            ]
            : [
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
        title: isFa ? "وب‌سایت پورتفولیو" : "Portfolio Website",
        subtitle: isFa ? "وب‌سایت شخصی" : "Personal Website",
        description: isFa
            ? "یک وبسایت شخصی انیمیشن‌دار و مدرن ساخته شده با React، Next.js، Node.js و Tailwind CSS."
            : "Modern animated portfolio built with Next.js, React, Tailwind CSS and node.js.",
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
        features: isFa
            ? [
                { title: "چت آنلاین" },
                { title: "انیمیشن‌های تعاملی" },
                { title: "طراحی واکنش‌گرا" },
                { title: "پشتیبانی از چند زبان" },
            ]
            : [
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