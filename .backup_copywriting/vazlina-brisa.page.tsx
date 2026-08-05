import ProductPageTemplate, { ProductData } from "@/components/ProductPageTemplate";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const brisaData: ProductData = {
  id: "vazlina-brisa",
  name: "Vazlina Brisa",
  angle: "Confort Portátil · Vazlina Flow",
  h1: "El calor ya no decide cómo te sientes",
  subheadline: "Llegas fresco al trabajo. Tu bebé duerme cómodo en la carriola. El metro deja de ser un infierno. Frescura que te sigue a donde vayas.",
  urgencyText: "Envío gratis esta semana a todo México",
  rating: 4.8,
  reviewCount: 287,
  priceFrom: 649,
  heroImage: EMPTY_IMG,
  offers: [
    { qty: 1, price: 649, label: "1 Vazlina Brisa" },
    { qty: 2, price: 999, label: "2 Vazlina Brisa", badge: "Más popular", savings: 299 },
    { qty: 3, price: 1299, label: "3 Vazlina Brisa", badge: "Máximo ahorro", savings: 648 },
  ],
  statPills: [
    { icon: "Battery", label: "Batería 8 horas" },
    { icon: "Wind", label: "Rotación 360°" },
    { icon: "Usb", label: "USB-C" },
    { icon: "Volume2", label: "25dB Silencioso" },
    { icon: "Scale", label: "160g" },
  ],
  thumbnails: [
    EMPTY_IMG,
    EMPTY_IMG,
    EMPTY_IMG,
  ],
  problemStat: {
    number: "76%",
    text: "de los mexicanos llegan sudados e irritados al trabajo o a casa — y el calor les roba energía todo el día.",
    source: "Fuente: estudios de confort térmico en México, 2024",
  },
  problemSolution: [
    {
      problem: "En el metro de CDMX el calor es insoportable y llego sudando e irritado a todos lados...",
      solution: {
        title: "Llegas fresco y en control, no sudado y de mal humor",
        desc: "Un flujo de aire suave y constante que te acompaña sin molestar a nadie. El calor sigue afuera, pero tú ya no sufres.",
      },
    },
    {
      problem: "Los ventiladores baratos se rompen en semanas, hacen ruido de licuadora y terminan en la basura...",
      solution: {
        title: "Un compañero de confianza que dura años",
        desc: "Motor sin escobillas diseñado para el uso diario. Sin ruido, sin vibraciones, sin decepciones.",
      },
    },
    {
      problem: "La batería dura 2 horas y tengo que buscar enchufe a media mañana...",
      solution: {
        title: "Te acompaña todo el día, sin preocuparte por la carga",
        desc: "8 horas de frescura continua. Desde la salida de casa hasta el regreso. Carga USB-C en 2.5 horas mientras descansas.",
      },
    },
    {
      problem: "No se queda donde lo pongo, se cae todo el tiempo y termino sin usarlo...",
      solution: {
        title: "Se queda donde lo necesitas, siempre",
        desc: "Clip universal con rotación 360° que se adapta a tu vida: mesa de trabajo, cabecera, carriola, mochila, cinturón, bolsa. Apunta el aire exactamente donde lo necesitas. Un segundo y listo.",
      },
    },
  ],
  problemImage: EMPTY_IMG,
  features: [
    {
      name: "Frescura que dura años",
      desc: "Los motores tradicionales se desgastan rápido y dejan de enfriar. El motor sin escobillas de Brisa está diseñado para acompañarte día tras día sin perder potencia.",
      result: "Aire fresco constante. Sin ruido, sin vibraciones, sin frustraciones.",
      icon: "Zap",
    },
    {
      name: "Batería para todo tu día",
      desc: "Batería de litio de alta capacidad que te da 8 horas de frescura continua. Desde la mañana hasta la noche. Carga completa en 2.5 horas con el mismo cable de tu celular.",
      result: "8 horas de alivio. Todo el día, sin preocuparte por enchufes.",
      icon: "Battery",
    },
    {
      name: "Apunta el aire donde tú quieras",
      desc: "Rotación 360° con clip universal que se adapta a cualquier superficie: escritorio, cabecera, carriola, mochila, cinturón, sombrero, respaldo de silla. Gíralo, inclínalo, posiciónalo exactamente donde necesites frescura. No se cae, no se mueve.",
      result: "Frescura exactamente donde la necesitas, en el ángulo perfecto. Siempre.",
      icon: "Wind",
    },
  ],
  featureImage: EMPTY_IMG,
  exclusions: [
    "Sin cables",
    "Batería recargable",
    "Duradero",
    "Motor sin escobillas",
    "Ligero",
    "Universal",
  ],
  trustStats: [
    { number: "12", label: "probados" },
    { number: "8h", label: "batería" },
    { number: "500+", label: "ciclos" },
    { number: "25dB", label: "silencio" },
  ],
  expertQuote: {
    text: "Probamos este ventilador contra 12 modelos del mercado mexicano. Brisa ganó en batería real, silencio y durabilidad. Es el único que nosotros usaríamos todos los días — y por eso te lo ofrecemos.",
    author: "Equipo Vazlina · CDMX · Ingeniería de producto",
  },
  timeline: [
    {
      week: "Semana 1",
      title: "Alivio inmediato",
      desc: "Desde el primer día sientes la diferencia. Llegas fresco, te sientes mejor, el calor ya no te roba la paciencia.",
    },
    {
      week: "Semana 2",
      title: "Lo llevas a todas partes",
      desc: "Metro, oficina, parque, carriola. Brisa se vuelve parte de tu rutina. No sales sin él.",
    },
    {
      week: "Día 30",
      title: "No recuerdas cómo vivías sin él",
      desc: "El calor sigue afuera, pero tú ya no sufres. Tu familia está cómoda. Tú estás en control.",
    },
  ],
  timelineSummary:
    "Una unidad transforma tu día. Dos o tres protegen a toda tu familia del calor — y ahorras hasta $648 MXN.",
  reviews: [
    {
      name: "María González",
      age: 32,
      city: "CDMX",
      quote:
        "El metro de CDMX en verano era mi pesadilla. Llegaba sudada e irritada al trabajo. Con Brisa llego fresca, tranquila y con energía. Lo pagué al recibir y valió cada peso.",
      rating: 5,
    },
    {
      name: "Laura Hernández",
      age: 29,
      city: "Guadalajara",
      quote:
        "Mi bebé lloraba de calor en la carriola y yo llegaba agotada a todos lados. Ahora ambos estamos cómodos. Es ligero, se queda perfecto y la batería dura todo el día.",
      rating: 5,
    },
    {
      name: "Javier López",
      age: 26,
      city: "Monterrey",
      quote:
        "Soy repartidor y el calor me destruía. Brisa me devolvió la energía. Lo llevo en la mochila, es silencioso y me mantiene fresco sin que nadie se dé cuenta.",
      rating: 5,
    },
  ],
  comparisons: [
    {
      name: "Ventiladores tianguis",
      priceRange: "$50-$150 MXN",
      problems: [
        "Se rompen en semanas y terminas sin nada",
        "Batería agoniza en 2 horas",
        "Ruido que molesta a todos",
        "Plástico que se rompe al primer golpe",
      ],
    },
    {
      name: "Ventiladores escritorio",
      priceRange: "$300-$600 MXN",
      problems: [
        "Atado a la pared, no te acompaña",
        "Ocupan espacio que no tienes",
        "Cables que enredan y estorban",
        "Inútiles fuera de casa",
      ],
    },
    {
      name: "Aire acondicionado",
      priceRange: "Recibo alto",
      problems: [
        "El recibo de luz se dispara",
        "Solo enfría una habitación",
        "No te acompaña al trabajo ni al metro",
        "Instalación costosa y permanente",
      ],
    },
    {
      name: "Ventiladores premium",
      priceRange: "$800-$1,500 MXN",
      problems: [
        "Pagas por el logo, no por el alivio",
        "Mismas funciones, precio triple",
        "Sin soporte local si falla",
        "Garantía que no cubre nada",
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
      title: "Carga con tu cable de siempre",
      desc: "USB-C, igual que tu celular. 2.5 horas y listo para otro día entero.",
    },
    {
      icon: "Wind",
      title: "3 niveles de frescura",
      desc: "Brisa suave para la oficina. Brisa fuerte para el metro. Tú eliges cómo te sientes.",
    },
    {
      icon: "Scale",
      title: "Más ligero que tu celular",
      desc: "160 gramos que desaparecen en tu bolsa. Ni lo sientes, solo disfrutas el resultado.",
    },
    {
      icon: "Phone",
      title: "Botón y listo",
      desc: "Sin apps, sin configuración, sin complicaciones. Enciende y siente la diferencia.",
    },
  ],
  simplicityStats: [
    { number: "160g", label: "" },
    { number: "3", label: "velocidades" },
    { number: "2.5h", label: "carga" },
    { number: "<30s", label: "listo" },
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
      q: "¿Cuánto dura la batería?",
      a: "Entre 6 y 8 horas según la velocidad. Se recarga con cualquier cable USB-C, igual que tu celular.",
    },
    {
      category: "Sobre el producto",
      q: "¿Se puede usar mientras carga?",
      a: "Sí, puedes usarlo mientras se carga sin ningún problema.",
    },
    {
      category: "Sobre el producto",
      q: "¿El clip funciona en cualquier superficie?",
      a: "Sí, el clip es universal y se adapta a escritorios, cabeceras, carriolas, mochilas y más.",
    },
    {
      category: "Sobre el producto",
      q: "¿Es ruidoso? ¿Puedo usarlo en oficina?",
      a: "No. Su motor está diseñado para ser ultra-silencioso (25dB). Nadie a tu lado lo escuchará.",
    },
    {
      category: "Sobre el producto",
      q: "¿Qué incluye la caja?",
      a: "1 Ventilador Brisa, 1 cable USB-C, manual de usuario en español.",
    },
    {
      category: "Sobre el producto",
      q: "¿Es seguro para mi bebé?",
      a: "Sí. Materiales no tóxicos y flujo de aire suave y controlable. Tu bebé está cómodo, tú estás tranquila. Esa es la paz mental que buscas.",
    },
    {
      category: "Envío y pago",
      q: "¿Y si no siento la diferencia?",
      a: "Tienes 30 días para probarlo. Si no sientes que el calor dejó de controlar tu día, te devolvemos cada peso. Sin preguntas, sin burocracia. Tu tranquilidad es lo primero.",
    },
    {
      category: "Envío y pago",
      q: "¿Cuánto tarda el envío?",
      a: "3 a 5 días hábiles en las principales ciudades. 5 a 7 días para el resto del país. Siempre gratis.",
    },
  ],
  crossSell: [
    {
      slug: "vazlina-guardian",
      angle: "Protección Inteligente · Vazlina Guard",
      name: "Protección que nunca duerme",
      desc: "Se desconecta solo cuando tu celular está lleno. Tú descansas, tu familia está segura.",
      price: 502.99,
      reviews: "(156 evaluaciones)",
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
  title: "Vazlina Brisa | El calor ya no decide cómo te sientes",
  description:
    "Frescura que te sigue a donde vayas. Silencioso, ligero y con 8 horas de batería. Para el metro, la oficina, la carriola y cualquier lugar donde el calor te robe la paciencia.",
};

export default function BrisaPage() {
  return <ProductPageTemplate data={brisaData} />;
}
