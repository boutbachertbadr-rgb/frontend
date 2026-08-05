"use client";

import { useState } from "react";
import { Mail, Phone, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Por favor completa tu nombre y mensaje.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`Contacto de ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\n\nMensaje:\n${message}`);
    window.location.href = `mailto:contacto@vazlina.shop?subject=${subject}&body=${body}`;
    setSent(true);
    setName("");
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center">
        <h1 className="font-heading font-bold text-4xl">Estamos aquí para ti</h1>
        <p className="text-gray-500 mt-2">
          ¿Dudas sobre tu pedido o necesitas ayuda? Háblanos. Somos personas reales.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-border flex gap-4 items-start">
          <Phone size={20} className="text-brand shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Llámanos</p>
            <p className="text-sm text-gray-500 mt-1">Lunes a Sábado · 9am–7pm</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border flex gap-4 items-start">
          <Mail size={20} className="text-brand shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Escríbenos por correo</p>
            <a href="mailto:contacto@vazlina.shop" className="text-sm text-brand font-medium mt-1 block hover:underline">
              contacto@vazlina.shop
            </a>
            <p className="text-sm text-gray-500 mt-0.5">Respondemos en menos de 2 horas</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-border space-y-4">
        {sent ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-brand mx-auto" />
            <h2 className="font-heading font-bold text-xl">¡Mensaje enviado!</h2>
            <p className="text-gray-500 text-sm">Te respondemos en menos de 2 horas.</p>
            <button onClick={() => setSent(false)} className="text-sm text-brand hover:underline mt-2">
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <h2 className="font-heading font-semibold text-xl">Cuéntanos en qué te podemos ayudar</h2>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="contact-name">Nombre</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Tu nombre"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="contact-msg">Mensaje</label>
              <textarea
                id="contact-msg"
                rows={4}
                placeholder="Cuéntanos lo que necesitas"
                className="input-field resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn-primary w-full">Enviar mensaje</button>
          </form>
        )}
      </div>
    </div>
  );
}
