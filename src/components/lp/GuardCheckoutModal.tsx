"use client";

import { useState, useEffect } from "react";
import { X, ShieldCheck, Truck, ChevronDown, Zap, ChevronLeft } from "lucide-react";
import { sendOrderToSheet } from "@/lib/sheets";
import { generateEventId } from "@/lib/pixels";

const PROVINCES: { name: string; id: string }[] = [
  { name: "Alajuela", id: "a2paa1lUekxWZmUwOG9jQ0trUTF5dz09" },
  { name: "Cartago", id: "UEo1cWQ5Skp4cnBSd0dGNHVmZ1pmdz09" },
  { name: "Guanacaste", id: "ZDJSSWpzN2JnU1BuMFY5Q3plRXlZZz09" },
  { name: "Heredia", id: "a0FaYTNUcmlZYzdURGtVbVpKOVRlZz09" },
  { name: "Limón", id: "bUc5V0doZERGREZiaXZsT2tweTdGdz09" },
  { name: "Puntarenas", id: "a1RJdWoxdFR1c2czZHZ6Q2FyTGx6dz09" },
  { name: "San José", id: "cHNid0Z1MGVJK25KeXpWcC9PUzVOQT09" },
];

const CITIES_BY_PROVINCE: Record<string, { name: string; id: string }[]> = {
  "a2paa1lUekxWZmUwOG9jQ0trUTF5dz09": [
    { name: "Alajuela", id: "a2paa1lUekxWZmUwOG9jQ0trUTF5dz09" },
    { name: "Atenas", id: "bThBbkhLdEh4ay9xd1Y0WEUxTmJyZz09" },
    { name: "Grecia", id: "WnVJQWI4Tm5xQXVEMkRCRXZTL2R4Zz09" },
    { name: "Guatuso", id: "eFplY0xUT0R6MzJ5VEtlNzkrbGF3QT09" },
    { name: "Los Chiles", id: "QURpU0Q0QXBDSlM1YWJDWkZCajVnUT09" },
    { name: "Naranjo", id: "dVJDZTJrN0hvRC84YXFMSFQva3BlUT09" },
    { name: "Orotina", id: "WHFkdmFJeWFxYllQK1l0S3UrZTM0QT09" },
    { name: "Palmares", id: "VVdZeHhtMGtqbHhtSCsxZ2NIdzdzdz09" },
    { name: "Poás", id: "OFllemNNU0dhY3B2ODdFamxKRUEwUT09" },
    { name: "Río Cuarto", id: "L3o1Nm9BMHFpSUdIcUwrNzdEOGNXdz09" },
    { name: "San Carlos", id: "WFNHd29ocldLZFZnODVHUURyYVFiZz09" },
    { name: "San Mateo", id: "MFdMdE9jVmg0QldnVlkzR0ZDZnNpZz09" },
    { name: "San Ramón", id: "cEpIR1FzVkIxOVFsNHduYUg2SnhiZz09" },
    { name: "Sarchí", id: "VDVVNmdqaGMreWVSK1h5QXpMaFZkZz09" },
    { name: "Upala", id: "aGZXeU4xTlRteFg5L2RvYkJJL0tRQT09" },
    { name: "Zarcero", id: "VnRMZWFRT0JXOGJJbnlBNXY2RnUrQT09" },
  ],
  "UEo1cWQ5Skp4cnBSd0dGNHVmZ1pmdz09": [
    { name: "Alvarado", id: "UEo1cWQ5Skp4cnBSd0dGNHVmZ1pmdz09" },
    { name: "Cartago", id: "bVc3K0xsMmFPSlROUjloSzUwMzl3QT09" },
    { name: "El Guarco", id: "bzd4M2E4NjlQRkNoQlV6akY1R3hnQT09" },
    { name: "Jiménez", id: "N3loZG9sSndzNGkrK0E2ZGU2M3Q5QT09" },
    { name: "La Unión", id: "cy9GZXRKeXhXWlFxbS9zbWdVd3FHdz09" },
    { name: "Oreamuno", id: "TWNlTFFrZy9Tb3dlN1VpOHFucm5QZz09" },
    { name: "Paraíso", id: "YlNNcSs1UHJ3MGF6KzhpK05jL0dCQT09" },
    { name: "Turrialba", id: "WHVvM09IczB5bkFabTlvOXVrZk5ndz09" },
  ],
  "ZDJSSWpzN2JnU1BuMFY5Q3plRXlZZz09": [
    { name: "Abangares", id: "ZDJSSWpzN2JnU1BuMFY5Q3plRXlZZz09" },
    { name: "Bagaces", id: "VndmM1ZsZnN5V0tnRkdsOTJNY0Qvdz09" },
    { name: "Cañas", id: "VDEzTW5VL2NHNGNUeDN3aEhZanVaQT09" },
    { name: "Carrillo", id: "L28xaUZMMjhUTVBvRHcxd1p6QVFzdz09" },
    { name: "Hojancha", id: "MGVUODVqcU5xREc2L3VySDJuWFVBQT09" },
    { name: "La Cruz", id: "WGt4UFZUYTViczdkakpyUTRpWWJlZz09" },
    { name: "Liberia", id: "OFR2a240UnQ3V1JjczVjL2trRUhYdz09" },
    { name: "Nandayure", id: "NEpBT0pIaTVEYjYyU2RNeFJvc2Zsdz09" },
    { name: "Nicoya", id: "SUk5VWFwT1o3VjlWbGpPdC9TYW1MUT09" },
    { name: "Santa Cruz", id: "UWZvcSt4dW4wcCtHZkZXTlZNRzUrdz09" },
    { name: "Tilarán", id: "S0pxZ2xuZ2dnOXJJRWd0ekkvRWZTUT09" },
  ],
  "a0FaYTNUcmlZYzdURGtVbVpKOVRlZz09": [
    { name: "Barva", id: "a0FaYTNUcmlZYzdURGtVbVpKOVRlZz09" },
    { name: "Belén", id: "T0ZBZUM1QVlwYUpNa2wvNkQ3aUt0QT09" },
    { name: "Flores", id: "bzFEU2g3VU0wNlpVZGtuZ1N4QXpQZz09" },
    { name: "Heredia", id: "dklkS1NzTnVLVS94ci92T0JQekZuUT09" },
    { name: "San Isidro", id: "V0xwU0ZPaUs4TjZEZDUyYTZJV2lBdz09" },
    { name: "San Pablo", id: "UXkwVXRVZWUraWJGOElPY3c3alRPdz09" },
    { name: "San Rafael", id: "dzV1bUFXMldLRXVua2JxYjR2WHR0UT09" },
    { name: "Santa Bárbara", id: "c0Jkc01mQ1Q0SlFSZnR4eTI3Y0psdz09" },
    { name: "Santo Domingo", id: "K3dSdTA3N0FIS3pVVkYwYkV1SVNjZz09" },
    { name: "Sarapiquí", id: "VndrTHFwbVRLSFFsQVlOU29GWU02dz09" },
  ],
  "bUc5V0doZERGREZiaXZsT2tweTdGdz09": [
    { name: "Guácimo", id: "bUc5V0doZERGREZiaXZsT2tweTdGdz09" },
    { name: "Limón", id: "NGFNZGFKcDdnaVFzRWtJSnI2ZW1PQT09" },
    { name: "Matina", id: "N0wxekJ2c2E3R1Rxanhaa1M0OVBhUT09" },
    { name: "Pococí", id: "ejY3alNneEN2am5kdlVlR2lObllrZz09" },
    { name: "Siquirres", id: "OG5ha1F3RmZtZVNZNUs4aWtpYzg5Zz09" },
    { name: "Talamanca", id: "dzkxcUVNZlZRd2dJc2liVDJlVlVGZz09" },
  ],
  "a1RJdWoxdFR1c2czZHZ6Q2FyTGx6dz09": [
    { name: "Buenos Aires", id: "a1RJdWoxdFR1c2czZHZ6Q2FyTGx6dz09" },
    { name: "Corredores", id: "cmptcExIQlFBY1dYUzNJMkNuNzQrQT09" },
    { name: "Coto Brus", id: "aExFb003dnUraE5vQUwrVjRkTGJlQT09" },
    { name: "Esparza", id: "S2dIOHNOenpucHMvaG96OERrVmgvUT09" },
    { name: "Garabito", id: "MzR0SUIvd2d3U05HYUVGcUNpVFNZdz09" },
    { name: "Golfito", id: "dnNtTzFpUG1ZazNPUkQzQnhZYUl2UT09" },
    { name: "Montes de Oro", id: "ZW9HaWZWN0diMStzVS8ycXYyNmlqQT09" },
    { name: "Monteverde", id: "TXpDdFlMbGVleUxCUVlhL1pmY0Radz09" },
    { name: "Osa", id: "OFUybmt2dUQ3Q2NpLzVJZUJERHRndz09" },
    { name: "Parrita", id: "ekRTVytrZ05vdDF0dUpmcXR6UXpEUT09" },
    { name: "Puerto Jiménez", id: "bjVOajB1QXZNN0NYYmdoSXgzZ29wZz09" },
    { name: "Puntarenas", id: "MElpZnE3d2lTRmJFdzYxU0NwL3ovZz09" },
    { name: "Quepos", id: "aWI0bEN3QkFYQjVoNmRSWWF4dFMyZz09" },
  ],
  "cHNid0Z1MGVJK25KeXpWcC9PUzVOQT09": [
    { name: "Acosta", id: "cHNid0Z1MGVJK25KeXpWcC9PUzVOQT09" },
    { name: "Alajuelita", id: "WXBsYlY4MGxqSTdyejV4SGZQeEtpdz09" },
    { name: "Aserrí", id: "K2R2bTBxRWJZUVpzdExSUmdqVUZkUT09" },
    { name: "Curridabat", id: "REtXOXI5Z1JHaWUzZE5YWndGbEFpQT09" },
    { name: "Desamparados", id: "VFZYWHBmSFRTQ3Y5VEVXZjZabCtZQT09" },
    { name: "Dota", id: "RmpkaFF0T3BraDJSRmJUcjdFbzI5QT09" },
    { name: "Escazú", id: "UEw1L1pLOTBGV3lRcFVucEM5WU0zdz09" },
    { name: "Goicoechea", id: "R1pOREh2MjRCZVRTOElxVWhubWFxUT09" },
    { name: "León Cortés Castro", id: "TTRYbUNMK0pjM0FQdVNHaVUxNHBmZz09" },
    { name: "Montes de Oca", id: "ajJpN3hBWHNwWUdXK2RYbThWNG1jQT09" },
    { name: "Mora", id: "Q1V1WkxhWjliRVd4RjNHcFdoZUhZdz09" },
    { name: "Moravia", id: "MUpUQVBRY242Rms3UmF1Rk95SjhKUT09" },
    { name: "Pérez Zeledón", id: "K1phdTQxL0kyR3d2SjhPZHVrQytKdz09" },
    { name: "Puriscal", id: "YUdGcVRKeGQzL0tjbUFXUkVxUUl5QT09" },
    { name: "San José", id: "bHczeHFzcnJFSWlNMnBzMW5TeWFmUT09" },
    { name: "Santa Ana", id: "Vk5YUWdIRUVHUXZIQ25JYVlOaXNiQT09" },
    { name: "Tarrazú", id: "WGNoRmJpdUUxZ3hBYzlHN0dwUk5rZz09" },
    { name: "Tibás", id: "Tzd0RGlOOUZzbFgvV3hQT25pTnJXdz09" },
    { name: "Turrubares", id: "U0FDVWt3cnVlb2lYZVk2TnJzQjlNZz09" },
    { name: "Vázquez de Coronado", id: "SnYvVzh2Zy9MVG9EdzNtNWxYS1k1QT09" },
  ],
};

