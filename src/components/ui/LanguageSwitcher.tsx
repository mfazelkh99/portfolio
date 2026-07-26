"use client";

import { useEffect, useRef, useState } from "react";

export default function LanguageSwitcher() {

    const [language, setLanguage] = useState("English");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (

        <div ref={dropdownRef} className="relative">

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10m0-20C9.5 4.7 8 8.2 8 12s1.5 7.3 4 10M2 12h20"
                    />
                </svg>
                {language}

                <svg
                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>

            </button>

            {isOpen && (

                <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-gray-200 bg-white p-1 shadow-xl">

                    <button
                        onClick={() => {
                            setLanguage("English");
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-100"
                    >
                        English

                        {language === "English" && (
                            <span className="text-blue-600">✓</span>
                        )}
                    </button>

                    <button
                        onClick={() => {
                            setLanguage("فارسی");
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-100"
                    >
                        فارسی

                        {language === "فارسی" && (
                            <span className="text-blue-600">✓</span>
                        )}
                    </button>

                </div>

            )}

        </div>

    );

}