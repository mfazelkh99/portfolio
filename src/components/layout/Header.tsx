import Link from "next/link";

const navItems = [
  { title: "Portfolio", href: "#portfolio" },
  { title: "About", href: "#about" },
  { title: "Projects", href: "#projects" },
  { title: "Skills", href: "#skills" },
  { title: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <nav>
          <ul className="flex items-center gap-10">

            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="text-gray-700 transition hover:text-black"
                >
                  {item.title}
                </Link>
              </li>
            ))}

          </ul>
        </nav>

        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100">
          English
          <span>▼</span>
        </button>

      </div>
    </header>
  );
}