export interface LPVariant {
  name: string;
  price: number;
  items: { product_name: string; quantity: number; price_per_item: number }[];
}

const ACCENT = "#E65C00";
const DARK = "#0A0A0A";
const LIGHT = "#FFFFFF";
const SOFT = "#F7F7F7";
const BORDER = "#D1D5DB";
const ORANGE_DOT = "#E65C00";
const SILVER_DOT = "#A0A0A0";

export interface ColorOption {
  id: string;
  label: string;
  dots: string[];
}

export const COLOR_OPTIONS: Record<number, ColorOption[]> = {
  1: [
    { id: "orange", label: "Naranja Metalico", dots: [ORANGE_DOT] },
    { id: "silver", label: "Plata Premium", dots: [SILVER_DOT] },
  ],
  2: [
    { id: "mix", label: "1 Naranja + 1 Plata", dots: [ORANGE_DOT, SILVER_DOT] },
    { id: "2orange", label: "2 Naranja Metalico", dots: [ORANGE_DOT, ORANGE_DOT] },
    { id: "2silver", label: "2 Plata Premium", dots: [SILVER_DOT, SILVER_DOT] },
  ],
  3: [
    { id: "2o1s", label: "2 Naranja + 1 Plata", dots: [ORANGE_DOT, ORANGE_DOT, SILVER_DOT] },
    { id: "1o2s", label: "1 Naranja + 2 Plata", dots: [ORANGE_DOT, SILVER_DOT, SILVER_DOT] },
    { id: "3orange", label: "3 Naranja Metalico", dots: [ORANGE_DOT, ORANGE_DOT, ORANGE_DOT] },
    { id: "3silver", label: "3 Plata Premium", dots: [SILVER_DOT, SILVER_DOT, SILVER_DOT] },
  ],
};

