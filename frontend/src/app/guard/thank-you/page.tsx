"use client";

import { Suspense, useState, useEffect } from "react";
import { CheckCircle, Truck, Phone, RefreshCw, ShieldCheck, Package, Banknote, Clock, Award } from "lucide-react";
import { createOrder } from "@/lib/api";
import { trackPurchase } from "@/lib/pixels";

const THEMES: Record<string, {
  pageBg: string; card: string; cardBorder: string;
  accent: string; accentBg: string; accentLight: string;
  textPrimary: string; textMuted: string;
  totalBg: string;
  logoCircle: string; logoV: string; tagline: string;
}> = {
  "/guard": {
    pageBg: "#F4F4F6", card: "#FFFFFF", cardBorder: "#D1D5DB",
    accent: "#E65C00", accentBg: "rgba(230,92,0,0.10)", accentLight: "#FFF3ED",
    textPrimary: "#1A1A1A", textMuted: "#6B7280",
    totalBg: "#0C0C0C",
    logoCircle: "#E65C00", logoV: "#1A1A1A", tagline: "#E65C00",
  },
  "/guard-v2": {
    pageBg: "#FAFAFA", card: "#FFFFFF", cardBorder: "#E5E7EB",
    accent: "#E65C00", accentBg: "rgba(230,92,0,0.10)", accentLight: "#FFF3ED",
    textPrimary: "#1A1A1A", textMuted: "#6B7280",
    totalBg: "#111111",
    logoCircle: "#E65C00", logoV: "#1A1A1A", tagline: "#E65C00",
  },
  "/guard-v3": {
    pageBg: "#FFF8F0", card: "#FFFCF8", cardBorder: "#FFD5A8",
    accent: "#C0690A", accentBg: "rgba(192,105,10,0.12)", accentLight: "#FFF3E0",
    textPrimary: "#3D1A00", textMuted: "#9A6040",
    totalBg: "#2A0E00",
    logoCircle: "#E65C00", logoV: "#1A1A1A", tagline: "#C0690A",
  },
};
const DEFAULT_THEME = THEMES["/guard"];

interface OrderItem { product_name: string; quantity: number; price_per_item: number; }
interface Addr { name: string; phone: string; state: string; city: string; distrito: string; address: string; reference: string; }

