import ProductPageTemplate, { ProductData } from "@/components/ProductPageTemplate";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const guardianData: ProductData = {
  id: "vazlina-guardian",
  name: "Vazlina Guardián",
  angle: "Protección Inteligente · Vazlina Guard",
  h1: "Duerme tranquilo. Tu familia está protegida.",
  subheadline: "Se desconecta solo cuando tu celular está lleno. Tú solo duerme. Protege a tu familia, tu celular y tu inversión — mientras tú descansas.",
  urgencyText: "Envío gratis esta semana a todo México",
  rating: 4.7,
  reviewCount: 156,
  priceFrom: 502.99,
  heroImage: EMPTY_IMG,
  offers: [
    { qty: 1, price: 502.99, label: "1 Vazlina Guardián" },
    { qty: 2, price: 799, label: "2 Vazlina Guardián", badge: "Más popular", savings: 206.98 },
    { qty: 3, price: 1099, label: "3 Vazlina Guardián", badge: "Máximo ahorro", savings: 409.97 },
  ],
  statPills: [
    { icon: "Shield", label: "Auto-desconexión" },
    { icon: "Zap", label: "Protección sobrecarga" },
    { icon: "Usb", label: "USB-C universal" },
    { icon: "BatteryCharging", label: "LED inteligente" },
    { icon: "Scale", label: "Compacto" },
  ],
  thumbnails: [
    EMPTY_IMG,
    EMPTY_IMG,
    EMPTY_IMG,
  ],
  problemStat: {
    number: "82%",
    text: "de los mexicanos cargan su celular toda la noche sin saber que están destruyendo la batería — y poniendo en riesgo a su familia.",
    source: "Fuente: estudios de degradación de baterías de litio, 2024",
  },
  problemSolution: [
    {
      problem: "Cargo mi celular toda la noche y la batería cada vez dura menos. Me da miedo que se arruine...",
      solution: {
        title: "Se desconecta solo. Tú solo descansas.",
        desc: "El chip inteligente detecta cuando tu celular está al 100% y detiene la carga. Tu batería dura años, no meses. Y tú duermes sin preocupaciones.",
      },
    },
    {
      problem: "Mi celular se calienta mucho cuando lo cargo y me da miedo dejarlo conectado. ¿Y si se sobrecalienta?...",
      solution: {
        title: "Protección que nunca duerme, para que tú sí puedas",
        desc: "Detecta temperatura alta al instante y reduce la carga automáticamente. Tu celular siempre seguro. Tu familia siempre protegida.",
      },
    },
    {
      problem: "Tengo un cargador para el celular, otro para la tablet, otro para los audífonos. Un desastre...",
      solution: {
        title: "Un solo cargador para toda tu familia",
        desc: "iPhone, Samsung, tablets, audífonos — todos protegidos con un solo dispositivo. Menos cables, menos preocupaciones, más tranquilidad.",
      },
    },
    {
      problem: "Los cargadores genéricos se rompen en semanas y no tienen garantía. Dinero tirado...",
      solution: {
        title: "Construido para durar, con respaldo real",
        desc: "Materiales de alta calidad y 1 año de garantía. Si falla, lo reemplazamos. No más cables rotos, no más dinero perdido.",
      },
    },
  ],
  problemImage: EMPTY_IMG,
  features: [
    {
      name: "Protección que nunca duerme",
      desc: "El chip inteligente detecta cuando tu dispositivo está al 100% y detiene la carga al instante. Tu batería dura años más, tu familia duerme tranquila, y tú olvidas el miedo.",
      result: "Primera noche de paz. Despiertas con tu celular seguro y tu mente tranquila.",
      icon: "Shield",
    },
    {
      name: "5 capas de protección para tu familia",
      desc: "Sobrecorriente, sobrevoltaje, sobrecalentamiento, cortocircuito y auto-desconexión. Cinco guardianes trabajando mientras tú descansas. Tu dispositivo siempre protegido, tu hogar siempre seguro.",
      result: "Carga nocturna sin riesgo. Tu familia protegida las 24 horas.",
      icon: "Zap",
    },
    {
      name: "Un solo cargador, toda tu familia protegida",
      desc: "USB-C universal: iPhone 15+, Samsung, Xiaomi, tablets, audífonos, laptops. Un solo Guardián protege todos los dispositivos de tu casa. Menos cables, menos preocupaciones.",
      result: "Un cargador para todo. Toda tu familia protegida con un solo paso.",
      icon: "Usb",
    },
  ],
  featureImage: EMPTY_IMG,
  exclusions: [
    "Sin sobrecalentamiento",
    "Auto-desconexión",
    "LED inteligente",
    "Construcción premium",
    "Compatibilidad universal",
    "Garantía 1 año",
  ],
  trustStats: [
    { number: "18", label: "probados" },
    { number: "100%", label: "auto-stop" },
    { number: "5 capas", label: "protección" },
    { number: "1 año", label: "garantía" },
  ],
  expertQuote: {
    text: "Probamos 18 cargadores en México. Guardián fue el único que realmente se desconecta al 100% y mantiene la temperatura bajo control. Es el único que nosotros dejaríamos conectado toda la noche cerca de nuestra familia.",
    author: "Equipo Vazlina · CDMX · Ingeniería de producto",
  },
  timeline: [
    {
      week: "Primera noche",
      title: "Tranquilidad inmediata",
      desc: "Conectas tu celular, ves la luz verde, y duermes. Por primera vez en mucho tiempo, no te preocupa dejarlo conectado.",
    },
    {
      week: "Semana 2",
      title: "Confianza que cambia tu rutina",
      desc: "Ya no te levantas a desconectar el cargador. Ya no revisas si tu celular está muy caliente. Guardián cuida de todo mientras tú descansas.",
    },
    {
      week: "Día 30",
      title: "Olvidaste que tenías miedo",
      desc: "Tu batería dura más que antes. Tu celular nunca se calienta. Y tú duermes tranquilo sabiendo que tu familia está protegida.",
    },
  ],
  timelineSummary:
    "Una unidad protege tu celular. Dos o tres protegen a toda tu familia — y ahorras hasta $409 MXN.",
  reviews: [
    {
      name: "Carlos Ramírez",
      age: 28,
      city: "Guadalajara",
      quote:
        "Mi celular era nuevo y la batería ya no duraba. Me daba miedo dejarlo cargando toda la noche. Con Guardián duermo tranquilo. Se desconecta solo y mi celular está frío por la mañana.",
      rating: 5,
    },
    {
      name: "Laura Hernández",
      age: 35,
      city: "CDMX",
      quote:
        "Tengo dos hijos adolescentes que dejan sus celulares cargando toda la noche. Me daba pánico. Ahora tengo Guardián en cada cuarto y duermo tranquila sabiendo que están protegidos.",
      rating: 5,
    },
    {
      name: "Miguel Torres",
      age: 42,
      city: "Monterrey",
      quote:
        "Compré tres para toda la familia. Mi esposa, mis hijos y yo cargamos sin preocupaciones. El LED azul que dice 'protegido' es la mejor señal para dormir en paz.",
      rating: 5,
    },
  ],
  comparisons: [
    {
      name: "Cargadores genéricos",
      priceRange: "$50-$150 MXN",
      problems: [
        "Se calientan peligrosamente",
        "Nunca se desconectan, dañan todo",
        "Se rompen en semanas, dinero perdido",
        "Sin garantía, sin respaldo",
      ],
    },
    {
      name: "Cargadores de marca",
      priceRange: "$800-$1,500 MXN",
      problems: [
        "Pagas por el logo, no por protección",
        "Sin auto-desconexión real",
        "El mismo riesgo, precio triple",
        "No cuidan tu batería",
      ],
    },
    {
      name: "Multicontactos / regletas",
      priceRange: "$200-$600 MXN",
      problems: [
        "Ocupan espacio y estorban",
        "No protegen tu batería",
        "Cables enredados y peligrosos",
        "Sin control de cada dispositivo",
      ],
    },
    {
      name: "Cargar toda la noche sin protección",
      priceRange: "Tu batería destruida",
      problems: [
        "Pierdes 40% de vida útil",
        "Sobrecalentamiento que daña",
        "Batería se hincha y arruina",
        "Reemplazo de celular costoso",
      ],
    },
  ],
  guarantee: {
    steps: [
      {
        title: "Contáctanos",
        desc: "En cualquier día de los 30. WhatsApp o teléfono.",
        icon: "Phone",
      },
      {
        title: "Regresa el producto",
        desc: "Aunque esté usado. No importa.",
        icon: "Box",
      },
      {
        title: "Te devolvemos todo",
        desc: "En 3-5 días hábiles. Sin descuentos.",
        icon: "RefreshCw",
      },
    ],
  },
  simplicity: [
    {
      icon: "Usb",
      title: "Enchufar y olvidar",
      desc: "Conectas tu cable y Guardián hace todo. Sin botones, sin configuración, sin preocupaciones.",
    },
    {
      icon: "Shield",
      title: "LED que te da paz",
      desc: "Verde: protegiendo. Azul: completo y seguro. Una luz que dice 'duerme tranquilo'.",
    },
    {
      icon: "Zap",
      title: "Protección automática total",
      desc: "5 capas de seguridad trabajan solas. Sin que tengas que hacer nada. Tu familia protegida siempre.",
    },
    {
      icon: "Phone",
      title: "Sin apps, sin complicaciones",
      desc: "No descargas nada, no configuras nada. Solo conectas y listo. La protección debería ser así de simple.",
    },
  ],
  simplicityStats: [
    { number: "1 año", label: "garantía" },
    { number: "5 capas", label: "protección" },
    { number: "<1s", label: "detección" },
    { number: "100%", label: "auto-stop" },
  ],
  codSteps: [
    {
      num: "01",
      icon: "Tag",
      title: "Elige tu oferta",
      desc: "1, 2 o 3 unidades. Agrega al carrito. Sin pagar.",
    },
    {
      num: "02",
      icon: "Phone",
      title: "Confirma tus datos",
      desc: "Nombre, teléfono, dirección. Confirmamos por teléfono.",
    },
    {
      num: "03",
      icon: "Truck",
      title: "Recibe y paga",
      desc: "3-5 días. Pagas al mensajero. Solo cuando lo tienes en tus manos.",
    },
  ],
  cities: ["CDMX", "Guadalajara", "Monterrey", "Puebla", "Querétaro", "+ Más áreas"],
  faqs: [
    {
      category: "Sobre el producto",
      q: "¿Realmente se desconecta automáticamente?",
      a: "Sí. El chip inteligente detecta cuando tu dispositivo está al 100% y detiene la carga al instante. Tú no tienes que hacer nada. Solo descansar.",
    },
    {
      category: "Sobre el producto",
      q: "¿Funciona con iPhone y Android?",
      a: "Sí, funciona con cualquier dispositivo USB-C: iPhone 15+, Samsung, Xiaomi, tablets, audífonos.",
    },
    {
      category: "Sobre el producto",
      q: "¿Qué significa el LED?",
      a: "Verde: cargando. Azul: carga completa y protegido. Rojo: error o temperatura alta.",
    },
    {
      category: "Sobre el producto",
      q: "¿Puedo dejarlo conectado toda la noche?",
      a: "Sí, está diseñado exactamente para eso. Se desconecta al 100% y protege tu batería toda la noche. Esa es la tranquilidad que te ofrecemos.",
    },
    {
      category: "Sobre el producto",
      q: "¿Qué incluye la caja?",
      a: "1 Cargador Guardián, cable USB-C de 1.5m, manual de usuario en español.",
    },
    {
      category: "Sobre el producto",
      q: "¿Tiene garantía?",
      a: "Sí, 1 año de garantía. Si falla, lo reemplazamos sin costo. Tu inversión está protegida, igual que tu familia.",
    },
    {
      category: "Envío y pago",
      q: "¿Puedo regresarlo si no me gusta?",
      a: "Sí. Tienes 30 días de garantía. Si no cumple lo que prometimos, te regresamos tu dinero.",
    },
    {
      category: "Envío y pago",
      q: "¿Cuánto tarda el envío?",
      a: "3 a 5 días hábiles en las principales ciudades. 5 a 7 días para el resto del país. Siempre gratis.",
    },
  ],
  crossSell: [
    {
      slug: "vazlina-brisa",
      angle: "Confort Portátil · Vazlina Flow",
      name: "Frescura que te sigue a donde vayas",
      desc: "El calor ya no decide cómo te sientes. Silencioso, ligero y con batería para todo el día.",
      price: 649,
      reviews: "(287 evaluaciones)",
      image: EMPTY_IMG,
    },
    {
      slug: "vazlina-mariposa",
      angle: "Estilo Inalámbrico · Vazlina Wings",
      name: "El accesorio que completa tu look",
      desc: "Diseño único que te hace sentir elegante y confiada. Música que suena bien y te hace ver mejor.",
      price: 630.99,
      reviews: "(412 evaluaciones)",
      image: EMPTY_IMG,
    },
  ],
};

export const metadata = {
  title: "Vazlina Guardián | Duerme tranquilo. Tu familia está protegida.",
  description:
    "Se desconecta solo cuando tu celular está lleno. Protege a tu familia, tu celular y tu inversión mientras tú descansas. Compatible con todos los USB-C.",
};

export default function GuardianPage() {
  return <ProductPageTemplate data={guardianData} />;
}
