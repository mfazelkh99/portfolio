import Link from "next/link";
import { navItems } from "@/data/navigation";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <nav>
          <ul className="flex items-center gap-10">

            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-700 transition hover:text-black"
                >
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