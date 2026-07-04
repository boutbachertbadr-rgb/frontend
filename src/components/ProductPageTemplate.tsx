"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { trackAddToCart } from "@/lib/pixels";
import StickyAddToCart from "./StickyAddToCart";
import RatingBreakdown from "./RatingBreakdown";
import {
  CheckCircle,
  X,
  Quote,
  ChevronDown,
  Phone,
  Truck,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  Battery,
  Bluetooth,
  Headphones,
  Volume2,
  Scale,
  Zap,
  Wind,
  Usb,
  Shield,
  BatteryCharging,
  Box,
  RefreshCw,
  Globe,
  MessageCircle,
  CreditCard,
  Leaf,
  Star,
  BadgeCheck,
} from "lucide-react";

export interface ProductData {
  id: string;
  name: string;
  angle: string;
  h1: string;
  subheadline: string;
  urgencyText: string;
  rating: number;
  reviewCount: number;
  ratingBreakdown: Array<{ stars: number; count: number }>;
  priceFrom: number;
  heroImage: string;
  offers: Array<{
    qty: number;
    price: number;
    label: string;
    badge?: string;
    savings?: number;
  }>;
  statPills: Array<{ icon: string; label: string }>;
  thumbnails: string[];
  problemStat?: { number: string; text: string; source: string };
  problemSolution?: Array<{
    problem: string;
    solution: { title: string; desc: string };
  }>;
  problemImage?: string;
  features: Array<{
    name: string;
    desc: string;
    result: string;
    icon: string;
  }>;
  featureImage: string;
  exclusions: string[];
  trustStats: Array<{ number: string; label: string }>;
  expertQuote: { text: string; author: string };
  timeline: Array<{ week: string; title: string; desc: string }>;
  timelineSummary: string;
  reviews: Array<{
    name: string;
    age: number;
    city: string;
    quote: string;
    rating: number;
    image?: string;
  }>;
  comparisons: Array<{
    name: string;
    priceRange: string;
    problems: string[];
  }>;
  guarantee: {
    steps: Array<{ title: string; desc: string; icon: string }>;
  };
  simplicity: Array<{ icon: string; title: string; desc: string }>;
  simplicityStats: Array<{ number: string; label: string }>;
  codSteps: Array<{ num: string; icon: string; title: string; desc: string }>;
  cities: string[];
  faqs: Array<{ category: string; q: string; a: string }>;
  crossSell: Array<{
    slug: string;
    angle: string;
    name: string;
    desc: string;
    price: number;
    reviews: string;
    image: string;
  }>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Battery,
  Bluetooth,
  Headphones,
  Volume2,
  Scale,
  Zap,
  Wind,
  Usb,
  Shield,
  BatteryCharging,
  Box,
  RefreshCw,
  Globe,
  MessageCircle,
  CreditCard,
  Leaf,
  Phone,
  Truck,
  Tag,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  Quote,
  X,
};

