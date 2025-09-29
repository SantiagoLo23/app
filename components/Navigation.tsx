"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", href: "/", icon: Cloud },
    { name: "Favoritos", href: "/favorites", icon: Cloud },
    { name: "Acerca de", href: "/about", icon: Cloud },
  ];

  return <nav className="bg-blue-600 text-white p-4"></nav>;
}
