"use client";

import Image from "next/image";
import Link from "next/link";
import HomeFaq from "@/components/HomeFaq";
import StickyTrustBar from "@/components/StickyTrustBar";
import { useRef, useState, useEffect } from "react";
import {
  Shield,
  CheckCircle,
  Truck,
  RefreshCw,
  Search,
  FileText,
  ShieldCheck,
  Headphones,
  Quote,
  ArrowRight,
  Star,
  ImageIcon,
  BadgeCheck,
} from "lucide-react";
import RatingBreakdown from "@/components/RatingBreakdown";

/* ═══════════════ SECTION 2: PRODUCT CARDS DATA ═══════════════ */
const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const PRODUCT_CARDS = [
  {
    slug: "vazlina-brisa",
    angle: "Confort Portátil · Vazlina Flow",
    headline: "El calor ya no decide cómo te sientes",
    desc: "El metro en verano. El cuarto sin aire. El calor que arruina tu ánimo. Brisa es la brisa que siempre necesitabas: silenciosa, ligera, y que te sigue a donde vayas.",
    reviews: "(2,847 personas ya llegan frescas)",
    price: 1199,
    image: "/images/products/brisa-hero.jpg",
    cta: "Encuentra tu alivio",
  },
  {
    slug: "vazlina-guardian",
    angle: "Protección Inteligente · Vazlina Guard",
    headline: "Duerme tranquilo. Tu familia está protegida.",
    desc: "A las 3am tocas tu celular: caliente. Tu estómago se hace nudo. Guardián rompe el circuito al 100% automáticamente. Tú duermes. Tu batería descansa. Tu familia está segura.",
    reviews: "(1,247 familias ya duermen en paz)",
    price: 1249,
    image: "/images/products/guardian-hero.jpg",
    cta: "Protege tu familia",
  },
  {
    slug: "vazlina-mariposa",
    angle: "Estilo Inalámbrico · Vazlina Wings",
    headline: "El accesorio que cambia cómo te sientes y cómo te ven",
    desc: "No entran a tu oído: se posan como joyería. Alas de cristal desmontables para cuando quieres brillar. Un clip minimalista para cuando quieres pasar desapercibida. Tú eliges.",
    reviews: "(4,128 personas ya recibieron cumplidos)",
    price: 1299,
    image: "/images/products/mariposa-hero.jpg",
    cta: "Descubre tu versión",
  },
];

/* ═══════════════ SECTION 3: BRAND PILLARS DATA ═══════════════ */
const PILLARS = [
  {
    icon: Search,
    title: "Solo vendemos lo que usamos",
    desc: "Probamos 18 protectores para elegir a Guardián. 15 audífonos para elegir a Mariposa. Si no lo usamos en nuestra casa, no llega a la tuya.",
  },
  {
    icon: FileText,
    title: "Tu tranquilidad primero",
    desc: "30 días no es una política. Es una promesa. Si no sientes que duermes mejor, llegas más fresco, o te ves más segura, te devolvemos cada peso. Sin preguntas.",
  },
  {
    icon: ShieldCheck,
    title: "Pago cuando lo tienes en tus manos",
    desc: "No pedimos tarjeta. No pedimos depósito. Pagas al mensajero cuando el paquete ya está en tus manos. Cero riesgo. Máxima confianza.",
  },
  {
    icon: Headphones,
    title: "Somos reales, estamos aquí",
    desc: "Números locales de Costa Rica. Confirmación por teléfono. Respuesta rápida por correo. No somos una empresa fantasma. Somos gente real que usa lo mismo que tú.",
  },
];

