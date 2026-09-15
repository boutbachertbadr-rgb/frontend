"use client";

import { useEffect, useRef, useState } from "react";
import { Flame, Zap, BatteryCharging, ShieldCheck, Star, ChevronDown, ChevronUp, Truck, Timer, Smartphone } from "lucide-react";
import GuardCheckoutModal, { LPVariant, ColorOption, COLOR_OPTIONS } from "@/components/lp/GuardCheckoutModal";

const SILVER_DOT = "#A0A0A0";
const PRODUCT_ORANGE = "#E65C00";

const ORANGE = "#C0690A";
const BG = "#FFF8F0";
const WHITE = "#FFFCF8";
const BORDER = "#FFD5A8";
const INK = "#3D1A00";
const MUTED = "#9A6040";
const BLUE = "#C0690A";
const NIGHT = "#2A0E00";
const NIGHT_CARD = "#3D1800";
const NIGHT_BORDER = "#6B3000";
const WA_BG = "#FFF0E0";

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
  { id: "1x", name: "1x Vazlina Guard - Proteccion Individual", shortName: "1x Vazlina Guard", price: 17700, oldPrice: 22500, save: "21% OFF", note: "Para 1 cargador en casa" },
  { id: "2x", name: "2x Vazlina Guard - Pack Familia", shortName: "2x Vazlina Guard", price: 29900, oldPrice: 45000, save: "33% OFF", note: "El mas popular - dormitorio + sala" },
  { id: "3x", name: "3x Vazlina Guard - Proteccion Total", shortName: "3x Vazlina Guard", price: 39900, oldPrice: 67500, save: "41% OFF", note: "Protege cada enchufe del hogar", best: true },
];

const FAQS = [
  { q: "Funciona con mi iPhone con cable Lightning?", a: "Si, 100%. En iPhones con Lightning (iPhone 14, 13, 12, X y anteriores), conectas Guard entre el bloque del cargador y el cable Lightning. La proteccion es exactamente la misma que con USB-C." },
  { q: "Tambien protege tablets y laptops?", a: "Si. Guard protege cualquier dispositivo que cargue por USB-C: iPads, tablets Android, MacBooks, laptops Windows. Un Guard por cargador." },
  { q: "Como corta la energia?", a: "Su chip AI monitorea el voltaje en tiempo real. Al detectar el 100% o una anomalia electrica, corta fisicamente la corriente en milisegundos sin apps ni configuracion." },
  { q: "Tengo que configurarlo o instalar algo?", a: "No. Es plug and play total. Lo conectas y empieza a proteger desde el primer segundo. Sin apps, sin Bluetooth, sin nada." },
  { q: "Como es el pago y el envio?", a: "Pagas unicamente cuando recibes el producto (pago contra entrega). Envio gratis a todo Costa Rica en 3-7 dias habiles." },
  { q: "Y si no me convence?", a: "Garantia 30 dias sin preguntas. Si no te da la tranquilidad prometida, te devolvemos cada colon." },
];

