"use client";

import { useEffect, useRef, useState } from "react";
import { Flame, Zap, BatteryCharging, ShieldCheck, Star, ChevronDown, ChevronUp, Check, Truck, Phone, Timer, Smartphone } from "lucide-react";
import GuardCheckoutModal, { LPVariant } from "@/components/lp/GuardCheckoutModal";

const ACCENT = "#111111";
const ACCENT_D = "#C9CDD3";
const NIGHT = "#14161A";
const CARD = "#1E2126";
const IVORY = "#F5F2EC";
const SILVER = "#9AA5B1";
const INK = "#1C1F24";
const WA_BG = "#ECE5DD";
const WA_ACCENT = "#DCF8C6";

interface Bundle {
  id: string;
  name: string;
  shortName: string;
  price: number;
  oldPrice: number;
  save: string;
  note: string;
  best?: boolean;
}

const BUNDLES: Bundle[] = [
  { id: "1x", name: "1x Vazlina Guard", shortName: "1x Guard", price: 17700, oldPrice: 22665, save: "Ahorrás ₡4965", note: "Protege tu dispositivo principal" },
  { id: "2x", name: "2x Vazlina Guard", shortName: "2x Guard", price: 30750, oldPrice: 45329, save: "Ahorrás ₡14579", note: "Uno para ti, otro para tu pareja" },
  { id: "3x", name: "3x Vazlina Guard — Pack Familia", shortName: "3x Pack Familia", price: 40375, oldPrice: 67994, save: "Ahorrás ₡27619", note: "Protege toda la casa", best: true },
];

const FAQS = [
  { q: "¿Funciona con mi teléfono y mi cargador?", a: "Sí, con TODOS — incluso iPhone anteriores al 15. Si tu teléfono tiene puerto USB-C (Android y iPhone 15+), lo conectás directo. Si tu iPhone usa cable Lightning (14 o anterior), colocás Guard entre la cabeza del cargador y el cable — la protección es idéntica. También funciona con tablets y laptops." },
  { q: "¿Cómo corta la energía?", a: "Su chip interno monitorea el flujo eléctrico en tiempo real. Si detecta sobrecalentamiento, sobrecarga o cortocircuito, corta la energía en milisegundos — antes de que ocurra cualquier daño." },
  { q: "¿Tengo que configurarlo o instalar algo?", a: "No. Es plug & play: lo conectás entre tu cargador y tu cable, y listo. Empieza a proteger desde el primer segundo, sin apps ni configuración." },
  { q: "¿De verdad protege la batería de mi teléfono?", a: "Sí. Detiene automáticamente la carga al llegar al 100%, evitando la sobrecarga nocturna que degrada tu batería. Así tu teléfono mantiene su autonomía por años, no meses." },
  { q: "¿Cómo es el pago y el envío?", a: "Pagás únicamente cuando recibís el producto en tus manos (pago contra entrega). El envío es gratis a todo Costa Rica y tarda de 2 a 5 días hábiles." },
  { q: "¿Y si no me convence?", a: "Tenés 30 días de garantía total. Si no te da la tranquilidad que prometemos, te devolvemos cada colón. Sin preguntas." },
];