export default function GuardCheckoutModal({
  isOpen,
  onClose,
  variant,
  preSelectedColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  variant: LPVariant | null;
  preSelectedColor?: ColorOption;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [colorChoice, setColorChoice] = useState<ColorOption | null>(null);
  const [express, setExpress] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedProvince, setSelectedProvince] = useState("");
  const EXPRESS_FEE = 2000;
  const total = (variant?.price ?? 0) + (express ? EXPRESS_FEE : 0);

  const qty = !variant ? 1 : variant.name.startsWith("1x") ? 1 : variant.name.startsWith("2x") ? 2 : 3;
  const colorOptions = COLOR_OPTIONS[qty] ?? COLOR_OPTIONS[1];

  useEffect(() => {
    if (isOpen) {
      if (preSelectedColor) {
        setStep(2);
        setColorChoice(preSelectedColor);
      } else {
        setStep(1);
        setColorChoice(null);
      }
      setExpress(false);
      setFormErrors({});
      setSubmitError("");
    }
  }, [isOpen, preSelectedColor]);

  const handleNativeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!variant) return;
    setSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.currentTarget);
    const fullName = String(formData.get("full_name") ?? "").trim();
    const rawPhone = String(formData.get("phone") ?? "").replace(/\D/g, "");
    const phone = rawPhone.startsWith("506") ? `+${rawPhone}` : `+506${rawPhone}`;
    const provinceId = String(formData.get("state") ?? "");
    const cityId = String(formData.get("city") ?? "");
    const provinceName = PROVINCES.find(p => p.id === provinceId)?.name ?? "";
    const cityName = (CITIES_BY_PROVINCE[provinceId] ?? []).find(c => c.id === cityId)?.name ?? "";
    const addr = {
      name: fullName,
      phone,
      state: provinceName,
      city: cityName,
      poblado: String(formData.get("poblado") ?? "").trim(),
      address: String(formData.get("address") ?? "").slice(0, 60).replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑüÜ ,./\-#]/g, ""),
      reference: String(formData.get("reference") ?? "").trim(),
    };
    console.log("[checkout] FormData addr:", addr);

    const errors: Record<string, string> = {};
    if (!fullName) errors.full_name = "Ingresá tu nombre y apellidos";
    const phoneDigits = rawPhone.startsWith("506") ? rawPhone.slice(3) : rawPhone;
    if (!/^\d{8}$/.test(phoneDigits)) errors.phone = "Ingresá un celular válido de Costa Rica (8 dígitos, ej: 8888 8888)";
    if (!provinceId) errors.state = "Seleccioná tu departamento";
    if (!cityId) errors.city = "Seleccioná tu municipio";
    if (!addr.poblado.trim()) errors.poblado = "Ingresá tu poblado/colonia";
    if (!addr.address.trim()) errors.address = "Ingresá tu dirección";
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitting(false);
      const firstErrorKey = Object.keys(errors)[0];
      const el = (e.currentTarget as HTMLFormElement).querySelector(`[name="${firstErrorKey}"]`) as HTMLElement | null;
      if (el) { el.focus(); el.scrollIntoView({ behavior: "smooth", block: "center" }); }
      return;
    }
    setFormErrors({});
    setSubmitError("");

    const eventId = generateEventId();

    const SKU_ORANGE = "ORONGEADAPTACR";
    const SKU_SILVER = "GRISADAPTADORCR";

    const unitPrice = variant.price / qty;
    const colorId = colorChoice?.id ?? "orange";

    let orangeQty = 0, silverQty = 0;
    if (colorId === "orange" || colorId === "3orange") { orangeQty = qty; }
    else if (colorId === "silver" || colorId === "3silver") { silverQty = qty; }
    else if (colorId === "mix") { orangeQty = 1; silverQty = 1; }
    else if (colorId === "2orange") { orangeQty = 2; }
    else if (colorId === "2silver") { silverQty = 2; }
    else if (colorId === "2o1s") { orangeQty = 2; silverQty = 1; }
    else if (colorId === "1o2s") { orangeQty = 1; silverQty = 2; }

    const coloredItems: { product_name: string; quantity: number; price_per_item: number; sku: string }[] = [];
    if (orangeQty > 0) coloredItems.push({ product_name: "Vazlina Guard — Naranja Metalico", quantity: orangeQty, price_per_item: unitPrice, sku: SKU_ORANGE });
    if (silverQty > 0) coloredItems.push({ product_name: "Vazlina Guard — Plata Premium", quantity: silverQty, price_per_item: unitPrice, sku: SKU_SILVER });

    const orderItems = express
      ? [...coloredItems, { product_name: "Envío Express (1-3 días)", quantity: 1, price_per_item: EXPRESS_FEE }]
      : coloredItems;

    const localOrderId = `CR-${Date.now().toString(36).toUpperCase()}`;
    const direccionCompleta = [addr.poblado, addr.address].filter(Boolean).join(", ");
    const shippingPrice = express ? EXPRESS_FEE : 0;

    const sheetLines = coloredItems.map(item => ({
      full_name: addr.name,
      phone: addr.phone,
      departamento: addr.state,
      municipio: addr.city,
      direccion_completa: direccionCompleta,
      punto_referencia: addr.reference,
      sku: item.sku,
      quantity: item.quantity,
      price: item.price_per_item,
      shipping: shippingPrice,
    }));

    try {
      await sendOrderToSheet(sheetLines);
      const updatedPayload = JSON.stringify({
        orderId: localOrderId,
        total: total.toFixed(2),
        addr,
        items: orderItems,
      });
      localStorage.setItem("guard_order", updatedPayload);
      sessionStorage.setItem("guard_order", updatedPayload);
      sessionStorage.setItem("order_status", "confirmed");
      sessionStorage.setItem("guard_pixel_purchase", JSON.stringify({ value: total, eventId, phone: addr.phone }));
      localStorage.setItem("guard_source", window.location.pathname);
      window.location.href = "/guard/thank-you";
    } catch (err) {
      console.error("[checkout] sendOrderToSheet failed:", err);
      setSubmitError("No se pudo registrar el pedido. Verificá tu conexión o contactá soporte.");
      setSubmitting(false);
    }
  };

  if (!isOpen || !variant) return null;

  const errClass = (field: string) =>
    formErrors[field]
      ? "border-[#E65C00] focus:ring-[#E65C00] animate-[shake_0.35s_ease-in-out]"
      : "border-gray-200 focus:ring-[#E65C00]";

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}`}</style>
      <div
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{ backgroundColor: LIGHT }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 rounded-t-3xl sm:rounded-t-2xl"
          style={{ backgroundColor: DARK }}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
              {step === 1 ? "PASO 1 DE 2 — COLOR" : "PASO 2 DE 2 — ENTREGA"}
            </p>
            <p className="text-white font-semibold text-sm mt-0.5 max-w-[200px] truncate">{variant.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg text-white tracking-tight"><span className="text-xs align-top mr-0.5">₡</span>{variant.price.toLocaleString()}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-5 py-5 space-y-4">

          {/* ── STEP 1: Color Picker ── */}
          {step === 1 && (
            <>
              <div>
                <p className="font-bold text-base text-gray-800 mb-1">Elige el color de tu Guard</p>
                <p className="text-sm text-gray-500">Ambos colores funcionan exactamente igual. Es solo preferencia visual.</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setColorChoice(opt)}
                    className="flex items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left transition-all bg-white"
                    style={{
                      borderColor: colorChoice?.id === opt.id ? ACCENT : BORDER,
                      boxShadow: colorChoice?.id === opt.id ? `0 0 0 3px rgba(230,92,0,0.12)` : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        {opt.dots.map((color, i) => (
                          <span
                            key={i}
                            className="inline-block w-7 h-7 rounded-full border border-gray-200 shrink-0"
                            style={{
                              background: color === ORANGE_DOT
                                ? `radial-gradient(circle at 35% 35%, #FF8C40, ${ORANGE_DOT} 70%)`
                                : `radial-gradient(circle at 35% 35%, #E8E8E8, #888 70%)`,
                              boxShadow: "inset 0 1px 3px rgba(255,255,255,0.6)",
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                      style={{
                        borderColor: colorChoice?.id === opt.id ? ACCENT : BORDER,
                        backgroundColor: colorChoice?.id === opt.id ? ACCENT : "white",
                      }}
                    >
                      {colorChoice?.id === opt.id && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => colorChoice && setStep(2)}
                disabled={!colorChoice}
                className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-widest transition-all disabled:opacity-40 active:scale-95"
                style={{ backgroundColor: ACCENT }}
              >
                CONTINUAR CON MI PEDIDO →
              </button>
              <p className="text-center text-sm text-gray-400 pb-1">Envio gratis · Pago al recibir · Sin riesgo</p>
            </>
          )}

          {/* ── STEP 2: Order Form ── */}
          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors -mb-1"
              >
                <ChevronLeft size={14} /> Cambiar color
              </button>

              {colorChoice && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: "rgba(230,92,0,0.06)", border: `1px solid rgba(230,92,0,0.2)` }}>
                  <div className="flex gap-1">
                    {colorChoice.dots.map((color, i) => (
                      <span
                        key={i}
                        className="inline-block w-4 h-4 rounded-full border border-gray-200"
                        style={{
                          background: color === ORANGE_DOT
                            ? `radial-gradient(circle at 35% 35%, #FF8C40, ${ORANGE_DOT} 70%)`
                            : `radial-gradient(circle at 35% 35%, #E8E8E8, #888 70%)`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: ACCENT }}>{colorChoice.label}</span>
                </div>
              )}

              <div className="flex justify-around rounded-xl py-3 text-sm font-medium text-gray-600" style={{ backgroundColor: SOFT }}>
                <span className="flex items-center gap-1.5"><Truck size={13} /> Envío gratis</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Pago al recibir</span>
              </div>

              <form onSubmit={handleNativeSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre y Apellidos <span className="text-red-500 text-xs font-bold">REQUERIDO</span></label>
                  <input name="full_name" type="text" placeholder="María López" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 bg-white ${errClass("full_name")}`} />
                  {formErrors.full_name && <p className="text-red-600 text-sm mt-1">{formErrors.full_name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono <span className="text-red-500 text-xs font-bold">REQUERIDO</span></label>
                  <div className="flex items-center border rounded-xl bg-white overflow-hidden" style={{ borderColor: formErrors.phone ? "#E65C00" : "#E5E7EB" }}>
                    <span className="pl-4 pr-2 text-sm text-gray-400 font-medium shrink-0">+506</span>
                    <input name="phone" type="tel" placeholder="8312 3456" className="w-full px-2 py-3 text-sm focus:outline-none bg-transparent" />
                  </div>
                  {formErrors.phone && <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Departamento <span className="text-red-500 text-xs font-bold">REQUERIDO</span></label>
                    <div className="relative">
                      <select name="state" onChange={(e) => setSelectedProvince(e.target.value)} className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none appearance-none bg-white ${errClass("state")}`}>
                        <option value="">Seleccionar</option>
                        {PROVINCES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    {formErrors.state && <p className="text-red-600 text-sm mt-1">{formErrors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Municipio <span className="text-red-500 text-xs font-bold">REQUERIDO</span></label>
                    <div className="relative">
                      <select name="city" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none appearance-none bg-white ${errClass("city")}`}>
                        <option value="">Seleccionar</option>
                        {(CITIES_BY_PROVINCE[selectedProvince] ?? []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    {formErrors.city && <p className="text-red-600 text-sm mt-1">{formErrors.city}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Poblado/Colonia <span className="text-red-500 text-xs font-bold">REQUERIDO</span></label>
                  <input name="poblado" type="text" placeholder="Ej: Los Yoses" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 bg-white ${errClass("poblado")}`} />
                  {formErrors.poblado && <p className="text-red-600 text-sm mt-1">{formErrors.poblado}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección Completa <span className="text-red-500 text-xs font-bold">REQUERIDO</span></label>
                  <input name="address" type="text" maxLength={60} placeholder="Calle Duarte 45" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 bg-white ${errClass("address")}`} />
                  <p className="text-sm text-gray-400 mt-0.5">Máx 60 caracteres, solo letras y números.</p>
                  {formErrors.address && <p className="text-red-600 text-sm mt-1">{formErrors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Punto de referencia <span className="text-gray-400 text-xs">OPCIONAL</span></label>
                  <input name="reference" type="text" placeholder="Color casa / Barrio, sector y referencia" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#E65C00] bg-white" />
                </div>
                <div className="pt-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Método de envío</label>
                  <div className="space-y-2">
                    <button type="button" onClick={() => setExpress(false)} className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all bg-white ${!express ? "border-[#E65C00]" : "border-gray-200"}`}>
                      <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5"><Truck size={14} className="text-gray-500" /> Envío Estándar</p>
                      <span className="text-sm font-bold" style={{ color: "#16a34a" }}>Gratis</span>
                    </button>
                    <button type="button" onClick={() => setExpress(true)} className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all bg-white ${express ? "border-[#E65C00]" : "border-gray-200"}`}>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5"><Zap size={14} style={{ color: "#F5B301" }} /> Envío Express</p>
                        <p className="text-sm text-gray-400 mt-0.5">1-3 días hábiles</p>
                      </div>
                      <span className="text-sm font-bold text-gray-800">+₡2000</span>
                    </button>
                  </div>
                </div>
                <div className="rounded-xl px-4 py-3 space-y-1.5" style={{ backgroundColor: SOFT }}>
                  <div className="flex justify-between text-sm text-gray-500"><span>{variant.name}</span><span>₡{variant.price.toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm text-gray-500"><span>{express ? "Envío Express (1-3 días)" : "Envío Estándar"}</span><span>{express ? "₡2000" : "Gratis"}</span></div>
                  <div className="flex justify-between text-sm font-extrabold pt-1.5 border-t border-gray-200" style={{ color: ACCENT }}><span>Total a pagar</span><span className="tracking-tight"><span className="text-xs align-top mr-0.5">₡</span>{total.toLocaleString()}</span></div>
                </div>
                <button type="submit" disabled={submitting} className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-widest transition-all disabled:opacity-60 active:scale-95 mt-1" style={{ backgroundColor: ACCENT }}>
                  {submitting ? "Procesando..." : "✓ CONFIRMAR PEDIDO"}
                </button>
                {submitError && <p className="text-center text-sm text-red-600 mt-2">{submitError}</p>}
                <p className="text-center text-sm text-gray-400 pb-2">Pagas únicamente al recibir tu pedido. 100% sin riesgo.</p>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
