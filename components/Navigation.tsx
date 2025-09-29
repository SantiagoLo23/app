"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, Heart, Info } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", href: "/", icon: Cloud },
    { name: "Favoritos", href: "/favorites", icon: Heart },
    { name: "Acerca de", href: "/about", icon: Info },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <Cloud size={28} />
            WeatherApp
          </Link>

          <ul className="flex gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-white text-blue-600 font-semibold"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