function GuardThankYouContent() {
  const [orderData, setOrderData] = useState<{
    orderId: string;
    total: number;
    addr: Addr | null;
    items: OrderItem[];
  } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("guard_pixel_purchase");
      if (raw) {
        const { value, eventId, phone } = JSON.parse(raw);
        sessionStorage.removeItem("guard_pixel_purchase");
        trackPurchase(value, eventId, phone);
      }
    } catch {}
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadOrder = async () => {
      let storedOrderId: number | null = null;
      let fallbackData: typeof orderData = null;

      try {
        const raw = sessionStorage.getItem("guard_order") ?? localStorage.getItem("guard_order");
        console.log("[thank-you] raw guard_order:", raw);
        if (raw) {
          const parsed = JSON.parse(raw);
          console.log("[thank-you] parsed addr from storage:", parsed.addr);
          storedOrderId = typeof parsed.orderId === "number" ? parsed.orderId : parseInt(parsed.orderId) || null;
          fallbackData = {
            orderId: String(parsed.orderId ?? "-"),
            total: parseFloat(parsed.total ?? "0"),
            addr: parsed.addr ?? null,
            items: parsed.items ?? [],
          };
        }
      } catch (e) {
        console.error("[thank-you] error parsing guard_order:", e);
      }

      if (fallbackData && !cancelled) {
        console.log("[thank-you] using fallback data from storage");
        setOrderData(fallbackData);
      }
    };

    loadOrder();
    return () => { cancelled = true; };
  }, []);

  const orderId = orderData?.orderId ?? "-";
  const total = orderData?.total ?? 0;
  const addr = orderData?.addr;
  const items = orderData?.items ?? [];
  const isExpress = items.some((i: OrderItem) => i.product_name.includes("Envío Express"));

  const [connectionWarning, setConnectionWarning] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [retrySuccess, setRetrySuccess] = useState(false);
  const [retryFailed, setRetryFailed] = useState(false);
  const [sourcePage, setSourcePage] = useState("/guard");
  const theme = THEMES[sourcePage] ?? DEFAULT_THEME;

  useEffect(() => {
    const src = localStorage.getItem("guard_source");
    if (src) setSourcePage(src);
  }, []);

  const handleRetry = async () => {
    if (!addr || items.length === 0 || retrying) return;
    setRetrying(true);
    try {
      await createOrder({
        customer_name: addr.name,
        customer_phone: addr.phone,
        customer_state: addr.state,
        customer_city: addr.city,
        customer_distrito: addr.distrito,
        customer_address: addr.address,
        customer_reference: addr.reference,
        items,
        is_upsell_accepted: false,
        total_price: total,
        browser_event_id: null,
      });
      setConnectionWarning(false);
      setRetrySuccess(true);
    } catch {
      setRetryFailed(true);
    } finally {
      setRetrying(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const s = sessionStorage.getItem("order_status");
      if (s === "failed") { setConnectionWarning(true); sessionStorage.removeItem("order_status"); clearInterval(interval); }
      else if (s === "confirmed") { sessionStorage.removeItem("order_status"); clearInterval(interval); }
    }, 500);
    const stop = setTimeout(() => { clearInterval(interval); sessionStorage.removeItem("order_status"); }, 10000);
    return () => { clearInterval(interval); clearTimeout(stop); };
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: theme.pageBg }}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: theme.logoCircle }}>
          <span className="font-bold text-lg leading-none" style={{ color: theme.logoV }}>V</span>
        </div>
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: theme.accent, borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: theme.pageBg }}>
      <div className="w-full max-w-md mx-auto">

        {/* Brand header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: theme.logoCircle }}>
            <span className="font-bold text-lg leading-none" style={{ color: theme.logoV }}>V</span>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-bold text-xl tracking-tight" style={{ color: theme.textPrimary }}>VAZLINA</span>
            <span className="text-[10px] font-semibold mt-0.5 tracking-widest uppercase" style={{ color: theme.accent }}>Tecnología curada</span>
          </div>
        </div>

        {/* Success hero */}
        <div className="rounded-2xl p-6 text-center mb-4 shadow-sm border" style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: theme.accentBg }}>
            <CheckCircle size={28} style={{ color: theme.accent }} />
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: theme.textPrimary }}>¡Pedido Confirmado!</h1>
          <p className="text-sm mb-4" style={{ color: theme.textMuted }}>Pedido <span className="font-bold" style={{ color: theme.textPrimary }}>#{orderId}</span></p>

          <div className="rounded-xl px-5 py-4 text-center" style={{ backgroundColor: theme.totalBg }}>
            <p className="text-[10px] tracking-widest uppercase mb-1 font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Total a pagar al recibir</p>
            <p className="text-3xl font-extrabold text-white">₡{total.toLocaleString()} <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>CRC</span></p>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex items-center justify-center">
            {["/images/products/review-ana.jpg","/images/products/review-sofia.jpg","/images/products/review-carlos.jpg","/images/products/review-maria.jpg","/images/products/review-laura.jpg"].map((src, i) => (
              <img key={i} src={src} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" style={{ marginLeft: i === 0 ? 0 : -12 }} />
            ))}
          </div>
          <div className="flex gap-0.5 justify-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ))}
          </div>
          <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>+1,437 CLIENTES SATISFECHOS CON VAZLINA</p>
        </div>

        {/* What happens next — 3 steps */}
        <div className="rounded-2xl p-5 mb-4 border shadow-sm" style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}>
          <p className="font-bold text-sm mb-4" style={{ color: theme.textPrimary }}>¿Qué sigue ahora?</p>
          <div className="space-y-4">
            {[
              { icon: Phone, step: "1", title: "Te llamamos para confirmar", desc: "Nuestro equipo te contactará en las próximas horas para verificar tu pedido y dirección." },
              { icon: Truck, step: "2", title: isExpress ? "Envío Express (1-3 días)" : "Preparamos y enviamos (2-5 días)", desc: isExpress ? "Tu pedido sale con prioridad y llega en 1-3 días hábiles." : "Empacamos tu producto y lo enviamos a tu dirección." },
              { icon: Banknote, step: "3", title: "Pagás al recibir — ₡0 ahora", desc: "No pagás nada por adelantado. Solo pagás cuando tenés el producto en tus manos." },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white" style={{ backgroundColor: theme.accent }}>{step}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight mb-0.5" style={{ color: theme.textPrimary }}>{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: Banknote, label: "Pago al recibir", sub: "₡0 por adelantado" },
            { icon: Truck, label: isExpress ? "Envío Express" : "Envío gratis", sub: isExpress ? "1-3 días hábiles" : "A todo Costa Rica" },
            { icon: ShieldCheck, label: "Garantía 30 días", sub: "Devolución sin preguntas" },
            { icon: Award, label: "Calidad certificada", sub: "Tecnología probada" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="rounded-xl p-3 border text-center shadow-sm" style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}>
              <Icon size={20} style={{ color: theme.accent }} className="mx-auto mb-1.5" />
              <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{label}</p>
              <p className="text-[10px]" style={{ color: theme.textMuted }}>{sub}</p>
            </div>
          ))}
        </div>

        {connectionWarning && !retrySuccess && (
          <div className="rounded-xl p-4 border mb-4" style={{ backgroundColor: "#fffbeb", borderColor: "#fcd34d" }}>
            <p className="font-semibold text-sm text-yellow-800 mb-1">⚠️ Problema de conexión detectado</p>
            <p className="text-xs text-yellow-700 mb-3 leading-relaxed">Parece que tu conexión era débil. Tu pedido puede no haberse registrado. Presioná el botón para intentarlo de nuevo.</p>
            <button onClick={handleRetry} disabled={retrying} className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold transition-all disabled:opacity-60" style={{ backgroundColor: "#d97706" }}>
              <RefreshCw size={13} className={retrying ? "animate-spin" : ""} />
              {retrying ? "Reintentando..." : "Reintentar pedido"}
            </button>
            {retryFailed && <p className="text-red-600 text-xs font-semibold mt-2">❌ Sigue sin conexión. Atendé nuestra llamada para confirmar.</p>}
          </div>
        )}
        {retrySuccess && (
          <div className="rounded-xl p-4 border text-green-800 text-sm font-semibold mb-4" style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac" }}>
            ✓ Pedido registrado correctamente.
          </div>
        )}

        {/* Order summary */}
        {items.length > 0 && (
          <div className="rounded-2xl overflow-hidden mb-4 border shadow-sm" style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}>
            <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: theme.cardBorder }}>
              <Package size={14} style={{ color: theme.accent }} />
              <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>Resumen del pedido</p>
            </div>
            <div className="divide-y" style={{ borderColor: theme.cardBorder }}>
              {items.map((item: OrderItem, i: number) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.textPrimary }}>{item.product_name}</p>
                    <p className="text-xs" style={{ color: theme.textMuted }}>x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: theme.accent }}>₡{(item.price_per_item * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: theme.accentBg }}>
              <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>Total a pagar al recibir</p>
              <p className="font-bold text-lg" style={{ color: theme.accent }}>₡{total.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Delivery address */}
        {addr && (
          <div className="rounded-2xl p-5 mb-4 border shadow-sm" style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}>
            <div className="flex items-center gap-2 mb-3">
              <Truck size={14} style={{ color: theme.accent }} />
              <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>Dirección de entrega</p>
            </div>
            <div className="space-y-2.5 text-xs">
              {[
                ["Nombre", addr.name], ["Teléfono", addr.phone], ["Provincia", addr.state],
                ["Cantón", addr.city], ["Distrito", addr.distrito], ["Dirección", addr.address], ["Referencia", addr.reference],
              ].map(([label, value]) => value ? (
                <div key={label} className="flex gap-2">
                  <span className="w-20 shrink-0 font-semibold" style={{ color: theme.textMuted }}>{label}</span>
                  <span className="break-words" style={{ color: theme.textPrimary }}>{value}</span>
                </div>
              ) : null)}
            </div>
          </div>
        )}

        {/* Important notice */}
        <div className="rounded-2xl p-4 mb-4 border-2 border-dashed" style={{ borderColor: theme.accent, backgroundColor: theme.accentLight }}>
          <div className="flex gap-3 items-start">
            <Phone size={18} style={{ color: theme.accent }} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>Importante: Atendé nuestra llamada</p>
              <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>Nuestro equipo te llamará pronto para confirmar tu pedido. Si no contestás, intentaremos de nuevo. Es necesario para coordinar la entrega.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <a href={sourcePage} className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-xl text-sm font-bold tracking-wider transition-all active:scale-[0.98] hover:opacity-90 shadow-md" style={{ backgroundColor: theme.accent, color: "#fff" }}>
            VOLVER AL INICIO
          </a>
        </div>

        <p className="text-center text-xs pb-4" style={{ color: theme.textMuted }}>© Vazlina — Tecnología curada para tu hogar</p>
      </div>
    </div>
  );
}

export default function GuardThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0A", color: "#E65C00" }}><p className="text-gray-400">Cargando...</p></div>}>
      <GuardThankYouContent />
    </Suspense>
  );
}
