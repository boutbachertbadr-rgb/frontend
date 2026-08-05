"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Phone, Truck, Banknote, Award, Star, MapPin, User, Package } from "lucide-react";
import { Suspense } from "react";

const REVIEW_AVATARS = [
  "/images/products/review-ana.jpg",
  "/images/products/review-sofia.jpg",
  "/images/products/review-carlos.jpg",
  "/images/products/review-maria.jpg",
  "/images/products/review-laura.jpg",
];

function productSlug(name: string): string {
  const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (n.includes("guardian")) return "vazlina-guardian";
  if (n.includes("brisa")) return "vazlina-brisa";
  if (n.includes("mariposa")) return "vazlina-mariposa";
  return "";
}

function productImage(name: string): string {
  const slug = productSlug(name);
  if (!slug) return "";
  return `/images/products/${slug.replace("vazlina-", "")}-hero.jpg`;
}

interface OrderItem { product_name: string; quantity: number; price_per_item: number; }
interface Addr { name: string; phone: string; state: string; city: string; distrito: string; address: string; reference: string; }

function ThankYouContent() {
  const params = useSearchParams();
  const orderId = params.get("order_id") ?? "-";
  const total = params.get("total") ?? "0";

  let addr: Addr | null = null;
  let orderItems: OrderItem[] = [];
  try { addr = JSON.parse(decodeURIComponent(params.get("addr") ?? "")); } catch {}
  try { orderItems = JSON.parse(decodeURIComponent(params.get("items") ?? "")); } catch {}

  const mainItems = orderItems.filter(i => i.product_name.toLowerCase().includes("unidad"));
  const upsellItems = orderItems.filter(i => !i.product_name.toLowerCase().includes("unidad"));

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full space-y-5">

        {/* Social Proof Row */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center">
            {REVIEW_AVATARS.map((src, i) => (
              <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden -ml-3 first:ml-0 shadow-sm">
                <Image src={src} alt="" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="text-accent fill-accent" />
            ))}
          </div>
          <p className="font-bold text-sm text-text-primary">+6,534 CLIENTES SATISFECHOS CON VAZLINA</p>
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center justify-around text-center">
          <div className="flex flex-col items-center gap-1">
            <Truck size={20} className="text-brand" />
            <p className="text-[11px] font-bold text-text-primary uppercase tracking-wide">Envío rápido</p>
            <p className="text-[10px] text-text-secondary">3-5 días CR</p>
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

        {/* Main Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-brand p-6 text-center text-white">
            <CheckCircle size={48} className="mx-auto mb-3" strokeWidth={1.5} />
            <h1 className="font-heading font-bold text-2xl">¡Pedido recibido!</h1>
            <p className="text-white/80 text-sm mt-1">Orden #{orderId}</p>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-center text-gray-600 text-sm">
              Gracias por confiar en nosotros. Pronto recibirás una llamada para confirmar tu pedido.
            </p>

            {/* Customer Info */}
            {addr && (
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-subtle px-4 py-2.5 flex items-center gap-2 border-b border-border">
                  <User size={14} className="text-brand" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Información del cliente</p>
                </div>
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nombre</span>
                    <span className="font-semibold text-gray-900">{addr.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Teléfono</span>
                    <span className="font-semibold text-gray-900">{addr.phone}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Address */}
            {addr && (
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-subtle px-4 py-2.5 flex items-center gap-2 border-b border-border">
                  <MapPin size={14} className="text-brand" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Dirección de entrega</p>
                </div>
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Provincia</span>
                    <span className="font-semibold text-gray-900">{addr.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cantón</span>
                    <span className="font-semibold text-gray-900">{addr.city}</span>
                  </div>
                  {addr.distrito && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Distrito</span>
                      <span className="font-semibold text-gray-900">{addr.distrito}</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400 shrink-0">Dirección</span>
                    <span className="font-semibold text-gray-900 text-right">{addr.address}</span>
                  </div>
                  {addr.reference && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400 shrink-0">Referencia</span>
                      <span className="font-semibold text-gray-900 text-right">{addr.reference}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Products */}
            {orderItems.length > 0 && (
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-subtle px-4 py-2.5 flex items-center gap-2 border-b border-border">
                  <Package size={14} className="text-brand" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Productos pedidos</p>
                </div>
                <div className="divide-y divide-border">
                  {mainItems.map((item, i) => {
                    const img = productImage(item.product_name);
                    return (
                      <div key={i} className="flex items-center gap-3 px-4 py-3">
                        {img && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-border bg-white">
                            <Image src={img} alt={item.product_name} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{item.product_name}</p>
                          <p className="text-xs text-gray-400">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 shrink-0">₡{(item.price_per_item * item.quantity).toLocaleString("es-CR")}</p>
                      </div>
                    );
                  })}
                  {upsellItems.map((item, i) => {
                    const img = productImage(item.product_name);
                    return (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 bg-orange-50/60">
                        {img && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-orange-200 bg-white">
                            <Image src={img} alt={item.product_name} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900 truncate">{item.product_name}</p>
                            <span className="text-[9px] font-bold bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full uppercase shrink-0">Oferta</span>
                          </div>
                          <p className="text-xs text-gray-400">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-orange-600 shrink-0">₡{(item.price_per_item * item.quantity).toLocaleString("es-CR")}</p>
                      </div>
                    );
                  })}
                  {/* Total row */}
                  <div className="flex items-center justify-between px-4 py-3 bg-subtle">
                    <span className="text-sm font-bold text-gray-700">Total a pagar al recibir</span>
                    <span className="text-lg font-bold text-brand">₡{parseFloat(total).toLocaleString("es-CR")} CRC</span>
                  </div>
                </div>
              </div>
            )}

            {/* Important Call */}
            <div className="bg-brand-light border border-brand/20 rounded-xl p-4 flex gap-3 items-start">
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
              className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full border-2 border-brand text-brand font-bold text-sm hover:bg-brand hover:text-white transition-colors"
            >
              Explora más soluciones
            </Link>
          </div>
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
