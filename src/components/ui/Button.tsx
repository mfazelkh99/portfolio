import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
    onClick?: () => void;
}

export default function Button({
    children,
    variant = "primary",
    onClick,
}: ButtonProps) {

    const baseClasses =
        "rounded-xl px-6 py-3 font-medium transition duration-300";

    const variants = {
        primary:
            "bg-black text-white hover:bg-gray-800",

        secondary:
            "border border-gray-300 bg-white text-black hover:bg-gray-100",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]}`}
        >
            {children}
        </button>
    );
}