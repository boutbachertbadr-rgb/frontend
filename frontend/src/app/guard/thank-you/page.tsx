"use client";

import { Suspense, useState, useEffect } from "react";
import { CheckCircle, Truck, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import { createOrder } from "@/lib/api";

const ACCENT = "#111111";
const ACCENT_D = "#C9CDD3";
const NIGHT = "#14161A";
const IVORY = "#F5F2EC";

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
      const raw = sessionStorage.getItem("guard_order");
      if (raw) {
        const parsed = JSON.parse(raw);
        setOrderData({
          orderId: String(parsed.orderId ?? "-"),
          total: parseFloat(parsed.total ?? "0"),
          addr: parsed.addr ?? null,
          items: parsed.items ?? [],
        });
      }
    } catch {}
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 font-body" style={{ backgroundColor: IVORY }}>
      <div className="w-full max-w-md space-y-5">

        <div className="flex items-center justify-center gap-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: ACCENT }}>
            <span className="font-heading font-bold text-base leading-none text-white">V</span>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-heading font-bold text-lg tracking-tight" style={{ color: NIGHT }}>VAZLINA</span>
            <span className="text-[10px] font-medium mt-0.5 tracking-widest uppercase text-gray-400">Tecnología curada</span>
          </div>
        </div>

        <div className="rounded-3xl p-6 text-center" style={{ backgroundColor: NIGHT }}>
          <CheckCircle size={44} className="mx-auto mb-3" style={{ color: ACCENT_D }} />
          <h1 className="text-2xl font-bold text-white mb-1">¡Pedido Confirmado!</h1>
          <p className="text-gray-400 text-sm">Pedido #{orderId}</p>
          <div className="mt-4 inline-block px-5 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: ACCENT_D }}>
            Total a pagar al recibir: ₡{total} CRC
          </div>
          <p className="text-gray-500 text-xs mt-3 flex items-center justify-center gap-1">
            <ShieldCheck size={12} /> Nuestro equipo te contactará lo antes posible para confirmar tu pedido
          </p>
        </div>

        {connectionWarning && !retrySuccess && (
          <div className="rounded-2xl p-4 border" style={{ backgroundColor: "#fffbeb", borderColor: "#fcd34d" }}>
            <p className="font-semibold text-sm text-yellow-800 mb-1">⚠️ Problema de conexión detectado</p>
            <p className="text-xs text-yellow-700 mb-3 leading-relaxed">Parece que tu conexión era débil. Tu pedido puede no haberse registrado. Presioná el botón para intentarlo de nuevo.</p>
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold transition-all disabled:opacity-60"
              style={{ backgroundColor: "#d97706" }}
            >
              <RefreshCw size={13} className={retrying ? "animate-spin" : ""} />
              {retrying ? "Reintentando..." : "Reintentar pedido"}
            </button>
            {retryFailed && <p className="text-red-600 text-xs font-semibold mt-2">❌ Sigue sin conexión. Atendé nuestra llamada para confirmar.</p>}
          </div>
        )}
        {retrySuccess && (
          <div className="rounded-2xl p-4 border text-green-800 text-sm font-semibold" style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac" }}>
            ✓ Pedido registrado correctamente.
          </div>
        )}

        {items.length > 0 && (
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="font-semibold text-sm" style={{ color: NIGHT }}>Tu pedido</p>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item: OrderItem, i: number) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: NIGHT }}>{item.product_name}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: ACCENT }}>₡{item.price_per_item * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 flex items-center justify-between border-t border-gray-100">
              <p className="font-bold text-sm" style={{ color: NIGHT }}>Total</p>
              <p className="font-bold text-base" style={{ color: ACCENT }}>₡{total} CRC</p>
            </div>
          </div>
        )}

        {addr && (
          <div className="rounded-2xl p-5 bg-white border border-gray-200">
            <p className="font-semibold text-sm mb-3" style={{ color: NIGHT }}>Dirección de entrega</p>
            <div className="text-xs text-gray-500 space-y-1 leading-relaxed">
              <p><strong className="text-gray-700">{addr.name}</strong> · {addr.phone}</p>
              <p>{addr.address}</p>
              <p>{addr.distrito}, {addr.city}, {addr.state}</p>
              {addr.reference && <p className="text-gray-400">Ref: {addr.reference}</p>}
            </div>
            <p className="text-xs mt-4 pt-3 border-t border-gray-100" style={{ color: ACCENT }}>
              ✓ Verificá que tus datos estén correctos. Si algo está mal, avisanos cuando te llamemos y lo corregimos al momento.
            </p>
          </div>
        )}

        <div className="rounded-2xl p-5" style={{ backgroundColor: "#EDE7DC" }}>
          <div className="flex gap-3 items-start mb-4">
            <Truck size={20} style={{ color: ACCENT }} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: NIGHT }}>{isExpress ? "Envío Express · Pago al Recibir" : "Envío Gratis · Pago al Recibir"}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{isExpress ? "Recibirás tu pedido en 1-3 días hábiles (envío express)." : "Recibirás tu pedido en 2-5 días hábiles."} Pagás únicamente cuando tengás el producto en tus manos.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Phone size={20} style={{ color: ACCENT }} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: NIGHT }}>Importante: Atendé nuestra llamada</p>
              <p className="text-xs text-gray-600 leading-relaxed">Nuestro equipo se pondrá en contacto con vos lo antes posible para confirmar tu pedido y coordinar la entrega. La llamada puede venir de un número desconocido — por favor atendela.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-gray-500">
          <span className="flex items-center gap-1"><ShieldCheck size={13} style={{ color: ACCENT }} /> Garantía 30 días</span>
          <span>🏅 Calidad certificada</span>
          <span>💳 Pago al recibir</span>
        </div>

        <p className="text-center text-xs text-gray-400 pb-6">Gracias por proteger lo que más importa 🤍</p>
      </div>
    </div>
  );
}

export default function GuardThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: IVORY }}><p className="text-gray-400">Cargando...</p></div>}>
      <GuardThankYouContent />
    </Suspense>
  );
}
