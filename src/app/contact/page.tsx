import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
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
            <p className="text-sm text-gray-500 mt-1">Respondemos en menos de 2 horas</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-border space-y-4">
        <h2 className="font-heading font-semibold text-xl">Cuéntanos en qué te podemos ayudar</h2>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="contact-name">Nombre</label>
          <input id="contact-name" type="text" placeholder="Tu nombre" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="contact-msg">Mensaje</label>
          <textarea
            id="contact-msg"
            rows={4}
            placeholder="Cuéntanos lo que necesitas"
            className="input-field resize-none"
          />
        </div>
        <button className="btn-primary w-full">Enviar mensaje</button>
      </div>
    </div>
  );
}
