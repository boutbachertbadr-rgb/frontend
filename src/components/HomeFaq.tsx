"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "¿Es seguro comprar con pago contra entrega?",
    a: "Completamente seguro. Solo pagas cuando el paquete está en tus manos. No pedimos tarjeta. No pedimos depósito. Te llamamos para confirmar antes de enviar. Tu tranquilidad es lo primero. Siempre.",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "3 a 5 días hábiles en San José, Alajuela, Cartago, Heredia. 5 a 7 días para el resto del país. Siempre gratis. Y te llamamos para confirmar antes de que salga tu paquete. Nunca quedas en la oscuridad.",
  },
  {
    q: "¿Y si no siento la diferencia?",
    a: "Tienes 30 días. No es una política. Es una promesa. Si no sientes que duermes mejor, que llegas más fresco, o que te ves más segura... te devolvemos cada peso. Sin burocracia. Sin preguntas incómodas. Sin excusas. Tu tranquilidad está garantizada.",
  },
  {
    q: "¿Tienen soporte en Costa Rica?",
    a: "Sí. Nuestro equipo llama desde números locales de Costa Rica. Confirmamos por teléfono. Respondemos rápido por correo. No somos una empresa fantasma. Somos gente real que usa Brisa, Guardián y Mariposa todos los días. Si algo falla, hablas con nosotros. No con un bot.",
  },
  {
    q: "¿Por qué comprar en Vazlina y no en Amazon?",
    a: "Amazon vende de todo. Nosotros solo vendemos lo que nosotros usaríamos. Probamos 18 protectores para elegir a Guardián. 15 audífonos para elegir a Mariposa. Cada producto pasa por pruebas reales en Costa Rica: en veranos de 40°, en noches de ansiedad, en salidas donde queremos sentirnos bien. Y si algo falla, hablas con nosotros. No con un bot.",
  },
  {
    q: "¿Los productos tienen garantía?",
    a: "30 días para sentir la diferencia. No para 'probarlo'. Para SENTIRLO. Si tu día no mejoró. Si no duermes más tranquilo, si no llegas más fresco, si no te sientes más segura. Lo cambiamos o te regresamos tu dinero. Sin trámites. Sin esperas. Sin excusas.",
  },
  {
    q: "¿Puedo pedir más de una unidad?",
    a: "Claro. En la página del producto elige 1, 2 o 3 unidades. Comprar más tiene precio especial, y proteges a toda tu familia por menos. Dos Guardián para tus hijos. Tres Mariposa para regalar. Tú decides.",
  },
  {
    q: "¿Qué métodos de pago aceptan al entregar?",
    a: "Efectivo o tarjeta al momento de la entrega. El mensajero lleva terminal. Tú decides cómo pagar cuando ya tienes el producto en tus manos. Cero riesgo. Máxima tranquilidad.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-0">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="border-b border-border last:border-b-0"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="font-heading font-bold text-lg text-text-primary pr-4">
                {faq.q}
              </span>
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
              <p className="text-text-secondary leading-relaxed">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
