"use client";

import { useRef, useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const PRODUCTS = [
  {
    name: "Vazlina Brisa",
    slug: "vazlina-brisa",
    image: "/images/products/brisa-hero.jpg",
    priceFrom: 1199,
    tagline: "El calor ya no decide cómo te sientes",
  },
  {
    name: "Vazlina Mariposa",
    slug: "vazlina-mariposa",
    image: "/images/products/mariposa-hero.jpg",
    priceFrom: 1299,
    tagline: "El accesorio que completa tu look",
  },
  {
    name: "Vazlina Guardián",
    slug: "vazlina-guardian",
    image: "/images/products/guardian-hero.jpg",
    priceFrom: 1249,
    tagline: "Duerme tranquilo. Tu familia está protegida.",
  },
];

function DotIndicator({ count, activeIndex = 0 }: { count: number; activeIndex?: number }) {
  return (
    <div className="md:hidden flex items-center justify-center gap-1.5 my-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all ${
            i === activeIndex ? "bg-brand w-4" : "bg-border w-2"
          }`}
        />
      ))}
    </div>
  );
}

function useActiveIndex(ref: React.RefObject<HTMLDivElement | null>, itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || itemCount <= 1) return;

    const items = Array.from(el.children).filter(
      (child) => !(child as HTMLElement).classList.contains("hidden")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.intersectionRatio > 0.3);
        if (visible.length === 0) return;

        const best = visible.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );

        const index = items.indexOf(best.target);
        if (index !== -1) {
          setActiveIndex(index);
        }
      },
      {
        root: el,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [ref, itemCount]);

  return activeIndex;
}

export default function CollectionPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const activeIndex = useActiveIndex(gridRef, PRODUCTS.length);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="text-center mb-4 md:mb-10">
          <h1 className="font-heading font-bold text-2xl md:text-4xl">
            Tu nueva rutina empieza aquí
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Tres soluciones para sentirte mejor. Pago al recibir. Sin complicaciones.
          </p>
        </div>

        <div
          ref={gridRef}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-2 md:mb-0 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCTS.map((p) => (
            <div
              key={p.slug}
              className="w-[80vw] sm:w-auto max-w-[80vw] sm:max-w-none shrink-0 snap-center"
            >
              <ProductCard {...p} />
            </div>
          ))}
        </div>

        <DotIndicator count={PRODUCTS.length} activeIndex={activeIndex} />
      </div>
    </>
  );
}
