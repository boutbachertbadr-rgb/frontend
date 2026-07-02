import Image from "next/image";
import { ShieldCheck, Award, Zap } from "lucide-react";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <h1 className="font-heading font-bold text-4xl">Construimos con cuidado</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            En Vazlina creemos que sentirse mejor no debería ser complicado. Por eso solo vendemos lo que nosotros usaríamos en nuestro día a día: productos que resuelven problemas reales y mejoran tu rutina.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Somos un equipo pequeño que prueba cada producto antes de ofrecerlo. Si no siente la diferencia, no llega a ti.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-subtle">
          <Image
            src="/images/about-team.jpg"
            alt="Equipo Vazlina"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>

      {/* El Estándar */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-subtle order-1 md:order-2">
          <Image
            src="/images/about-standard.jpg"
            alt="Estándar Vazlina"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="space-y-5 order-2 md:order-1">
          <h2 className="font-heading font-bold text-3xl">Nuestro compromiso contigo</h2>
          <ul className="space-y-4">
            {[
              { icon: Zap, title: "Funciona de verdad", desc: "Probamos cada producto en condiciones reales de México. Si no mejora tu día, no lo vendemos." },
              { icon: ShieldCheck, title: "Tu tranquilidad primero", desc: "30 días para sentir la diferencia. Si no funciona, te devolvemos cada peso. Sin trámites." },
              { icon: Award, title: "Solo lo mejor", desc: "Seleccionamos productos que superan nuestros estándares de calidad y que nosotros usaríamos todos los días." },
            ].map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex gap-4">
                <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-brand" />
                </div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
