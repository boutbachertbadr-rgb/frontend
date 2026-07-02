import Image from "next/image";
import Link from "next/link";
import HomeFaq from "@/components/HomeFaq";
import StickyTrustBar from "@/components/StickyTrustBar";
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
} from "lucide-react";

/* ═══════════════ SECTION 2: PRODUCT CARDS DATA ═══════════════ */
const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const PRODUCT_CARDS = [
  {
    slug: "vazlina-brisa",
    angle: "Confort Portátil · Vazlina Flow",
    headline: "El calor ya no decide cómo te sientes",
    desc: "Frescura que te sigue a donde vayas. Llegas fresco al trabajo, tu bebé duerme cómodo, el metro deja de ser un infierno.",
    reviews: "(287 personas ya lo probaron)",
    price: 649,
    image: EMPTY_IMG,
    cta: "Encuentra tu alivio",
  },
  {
    slug: "vazlina-guardian",
    angle: "Protección Inteligente · Vazlina Guard",
    headline: "Duerme tranquilo. Tu familia está protegida.",
    desc: "Se desconecta solo cuando tu celular está lleno. Tú solo duerme. Protege tu inversión mientras descansas sin preocupaciones.",
    reviews: "(156 familias ya confían)",
    price: 502.99,
    image: EMPTY_IMG,
    cta: "Protege tu familia",
  },
  {
    slug: "vazlina-mariposa",
    angle: "Estilo Inalámbrico · Vazlina Wings",
    headline: "El accesorio que completa tu look",
    desc: "Elegante hoy. Minimalista mañana. Tú eliges quién eres. Música que suena bien y te hace ver mejor en cualquier momento.",
    reviews: "(412 personas ya se sienten mejor)",
    price: 630.99,
    image: EMPTY_IMG,
    cta: "Exprésate hoy",
  },
];

/* ═══════════════ SECTION 3: BRAND PILLARS DATA ═══════════════ */
const PILLARS = [
  {
    icon: Search,
    title: "Solo vendemos lo que usamos",
    desc: "Cada producto pasa por pruebas reales en México. Si nosotros no lo usaríamos todos los días, no te lo ofrecemos.",
  },
  {
    icon: FileText,
    title: "Tu tranquilidad primero",
    desc: "30 días para sentir la diferencia. Si no mejora tu día, te devolvemos cada peso. Sin preguntas, sin burocracia.",
  },
  {
    icon: ShieldCheck,
    title: "Pago cuando lo tienes en tus manos",
    desc: "No pagas hasta que el paquete llega a tu puerta. Sin tarjetas, sin depósitos, sin riesgos. Solo confianza.",
  },
  {
    icon: Headphones,
    title: "Somos reales, estamos aquí",
    desc: "Agentes locales que hablan tu idioma. Confirmamos por teléfono, respondemos por WhatsApp, y no desaparecemos después de la venta.",
  },
];

/* ═══════════════ SECTION 4: TESTIMONIALS DATA ═══════════════ */
const TESTIMONIALS = [
  {
    quote:
      "El metro de CDMX en verano era mi pesadilla. Llegaba sudada e irritada al trabajo. Con Vazlina llego fresca, tranquila y con energía. Lo pagué al recibir y valió cada peso.",
    name: "María González",
    detail: "32 años · Ciudad de México · Ya sintió la diferencia",
  },
  {
    quote:
      "Tengo dos hijos adolescentes que dejan sus celulares cargando toda la noche. Me daba pánico. Ahora tengo Guardián en cada cuarto y duermo tranquila sabiendo que están protegidos.",
    name: "Laura Hernández",
    detail: "35 años · CDMX · Familia protegida",
  },
  {
    quote:
      "Antes usaba audífonos genéricos que se veían feos. Mariposa cambió todo. Recibo cumplidos, la batería dura todo el día, y me siento elegante hasta en el gym.",
    name: "Ana Morales",
    detail: "24 años · Monterrey · Se siente mejor consigo misma",
  },
];

