"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FOOTER_SECTIONS = [
  {
    title: "Productos",
    links: [
      { href: "/collections/all", label: "La Colección" },
      { href: "/products/vazlina-brisa", label: "Vazlina Flow · Tu alivio contra el calor" },
      { href: "/products/vazlina-guardian", label: "Vazlina Guard · Protección para tu familia" },
      { href: "/products/vazlina-mariposa", label: "Vazlina Wings · Completa tu look" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/policies/privacy-policy", label: "Aviso de Privacidad" },
      { href: "/policies/terms-of-service", label: "Términos y Condiciones" },
      { href: "/policies/shipping-policy", label: "Política de Envío" },
      { href: "/about", label: "Sobre Vazlina" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { href: "/contact", label: "Contacto" },
      { href: "mailto:contacto@vazlina.shop", label: "contacto@vazlina.shop" },
      { href: "/#faq", label: "Preguntas Frecuentes" },
    ],
  },
];

function FooterColumn({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0 lg:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 lg:py-0 lg:mb-4 text-left group"
      >
        <h3 className="font-heading font-bold text-base text-text-primary">
          {title}
        </h3>
        <ChevronDown
          className={`w-4 h-4 text-text-secondary flex-shrink-0 transition-transform duration-200 lg:hidden ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <ul
        className={`overflow-hidden transition-all duration-200 lg:!max-h-none lg:block ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        {links.map((link) => (
          <li key={link.href} className="py-1.5">
            <Link
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-8">
        {/* Brand + Accordion columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10 mb-10">
          {/* Brand Block */}
          <div className="mb-6 lg:mb-0">
            <p className="font-heading font-bold text-2xl text-text-primary tracking-tight">
              VAZLINA
            </p>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Soluciones que mejoran tu día a día. Productos probados en Costa Rica
              por nosotros mismos, con pago al recibir, soporte real, y garantía
              que respaldamos con hechos.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Probado en Costa Rica", "Soporte Real", "30 Días Sin Riesgo"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-white border border-border rounded-full px-3 py-1 text-[11px] font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Accordion Columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-8">
              {FOOTER_SECTIONS.map((section) => (
                <FooterColumn
                  key={section.title}
                  title={section.title}
                  links={section.links}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[13px] text-text-secondary">
          <p>
            Envío gratis a todo Costa Rica · Pago al Recibir · 30 días para sentir la diferencia
          </p>
          <p>© 2026 Vazlina. Construido con cuidado en Costa Rica.</p>
        </div>
      </div>
    </footer>
  );
}