function useOfferTimer() {
  const [left, setLeft] = useState("--:--:--");
  useEffect(() => {
    const MIN_H = 3;
    const MAX_H = 14;
    const randomDuration = () => (MIN_H + Math.floor(Math.random() * (MAX_H - MIN_H + 1))) * 60 * 60 * 1000;
    let end = Number(localStorage.getItem("guard_offer_end_v2") ?? 0);
    if (!end || end <= Date.now()) {
      end = Date.now() + randomDuration();
      localStorage.setItem("guard_offer_end_v2", String(end));
    }
    const tick = () => {
      let diff = end - Date.now();
      if (diff <= 0) {
        end = Date.now() + randomDuration();
        localStorage.setItem("guard_offer_end_v2", String(end));
        diff = end - Date.now();
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setLeft(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return left;
}

function Img({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={`flex items-center justify-center text-xs text-gray-400 text-center px-4 ${className}`} style={{ backgroundColor: "#e8e2d8", aspectRatio: "1/1" }}>
        📸 {label}
      </div>
    );
  }
  return <img src={src} alt={label} className={className} style={{ aspectRatio: "1/1", objectFit: "cover" }} onError={() => setErr(true)} />;
}

export default function GuardPage() {
  const timer = useOfferTimer();
  const [bundle, setBundle] = useState<Bundle>(BUNDLES[0]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<LPVariant | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const offerInView = useRef(false);
  const offerRef = useRef<HTMLElement | null>(null);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  useEffect(() => {
    const offerObserver = new IntersectionObserver(
      ([entry]) => {
        offerInView.current = entry.isIntersecting;
        setShowSticky(window.scrollY > 550 && !entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (offerRef.current) offerObserver.observe(offerRef.current);

    const onScroll = () => setShowSticky(window.scrollY > 550 && !offerInView.current);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { offerObserver.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("lp-visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".lp-animate").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const openCheckout = (b: Bundle) => {
    setBundle(b);
    setSelectedVariant({
      name: b.name,
      price: b.price,
      items: [{ product_name: b.name, quantity: 1, price_per_item: b.price }],
    });
    setCheckoutOpen(true);
  };

  return (
    <div className="font-body">
      <style>{`
        html { scroll-behavior: smooth; }
        .lp-animate { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(.4,0,.2,1), transform 0.65s cubic-bezier(.4,0,.2,1); }
        .lp-animate.lp-visible { opacity: 1; transform: translateY(0); }
        .lp-delay-1 { transition-delay: 0.1s; }
        .lp-delay-2 { transition-delay: 0.2s; }
        .lp-delay-3 { transition-delay: 0.3s; }
        .bundle-card { border: 2px solid #E5E0D6; border-radius: 20px; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; background: #fff; cursor: pointer; }
        .bundle-card.active { border-color: ${ACCENT}; box-shadow: 0 0 0 4px rgba(17,17,17,0.08); }
        @keyframes pulse-red { 0%,100% { opacity: 1; } 50% { opacity: 0.75; } }
        .pulse { animation: pulse-red 2s ease-in-out infinite; }
        @keyframes cta-breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.5), 0 8px 30px rgba(255,255,255,0.25); }
          50% { transform: scale(1.04); box-shadow: 0 0 0 12px rgba(255,255,255,0), 0 8px 40px rgba(255,255,255,0.45); }
        }
        .cta-attention { animation: cta-breathe 1.8s ease-in-out infinite; will-change: transform, box-shadow; }
      `}</style>

      {/* ── TOP TIMER BAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 text-center" style={{ background: "#111111", borderBottom: "2px solid #FF6B35" }}>
        <p className="text-xs sm:text-sm font-extrabold tracking-wide flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2" style={{ color: "#F5F2EC" }}>
          <span className="pulse inline-flex items-center gap-1"><Timer size={15} /> LA OFERTA TERMINA EN <span className="tabular-nums" style={{ color: "#FF6B35" }}>{timer}</span></span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span className="inline"><s className="opacity-50 font-heading tracking-tight">Antes <span className="text-[11px] align-top">₡</span>22665</s> · <span style={{ color: "#FF6B35" }} className="font-heading tracking-tight">Hoy <span className="text-[11px] align-top">₡</span>17700</span></span>
        </p>
      </div>

      {/* ── STICKY BOTTOM CTA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 transition-all duration-300"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
          transform: showSticky ? "translateY(0)" : "translateY(120%)",
          opacity: showSticky ? 1 : 0,
          pointerEvents: showSticky ? "auto" : "none",
        }}
      >
        <a
          href="#oferta"
          className="w-full sm:max-w-sm sm:mx-auto block text-center py-4 rounded-2xl font-bold text-sm tracking-widest active:scale-95 transition-all shadow-xl cta-attention"
          style={{ backgroundColor: "#FFFFFF", color: "#111111" }}
        >
          ORDENAR AHORA
        </a>
      </div>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center pt-24 pb-16 text-center overflow-hidden" style={{ backgroundColor: NIGHT }}>
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,205,211,0.15) 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-lg mx-auto w-full px-5">
          <div className="lp-animate flex items-center justify-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#FFFFFF" }}>
              <span className="font-heading font-bold text-base leading-none" style={{ color: "#111111" }}>V</span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-heading font-bold text-lg text-white tracking-tight">VAZLINA</span>
              <span className="text-[10px] font-medium mt-0.5 tracking-widest uppercase" style={{ color: ACCENT_D }}>Tecnología curada</span>
            </div>
          </div>
          <div className="lp-animate inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: ACCENT_D, border: "1px solid #3A3E45" }}>
            VAZLINA GUARD™ · PROTECCIÓN INTELIGENTE
          </div>
          <h1 className="lp-animate lp-delay-1 text-4xl sm:text-5xl font-bold text-white leading-tight mb-5" style={{ letterSpacing: "-0.5px" }}>
            Un solo dispositivo protege <span style={{ color: ACCENT_D }}>a tu familia</span> y <span style={{ color: ACCENT_D }}>tu bolsillo</span>.
          </h1>
          <p className="lp-animate lp-delay-2 text-base text-gray-300 leading-relaxed mb-8">
            Vazlina Guard corta la energía antes de que un cargador sobrecalentado cause un desastre mientras todos duermen — y detiene la sobrecarga que <strong className="text-white">destruye tu batería noche tras noche</strong>, para que no cambies de teléfono antes de tiempo.
          </p>
          <a href="#oferta" className="lp-animate lp-delay-3 cta-attention inline-block px-10 py-4 rounded-2xl font-bold text-sm tracking-widest transition-all active:scale-95 hover:opacity-90" style={{ backgroundColor: "#FFFFFF", color: "#111111" }}>
            PROTEGER LO QUE MÁS IMPORTA — <span className="font-heading tracking-tight"><span className="text-[10px] align-top">₡</span>17700</span>
          </a>
          <div className="lp-animate lp-delay-3 mt-4 flex items-center justify-center gap-4 flex-wrap text-xs text-gray-400">
            <span>🚚 Envío gratis</span><span>💳 Pago al recibir</span><span>🛡️ Garantía 30 días</span><span>🏅 Calidad certificada</span>
          </div>
          <div className="lp-animate lp-delay-3 mt-6 mx-auto max-w-xs rounded-2xl overflow-hidden" style={{ backgroundColor: CARD, border: "1px solid #2A2E35" }}>
            <button onClick={() => setReviewsOpen(!reviewsOpen)} className="w-full flex items-center justify-center gap-2 px-5 py-3.5">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (<Star key={i} size={13} fill="#F5B301" style={{ color: "#F5B301" }} />))}
              </span>
              <span className="text-xs font-bold text-white">1,247 Reseñas</span>
              {reviewsOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            </button>
            {reviewsOpen && (
              <div className="px-5 pb-5 pt-4" style={{ borderTop: "1px solid #2A2E35" }}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star size={22} fill="#F5B301" style={{ color: "#F5B301" }} />
                  <span className="font-heading text-3xl font-bold text-white">4.8</span>
                </div>
                {[
                  { stars: 5, count: 1060 },
                  { stars: 4, count: 187 },
                  { stars: 3, count: 0 },
                  { stars: 2, count: 0 },
                  { stars: 1, count: 0 },
                ].map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-2 mb-1.5">
                    <div className="flex gap-0.5 w-16 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < stars ? "#F5B301" : "transparent"} style={{ color: i < stars ? "#F5B301" : "#3A3E45" }} />
                      ))}
                    </div>
                    <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "#2A2E35" }}>
                      <div className="h-full rounded-full" style={{ width: `${count > 0 ? Math.max((count / 1247) * 100, 3) : 0}%`, backgroundColor: SILVER }} />
                    </div>
                    <span className="text-[10px] text-gray-400 w-8 text-right tabular-nums">{count.toLocaleString("es-CR")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="lp-animate lp-delay-3 mt-8 overflow-hidden shadow-2xl w-full">
          <Img src="/lp-guard/hero.jpg" label="hero.jpg — collage lifestyle (mujer trabajando, pareja durmiendo)" className="w-full block" />
        </div>
      </section>

      {/* ── PROBLEMA / PELIGRO ── */}
      <section className="py-20 px-5" style={{ backgroundColor: NIGHT, borderTop: "1px solid #2A2E35" }}>
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-white text-center mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Dos riesgos silenciosos.<br /><span style={{ color: ACCENT_D }}>Un mismo culpable: tu cargador.</span>
          </h2>
          <p className="lp-animate lp-delay-1 text-center text-gray-400 text-sm leading-relaxed mb-10">
            Cada noche, tu cargador queda enchufado 8 horas seguidas. Eso tiene dos consecuencias que casi nadie ve venir — hasta que es tarde.
          </p>

          <div className="lp-animate lp-delay-1 rounded-3xl overflow-hidden mb-10 shadow-2xl" style={{ border: "1px solid #2A2E35" }}>
            <Img src="/lp-guard/peligro.jpg" label="peligro.jpg — anuncio oscuro 'Corta la energía antes de que ocurran desastres'" className="w-full" />
          </div>

          <div className="space-y-4">
            {[
              { Icon: Flame, title: "Sobrecalentamiento nocturno", sub: "Un cargador caliente durante 8 horas es la causa #1 de incendios eléctricos en el hogar. Y ocurre mientras todos duermen — incluidos tus hijos.", delay: "" },
              { Icon: Zap, title: "Cortocircuitos sin aviso", sub: "Una falla eléctrica toma milisegundos. El fuego toma minutos. Tu familia no tiene tiempo de reaccionar.", delay: "lp-delay-1" },
              { Icon: BatteryCharging, title: "La sobrecarga mata tu batería", sub: "Cargar toda la noche degrada tu batería carga tras carga. Por eso a los 2 años tu teléfono 'ya no dura nada' — y terminás pagando un cambio de batería o un teléfono nuevo.", delay: "lp-delay-2" },
              { Icon: ShieldCheck, title: "Tus hijos no conocen el peligro", sub: "Los adolescentes dejan el teléfono cargando bajo la almohada toda la noche. Ellos no miden el riesgo — vos sí podés protegerlos.", delay: "lp-delay-3" },
            ].map(({ Icon, title, sub, delay }) => (
              <div key={title} className={`lp-animate ${delay} flex gap-4 rounded-2xl p-5`} style={{ backgroundColor: CARD, border: "1px solid #2A2E35" }}>
                <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <Icon size={20} style={{ color: ACCENT_D }} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUCIÓN ── */}
      <section className="py-20 px-5" style={{ backgroundColor: IVORY }}>
        <div className="max-w-lg mx-auto text-center">
          <div className="lp-animate inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-4 text-white" style={{ backgroundColor: ACCENT }}>LA SOLUCIÓN</div>
          <h2 className="lp-animate text-3xl font-bold mb-3" style={{ color: INK }}>
            Un solo dispositivo. <span style={{ color: ACCENT }}>Dos protecciones.</span>
          </h2>
          <p className="lp-animate lp-delay-1 text-gray-500 text-sm leading-relaxed mb-10">
            Monitorea el flujo eléctrico en tiempo real: <strong>corta la energía antes de un desastre</strong> y <strong>detiene la carga al 100%</strong> para que tu batería dure años más.
          </p>

          <div className="lp-animate lp-delay-1 grid grid-cols-2 gap-4 mb-10">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Img src="/lp-guard/product.jpg" label="product.jpg — producto sobre tela beige" className="w-full" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Img src="/lp-guard/demo.jpg" label="demo.jpg — producto real en mano" className="w-full" />
            </div>
          </div>

          <div className="space-y-4 text-left">
            {[
              { n: "1", title: "Conectalo en segundos", sub: "Directo al puerto USB-C de tu teléfono — o entre la cabeza del cargador y el cable (ideal para iPhone con Lightning). Plug & play, sin apps.", delay: "" },
              { n: "2", title: "Monitorea el flujo eléctrico en tiempo real", sub: "Su chip interno vigila temperatura, voltaje y corriente durante toda la carga.", delay: "lp-delay-1" },
              { n: "3", title: "Corta la energía si detecta una anomalía", sub: "Sobrecalentamiento, sobrecarga o cortocircuito: corta en milisegundos. Y al llegar al 100%, detiene la carga.", delay: "lp-delay-2" },
            ].map(({ n, title, sub, delay }) => (
              <div key={n} className={`lp-animate ${delay} flex gap-4 items-start rounded-2xl p-5 bg-white border border-gray-200`}>
                <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: ACCENT }}>{n}</div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: INK }}>{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lp-animate lp-delay-3 mt-5 rounded-2xl p-5 flex gap-4 items-start text-left" style={{ backgroundColor: "rgba(17,17,17,0.06)", border: "1.5px solid rgba(17,17,17,0.3)" }}>
            <Smartphone size={22} style={{ color: ACCENT }} className="shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed" style={{ color: INK }}>
              <strong>Funciona con TODOS los teléfonos — incluso iPhone anteriores al 15.</strong> Si tu iPhone usa cable Lightning (iPhone 14, 13, 12, X...), colocás Guard entre la cabeza del cargador y el cable: la protección es exactamente la misma. iPhone 15 en adelante y Android: conexión directa al puerto USB-C. Tablets y laptops también quedan protegidas.
            </p>
          </div>
        </div>
      </section>

      {/* ── ANGLE 2: AHORRO / BATERÍA ── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-center mb-3" style={{ color: INK }}>
            Y no solo protege tu casa.<br /><span style={{ color: ACCENT }}>Protege tu bolsillo.</span>
          </h2>
          <p className="lp-animate lp-delay-1 text-center text-gray-500 text-sm leading-relaxed mb-10">
            La sobrecarga nocturna destruye tu batería poco a poco. Por eso a los 2 años tu teléfono "ya no dura nada". <strong>No es el teléfono — es tu cargador.</strong> Guard detiene la carga al 100% automáticamente.
          </p>

          <div className="lp-animate lp-delay-1 rounded-3xl overflow-hidden border border-gray-200 mb-6">
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <div>
                <p className="font-semibold text-sm" style={{ color: INK }}>Teléfono nuevo</p>
                <p className="text-xs text-gray-400">Cuando la batería "muere" para siempre</p>
              </div>
              <p className="font-heading font-bold text-lg text-gray-400 tracking-tight"><s><span className="text-xs align-top">₡</span>200000+</s></p>
            </div>
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <div>
                <p className="font-semibold text-sm" style={{ color: INK }}>Cambio de batería</p>
                <p className="text-xs text-gray-400">Cada 1-2 años, si tenés suerte</p>
              </div>
              <p className="font-heading font-bold text-lg text-gray-400 tracking-tight"><s><span className="text-xs align-top">₡</span>25000+</s></p>
            </div>
            <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: "rgba(17,17,17,0.05)" }}>
              <div>
                <p className="font-bold text-sm" style={{ color: ACCENT }}>Vazlina Guard™</p>
                <p className="text-xs text-gray-500">Tu batería dura años más. Pagás una sola vez.</p>
              </div>
              <p className="font-heading font-bold text-xl tracking-tight" style={{ color: ACCENT }}><span className="text-xs align-top mr-0.5">₡</span><span className="text-2xl">17700</span></p>
            </div>
          </div>

          <div className="lp-animate lp-delay-2 rounded-2xl p-5 flex gap-4 items-start" style={{ backgroundColor: IVORY }}>
            <BatteryCharging size={24} style={{ color: ACCENT }} className="shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed" style={{ color: INK }}>
              <strong>Cada noche que cargás sin protección, tu batería pierde vida útil.</strong> Guard paga por sí mismo evitando un solo cambio de batería — y te salva de comprar un teléfono nuevo antes de tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* ── CARACTERÍSTICAS ── */}
      <section className="py-20 px-5" style={{ backgroundColor: NIGHT }}>
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-white text-center mb-2">La seguridad que no podés ver,</h2>
          <h2 className="lp-animate lp-delay-1 text-3xl font-bold text-center mb-12" style={{ color: ACCENT_D }}>la tranquilidad que sí podés sentir.</h2>

          <div className="lp-animate lp-delay-1 rounded-3xl overflow-hidden mb-10 shadow-2xl" style={{ border: "1px solid #2A2E35" }}>
            <Img src="/lp-guard/familia.jpg" label="familia.jpg — anuncio 'Protege a tus hijos'" className="w-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { Icon: Zap, title: "Corte Automático", sub: "Detecta fallas eléctricas y corta la energía en milisegundos.", delay: "" },
              { Icon: Flame, title: "Prevención de Incendios", sub: "Reduce el riesgo de incendios causados por sobrecargas o fallas eléctricas.", delay: "lp-delay-1" },
              { Icon: BatteryCharging, title: "Protección de Batería", sub: "Detiene la carga al 100%. Tu batería dura años más, sin degradación nocturna.", delay: "lp-delay-2" },
              { Icon: Phone, title: "Compatible con TODO", sub: "iPhone de cualquier modelo (incluso con Lightning), Android, tablets y laptops. Un Guard para cada cargador de la casa.", delay: "lp-delay-3" },
            ].map(({ Icon, title, sub, delay }) => (
              <div key={title} className={`lp-animate ${delay} rounded-2xl p-5`} style={{ backgroundColor: CARD, border: "1px solid #2A2E35" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <Icon size={18} style={{ color: ACCENT_D }} />
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFERTA ── */}
      <section ref={offerRef} id="oferta" className="py-20 px-4 scroll-mt-16" style={{ backgroundColor: IVORY }}>
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-center mb-2" style={{ color: INK }}>Elegí tu protección</h2>
          <p className="lp-animate lp-delay-1 text-center text-gray-500 text-sm mb-3">Pago al recibir · Envío gratis · Garantía 30 días</p>

          <div className="lp-animate lp-delay-1 mb-10 flex justify-center">
            <div className="pulse inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-extrabold text-base" style={{ background: "#111111", color: "#F5F2EC", border: "2px solid #FF6B35", boxShadow: "0 4px 20px rgba(255,107,53,0.35)" }}>
              <Timer size={18} />
              <span>La oferta termina en <span className="tabular-nums text-lg" style={{ color: "#FF6B35" }}>{timer}</span></span>
            </div>
          </div>

          <div className="lp-animate lp-delay-1 space-y-5">
            {BUNDLES.map((b) => (
              <div
                key={b.id}
                className={`bundle-card ${bundle.id === b.id ? "active" : ""}`}
                onClick={() => setBundle(b)}
              >
                {b.best && (
                  <div className="text-center py-2 text-xs font-bold tracking-widest text-white" style={{ backgroundColor: ACCENT }}>
                    🔥 MEJOR OFERTA — EL MÁS ELEGIDO
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-base" style={{ color: INK }}>{b.shortName}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{b.note}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-[11px] text-gray-300 leading-tight mb-0.5 tracking-tight"><s>₡{b.oldPrice}</s></p>
                      <p className="font-heading font-bold leading-none tracking-tight" style={{ color: ACCENT }}>
                        <span className="text-[15px] align-top mr-0.5">₡</span><span className="text-[28px]">{b.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FF6B35", color: "#FFFFFF" }}>{b.save}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Truck size={11} /> Envío gratis</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); openCheckout(b); }}
                    className="w-full py-3.5 rounded-2xl text-white font-bold text-sm tracking-wider transition-all active:scale-95"
                    style={{ backgroundColor: b.best ? ACCENT : INK }}
                  >
                    ORDENAR AHORA
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="lp-animate text-center text-xs text-gray-400 mt-6 leading-relaxed">
            🔒 Pagás únicamente cuando recibís el producto.<br />Si no te convence, te devolvemos tu dinero.
          </p>
        </div>
      </section>

      {/* ── REVIEWS WHATSAPP ── */}
      <section className="py-20 px-4" style={{ backgroundColor: IVORY }}>
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-center mb-2" style={{ color: INK }}>Clientes que ya probaron Vazlina Guard</h2>
          <div className="lp-animate lp-delay-1 flex justify-center items-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F5B301" style={{ color: "#F5B301" }} />)}
            <span className="ml-2 text-sm text-gray-600">Reseñas verificadas</span>
          </div>

          <div className="lp-animate lp-delay-1 space-y-6">
            {/* Chat 1 */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#075E54" }}>
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative" style={{ backgroundColor: "#5B6770" }}>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #C0392B 0%, #E67E22 40%, #D4A574 100%)" }} />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40" preserveAspectRatio="none"><path d="M0,0 Q8,4 5,12 Q3,20 7,28 Q4,35 12,38 Q20,36 28,39 Q35,37 40,33 Q38,25 40,18 Q37,10 40,5 Q35,1 28,3 Q20,0 12,2 Q5,3 0,0 Z" fill="#0a0a0a" /></svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">+506 84<svg className="inline-block align-middle mx-0.5" width="46" height="18" viewBox="0 0 46 18"><path d="M2,6 Q5,3 10,5 L18,4 Q24,2 30,5 L38,4 Q42,6 44,9 L43,13 Q38,15 30,13 L20,14 Q12,16 6,13 Q1,11 2,6 Z" fill="#0a0a0a" /></svg>9</p>
                  <p className="text-white/60 text-xs">en línea</p>
                </div>
              </div>
              <div className="p-4 space-y-2.5" style={{ backgroundColor: WA_BG }}>
                <div className="max-w-[85%] rounded-xl rounded-tl-none px-3 py-2 shadow-sm" style={{ backgroundColor: "#fff" }}>
                  <p className="text-sm text-gray-800 leading-snug">No les escribí hasta que pasaron 2 días para probarlo bien y asegurarme de que funcione de verdad</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1">8:40 pm <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
                <div className="max-w-[85%] rounded-xl rounded-tl-none px-3 py-2 shadow-sm" style={{ backgroundColor: "#fff" }}>
                  <p className="text-sm text-gray-800 leading-snug">Y sinceramente... es una belleza. Siento tranquilidad de verdad. Gracias por la atención tan profesional</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1">8:42 pm <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
                <div className="max-w-[85%] ml-auto rounded-xl rounded-tr-none px-3 py-2 shadow-sm" style={{ backgroundColor: WA_ACCENT }}>
                  <p className="text-sm text-gray-800 leading-snug">¡Gracias a vos por confiar! Nos alegra mucho que estés tranquila</p>
                  <p className="text-[10px] text-gray-500 text-right mt-1">8:45 pm <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
              </div>
            </div>

            {/* Chat 2 */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#075E54" }}>
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative" style={{ backgroundColor: "#5B6770" }}>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2C3E50 0%, #3498DB 40%, #85C1E2 100%)" }} />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40" preserveAspectRatio="none"><path d="M0,0 Q8,4 5,12 Q3,20 7,28 Q4,35 12,38 Q20,36 28,39 Q35,37 40,33 Q38,25 40,18 Q37,10 40,5 Q35,1 28,3 Q20,0 12,2 Q5,3 0,0 Z" fill="#0a0a0a" /></svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">+506 71<svg className="inline-block align-middle mx-0.5" width="46" height="18" viewBox="0 0 46 18"><path d="M2,6 Q5,3 10,5 L18,4 Q24,2 30,5 L38,4 Q42,6 44,9 L43,13 Q38,15 30,13 L20,14 Q12,16 6,13 Q1,11 2,6 Z" fill="#0a0a0a" /></svg>2</p>
                  <p className="text-white/60 text-xs">últ. vez 9:30 pm</p>
                </div>
              </div>
              <div className="p-4 space-y-2.5" style={{ backgroundColor: WA_BG }}>
                <div className="max-w-[85%] rounded-xl rounded-tl-none px-3 py-2 shadow-sm" style={{ backgroundColor: "#fff" }}>
                  <p className="text-sm text-gray-800 leading-snug">Sinceramente, somos dos con mi esposa y siempre dejamos el teléfono en el cargador y nos olvidamos, eso me estresaba bastante</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1">9:12 pm <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
                <div className="max-w-[85%] rounded-xl rounded-tl-none px-3 py-2 shadow-sm" style={{ backgroundColor: "#fff" }}>
                  <p className="text-sm text-gray-800 leading-snug">Ahora con el Guard los conecto directo cuando quieren cargar y listo. Problema resuelto</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1">9:14 pm <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
                <div className="max-w-[85%] ml-auto rounded-xl rounded-tr-none px-3 py-2 shadow-sm" style={{ backgroundColor: WA_ACCENT }}>
                  <p className="text-sm text-gray-800 leading-snug">¡Exacto! Para eso lo diseñamos. Cargar tranquilo es todo</p>
                  <p className="text-[10px] text-gray-500 text-right mt-1">9:16 pm <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
              </div>
            </div>

            {/* Chat 3 */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#075E54" }}>
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative" style={{ backgroundColor: "#5B6770" }}>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #7D3C98 0%, #C39BD3 40%, #F5B7B1 100%)" }} />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40" preserveAspectRatio="none"><path d="M0,0 Q8,4 5,12 Q3,20 7,28 Q4,35 12,38 Q20,36 28,39 Q35,37 40,33 Q38,25 40,18 Q37,10 40,5 Q35,1 28,3 Q20,0 12,2 Q5,3 0,0 Z" fill="#0a0a0a" /></svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">+506 63<svg className="inline-block align-middle mx-0.5" width="46" height="18" viewBox="0 0 46 18"><path d="M2,6 Q5,3 10,5 L18,4 Q24,2 30,5 L38,4 Q42,6 44,9 L43,13 Q38,15 30,13 L20,14 Q12,16 6,13 Q1,11 2,6 Z" fill="#0a0a0a" /></svg>4</p>
                  <p className="text-white/60 text-xs">en línea</p>
                </div>
              </div>
              <div className="p-4 space-y-2.5" style={{ backgroundColor: WA_BG }}>
                <div className="max-w-[85%] rounded-xl rounded-tl-none px-3 py-2 shadow-sm" style={{ backgroundColor: "#fff" }}>
                  <p className="text-sm text-gray-800 leading-snug">Sinceramente el producto hace que el teléfono aguante más batería. Antes mi celular duraba medio día y ahora llega tranquilo a la noche</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1">7:01 am <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
                <div className="max-w-[85%] rounded-xl rounded-tl-none px-3 py-2 shadow-sm" style={{ backgroundColor: "#fff" }}>
                  <p className="text-sm text-gray-800 leading-snug">Creo que antes la batería se gastaba rápido por la sobrecarga de la noche. Ahora con Guard eso no pasa</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1">7:03 am <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
                <div className="max-w-[85%] ml-auto rounded-xl rounded-tr-none px-3 py-2 shadow-sm" style={{ backgroundColor: WA_ACCENT }}>
                  <p className="text-sm text-gray-800 leading-snug">¡Justo eso! Guard corta la carga al 100% y protege la batería. Gracias por compartir</p>
                  <p className="text-[10px] text-gray-500 text-right mt-1">7:10 am <span style={{ color: "#53BDEB" }}>✓✓</span></p>
                </div>
              </div>
            </div>
          </div>

          <p className="lp-animate lp-delay-2 text-center text-xs text-gray-500 mt-6">Mensajes reales compartidos con permiso de nuestros clientes.</p>
        </div>
      </section>

      {/* ── GARANTÍA ── */}
      <section className="py-20 px-5" style={{ backgroundColor: NIGHT }}>
        <div className="max-w-lg mx-auto text-center">
          <div className="lp-animate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: `1.5px solid ${ACCENT_D}` }}>
            <ShieldCheck size={30} style={{ color: ACCENT_D }} />
          </div>
          <h2 className="lp-animate lp-delay-1 text-3xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>Garantía total de 30 días</h2>
          <p className="lp-animate lp-delay-2 text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Probá Vazlina Guard durante 30 días. Si no sentís la tranquilidad que prometemos — por la razón que sea — te devolvemos <strong className="text-white">cada colón</strong>. Sin preguntas, sin formularios, sin riesgo.
          </p>
          <div className="lp-animate lp-delay-2 flex justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><Check size={13} style={{ color: ACCENT_D }} /> Pago al recibir</span>
            <span className="flex items-center gap-1.5"><Check size={13} style={{ color: ACCENT_D }} /> Envío gratis</span>
            <span className="flex items-center gap-1.5"><Check size={13} style={{ color: ACCENT_D }} /> Devolución total</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-center mb-10" style={{ color: INK }}>Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="lp-animate rounded-2xl overflow-hidden border border-gray-200" style={{ backgroundColor: IVORY }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: INK }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} style={{ color: ACCENT }} /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-24 px-6 text-center overflow-hidden" style={{ backgroundColor: NIGHT }}>
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,205,211,0.12) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-white mb-4">
            Tu familia y tu teléfono<br /><span style={{ color: ACCENT_D }} className="font-heading tracking-tight">valen más que <span className="text-lg align-top">₡</span>17700.</span>
          </h2>
          <p className="lp-animate lp-delay-1 text-gray-400 mb-2 text-sm leading-relaxed">
            Esta noche, tu cargador volverá a quedarse enchufado 8 horas.<br />La pregunta es: ¿con protección o sin ella?
          </p>
          <p className="lp-animate lp-delay-1 text-base font-extrabold mb-8" style={{ color: "#FF6B35" }}>
            ⏳ Oferta termina in <span className="tabular-nums text-lg">{timer}</span>
          </p>
          <a
            href="#oferta"
            className="lp-animate lp-delay-2 cta-attention inline-block px-12 py-4 rounded-2xl font-bold text-sm tracking-widest transition-all active:scale-95 hover:opacity-90 shadow-2xl"
            style={{ backgroundColor: "#FFFFFF", color: "#111111" }}
          >
            ELEGIR MI PACK — <span className="font-heading tracking-tight"><span className="text-[10px] align-top">₡</span>17700</span>
          </a>
          <p className="lp-animate lp-delay-3 text-xs text-gray-500 mt-4">🚚 Envío gratis · 💳 Pago al recibir · 🛡️ Garantía 30 días<br />🏅 Calidad certificada</p>
        </div>
      </section>

      <div className="h-20" style={{ backgroundColor: NIGHT }} />

      <GuardCheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} variant={selectedVariant} />
    </div>
  );
}