/* ═══════════════ SECTION 5: HOW IT WORKS DATA ═══════════════ */
const STEPS = [
  {
    num: "01",
    title: "Elige tu solución",
    desc: "Encuentra el producto que transformará tu día. Agrégalo al carrito sin pagar nada todavía.",
  },
  {
    num: "02",
    title: "Confirma sin compromiso",
    desc: "Solo tu nombre, teléfono y dirección. Sin tarjeta, sin depósito, sin riesgo. Te llamamos para confirmar.",
  },
  {
    num: "03",
    title: "Recibe y siente la diferencia",
    desc: "Llega en 3-5 días. Pagas al mensajero solo cuando lo tienes en tus manos. Y si no sientes el cambio, te regresamos tu dinero.",
  },
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — Product Visual */}
            <div className="relative">
              <div className="relative aspect-[4/3] bg-subtle rounded-[20px] overflow-hidden shadow-lg">
                <Image
                  src={EMPTY_IMG}
                  alt="Vazlina — Tecnología curada para México"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand" />
                <span className="text-[13px] font-bold text-text-primary">
                  30 días para sentir la diferencia · Sin riesgo
                </span>
              </div>
            </div>

            {/* Right — Text & Actions */}
            <div className="space-y-6">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-text-secondary" />
                <span className="text-[13px] font-medium text-text-primary">
                  Soluciones reales · Probadas en México
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl font-bold leading-[1.1] text-text-primary tracking-[-0.02em]">
                Productos que mejoran tu día a día. Sin complicaciones.
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed max-w-[500px]">
                Tres soluciones curadas para sentirte mejor: fresco, protegido y
                confiado. Envío gratis, pago al recibir, y 30 días para sentir la diferencia.
              </p>

              {/* Trust Badge Row */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, label: "Envío Gratis", sub: "A todo México" },
                  { icon: HandCoinsIcon, label: "Pago Contra Entrega", sub: "Sin tarjeta" },
                  { icon: Truck, label: "Entrega 3-5 Días", sub: "Rastreo incluido" },
                  { icon: RefreshCw, label: "Garantía 30 Días", sub: "Devolución sin drama" },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="bg-white border border-border rounded-[50px] px-4 py-2.5 text-center min-w-[130px]"
                  >
                    <badge.icon className="w-5 h-5 mx-auto mb-1 text-text-primary" />
                    <p className="text-[13px] font-bold text-text-primary">{badge.label}</p>
                    <p className="text-[11px] text-text-secondary">{badge.sub}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="#nuestra-coleccion"
                  className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-base rounded-full h-[56px] px-10 hover:bg-brand-dark transition-all group/btn"
                >
                  Encuentra tu solución
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <div className="inline-flex items-center justify-center gap-2 bg-white border border-border text-text-primary font-medium text-base rounded-full h-[56px] px-8 hover:bg-background transition-colors">
                  <Shield className="w-5 h-5 text-brand" />
                  30 días sin riesgo
                </div>
              </div>

              {/* Social Proof Bar */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-1">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-text-primary text-lg">4.8</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-accent fill-accent"
                      />
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-5 bg-border" />

                {/* Review count */}
                <p className="text-sm text-text-secondary">
                  <span className="font-bold text-text-primary">+1,500</span> mexicanos ya sintieron la diferencia
                </p>

                {/* Trust circles */}
                <div className="flex items-center -space-x-2">
                  {[
                    { label: "E", title: "Envío Gratis" },
                    { label: "P", title: "Pago Contra Entrega" },
                    { label: "G", title: "Garantía 30 Días" },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      title={badge.title}
                      className="w-7 h-7 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center border-2 border-white ring-1 ring-border"
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
      <section id="nuestra-coleccion" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              TU NUEVA RUTINA
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.02em]">
              Tres formas de sentirte mejor. Un solo estándar.
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Cada producto resuelve algo que te quita paz. Todos probados por nosotros primero.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CARDS.map((p) => (
              <div
                key={p.slug}
                className="group bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={`/products/${p.slug}`} className="block">
                  <div className="relative aspect-[4/3] bg-subtle rounded-xl overflow-hidden mb-5">
                    <Image
                      src={p.image}
                      alt={p.headline}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* Angle tag */}
                    <div className="absolute top-3 right-3 bg-white border border-border rounded-full px-3 py-1 text-[12px] font-medium text-text-primary">
                      {p.angle}
                    </div>
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
                    Desde ${p.price.toFixed(2)} MXN
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: BRAND PILLARS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              POR QUÉ NOSOTROS
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.02em]">
              Una marca que respalda cada palabra
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Cuatro pilares que no negociamos: calidad real, transparencia total,
              respaldo humano, y tu tranquilidad como prioridad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <pillar.icon
                    className="w-6 h-6 text-text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-text-secondary leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: VERIFIED REVIEWS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              PERSONAS REALES, CAMBIOS REALES
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.02em]">
              Más de 1,500 mexicanos ya sintieron la diferencia
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Esto es lo que dicen quienes ya transformaron su día con Vazlina.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-background rounded-2xl p-7 shadow-sm border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-accent" />
                  <span className="text-accent text-sm tracking-wider">
                    ★★★★★
                  </span>
                </div>
                <p className="text-text-primary leading-[1.7]">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[15px] text-text-primary">
                      {t.name}
                    </p>
                    <p className="text-[13px] text-text-secondary">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: HOW IT WORKS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              TU EXPERIENCIA
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.02em]">
              De tu decisión a tu puerta en 3 pasos
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Sin pagar antes. Sin compromiso. Sin preocupaciones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[28px] left-[16.66%] right-[16.66%] h-px bg-border" />

            {STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-[20px] p-8 shadow-sm border border-border text-center relative"
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: FINAL CTA BANNER
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-brand text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-4">
            EMPIEZA HOY
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em]">
            Tu bienestar merece algo mejor que probar y fallar
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Pago al recibir. Envío gratis. 30 días para sentir la diferencia.
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
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
              RESOLVEMOS TUS DUDAS
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.02em]">
              Todo lo que necesitas saber antes de decidir
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Respuestas honestas. Sin vueltas. Sin sorpresas.
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