/* ═══════════════ SECTION 4: TESTIMONIALS DATA ═══════════════ */
const TESTIMONIALS = [
  {
    quote:
      "El metro Línea 3 en julio era literalmente un infierno. Llegaba al trabajo con la blusa pegada, irritada, sin ganas de nada. Ahora lo clip al cuello, giro el aire hacia mi cara y llego fresca como si nada. Mis compañeras me preguntaron qué hice diferente. Pagué al recibir. Ni un peso de riesgo.",
    name: "María González",
    detail: "32 años · San José · Brisa",
    image: "/images/products/review-maria.jpg",
  },
  {
    quote:
      "Llevaba 3 horas en la universidad y mis audífonos viejos me dolían tanto que tenía que quitarme uno. Con Mariposa? Olvidé que los traía puestos. Y en el café una chica me dijo '¿Qué traes en las orejas? Se ven divinos.' Ese cumplido... no tiene precio.",
    name: "Ana Morales",
    detail: "24 años · Alajuela · Mariposa",
    image: "/images/products/review-ana.jpg",
  },
  {
    quote:
      "Mi iPhone 15 tenía 6 meses y la batería ya estaba al 89%. Con Guardián noté la diferencia en SEMANAS. Mi iPhone ya no amanece caliente. El LED azul a las 3am es la prueba de que la desconexión física SÍ funciona. No es marketing. Es real.",
    name: "Roberto Méndez",
    detail: "28 años · Cartago · Guardián",
    image: "/images/products/review-roberto.jpg",
  },
  {
    quote:
      "Mi bebé sudaba y lloraba en la carriola y yo moría de culpa. Los ventiladores con aspas me daban pánico. Brisa no tiene aspas. Lo clip a la carriola, apunto el aire hacia él y duerme tranquilo. Yo por fin puedo caminar con las manos libres y sin miedo. Valió cada peso.",
    name: "Laura Hernández",
    detail: "29 años · Heredia · Brisa",
    image: "/images/products/review-laura.jpg",
  },
  {
    quote:
      "No sabía qué regalarle a mi novia. Cuando abrió Mariposa, se quedó en silencio. Después se los puso y corrió al espejo. 'Parece que me puse joyería y música al mismo tiempo,' me dijo. Ahora no se los quita ni para dormir. Me dijo que es el mejor regalo que le han dado en años.",
    name: "Carlos Ramírez",
    detail: "28 años · Liberia · Mariposa",
    image: "/images/products/review-carlos.jpg",
  },
  {
    quote:
      "A las 2am me despertaba para revisar los cuartos de mis hijos. Imaginate: 35 años, dos adolescentes, y yo vigilando cargadores como si fuera guardia de seguridad. Guardián me devolvió el sueño. Literalmente. Ahora duermo 8 horas y mi ansiedad de mamá bajó un 90%.",
    name: "Carmen Flores",
    detail: "35 años · San José · Guardián",
    image: "/images/products/review-carmen.jpg",
  },
];

/* ═══════════════ SECTION 5: HOW IT WORKS DATA ═══════════════ */
const STEPS = [
  {
    num: "01",
    title: "Elige qué quieres sentir",
    desc: "¿Frescura que te sigue? ¿Paz mental toda la noche? ¿Confianza que se nota? Elige el producto que resuelve lo que te quita energía. Sin pagar todavía.",
  },
  {
    num: "02",
    title: "Confirma sin compromiso",
    desc: "Solo tu nombre, teléfono y dirección. Sin tarjeta, sin depósito, sin riesgo. Te llamamos para confirmar tu pedido.",
  },
  {
    num: "03",
    title: "Recibe. Siente. Decide.",
    desc: "Llega en 3-5 días. Pagas al mensajero cuando ya lo tienes en tus manos. Y si no sientes que tu día mejoró, te devolvemos todo. Sin preguntas.",
  },
];

/* ═══════════════ CAROUSEL HELPERS ═══════════════ */
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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.vazlina.shop";

