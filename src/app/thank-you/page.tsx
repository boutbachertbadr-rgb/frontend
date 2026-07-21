"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Phone, Truck, Banknote, Award, Star } from "lucide-react";
import { Suspense } from "react";

const REVIEW_AVATARS = [
  "/images/products/review-ana.jpg",
  "/images/products/review-sofia.jpg",
  "/images/products/review-carlos.jpg",
  "/images/products/review-maria.jpg",
  "/images/products/review-laura.jpg",
];

function ThankYouContent() {
  const params = useSearchParams();
  const orderId = params.get("order_id") ?? "-";
  const total = params.get("total") ?? "0";
  const upsell = params.get("upsell") === "true";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full space-y-5">
        {/* Social Proof Row */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center">
            {REVIEW_AVATARS.map((src, i) => (
              <div
                key={i}
                className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden -ml-3 first:ml-0 shadow-sm"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="text-accent fill-accent" />
            ))}
          </div>
          <p className="font-bold text-sm text-text-primary">
            +6,534 CLIENTES SATISFECHOS CON VAZLINA
          </p>
        </div>

        {/* Trust Badges Bar — COD Mexico Dropshipping */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center justify-around text-center">
          <div className="flex flex-col items-center gap-1">
            <Truck size={20} className="text-brand" />
            <p className="text-[11px] font-bold text-text-primary uppercase tracking-wide">Envío rápido</p>
            <p className="text-[10px] text-text-secondary">3-5 días MX</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col items-center gap-1">
            <Banknote size={20} className="text-brand" />
            <p className="text-[11px] font-bold text-text-primary uppercase tracking-wide">Pago contra entrega</p>
            <p className="text-[10px] text-text-secondary">Sin tarjeta</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col items-center gap-1">
            <Award size={20} className="text-brand" />
            <p className="text-[11px] font-bold text-text-primary uppercase tracking-wide">Garantía 30 días</p>
            <p className="text-[10px] text-text-secondary">Sin preguntas</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center space-y-5">
          <CheckCircle size={56} className="text-brand mx-auto" strokeWidth={1.5} />
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl">¡Tu solución está en camino!</h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Gracias por confiar en nosotros. Pronto recibirás una llamada para confirmar tu pedido.
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-subtle rounded-xl p-4 text-left space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Tu pedido</span>
              <span className="font-bold">#{orderId}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total a pagar al recibir</span>
              <span className="font-bold text-brand">₡{(parseFloat(total) * 28).toLocaleString("es-CR")} CRC</span>
            </div>
            {upsell && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Experiencia completa</span>
                <span className="font-semibold text-brand">Incluida ✓</span>
              </div>
            )}
          </div>

          {/* Important Call */}
          <div className="bg-brand-light border border-brand/20 rounded-xl p-4 flex gap-3 items-start text-left">
            <Phone size={20} className="text-brand shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Importante: Atiende nuestra llamada</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Te llamaremos para confirmar tu pedido y coordinar la entrega. Pagas al recibir, cuando ya tienes tu solución en las manos.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-brand text-brand font-bold text-sm hover:bg-brand hover:text-white transition-colors"
          >
            Explora más soluciones
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
