import ProductPageTemplate, { ProductData } from "@/components/ProductPageTemplate";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const mariposaData: ProductData = {
  id: "vazlina-mariposa",
  name: "Vazlina Mariposa",
  angle: "Estilo Inalámbrico · Vazlina Wings",
  h1: "El accesorio que completa tu look",
  subheadline: "Elegante hoy. Minimalista mañana. Tú eliges quién eres hoy. Música que suena bien y te hace ver mejor.",
  urgencyText: "Envío gratis esta semana a todo México",
  rating: 4.9,
  reviewCount: 412,
  priceFrom: 630.99,
  heroImage: EMPTY_IMG,
  offers: [
    { qty: 1, price: 630.99, label: "1 Vazlina Mariposa" },
    { qty: 2, price: 999, label: "2 Vazlina Mariposa", badge: "Más popular", savings: 262.98 },
    { qty: 3, price: 1399, label: "3 Vazlina Mariposa", badge: "Máximo ahorro", savings: 493.97 },
  ],
  statPills: [
    { icon: "Battery", label: "24h con estuche" },
    { icon: "Bluetooth", label: "Bluetooth 5.3" },
    { icon: "Headphones", label: "Diseño mariposa" },
    { icon: "Volume2", label: "Sonido envolvente" },
    { icon: "Scale", label: "Ligeros" },
  ],
  thumbnails: [
    EMPTY_IMG,
    EMPTY_IMG,
    EMPTY_IMG,
  ],
  problemStat: {
    number: "68%",
    text: "de los mexicanos sienten que sus audífonos los hacen ver ordinarios, genéricos, olvidables — Mariposa resuelve eso con estilo y función.",
    source: "Fuente: estudios de satisfacción de auriculares TWS en México, 2024",
  },
  problemSolution: [
    {
      problem: "Los audífonos genéricos se caen todo el tiempo, especialmente en el gym. Me da vergüenza ajustarlos en público...",
      solution: {
        title: "Se quedan en su lugar, sin que tengas que pensar en ellos",
        desc: "Ajuste ergonómico que no se mueve ni durante ejercicio intenso. Tú te enfocas en tu rutina, no en tus audífonos.",
      },
    },
    {
      problem: "Se ven baratos y genéricos. Los escondo cuando alguien me ve porque no quiero que piensen que no tengo estilo...",
      solution: {
        title: "Un diseño que recibes cumplidos, no miradas de lástima",
        desc: "Alas de mariposa que transforman un accesorio común en una declaración de estilo. Elegante hoy. Minimalista mañana. Tú eliges.",
      },
    },
    {
      problem: "La batería dura 3 horas y tengo que cargarlos a media cita, a media clase, a media reunión...",
      solution: {
        title: "24 horas de compañía que no te abandona",
        desc: "6 horas de uso continuo + 18 horas adicionales en el estuche. Desde tu café de la mañana hasta tu serie de la noche. Sin preocupaciones.",
      },
    },
    {
      problem: "El estuche es enorme, no cabe en mis bolsillos y termino dejándolo en casa...",
      solution: {
        title: "Cabe donde cabe tu tarjeta de crédito",
        desc: "Estuche compacto que desaparece en tu bolsa o bolsillo. Siempre contigo, siempre protegidos, nunca estorban.",
      },
    },
  ],
  problemImage: EMPTY_IMG,
  features: [
    {
      name: "Un accesorio que te hace sentir única",
      desc: "No son solo audífonos. Son la pieza que falta en tu look. El diseño mariposa es único, elegante y funcional. Se ven bien, se sienten bien, y lo más importante: te hacen sentir bien contigo misma.",
      result: "Elegante hoy. Minimalista mañana. Tú decides quién eres.",
      icon: "Headphones",
    },
    {
      name: "Conexión instantánea, cero complicaciones",
      desc: "Bluetooth 5.3 con emparejamiento automático al abrir el estuche. Sin cables, sin apps, sin configuración. Solo abres, te pones, y te sientes en control.",
      result: "Touch control. Sin apps. Conectados antes de que lo pienses.",
      icon: "Bluetooth",
    },
    {
      name: "Batería que te acompaña todo el día",
      desc: "6 horas de reproducción continua + 18 horas adicionales en el estuche. Desde tu café de la mañana hasta tu serie de la noche. Sin buscar enchufes, sin preocupaciones.",
      result: "24 horas de confianza. Todo el día, sin pensar en la batería.",
      icon: "Battery",
    },
  ],
  featureImage: EMPTY_IMG,
  exclusions: [
    "Sin cables",
    "Emparejamiento auto",
    "Touch control",
    "Estuche compacto",
    "Resistente al sudor",
    "Diseño único",
  ],
  trustStats: [
    { number: "15", label: "probados" },
    { number: "24h", label: "batería" },
    { number: "BT 5.3", label: "conexión" },
    { number: "IPX4", label: "resistencia" },
  ],
  expertQuote: {
    text: "Probamos 15 audífonos TWS en México. Mariposa ganó en diseño que inspira confianza, batería real y calidad de sonido. Es el único que nosotros usaríamos para sentirnos bien con nosotros mismos — y por eso te lo ofrecemos.",
    author: "Equipo Vazlina · CDMX · Ingeniería de producto",
  },
  timeline: [
    {
      week: "Primer uso",
      title: "Te sientes diferente desde el primer momento",
      desc: "Te pones Mariposa y sientes la diferencia. No solo escuchas mejor — te ves mejor. Y eso cambia cómo enfrentas el día.",
    },
    {
      week: "Semana 2",
      title: "Tu look favorito, todos los días",
      desc: "Gym, universidad, citas, videollamadas. Mariposa se adapta a todo. Ya no escondes tus audífonos. Los muestras con orgullo.",
    },
    {
      week: "Día 30",
      title: "No recuerdas por qué usabas audífonos genéricos",
      desc: "Mariposa es parte de ti. Estilo, confianza y música que te acompaña sin fallar. Ya no eres ordinaria. Eres tú.",
    },
  ],
  timelineSummary:
    "Una unidad transforma tu estilo. Dos o tres te dan opciones para cada día — y ahorras hasta $493 MXN.",
  reviews: [
    {
      name: "Ana Morales",
      age: 24,
      city: "Monterrey",
      quote:
        "Antes usaba audífonos genéricos que se veían feos y se caían. Mariposa cambió todo. Recibo cumplidos, la batería dura todo el día, y me siento elegante hasta en el gym.",
      rating: 5,
    },
    {
      name: "Carlos Ramírez",
      age: 28,
      city: "Guadalajara",
      quote:
        "Mi novia me dijo que se veían increíbles. Eso ya valió la compra. Pero luego descubrí que el sonido es mejor que los que costaban el triple. Y no se caen cuando corro.",
      rating: 5,
    },
    {
      name: "Sofía Vega",
      age: 22,
      city: "CDMX",
      quote:
        "Los uso en la universidad y en las videollamadas de trabajo. Me siento segura de mí misma con ellos puestos. Es como mi accesorio de confianza. Y la batería sí dura todo el día.",
      rating: 5,
    },
  ],
  comparisons: [
    {
      name: "Audífonos genéricos TWS",
      priceRange: "$200-$400 MXN",
      problems: [
        "Se caen y te avergüenzan en público",
        "Batería que te abandona a media cita",
        "Diseño que grita 'barato'",
        "Se pierden y no los extrañas",
      ],
    },
    {
      name: "AirPods / marcas caras",
      priceRange: "$3,000-$5,000 MXN",
      problems: [
        "Pagas por el logo, no por el estilo",
        "Sonido igual, precio absurdo",
        "Se pierden igual, duele más",
        "Ni siquiera te hacen ver mejor",
      ],
    },
    {
      name: "Audífonos con cable",
      priceRange: "$100-$800 MXN",
      problems: [
        "Cables que enredan y rompen",
        "Limitan tu movimiento",
        "Inútiles para el gym o correr",
        "Diseño del siglo pasado",
      ],
    },
    {
      name: "Audífonos diadema",
      priceRange: "$500-$2,000 MXN",
      problems: [
        "Ocupan espacio y arruinan tu look",
        "Calor e incomodidad",
        "Imposibles de llevar a todas partes",
        "Demasiado grandes para lo que ofrecen",
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
      icon: "Bluetooth",
      title: "Conectados antes de que lo pienses",
      desc: "Abres el estuche y ya están listos. Sin apps, sin configuración, sin esperar. Solo te pones y te sientes en control.",
    },
    {
      icon: "Headphones",
      title: "Control con un toque",
      desc: "Play, pausa, siguiente canción, contestar llamadas. Todo con un ligero toque. Tú manejas tu música, tu estilo, tu día.",
    },
    {
      icon: "Battery",
      title: "Siempre listos cuando tú lo estás",
      desc: "El estuche carga mientras guardas. Nunca llegas a una cita o clase con audífonos sin batería. Siempre preparada.",
    },
    {
      icon: "Phone",
      title: "Sin apps, sin complicaciones",
      desc: "No descargas nada, no creas cuentas, no configuras nada. Funcionan solos, como debería ser todo en tu vida.",
    },
  ],
  simplicityStats: [
    { number: "24h", label: "batería" },
    { number: "BT 5.3", label: "conexión" },
    { number: "<5s", label: "emparejamiento" },
    { number: "IPX4", label: "resistencia" },
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
      a: "6 horas de reproducción continua en los audífonos + 18 horas adicionales en el estuche. Total: 24 horas.",
    },
    {
      category: "Sobre el producto",
      q: "¿Son resistentes al agua?",
      a: "Sí, tienen certificación IPX4. Resisten sudor y salpicaduras. Perfectos para el gym.",
    },
    {
      category: "Sobre el producto",
      q: "¿Funcionan con iPhone y Android?",
      a: "Sí, funcionan con cualquier dispositivo que tenga Bluetooth. iPhone, Android, tablets, laptops.",
    },
    {
      category: "Sobre el producto",
      q: "¿Se caen durante el ejercicio?",
      a: "No. El diseño ergonómico se ajusta perfectamente y no se mueve, incluso durante ejercicio intenso.",
    },
    {
      category: "Sobre el producto",
      q: "¿Qué incluye la caja?",
      a: "1 par de audífonos Mariposa, estuche de carga, cable USB-C, 3 pares de almohadillas (S, M, L), manual en español.",
    },
    {
      category: "Sobre el producto",
      q: "¿Puedo usarlos para llamadas?",
      a: "Sí, tienen micrófono integrado. Perfectos para videollamadas y llamadas telefónicas.",
    },
    {
      category: "Envío y pago",
      q: "¿Y si no me siento diferente con ellos?",
      a: "Tienes 30 días para probarlos. Si no sientes que te hacen ver y sentir mejor, te devolvemos cada peso. Tu confianza es lo primero.",
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
      slug: "vazlina-guardian",
      angle: "Protección Inteligente · Vazlina Guard",
      name: "Protección que nunca duerme",
      desc: "Se desconecta solo cuando tu celular está lleno. Tú descansas, tu familia está segura.",
      price: 502.99,
      reviews: "(156 evaluaciones)",
      image: EMPTY_IMG,
    },
  ],
};

export const metadata = {
  title: "Vazlina Mariposa | El accesorio que completa tu look",
  description:
    "Elegante hoy. Minimalista mañana. Tú eliges. Diseño mariposa único, 24 horas de batería, Bluetooth 5.3. Música que suena bien y te hace ver mejor.",
};

export default function MariposaPage() {
  return <ProductPageTemplate data={mariposaData} />;
}
