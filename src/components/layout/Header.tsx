// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { isFa } = useLanguage();

  const navItems = [
    { href: "#portfolio", label: isFa ? "پورتفولیو" : "Portfolio" },
    { href: "#about", label: isFa ? "درباره من" : "About" },
    { href: "#skills", label: isFa ? "مهارت‌ها" : "Skills" },
    { href: "#projects", label: isFa ? "پروژه‌ها" : "Projects" },
    { href: "#contact", label: isFa ? "تماس با من" : "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <nav>
          <ul className="flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-700 transition hover:text-black">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}