function IconComponent({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

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

export default function ProductPageTemplate({ data }: { data: ProductData }) {
  const [selectedOffer, setSelectedOffer] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(data.heroImage);
  const { addItem, openCart } = useCartStore();

  const timelineRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const comparisonsRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const codRef = useRef<HTMLDivElement>(null);
  const crossSellRef = useRef<HTMLDivElement>(null);
  const simplicityRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const timelineIndex = useActiveIndex(timelineRef, data.timeline.length);
  const reviewsIndex = useActiveIndex(reviewsRef, data.reviews.length);
  const comparisonsIndex = useActiveIndex(comparisonsRef, data.comparisons.length);
  const guaranteeIndex = useActiveIndex(guaranteeRef, data.guarantee.steps.length);
  const codIndex = useActiveIndex(codRef, data.codSteps.length);
  const crossSellIndex = useActiveIndex(crossSellRef, data.crossSell.length);
  const simplicityIndex = useActiveIndex(simplicityRef, data.simplicity.length);
  const featuresIndex = useActiveIndex(featuresRef, data.features.length);

  const handleAddToCart = () => {
    const offer = data.offers[selectedOffer];
    addItem({
      id: `${data.id}-${offer.qty}`,
      name: `${data.name} (${offer.qty} ${offer.qty === 1 ? "unidad" : "unidades"})`,
      quantity: 1,
      pricePerItem: offer.price,
      image: data.heroImage,
    });
    trackAddToCart(data.name, offer.price);
    openCart();
  };

  return (
    <>
      <StickyAddToCart
        productId={data.id}
        productName={data.name}
        offers={data.offers}
        image={data.heroImage}
        selectedOffer={selectedOffer}
        onSelectOffer={setSelectedOffer}
      />

      {/* SECTION 3: Hero */}
      <section className="bg-white pt-6 md:pt-12 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-3 md:gap-12">
          {/* Left - Gallery */}
          <div className="min-w-0">
            <div className="relative aspect-square w-full bg-subtle rounded-2xl overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt={data.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="mb-3 md:hidden">
              <span className="inline-flex items-center bg-white border border-border rounded-full px-3 py-1.5 text-xs font-medium text-text-primary">
                {data.angle}
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[data.heroImage, ...data.thumbnails].map((thumb, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(thumb)}
                  className={`relative w-20 h-20 bg-subtle rounded-lg overflow-hidden flex-shrink-0 border-2 cursor-pointer transition-all ${selectedImage === thumb ? 'border-brand' : 'border-transparent hover:border-brand'}`}
                >
                  <Image src={thumb} alt={`${data.name} ${i + 1}`} fill className="object-cover" unoptimized />
                </div>
              ))}
            </div>
            <div className="relative mt-4">
              <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-4">
                {data.statPills.map((pill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1.5 text-xs text-text-secondary shrink-0"
                  >
                    <IconComponent name={pill.icon} className="w-3.5 h-3.5" />
                    {pill.label}
                  </div>
                ))}
              </div>
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right - Info */}
          <div className="space-y-5 min-w-0">
            <div className="hidden md:inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1.5">
              <span className="text-xs font-medium text-text-primary">{data.angle}</span>
            </div>

            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-text-primary leading-tight tracking-[-0.02em] text-center md:text-left">
              {data.h1}
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed text-center md:text-left">{data.subheadline}</p>

            <p className="text-sm text-text-secondary flex items-center gap-1.5 justify-center md:justify-start">
              <Clock className="w-4 h-4" />
              {data.urgencyText}
            </p>

            {/* Rating Breakdown */}
            <RatingBreakdown
              rating={data.rating}
              totalCount={data.reviewCount}
              breakdown={data.ratingBreakdown}
            />

            {/* Trust Bar */}
            <div className="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Price pill */}
              <div className="bg-subtle rounded-full px-2.5 py-1 shrink-0">
                <span className="text-[11px] text-text-secondary">
                  <span className="font-bold text-text-primary">${data.priceFrom.toLocaleString()} MXN</span>
                </span>
              </div>

              {/* Trust circles */}
              <div className="flex items-center -space-x-1.5 shrink-0">
                {[
                  { label: "E", title: "Envío Gratis" },
                  { label: "P", title: "Pago Contra Entrega" },
                  { label: "G", title: "Garantía 30 Días" },
                  { label: "S", title: "Soporte Real" },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    title={badge.title}
                    className="w-6 h-6 rounded-full bg-brand text-white text-[9px] font-bold flex items-center justify-center border-2 border-white ring-1 ring-border"
                  >
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="space-y-3">
              {data.offers.map((offer, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOffer(i)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition-all relative ${
                    selectedOffer === i
                      ? "border-brand bg-accent/10 shadow-sm"
                      : "border-border bg-white hover:border-brand/40"
                  }`}
                >
                  {offer.badge && (
                    <span className="absolute top-2 right-2 bg-accent text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {offer.badge}
                    </span>
                  )}
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <div className="flex items-start gap-2">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selectedOffer === i
                          ? 'border-brand bg-brand'
                          : 'border-border bg-white'
                      }`}>
                        {selectedOffer === i && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">{offer.label}</p>
                        <p className={`text-xs font-semibold mt-0.5 ${offer.savings ? 'text-brand' : 'invisible'}`}>
                          {offer.savings ? `Ahorras $${offer.savings} MXN` : 'Ahorras'}
                        </p>
                      </div>
                    </div>
                    <p className="font-heading font-bold text-xl text-text-primary pt-1">
                      ${offer.price} MXN
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Trust Pills */}
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-4">
                {[
                  { icon: Truck, label: "Envío Gratis" },
                  { icon: Phone, label: "Pago Contra Entrega" },
                  { icon: CheckCircle, label: "Garantía 30 Días" },
                ].map((pill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-2 text-sm shrink-0"
                  >
                    <pill.icon className="w-4 h-4 text-brand" />
                    <span className="font-semibold text-text-primary">{pill.label}</span>
                  </div>
                ))}
              </div>
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-brand text-white font-bold text-base rounded-lg h-14 hover:bg-brand-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Ordenar ahora
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-sm text-text-secondary text-center">
              Pago Contra Entrega · Sin tarjeta de crédito
            </p>
            <p className="text-xs text-text-secondary text-center">
              Te llamamos para confirmar tu pedido antes de enviarlo.
            </p>

            <div className="bg-background border border-border rounded-xl p-4 text-sm text-text-secondary">
              <p className="font-bold text-text-primary mb-1">Tu tranquilidad primero:</p>
              30 días para probarlo. Si no sientes la diferencia, te devolvemos cada peso. Sin preguntas, sin burocracia.
            </div>
          </div>
        </div>
      </section>

      {data.problemSolution && (
        <section className="py-10 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            {data.problemStat && (
              <div className="bg-white rounded-xl border border-border p-6 text-center mb-6 md:mb-16">
                <p className="text-2xl md:text-4xl font-heading font-bold text-text-primary">
                  {data.problemStat.number}
                </p>
                <p className="mt-2 text-text-secondary max-w-2xl mx-auto">{data.problemStat.text}</p>
                <p className="mt-2 text-xs text-text-secondary">{data.problemStat.source}</p>
              </div>
            )}

            <div className="text-center mb-6 md:mb-12">
              <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
                ENTENDEMOS LO QUE SIENTES
              </p>
              <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
                {data.name} no tapa el problema. Lo elimina.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
              <div className="order-2 md:order-1 space-y-4 md:space-y-6 min-w-0">
                {data.problemSolution.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-border p-5 space-y-4">
                    {/* Problem */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                        <X className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-1">El problema</p>
                        <p className="italic text-text-secondary text-sm leading-relaxed">"{item.problem}"</p>
                      </div>
                    </div>

                    {/* Arrow divider */}
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-border" />
                      <ArrowRight className="w-4 h-4 text-brand flex-shrink-0" />
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Solution */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-brand" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-brand uppercase tracking-wider mb-1">La solución</p>
                        <p className="font-bold text-text-primary text-sm">{item.solution.title}</p>
                        <p className="text-sm text-text-secondary mt-1 leading-relaxed">{item.solution.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.problemImage && (
                <div className="order-1 md:order-2 relative aspect-[5/6] bg-subtle rounded-2xl overflow-hidden">
                  <Image
                    src={data.problemImage || ""}
                    alt="Solución"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: Deep-Dive Features */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              POR QUÉ FUNCIONA
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Tres detalles que transforman tu experiencia diaria.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            <div className="min-w-0">
              <div className="relative aspect-square w-full bg-subtle rounded-2xl overflow-hidden mb-6">
                <Image src={data.featureImage} alt={data.name} fill className="object-cover" unoptimized />
              </div>
              <div className="relative">
                <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-4">
                  {data.exclusions.map((ex, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-background border border-border rounded-full px-3 py-1 text-xs text-text-secondary shrink-0"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {ex}
                    </span>
                  ))}
                </div>
                <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="min-w-0">
              <div ref={featuresRef} className="flex md:block gap-4 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:space-y-6">
                {data.features.map((feat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-border rounded-xl p-5 md:p-6 space-y-3 w-[80vw] md:w-auto max-w-[80vw] md:max-w-none shrink-0 snap-center"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-base md:text-lg font-bold text-text-primary">
                        {feat.name}
                      </h3>
                      <IconComponent name={feat.icon} className="w-6 h-6 text-brand" />
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{feat.desc}</p>
                    <div className="bg-subtle rounded-lg p-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand flex-shrink-0" />
                      <p className="text-sm font-semibold text-text-primary">
                        Resultado: {feat.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <DotIndicator count={data.features.length} activeIndex={featuresIndex} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Trust & Authority */}
      <section className="py-10 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              CONFIANZA QUE SE GANA
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Solo vendemos lo que nosotros usaríamos. Y lo probamos primero.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12">
            {data.trustStats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-4 md:p-6 text-center min-w-0">
                <p className="text-2xl md:text-3xl font-heading font-bold text-text-primary">{stat.number}</p>
                <p className="text-sm text-text-secondary mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand rounded-2xl p-5 md:p-12 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                Equipo Vazlina
              </span>
            </div>
            <Quote className="w-12 h-12 text-white/20 mb-4" />
            <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6">{data.expertQuote.text}</p>
            <p className="text-sm text-white/80">{data.expertQuote.author}</p>
          </div>
        </div>
      </section>

      {/* SECTION 7: Timeline */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <span className="inline-block bg-white border border-border rounded-full px-3 py-1 text-xs text-text-secondary mb-4">
              Tu transformación empieza desde el primer día
            </span>
          </div>
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              TU NUEVA RUTINA
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Cada semana te sientes mejor
            </h2>
            <p className="mt-4 text-lg text-text-secondary">La diferencia se siente, no solo se ve.</p>
          </div>

          <div ref={timelineRef} className="relative flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-2 md:mb-12">
            {/* Connecting line - visible on desktop only */}
            <div className="hidden md:block absolute top-[3rem] left-[16.66%] right-[16.66%] h-px bg-border" />
            {data.timeline.map((step, i) => (
              <div key={i} className="bg-background rounded-2xl p-4 md:p-8 text-center relative w-[75vw] max-w-[75vw] md:w-auto md:max-w-none shrink-0 snap-center">
                <div className="mx-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand text-white flex items-center justify-center font-heading font-bold md:text-lg mb-3 md:mb-5 ring-4 ring-white relative z-10">
                  {i + 1}
                </div>
                <p className="text-sm font-bold text-accent uppercase tracking-wider mb-2">
                  {step.week}
                </p>
                <h3 className="font-heading text-lg md:text-xl font-bold text-text-primary mb-3 break-words">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed break-words">{step.desc}</p>
              </div>
            ))}
          </div>

          <DotIndicator count={data.timeline.length} activeIndex={timelineIndex} />

          <div className="bg-white border border-border rounded-xl p-6 flex items-center justify-between">
            <p className="text-text-primary flex-1">{data.timelineSummary}</p>
            <div className="w-10 h-10 rounded-full bg-subtle flex items-center justify-center flex-shrink-0 ml-4">
              <CheckCircle className="w-5 h-5 text-brand" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Reviews */}
      <section className="py-10 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              PERSONAS REALES, CAMBIOS REALES
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Más de {data.reviewCount.toLocaleString("es-MX")} mexicanos ya sintieron la diferencia.
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Esto es lo que dicen quienes ya lo viven.
            </p>
          </div>

          <div ref={reviewsRef} className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 md:p-7 border border-border w-[75vw] md:w-auto max-w-[75vw] md:max-w-none shrink-0 snap-center">
                <div className="flex items-center justify-between mb-3">
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                  <span className="text-accent text-xs md:text-sm">★★★★★</span>
                </div>
                <p className="text-text-primary text-sm md:text-base leading-relaxed mb-4">"{review.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {review.image ? (
                    <img src={review.image} alt={review.name} loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {review.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-sm text-text-primary">{review.name}</p>
                      <BadgeCheck className="w-4 h-4 text-brand fill-brand/20" />
                      <span className="text-[11px] text-text-secondary">Verified</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      {review.age} años · {review.city} · Comprador verificado
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DotIndicator count={data.reviews.length} activeIndex={reviewsIndex} />
        </div>
      </section>

      {/* Mid-page CTA strip */}
      <section className="bg-brand py-5 md:hidden">
        <div className="px-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm">¿Ya decidiste?</p>
            <p className="text-white/80 text-xs">Sin pago por adelantado</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-white text-brand font-bold text-sm px-4 py-2.5 rounded-full shrink-0 active:scale-95 transition-all"
          >
            Ordenar ahora
          </button>
        </div>
      </section>

      {/* SECTION 9: Comparison */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              LA VERDAD SOBRE LAS ALTERNATIVAS
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Lo que ya probaste, y por qué no te hizo sentir mejor.
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Cada alternativa tiene un costo escondido. Aquí te lo mostramos.
            </p>
          </div>

          <div ref={comparisonsRef} className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-2 md:mb-8 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.comparisons.map((comp, i) => (
              <div
                key={i}
                className="bg-white border border-border rounded-2xl p-4 md:p-6 hover:-translate-y-1 hover:shadow-md transition-all w-[75vw] sm:w-auto max-w-[75vw] sm:max-w-none shrink-0 snap-center"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-base md:text-lg font-bold text-text-primary pr-2 break-words">
                    {comp.name}
                  </h3>
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-4">{comp.priceRange}</p>
                <ul className="space-y-2">
                  {comp.problems.map((prob, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                      <X className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <DotIndicator count={data.comparisons.length} activeIndex={comparisonsIndex} />

          <div className="bg-brand rounded-2xl p-4 md:p-6">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {["Probado en México ✓", "Resultado real ✓", "Garantía 30 días ✓", "Ahorro real ✓"].map(
                (pill, i) => (
                  <span
                    key={i}
                    className="bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-full text-center"
                  >
                    {pill}
                  </span>
                )
              )}
            </div>
            <Link
              href="#"
              className="text-white font-bold flex items-center justify-center gap-2 py-2 hover:gap-3 transition-all"
            >
              Elige Vazlina <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: Guarantee */}
      <section className="py-10 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-border p-6 md:p-12 text-center">
            <span className="inline-block bg-background border border-border rounded-full px-4 py-1.5 text-xs font-semibold text-text-primary mb-6">
              Cero riesgo para ti
            </span>
            <h2 className="font-heading text-xl md:text-4xl font-bold text-text-primary mb-3">
              30 días para sentir la diferencia, o te regresamos tu dinero.
            </h2>
            <p className="text-sm md:text-lg text-text-secondary mb-6 md:mb-12 max-w-2xl mx-auto">
              Pruébalo. Si no sientes que mejora tu día, te devolvemos cada peso. Sin preguntas, sin burocracia.
            </p>

            <div ref={guaranteeRef} className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {data.guarantee.steps.map((step, i) => (
                <div key={i} className="bg-background rounded-xl border border-border p-5 md:p-6 w-[75vw] md:w-auto max-w-[75vw] md:max-w-none shrink-0 snap-center">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-text-primary text-left">{step.title}</p>
                      <p className="text-sm text-text-secondary text-left mt-1 break-words">{step.desc}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                      <IconComponent name={step.icon} className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <DotIndicator count={data.guarantee.steps.length} activeIndex={guaranteeIndex} />
          </div>
        </div>
      </section>

      {/* SECTION 11: Simplicity */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              SIN COMPLICACIONES
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Tan fácil que no necesitas manual.
            </h2>
          </div>

          <div ref={simplicityRef} className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-12 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.simplicity.map((item, i) => (
              <div key={i} className="text-center w-[70vw] sm:w-auto max-w-[70vw] sm:max-w-none shrink-0 snap-center bg-background border border-border rounded-2xl p-5 md:p-0 md:bg-transparent md:border-none">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white md:bg-background border border-border flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <IconComponent name={item.icon} className="w-7 h-7 md:w-8 md:h-8 text-brand" />
                </div>
                <h3 className="font-heading text-base md:text-lg font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
          <DotIndicator count={data.simplicity.length} activeIndex={simplicityIndex} />

          <div className="flex flex-wrap justify-center gap-8 text-center">
            {data.simplicityStats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-heading font-bold text-text-primary">{stat.number}</p>
                <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: COD Process */}
      <section className="py-10 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              LLEGA A TI EN 3 PASOS
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Sin pagar antes. Sin compromiso. Sin preocupaciones.
            </h2>
          </div>

          <div ref={codRef} className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 mb-2 md:mb-12 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.codSteps.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 md:p-8 relative w-[75vw] md:w-auto max-w-[75vw] md:max-w-none shrink-0 snap-center">
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-heading font-bold ring-4 ring-background">
                  {step.num}
                </div>
                <IconComponent name={step.icon} className="w-12 h-12 text-brand mb-4" />
                <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <DotIndicator count={data.codSteps.length} activeIndex={codIndex} />

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {data.cities.map((city, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 bg-background border border-border rounded-full px-3 py-1 text-xs font-semibold text-text-primary"
                >
                  <CheckCircle className="w-3 h-3 text-brand" />
                  {city}
                </span>
              ))}
            </div>
            <p className="text-xs text-text-secondary text-center">
              Enviamos vía: DHL · FedEx · Estafeta · RedPack · Correos de México
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQ */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              RESOLVEMOS TUS DUDAS
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Todo lo que necesitas saber antes de decidir
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary">
              Respuestas honestas sobre {data.name}.
            </p>
          </div>

          <div className="space-y-1">
            {data.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border-b border-border last:border-b-0">
                  {i === 0 || faq.category !== data.faqs[i - 1]?.category ? (
                    <p className="text-sm font-bold text-text-secondary uppercase tracking-wider mt-8 mb-4">
                      {faq.category}
                    </p>
                  ) : null}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <CheckCircle className="w-4 h-4 text-text-secondary flex-shrink-0" />
                      <span className="font-bold text-base text-text-primary">{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-text-secondary flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-text-secondary leading-relaxed ml-7">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 14: Cross-Sell */}
      <section className="py-10 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              COMPLETA TU EXPERIENCIA
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Descubre más formas de sentirte mejor
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary">
              Cada producto resuelve algo diferente. Juntos, transforman tu día.
            </p>
          </div>

          <div ref={crossSellRef} className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.crossSell.map((product, i) => (
              <div
                key={i}
                className="group bg-white border border-border rounded-2xl p-4 md:p-6 hover:-translate-y-1 hover:shadow-md transition-all w-[75vw] md:w-auto max-w-[75vw] md:max-w-none shrink-0 snap-center"
              >
                <div className="mb-3">
                  <span className="inline-flex items-center bg-white border border-border rounded-full px-3 py-1 text-xs font-medium text-text-primary">
                    {product.angle}
                  </span>
                </div>
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative aspect-[4/3] w-full bg-subtle rounded-xl overflow-hidden mb-5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </Link>

                <h3 className="font-heading text-lg md:text-xl font-bold text-text-primary break-words">{product.name}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{product.desc}</p>

                <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
                  <span className="text-accent">★★★★★</span>
                  <span>{product.reviews}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-heading font-bold text-lg text-text-primary">
                    Desde ${product.price} MXN
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary hover:bg-brand hover:text-white hover:border-brand transition-all group/arrow"
                  >
                    <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <DotIndicator count={data.crossSell.length} activeIndex={crossSellIndex} />
        </div>
      </section>
    </>
  );
}
