import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";

    href?: string;
    onClick?: () => void;

    target?: "_blank" | "_self";
}

export default function Button({
    children,
    variant = "primary",
    href,
    onClick,
    target = "_self",
}: ButtonProps) {
    const baseClasses =
        "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition duration-300";

    const variants = {
        primary: "bg-black text-white hover:bg-gray-800",

        secondary:
            "border border-gray-300 bg-white text-black hover:bg-gray-100",
    };

    const className = `${baseClasses} ${variants[variant]}`;

    if (href) {
        const isExternal =
            href.startsWith("http://") || href.startsWith("https://");

        if (isExternal) {
            return (
                <a
                    href={href}
                    target={target}
                    rel={target === "_blank" ? "noopener noreferrer" : undefined}
                    className={className}
                >
                    {children}
                </a>
            );
        }

        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}