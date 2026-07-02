"use client";

import { ShieldCheck, Truck, MessageCircle, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-brand" />,
    title: "Tranquilidad garantizada",
    description: "30 días para sentir la diferencia. Si no mejoras tu día, te regresamos cada peso."
  },
  {
    icon: <Truck className="w-10 h-10 text-brand" />,
    title: "Pago cuando lo tienes",
    description: "Sin tarjeta, sin depósito, sin riesgo. Pagas al mensajero cuando el producto está en tus manos."
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-brand" />,
    title: "Soporte de personas reales",
    description: "Respondemos por llamada. Gente local que usa los mismos productos que tú."
  },
  {
    icon: <Globe className="w-10 h-10 text-brand" />,
    title: "Llega a tu puerta",
    description: "Envío gratis a todo México. De 3 a 5 días en principales ciudades. Siempre con seguimiento."
  }
];

export default function WhyBuyFromUs() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center h-20 w-20 bg-brand-light border-2 border-brand/20 rounded-2xl mx-auto shadow-sm">
                {feature.icon}
              </div>
              <h3 className="mt-4 font-heading font-bold text-lg text-text-primary">{feature.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