function useOfferTimer() {
  const [left, setLeft] = useState("--:--:--");
  useEffect(() => {
    const randomDuration = () => (3 + Math.floor(Math.random() * 12)) * 3600000;
    let end = Number(localStorage.getItem("guard_offer_end_v3warm") ?? 0);
    if (!end || end <= Date.now()) {
      end = Date.now() + randomDuration();
      localStorage.setItem("guard_offer_end_v3warm", String(end));
    }
    const tick = () => {
      let diff = end - Date.now();
      if (diff <= 0) {
        end = Date.now() + randomDuration();
        localStorage.setItem("guard_offer_end_v3warm", String(end));
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

function Img({ src, label, className = "", priority = false }: { src: string; label: string; className?: string; priority?: boolean }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 text-xs text-gray-400 text-center px-4 ${className}`} style={{ backgroundColor: "#E5E7EB", minHeight: "220px" }}>
        <span className="text-3xl">📸</span>
        <span className="max-w-xs leading-relaxed">{label}</span>
      </div>
    );
  }
  return <img src={src} alt={label} className={className} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding={priority ? "sync" : "async"} style={{ objectFit: "cover", display: "block" }} onError={() => setErr(true)} />;
}

export default function GuardPageV3() {
  const timer = useOfferTimer();
  const [bundle, setBundle] = useState<Bundle>(BUNDLES[0]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<LPVariant | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, ColorOption>>({
    "1x": { id: "orange", label: "Naranja Metalico", dots: [PRODUCT_ORANGE] },
    "2x": { id: "mix", label: "1 Naranja + 1 Plata", dots: [PRODUCT_ORANGE, SILVER_DOT] },
    "3x": { id: "2o1s", label: "2 Naranja + 1 Plata", dots: [PRODUCT_ORANGE, PRODUCT_ORANGE, SILVER_DOT] },
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const offerInView = useRef(false);
  const offerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        offerInView.current = entry.isIntersecting;
        setShowSticky(window.scrollY > 550 && !entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (offerRef.current) obs.observe(offerRef.current);
    const onScroll = () => setShowSticky(window.scrollY > 550 && !offerInView.current);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("lp-visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".lp-animate").forEach((el) => obs.observe(el));
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
    <div className="font-body" style={{ backgroundColor: BG }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .lp-animate { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .lp-animate.lp-visible { opacity: 1; transform: translateY(0); }
        .lp-delay-1 { transition-delay: 0.1s; }
        .lp-delay-2 { transition-delay: 0.2s; }
        .lp-delay-3 { transition-delay: 0.3s; }
        .bundle-card { border: 2px solid #FFD5A8; border-radius: 20px; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; background: #FFFFFF; cursor: pointer; }
        .bundle-card.active { border-color: #C0690A; box-shadow: 0 0 0 4px rgba(192,105,10,0.15); }
        @keyframes pulse-glow { 0%,100%{opacity:1;}50%{opacity:0.65;} }
        .pulse { animation: pulse-glow 2s ease-in-out infinite; }
        @keyframes shimmer { 0%{transform:translateX(-100%);}100%{transform:translateX(200%);} }
        @keyframes cta-glow { 0%,100%{box-shadow:0 8px 25px rgba(192,105,10,0.35);}50%{box-shadow:0 14px 40px rgba(192,105,10,0.55);} }
        .cta-btn { animation: cta-glow 2.5s ease-in-out infinite; position: relative; overflow: hidden; }
        .cta-btn::before { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent); animation:shimmer 2.8s ease-in-out infinite; }
        @keyframes led-blink { 0%,100%{opacity:1;}50%{opacity:0.3;} }
        .led { animation: led-blink 2s ease-in-out infinite; }
      `}</style>

      {/* TOP URGENCY BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 py-2 px-3 text-center" style={{ backgroundColor: ORANGE }}>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>&#161;Precio especial por tiempo limitado!</p>
        <p className="text-white text-xs font-bold flex flex-row items-center justify-center gap-2 flex-wrap leading-none">
          <span className="pulse inline-flex items-center gap-1">
            <Timer size={11} /> TERMINA EN
            <span className="tabular-nums font-mono bg-black/20 px-1.5 py-0.5 rounded text-xs">{timer}</span>
          </span>
          <span className="opacity-40">|</span>
          <span><s className="opacity-60">&#8353;22,500</s> &#8250; <strong>&#8353;17,700 HOY</strong></span>
        </p>
        <p className="text-[10px] font-semibold mt-1" style={{ color: "rgba(255,255,255,0.9)" }}>Paga contra entrega &#183; Env&#237;o gratis a todo CR</p>
      </div>

      {/* STICKY BOTTOM CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-5 pt-3 transition-all duration-300"
        style={{
          background: "linear-gradient(to top, rgba(255,255,255,0.98) 60%, transparent 100%)",
          transform: showSticky ? "translateY(0)" : "translateY(120%)",
          opacity: showSticky ? 1 : 0,
          pointerEvents: showSticky ? "auto" : "none",
        }}
      >
        <a
          href="#oferta"
          className="cta-btn w-full sm:max-w-sm sm:mx-auto flex items-center justify-center py-4 rounded-2xl font-bold text-sm tracking-widest text-white active:scale-95 transition-transform"
          style={{ backgroundColor: ORANGE }}
        >
          ORDENAR AHORA — &#8353;17,700
        </a>
      </div>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="pt-14 pb-14" style={{ backgroundColor: WHITE }}>
        <div className="max-w-lg mx-auto px-5">

          <div className="lp-animate flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: "#FFE8D0", border: "1px solid #FFB870", color: ORANGE }}>
              <span className="led w-2 h-2 rounded-full inline-block" style={{ backgroundColor: ORANGE, boxShadow: `0 0 6px rgba(192,105,10,0.5)` }} />
              Adaptador de Aislamiento Fisico con IA
            </span>
          </div>

          <div className="lp-animate flex justify-center items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#E65C00" }}>
              <span className="font-bold text-sm" style={{ color: "#1A1A1A" }}>V</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-base tracking-tight" style={{ color: INK }}>VAZLINA</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>Guard&#8482;</span>
            </div>
          </div>
        </div>

        {/* HERO IMAGE — full bleed edge to edge */}
        <div className="lp-animate w-full overflow-hidden shadow-md mb-7" style={{ maxWidth: "100vw" }}>
          <Img src="/lp-guard/hero.jpg" label="Vazlina Guard — producto naranja metalico sobre superficie premium, fondo oscuro elegante" className="w-full" priority />
        </div>

        <div className="max-w-lg mx-auto px-5">

          <h1 className="lp-animate lp-delay-1 text-3xl sm:text-4xl font-bold text-center leading-tight mb-4" style={{ color: INK, letterSpacing: "-0.5px" }}>
            Protege a tu familia del{" "}
            <span style={{ color: ORANGE }}>fuego nocturno</span>{" "}
            y salva la bateria de tu telefono{" "}
            <span style={{ color: ORANGE }}>de morir antes de tiempo.</span>
          </h1>

          <p className="lp-animate lp-delay-2 text-center text-sm leading-relaxed mb-6" style={{ color: MUTED }}>
            Vazlina Guard usa <strong style={{ color: INK }}>Inteligencia Artificial</strong> para detectar sobrecargas y cortar fisicamente la energia.
            Protege tu hogar <strong style={{ color: INK }}>y te ahorra cientos de miles de colones</strong> en baterias y telefonos nuevos.
          </p>

          <div className="lp-animate lp-delay-2 flex flex-wrap justify-center gap-2 mb-5">
            {[
              { e: "🚚", t: "Envio gratis" },
              { e: "💳", t: "Pago al recibir" },
              { e: "🛡️", t: "Garantia 30 dias" },
              { e: "🏅", t: "Calidad certificada" },
            ].map(({ e, t }) => (
              <span key={t} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: BG, border: `1px solid ${BORDER}`, color: INK }}>
                {e} {t}
              </span>
            ))}
          </div>

          <div className="lp-animate lp-delay-2 mx-auto max-w-xs rounded-2xl overflow-hidden mb-7" style={{ border: `1px solid ${BORDER}` }}>
            <button onClick={() => setReviewsOpen(!reviewsOpen)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white">
              <span className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}</span>
              <span className="text-xs font-bold" style={{ color: INK }}>1,247 resenas verificadas</span>
              {reviewsOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            </button>
            {reviewsOpen && (
              <div className="px-4 pb-4 pt-3 bg-white" style={{ borderTop: `1px solid ${BORDER}` }}>
                {[{ s: 5, c: 1060 }, { s: 4, c: 187 }, { s: 3, c: 0 }, { s: 2, c: 0 }, { s: 1, c: 0 }].map(({ s, c }) => (
                  <div key={s} className="flex items-center gap-2 mb-1.5">
                    <div className="flex gap-0.5 w-14 shrink-0">{[...Array(5)].map((_, i) => <Star key={i} size={9} fill={i < s ? "#F59E0B" : "transparent"} style={{ color: i < s ? "#F59E0B" : BORDER }} />)}</div>
                    <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: BG }}>
                      <div className="h-full rounded-full" style={{ width: `${c > 0 ? Math.max((c / 1247) * 100, 3) : 0}%`, backgroundColor: ORANGE }} />
                    </div>
                    <span className="text-[10px] text-gray-400 w-8 text-right tabular-nums">{c.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <a href="#oferta" className="lp-animate lp-delay-3 cta-btn block text-center py-4 rounded-2xl font-bold text-sm tracking-widest text-white active:scale-95 transition-transform" style={{ backgroundColor: ORANGE }}>
            PROTEGER MI HOGAR Y MI BATERIA — &#8353;17,700
          </a>
          <p className="text-center text-xs mt-3" style={{ color: MUTED }}>Pagas solo cuando recibes el producto</p>
        </div>
      </section>

      {/* ══════════════════ DANGER — FUEGO (dark) ══════════════════ */}
      <section className="py-20 px-5" style={{ backgroundColor: NIGHT }}>
        <div className="max-w-lg mx-auto">
          <div className="lp-animate flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}>
              <Flame size={12} /> EL PELIGRO QUE NO VES
            </span>
          </div>
          <h2 className="lp-animate text-3xl font-bold text-white text-center mb-3 leading-tight">
            Esta noche tu telefono cargara{" "}
            <span style={{ color: "#EF4444" }}>mientras todos duermen.</span>
          </h2>
          <p className="lp-animate lp-delay-1 text-center text-sm leading-relaxed mb-10" style={{ color: "#9CA3AF" }}>
            Un cargador enchufado 8 horas seguidas no es normal. Es peligroso. El sobrecalentamiento es la causa #1 de incendios electricos en el hogar.
          </p>
        </div>

        <div className="lp-animate lp-delay-1 w-full mb-10 overflow-hidden">
          <Img src="/lp-guard/peligro.jpg" label="Telefono cargando bajo almohada en cuarto oscuro — glow naranja/rojo de calor en el cable. Dramatico, cinematico." className="w-full" />
        </div>

        <div className="max-w-lg mx-auto space-y-4">
          {[
            { Icon: Flame, color: "#EF4444", title: "Sobrecalentamiento nocturno", body: "Un cargador enchufado toda la noche alcanza hasta 60 grados. Suficiente para encender la tela de tu almohada o colchon mientras duermes." },
            { Icon: Zap, color: "#F59E0B", title: "Cortocircuito en milisegundos", body: "Una falla electrica toma 0.001 segundos. El fuego se propaga en minutos. Tu familia no tiene tiempo de reaccionar dormida." },
            { Icon: Smartphone, color: "#EF4444", title: "Tus hijos cargan bajo la almohada", body: "Los adolescentes dejan el telefono cargando dentro de la cama. Vos podes protegerlos con un solo adaptador." },
          ].map(({ Icon, color, title, body }) => (
            <div key={title} className="lp-animate flex gap-4 rounded-2xl p-5" style={{ backgroundColor: NIGHT_CARD, border: `1px solid ${NIGHT_BORDER}` }}>
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ BATTERY DRAIN — DINERO (light) ══════════════════ */}
      <section className="py-20 px-5" style={{ backgroundColor: BG }}>
        <div className="max-w-lg mx-auto">
          <div className="lp-animate flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(230,92,0,0.08)", color: ORANGE, border: `1px solid rgba(230,92,0,0.3)` }}>
              <BatteryCharging size={12} /> EL COSTO OCULTO
            </span>
          </div>
          <h2 className="lp-animate text-3xl font-bold text-center mb-3 leading-tight" style={{ color: INK }}>
            La sobrecarga nocturna{" "}
            <span style={{ color: ORANGE }}>te esta costando dinero.</span>
          </h2>
          <p className="lp-animate lp-delay-1 text-center text-sm leading-relaxed mb-10" style={{ color: MUTED }}>
            Cargar el telefono toda la noche destruye la bateria poco a poco.
            Por eso a los 2 anos tu telefono &ldquo;ya no dura nada&rdquo;.{" "}
            <strong style={{ color: INK }}>No es el telefono, es tu cargador.</strong>
          </p>
        </div>

        <div className="max-w-lg mx-auto space-y-4">
          <div className="lp-animate rounded-3xl overflow-hidden" style={{ border: `1px solid ${BORDER}`, backgroundColor: WHITE }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div>
                <p className="font-semibold text-sm" style={{ color: INK }}>Telefono nuevo (bateria muerta)</p>
                <p className="text-xs text-gray-400">Cada 2-3 anos</p>
              </div>
              <p className="font-bold text-lg line-through text-gray-400">&#8353;250,000+</p>
            </div>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div>
                <p className="font-semibold text-sm" style={{ color: INK }}>Cambio de bateria</p>
                <p className="text-xs text-gray-400">Cada 1-2 anos</p>
              </div>
              <p className="font-bold text-lg line-through text-gray-400">&#8353;25,000+</p>
            </div>
            <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: "rgba(230,92,0,0.04)" }}>
              <div>
                <p className="font-bold text-sm" style={{ color: ORANGE }}>Vazlina Guard&#8482;</p>
                <p className="text-xs text-gray-500">Tu bateria dura anos mas. Una sola vez.</p>
              </div>
              <p className="font-bold text-xl" style={{ color: ORANGE }}>&#8353;17,700</p>
            </div>
          </div>

          <div className="lp-animate lp-delay-1 rounded-2xl p-5 flex gap-3 items-start" style={{ backgroundColor: "rgba(230,92,0,0.06)", border: "1.5px solid rgba(230,92,0,0.25)" }}>
            <BatteryCharging size={20} style={{ color: ORANGE }} className="shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed" style={{ color: INK }}>
              <strong>Guard se paga solo en el primer mes.</strong> Un solo cambio de bateria evitado cubre el costo del adaptador. Cada noche sin proteccion, tu bateria pierde vida util.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ HOW IT WORKS + COMPATIBILITY ══════════════════ */}
      <section className="py-20 px-5" style={{ backgroundColor: WHITE }}>
        <div className="max-w-lg mx-auto">
          <div className="lp-animate flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: ORANGE }}>
              <Zap size={12} /> COMO FUNCIONA
            </span>
          </div>
          <h2 className="lp-animate text-3xl font-bold text-center mb-3 leading-tight" style={{ color: INK }}>
            Compatible con{" "}
            <span style={{ color: ORANGE }}>TODOS los dispositivos.</span>
          </h2>
          <p className="lp-animate lp-delay-1 text-center text-sm leading-relaxed mb-10" style={{ color: MUTED }}>
            Android, iPhone Lightning, iPhone 15+, tablets y laptops. Un Guard protege todo.
          </p>

          <div className="space-y-5 mb-8">
            <div className="lp-animate flex gap-4 items-start p-5 rounded-2xl" style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}>
              <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: ORANGE }}>1</div>
              <div>
                <h3 className="font-bold text-sm mb-1" style={{ color: INK }}>Android e iPhone 15+ (USB-C)</h3>
                <p className="text-xs leading-relaxed" style={{ color: MUTED }}>Conectas Guard directo al puerto USB-C del telefono, despues enchufas el cable. Plug and play, listo en 5 segundos.</p>
              </div>
            </div>

            <div className="lp-animate lp-delay-1 rounded-2xl overflow-hidden shadow-md">
              <Img src="/lp-guard/usbc.jpg" label="Guard conectado al puerto USB-C del telefono. Product photography, fondo blanco limpio." className="w-full" />
            </div>

            <div className="lp-animate lp-delay-1 rounded-2xl" style={{ border: `1px solid ${BORDER}`, backgroundColor: BG }}>
              <div className="px-5 py-4">
                <div className="flex gap-3 items-start mb-2">
                  <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: ORANGE }}>2</div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: INK }}>iPhone con cable Lightning (iPhone 14, 13, 12...)</h3>
                    <p className="text-xs font-semibold" style={{ color: MUTED }}>Solucion especial. Misma proteccion.</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed ml-12" style={{ color: MUTED }}>
                  Enchufa Guard directo en el <strong style={{ color: INK }}>bloque del cargador Apple</strong> (el cubo). Despues conecta el <strong style={{ color: INK }}>cable Lightning al Guard</strong>. El extremo Lightning va a tu iPhone. Misma proteccion automatica, sin configuracion.
                </p>
              </div>
            </div>

            <div className="lp-animate lp-delay-2 rounded-2xl overflow-hidden shadow-md">
              <Img src="/lp-guard/lightning.jpg" label="Guard enchufado en bloque cargador Apple con cable Lightning conectado al iPhone." className="w-full" />
            </div>

            <div className="lp-animate lp-delay-2 flex gap-4 items-start p-5 rounded-2xl" style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}>
              <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: ORANGE }}>3</div>
              <div>
                <h3 className="font-bold text-sm mb-1" style={{ color: INK }}>Tablets y Laptops: tambien protegidos</h3>
                <p className="text-xs leading-relaxed" style={{ color: MUTED }}>Guard protege cualquier dispositivo USB-C: iPad, MacBook, laptop Windows. Un Guard por cargador.</p>
              </div>
            </div>

            <div className="lp-animate lp-delay-2 rounded-2xl overflow-hidden shadow-md">
              <Img src="/lp-guard/tablets.jpg" label="Laptop y tablet cargando en escritorio moderno. Guard visible en el cable. Luz natural, lifestyle premium." className="w-full" />
            </div>
          </div>

          <div className="lp-animate rounded-2xl p-5 flex gap-3 items-start" style={{ backgroundColor: "#FFF3E6", border: "1.5px solid #FFB870" }}>
            <span className="led shrink-0 w-3 h-3 rounded-full mt-0.5" style={{ backgroundColor: ORANGE, boxShadow: `0 0 8px rgba(192,105,10,0.5)`, display: "inline-block" }} />
            <p className="text-sm leading-relaxed" style={{ color: "#5C2800" }}>
              <strong>El chip AI monitorea el voltaje en tiempo real.</strong> Al detectar el 100% o una anomalia electrica, corta fisicamente la corriente, sin apps, sin configuracion. Siempre activo.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHATSAPP REVIEWS ══════════════════ */}
      <section className="py-20 px-5" style={{ backgroundColor: BG }}>
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-center mb-2" style={{ color: INK }}>
            Clientes que ya duermen{" "}
            <span style={{ color: ORANGE }}>tranquilos cada noche.</span>
          </h2>
          <div className="lp-animate lp-delay-1 flex justify-center items-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}
            <span className="ml-1.5 text-sm font-semibold" style={{ color: MUTED }}>Resenas verificadas</span>
          </div>

          <div className="lp-animate space-y-5">
            {[
              {
                avatar: "https://i.pravatar.cc/60?img=47",
                numA: "+506 84", numB: "9",
                status: "en linea",
                msgs: [
                  { text: "No les escribi hasta que pasaron 2 dias para probarlo bien y asegurarme de que funcione de verdad", mine: false, time: "8:43 pm" },
                  { text: "Y sinceramente... es una belleza. Siento tranquilidad de verdad. Gracias por la atencion tan profesional", mine: false, time: "8:44 pm" },
                  { text: "\u00a1Gracias a vos por confiar! Nos alegra mucho que estes tranquilo", mine: true, time: "8:45 pm" },
                ],
              },
              {
                avatar: "https://i.pravatar.cc/60?img=11",
                numA: "+506 71", numB: "2",
                status: "ayer, voz 9:30 pm",
                msgs: [
                  { text: "Sinceramente, somos dos con mi esposa y siempre dejamos el telefono en el cargador y nos olvidamos, eso me causaba bastante", mine: false, time: "8:58 pm" },
                  { text: "Ahora con el Guard lo conecto directo cuando quieren cargar y listo. Problema resuelto", mine: false, time: "8:59 pm" },
                  { text: "\u00a1Exacto! Para eso lo disenamos. Cargar tranquilo es todo", mine: true, time: "9:00 pm" },
                ],
              },
              {
                avatar: "https://i.pravatar.cc/60?img=57",
                numA: "+506 63", numB: "4",
                status: "en linea",
                msgs: [
                  { text: "Sinceramente el producto hace que el telefono aguante mas bateria. Antes mi celular duraba medio dia y ahora llega tranquilo a la noche!", mine: false, time: "6:58 am" },
                  { text: "Creo que antes la bateria se gastaba rapido por la sobrecarga de la noche. Ahora con Guard eso no pasa", mine: false, time: "6:59 am" },
                  { text: "\u00a1Justo eso! Guard corta la carga al 100% y protege la bateria. Gracias por compartir!", mine: true, time: "7:00 am" },
                ],
              },
            ].map((chat, ci) => (
              <div key={ci} className="lp-animate rounded-2xl overflow-hidden shadow-md">
                <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#075E54" }}>
                  <div className="relative w-9 h-9 shrink-0">
                    <img src={chat.avatar} alt="" className="w-9 h-9 rounded-full object-cover" style={{ filter: "blur(5px)", transform: "scale(1.1)" }} />
                    <div className="absolute inset-0 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold flex items-center gap-0.5">
                      <span>{chat.numA}</span>
                      <span className="inline-block rounded mx-0.5 align-middle" style={{ width: "46px", height: "13px", backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} />
                      <span>{chat.numB}</span>
                    </p>
                    <p className="text-white/60 text-xs">{chat.status}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2" style={{ backgroundColor: WA_BG }}>
                  {chat.msgs.map((msg, mi) => (
                    <div key={mi} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
                      <div className="max-w-[80%] rounded-xl px-3 py-2 shadow-sm" style={{ backgroundColor: msg.mine ? "#DCF8C6" : WHITE }}>
                        <p className="text-sm text-gray-800 leading-snug">{msg.text}</p>
                        <p className="text-[10px] text-gray-400 text-right mt-0.5">
                          {msg.time}
                          {msg.mine ? <span className="ml-1" style={{ color: "#4FC3F7" }}>&#10003;&#10003;</span> : <span className="ml-1">&#10003;&#10003;</span>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ OFFER / BUNDLES ══════════════════ */}
      <section ref={offerRef as React.RefObject<HTMLElement>} id="oferta" className="py-20 px-4 scroll-mt-14" style={{ backgroundColor: WHITE }}>
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-center mb-2" style={{ color: INK }}>Elige tu proteccion</h2>
          <p className="lp-animate lp-delay-1 text-center text-sm mb-5" style={{ color: MUTED }}>Pago al recibir · Envio gratis · Garantia 30 dias</p>

          <div className="lp-animate lp-delay-1 flex justify-center mb-8">
            <div className="pulse inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white" style={{ backgroundColor: INK, border: `2px solid ${ORANGE}`, boxShadow: `0 4px 20px rgba(230,92,0,0.3)` }}>
              <Timer size={16} style={{ color: ORANGE }} />
              <span>Oferta termina en <span className="tabular-nums" style={{ color: ORANGE }}>{timer}</span></span>
            </div>
          </div>

          <div className="lp-animate lp-delay-1 space-y-4 mb-8">
            {BUNDLES.map((b) => (
              <div key={b.id} className={`bundle-card ${bundle.id === b.id ? "active" : ""}`} onClick={() => setBundle(b)}>
                {b.best && (
                  <div className="text-center py-2 text-xs font-bold tracking-widest text-white" style={{ backgroundColor: ORANGE }}>
                    MEJOR OFERTA — EL MAS ELEGIDO
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-base" style={{ color: INK }}>{b.shortName}</h3>
                      <p className="text-xs mt-0.5" style={{ color: MUTED }}>{b.note}</p>
                    </div>
                    <div className="text-right ml-3 shrink-0">
                      <p className="text-xs text-gray-400 line-through">&#8353;{b.oldPrice.toLocaleString()}</p>
                      <p className="font-bold text-2xl leading-none" style={{ color: ORANGE }}>&#8353;{b.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: ORANGE }}>{b.save}</span>
                    <span className="text-xs flex items-center gap-1" style={{ color: MUTED }}><Truck size={11} /> Envio gratis</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Color:</p>
                    <div className="flex gap-2 flex-wrap">
                      {(COLOR_OPTIONS[b.id === "1x" ? 1 : b.id === "2x" ? 2 : 3] ?? []).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSelectedColors(prev => ({ ...prev, [b.id]: opt })); }}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 transition-all text-xs font-medium"
                          style={{
                            borderColor: selectedColors[b.id]?.id === opt.id ? ORANGE : BORDER,
                            backgroundColor: selectedColors[b.id]?.id === opt.id ? "rgba(192,105,10,0.08)" : WHITE,
                            color: INK,
                          }}
                        >
                          <div className="flex gap-0.5">
                            {opt.dots.map((c, i) => (
                              <span key={i} className="inline-block w-3.5 h-3.5 rounded-full border border-gray-200"
                                style={{
                                  background: c === PRODUCT_ORANGE
                                    ? `radial-gradient(circle at 35% 35%, #FF8C40, ${PRODUCT_ORANGE} 70%)`
                                    : `radial-gradient(circle at 35% 35%, #E8E8E8, #888 70%)`,
                                }}
                              />
                            ))}
                          </div>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); openCheckout(b); }}
                    className="cta-btn w-full py-3.5 rounded-2xl text-white font-bold text-sm tracking-wider active:scale-95 transition-transform"
                    style={{ backgroundColor: ORANGE }}
                  >
                    ORDENAR AHORA
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lp-animate rounded-2xl p-5" style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { Icon: ShieldCheck, text: "Pago 100% seguro al recibir" },
                { Icon: Truck, text: "Envio gratis a todo CR" },
                { Icon: BatteryCharging, text: "Garantia 30 dias" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: INK }}>
                  <Icon size={13} style={{ color: ORANGE }} /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FAQ ══════════════════ */}
      <section className="py-16 px-5" style={{ backgroundColor: BG }}>
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-2xl font-bold text-center mb-6" style={{ color: INK }}>Preguntas frecuentes</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="lp-animate rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}`, backgroundColor: WHITE }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left">
                  <span className="font-semibold text-sm" style={{ color: INK }}>{q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-gray-400 shrink-0 mt-0.5" /> : <ChevronDown size={16} className="text-gray-400 shrink-0 mt-0.5" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 pt-3 text-xs leading-relaxed" style={{ color: MUTED, borderTop: `1px solid ${BORDER}` }}>
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="py-20 px-5 text-center" style={{ backgroundColor: NIGHT }}>
        <div className="max-w-lg mx-auto">
          <h2 className="lp-animate text-3xl font-bold text-white mb-3 leading-tight">
            Esta noche, tu cargador volvera a quedar enchufado.<br />
            <span style={{ color: ORANGE }}>Con proteccion o sin ella?</span>
          </h2>
          <p className="lp-animate lp-delay-1 text-sm mb-8" style={{ color: "#9CA3AF" }}>
            1,247 familias ya protegidas. Envio gratis. Pago al recibir. Garantia 30 dias.
          </p>
          <a
            href="#oferta"
            className="lp-animate lp-delay-2 cta-btn inline-block px-10 py-4 rounded-2xl font-bold text-sm tracking-widest text-white active:scale-95 transition-transform"
            style={{ backgroundColor: ORANGE }}
          >
            ELEGIR MI PACK — DESDE &#8353;17,700
          </a>
          <p className="lp-animate lp-delay-3 text-xs mt-4" style={{ color: "#6B7280" }}>
            Envio gratis · Pago al recibir · Garantia 30 dias
          </p>
        </div>
      </section>

      <GuardCheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} variant={selectedVariant} preSelectedColor={bundle ? selectedColors[bundle.id] : undefined} />
    </div>
  );
}
