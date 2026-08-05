"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/collections/all", label: "Colección" },
  { href: "/about", label: "Sobre Vazlina" },
  { href: "/contact", label: "Contacto" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-[60px] flex items-center">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2">
            {/* Circle Logo Mark */}
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
              <span className="font-heading font-bold text-white text-base leading-none">V</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-lg text-text-primary tracking-tight">VAZLINA</span>
              <span className="hidden sm:inline text-[10px] text-text-secondary font-medium mt-0.5 tracking-wide uppercase">Tecnología curada</span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-primary hover:text-brand transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Cart & Mobile Menu */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <button
            onClick={openCart}
            className="relative p-2 text-text-primary hover:text-brand transition-colors"
            aria-label="Carrito"
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-primary hover:text-brand transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