/* ═══════════════ PAGE ═══════════════ */
export default function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let source = params.get("utm_source") || "";
    if (!source) {
      const ref = document.referrer;
      if (!ref) source = "direct";
      else if (ref.includes("facebook.com") || ref.includes("fb.com") || ref.includes("fb.me")) source = "facebook";
      else if (ref.includes("tiktok.com")) source = "tiktok";
      else if (ref.includes("instagram.com")) source = "instagram";
      else if (ref.includes("google.com")) source = "google";
      else if (ref.includes("youtube.com")) source = "youtube";
      else source = "other";
    }
    fetch(`${API_URL}/track/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source }),
    }).catch(() => {});
  }, []);

  const productsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const productsIndex = useActiveIndex(productsRef, PRODUCT_CARDS.length);
  const testimonialsIndex = useActiveIndex(testimonialsRef, TESTIMONIALS.length);
  const stepsIndex = useActiveIndex(stepsRef, STEPS.length);
  const pillarsIndex = useActiveIndex(pillarsRef, PILLARS.length);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-6 md:pt-16 md:pb-20">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Left - Product Visual */}
            <div className="relative">
              <div className="relative aspect-[3/4] md:aspect-[4/3] bg-gradient-to-b from-background to-subtle rounded-2xl overflow-hidden shadow-lg flex items-center justify-center border border-border">
                <Image
                  src="/images/home/hero.jpg"
                  alt="Vazlina - Tecnología curada para Costa Rica"
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1.5 shadow-md flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand" />
                <span className="text-[11px] md:text-[13px] font-bold text-text-primary">
                  30 días sin riesgo
                </span>
              </div>
            </div>

            {/* Right - Text & Actions */}
            <div className="space-y-3 md:space-y-6 min-w-0">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-text-secondary" />
                <span className="text-[13px] font-medium text-text-primary">
                  Soluciones reales · Probadas en Costa Rica
                </span>
              </div>

              <h1 className="font-heading text-2xl md:text-5xl font-bold leading-[1.1] text-text-primary tracking-[-0.02em]">
                Productos que pasan de "funciona" a "no puedo vivir sin esto"
              </h1>

              <p className="text-sm md:text-lg text-text-secondary leading-relaxed max-w-[500px]">
                ¿Por qué seguimos usando productos que nos hacen sentir peor? Probamos docenas en Costa Rica. Solo los que mejoran tu día pasan. Envío gratis. Pago al recibir. Y si no sientes el cambio, te devolvemos cada peso.
              </p>

              {/* Rating Breakdown */}
              <RatingBreakdown
                rating={4.9}
                totalCount={6400}
                breakdown={[
                  { stars: 5, count: 5759 },
                  { stars: 4, count: 641 },
                  { stars: 3, count: 0 },
                  { stars: 2, count: 0 },
                  { stars: 1, count: 0 },
                ]}
              />

              {/* Trust Badge Row */}
              <div className="relative">
                <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-4">
                  {[
                    { icon: Shield, label: "Envío Gratis", sub: "A todo Costa Rica" },
                    { icon: HandCoinsIcon, label: "Pago Contra Entrega", sub: "Sin tarjeta" },
                    { icon: Truck, label: "Entrega 3-5 Días", sub: "Rastreo incluido" },
                    { icon: RefreshCw, label: "Garantía 30 Días", sub: "Devolución sin drama" },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className="bg-white border border-border rounded-full px-2.5 py-1.5 md:px-3 md:py-2 text-center min-w-[90px] md:min-w-[110px] shrink-0"
                    >
                      <badge.icon className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-0.5 text-text-primary" />
                      <p className="text-[11px] md:text-[13px] font-bold text-text-primary">{badge.label}</p>
                      <p className="hidden md:block text-[11px] text-text-secondary">{badge.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-1 md:pt-2">
                <Link
                  href="#nuestra-coleccion"
                  className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-sm md:text-base rounded-full h-11 md:h-[56px] px-6 md:px-10 hover:bg-brand-dark transition-all group/btn"
                >
                  Encuentra tu solución
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <div className="inline-flex items-center justify-center gap-2 bg-white border border-border text-text-primary font-medium text-sm md:text-base rounded-full h-11 md:h-[56px] px-5 md:px-8 hover:bg-background transition-colors">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-brand" />
                  30 días sin riesgo
                </div>
              </div>

              {/* Social Proof Bar */}
              <div className="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-center gap-1.5 bg-subtle rounded-full px-2.5 py-1 shrink-0">
                  <span className="font-heading font-bold text-text-primary text-sm">4.8</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <span className="text-[11px] text-text-secondary">
                    <span className="font-bold text-text-primary">+6,400</span> reseñas
                  </span>
                </div>
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
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: PRODUCT SHOWCASE
          ═══════════════════════════════════════════════════════════ */}
      <section id="nuestra-coleccion" className="py-10 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              TU NUEVA RUTINA
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Tres problemas que te roban paz. Una marca que los resuelve.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
              No vendemos tecnología. Vendemos madrugadas sin miedo, días sin calor, y salidas donde te sientes tú.
            </p>
          </div>

          <div
            ref={productsRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-2 md:mb-0 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PRODUCT_CARDS.map((p) => (
              <div
                key={p.slug}
                className="group bg-white border border-border rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-[80vw] md:w-auto max-w-[80vw] md:max-w-none shrink-0 snap-center"
              >
                <Link href={`/products/${p.slug}`} className="block">
                  <div className="relative aspect-[4/3] bg-subtle rounded-xl overflow-hidden mb-3">
                    <Image
                      src={p.image}
                      alt={p.headline}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  {/* Angle tag */}
                  <div className="flex justify-center mb-5">
                    <span className="inline-flex items-center bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-[11px] font-semibold text-text-primary tracking-wide">
                      {p.angle}
                    </span>
                  </div>
                </Link>

                <h3 className="font-heading text-xl font-bold text-text-primary">
                  {p.headline}
                </h3>
                <p className="mt-2 text-[15px] text-text-secondary leading-relaxed">
                  {p.desc}
                </p>

                <div className="mt-3 flex items-center gap-2 text-[13px] text-text-secondary">
                  <span className="text-accent">★★★★★</span>
                  <span>{p.reviews}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-heading font-bold text-lg text-text-primary">
                    Desde ₡{(p.price * 28).toLocaleString("es-CR")} CRC
                  </p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary hover:bg-brand hover:text-white hover:border-brand transition-all group/arrow"
                  >
                    <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <DotIndicator count={PRODUCT_CARDS.length} activeIndex={productsIndex} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: BRAND PILLARS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-24 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              CONFIANZA QUE SE SIENTE
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              No somos una tienda más. Somos la que usamos nosotros.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
              Cuatro pilares que no negociamos: probamos todo en Costa Rica, no pedimos dinero antes, y si algo falla, hablas con una persona real.
            </p>
          </div>

          <div
            ref={pillarsRef}
            className="flex md:grid md:grid-cols-2 gap-4 md:gap-10 mb-2 md:mb-0 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden]"
          >
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl border border-border p-5 text-center w-[80vw] md:w-auto max-w-[80vw] md:max-w-none shrink-0 snap-center"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-light border border-brand/10 flex items-center justify-center mx-auto mb-3">
                  <pillar.icon
                    className="w-6 h-6 text-brand"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-heading text-base font-bold text-text-primary mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
          <DotIndicator count={PILLARS.length} activeIndex={pillarsIndex} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: VERIFIED REVIEWS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              ELLOS YA LO SINTIERON. TÚ ERES EL SIGUIENTE.
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Más de 6,400 costarricenses ya sintieron la diferencia
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
              No es lo que prometemos. Es lo que sienten.
            </p>
          </div>

          <div
            ref={testimonialsRef}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 mb-2 md:mb-0 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-background rounded-2xl p-4 md:p-7 shadow-sm border border-border w-[75vw] md:w-auto max-w-[75vw] md:max-w-none shrink-0 snap-center"
              >
                <div className="flex items-center justify-between mb-3">
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                  <span className="text-accent text-xs md:text-sm">
                    ★★★★★
                  </span>
                </div>
                <p className="text-text-primary text-sm md:text-base leading-relaxed mb-4">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {t.image ? (
                    <img src={t.image} alt={t.name} loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-[15px] text-text-primary">
                        {t.name}
                      </p>
                      <BadgeCheck className="w-4 h-4 text-brand fill-brand/20" />
                      <span className="text-[11px] text-text-secondary">Verified</span>
                    </div>
                    <p className="text-[13px] text-text-secondary">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DotIndicator count={TESTIMONIALS.length} activeIndex={testimonialsIndex} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: HOW IT WORKS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              ZERO RIESGO. MÁXIMA TRANSFORMACIÓN.
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              De tu curiosidad a tu transformación en 3 pasos
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
              No pagas antes. No te arriesgas. Solo eliges sentirte mejor.
            </p>
          </div>

          <div
            ref={stepsRef}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 mb-2 md:mb-0 relative overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[28px] left-[16.66%] right-[16.66%] h-px bg-border" />

            {STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-[20px] p-5 md:p-8 shadow-sm border border-border text-center relative w-[75vw] md:w-auto max-w-[75vw] md:max-w-none shrink-0 snap-center"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-heading font-bold text-lg mb-5 ring-4 ring-background">
                  {step.num}
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <DotIndicator count={STEPS.length} activeIndex={stepsIndex} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: FINAL CTA BANNER
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand text-white py-10 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-4">
            EMPIEZA HOY
          </p>
          <h2 className="font-heading text-2xl md:text-5xl font-bold leading-tight tracking-[-0.02em]">
            Cada día que esperas es un día que sigues conformándote
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-xl mx-auto">
            Pago al recibir. Envío gratis. 30 días para sentir que tu vida mejoró. El riesgo es nuestro. La transformación es tuya.
          </p>
          <div className="mt-10">
            <Link
              href="#nuestra-coleccion"
              className="inline-flex items-center justify-center gap-2 bg-accent text-brand font-bold text-base rounded-full h-[56px] px-10 hover:brightness-95 transition-all group/btn"
            >
              Encuentra tu solución
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> 30 días sin riesgo
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4" /> Envío Gratis
            </span>
            <span className="flex items-center gap-1.5">
              <HandCoinsIcon className="w-4 h-4" /> Pago al Recibir
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones className="w-4 h-4" /> Soporte Real
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: FAQ
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              RESPUESTAS HONESTAS. COMO UN AMIGO.
            </p>
            <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-[-0.02em]">
              Todo lo que te detiene. Y por qué no debería.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary">
              Sin vueltas. Sin sorpresas. Sin excusas para no sentirte mejor.
            </p>
          </div>
          <HomeFaq />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9: STICKY TRUST BAR (homepage only)
          ═══════════════════════════════════════════════════════════ */}
      <StickyTrustBar />
    </>
  );
}

/* Inline helper so we don't need an extra import */
function HandCoinsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 16 6 6" />
      <circle cx="16" cy="9" r="2.9" />
      <circle cx="6" cy="5" r="3" />
    </svg>
  );
}
