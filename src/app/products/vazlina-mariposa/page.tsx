import ProductPageTemplate, { ProductData } from "@/components/ProductPageTemplate";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const mariposaData: ProductData = {
  id: "vazlina-mariposa",
  name: "Vazlina Mariposa",
  angle: "Estilo Inalámbrico · Vazlina Wings",
  h1: "El accesorio que cambia cómo te sientes y cómo te ven",
  subheadline: "Mariposa no entra a tu oído. Se posa en tu oreja como joyería. Alas de cristal que transforman tu look en un segundo. Y si quieres algo más sutil: las quitas. Tú eliges quién eres hoy. Cada mañana.",
  urgencyText: "Envío gratis esta semana a todo Costa Rica",
  rating: 4.9,
  reviewCount: 4128,
  ratingBreakdown: [
    { stars: 5, count: 3715 },
    { stars: 4, count: 413 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  priceFrom: 1299,
  heroImage: "/images/products/mariposa-hero.jpg",
  offers: [
    { qty: 1, price: 1299, label: "1 Vazlina Mariposa" },
    { qty: 2, price: 2199, label: "2 Vazlina Mariposa", badge: "Más popular", savings: 399 },
    { qty: 3, price: 2799, label: "3 Vazlina Mariposa", badge: "Máximo ahorro", savings: 1098 },
  ],
  statPills: [
    { icon: "Battery", label: "24h con estuche" },
    { icon: "Bluetooth", label: "Bluetooth 5.3" },
    { icon: "Headphones", label: "Diseño mariposa" },
    { icon: "Volume2", label: "Sonido envolvente" },
    { icon: "Scale", label: "Ligeros" },
  ],
  thumbnails: [
    "/images/products/mariposa-thumb-1.jpg",
    "/images/products/mariposa-thumb-2.jpg",
    "/images/products/mariposa-thumb-3.jpg",
  ],
  features: [
    {
      name: "No entra a tu oído. No te duele. No te abandona.",
      desc: "Mariposa se posa en el borde de tu oreja, no la invade. Sin presión, sin calor, sin fatiga. Puedes usarlos desde tu primera clase hasta tu última videollamada. Y cuando corres, el clip ergonómico se queda contigo. Libertad para tu oído. Seguridad para tu ritmo.",
      result: "Olvidas que los traes puestos. Pero el mundo no deja de notarlos.",
      icon: "Headphones",
    },
    {
      name: "Hoy eres elegante. Mañana eres minimalista. Tú eliges.",
      desc: "Las alas de cristal brillan bajo cualquier luz. Las quitas: tienes un clip moderno y sutil. Un solo dispositivo = múltiples identidades. Elegante para la cita. Minimalista para la universidad. Seguro para el gym. Tú decides quién eres cada mañana.",
      result: "Un accesorio. Tres looks. Infinitas versiones de ti.",
      icon: "Bluetooth",
    },
    {
      name: "Parece joyería. Suena premium. Se siente como confianza.",
      desc: "Acabado metálico dorado que parece caro. Cristal que atrapa la luz. Estuche beige que desaparece en tu bolsa. Y 24 horas de batería que te acompañan sin fallar. No es tecnología. Es el accesorio que te hace sentir que tienes tu vida bajo control.",
      result: "Recibes cumplidos sin pedirlos. Y la música nunca se detiene.",
      icon: "Battery",
    },
  ],
  featureImage: "/images/products/mariposa-features.jpg",
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
    text: "Probamos 15 audífonos TWS en Costa Rica. Los mejores en sonido costaban 5x más. Pero ninguno hacía lo que Mariposa hace: hacerte sentir que tienes estilo sin intentarlo. Es el único que el equipo usa para sentirse bien consigo mismo. En el gym, en reuniones, en citas. Por eso te lo ofrecemos.",
    author: "Equipo Vazlina · San José · Ingeniería de producto",
  },
  timeline: [
    {
      week: "Primer uso",
      title: "La primera vez que alguien te lo dice",
      desc: "Te pones Mariposa. Te ves en el espejo. Sonríes porque te gusta lo que ves. Sales al café. Y alguien te pregunta: '¿De dónde son esos? Se ven increíbles.' Ese cumplido... ese momento... cambia cómo te sientes. Y solo fue el primero.",
    },
    {
      week: "Semana 2",
      title: "Olvidaste que eras ordinaria",
      desc: "Gym con alas quitadas. Universidad con alas puestas. Videollamada donde te ves pulida. Cita donde te sientes segura. Mariposa se adapta a TODO lo que eres. Ya no escondes tus audífonos. Los muestras. Y cada vez que alguien te mira, sabes que no es una mirada de lástima.",
    },
    {
      week: "Día 30",
      title: "No recuerdas quién eras antes",
      desc: "Buscas tus audífonos viejos. Los encuentras en un cajón. Los miras. Tratas de recordar por qué los usabas. No puedes. Mariposa no es un accesorio. Es la versión de ti que siempre quisiste ser. Y ahora lo eres.",
    },
  ],
  timelineSummary:
    "Una unidad transforma tu estilo. Dos o tres te dan opciones para cada día, y ahorras hasta $1,098 MXN.",
  reviews: [
    {
      name: "Ana Morales",
      age: 24,
      city: "Alajuela",
      quote:
        "Llevaba 3 horas en la universidad y mis audífonos viejos me dolían tanto que tenía que quitarme uno. Con Mariposa? Olvidé que los traía puestos. Se sienten como nada. Y la primera vez que fui al gym con las alas quitadas, no se cayeron ni en burpees. Pero lo mejor fue en el café: una chica me dijo '¿Qué traes en las orejas? Se ven divinos.' Ese cumplido... no tiene precio.",
      rating: 5,
      image: "/images/products/review-ana.jpg",
    },
    {
      name: "Carlos Ramírez",
      age: 28,
      city: "Heredia",
      quote:
        "No sabía qué regalarle a mi novia en su cumpleaños. Flores se marchitan. Chocolate se acaba. Quería algo que la hiciera sentir especial cada vez que lo usara. Cuando abrió Mariposa, se quedó en silencio unos segundos. Después se los puso y corrió al espejo. 'Parece que me puse joyería y música al mismo tiempo,' me dijo. Ahora no se los quita ni para dormir. Me dijo que es el mejor regalo que le han dado en años.",
      rating: 5,
      image: "/images/products/review-carlos.jpg",
    },
    {
      name: "Sofía Vega",
      age: 22,
      city: "San José",
      quote:
        "Tengo videollamadas de 4 horas al día para mi trabajo. Con mis audífonos viejos, a las 2 horas tenía una marca roja en el oído y dolía. Con Mariposa? Ni siquiera los siento. Se posan en mi oreja, no dentro. Y cuando prendo la cámara, se ven elegantes. No escondo nada. Me siento profesional, me siento segura, me siento yo. Es mi accesorio de confianza literal.",
      rating: 5,
      image: "/images/products/review-sofia.jpg",
    },
  ],
  comparisons: [
    {
      name: "Audífonos genéricos TWS",
      priceRange: "$200-$400 MXN",
      problems: [
        "Te hacen sentir invisible. Se caen cuando alguien te ve.",
        "Batería que muere a media cita. Te deja en ridículo.",
        "Dolor de oído a las 2 horas. Marca roja. Calor. Presión.",
        "Diseño que grita 'compré lo más barato'. Y se nota.",
      ],
    },
    {
      name: "AirPods / marcas caras",
      priceRange: "$3,000-$5,000 MXN",
      problems: [
        "Pagas por un logo que todos tienen. No te hace ver mejor.",
        "No te hacen sentir única. Te hacen sentir... como todos.",
        "Se pierden igual. Y duele 5x más.",
        "Sonido igual. Estilo cero. Dinero tirado en status quo.",
      ],
    },
    {
      name: "Audífonos con cable",
      priceRange: "$100-$800 MXN",
      problems: [
        "Cables que enredan y rompen. Resignación en cada nudo.",
        "Limitan tu movimiento. Imposibles en el gym.",
        "Tienes que esconderlos. No suman a tu look. Lo restan.",
        "Diseño del siglo pasado. Tu estilo merece más que esto.",
      ],
    },
    {
      name: "Audífonos diadema",
      priceRange: "$500-$2,000 MXN",
      problems: [
        "Ocupan espacio, arruinan tu peinado, te hacen sudar.",
        "Imposibles llevar en tu bolsa. Ni hablar de tu bolsillo.",
        "En verano te coces. No es comodidad. Es sacrificio.",
        "Destruyen tu look en lugar de completarlo.",
      ],
    },
  ],
  guarantee: {
    steps: [
      {
        title: "Contáctanos",
        desc: "En cualquier día de los 30. Solo llámanos.",
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
      title: "Abres el estuche. Te pones. Recibes cumplidos.",
      desc: "No hay paso 2. Abres el estuche beige, los audífonos ya están conectados. Te pones. Ves tu reflejo. Te gusta. Eso es todo. La tecnología buena desaparece. El estilo permanece.",
    },
    {
      icon: "Headphones",
      title: "Controlas tu música con un toque. Y tu estilo con un clip.",
      desc: "Play, pausa, siguiente, llamada. Todo con un toque. Las alas? Las quitas y pones cuando tú quieras. Tú manejas tu música. Tú eliges tu look.",
    },
    {
      icon: "Battery",
      title: "Siempre listos. Siempre contigo. Nunca sin batería.",
      desc: "El estuche carga mientras guardas. Llegas a tu cita, a tu clase, a tu gym. Siempre con música. Siempre con estilo. Siempre preparada.",
    },
    {
      icon: "Phone",
      title: "Ni app. Ni configuración. Ni excusa para no verte bien.",
      desc: "No descargas nada. No emparejas nada. No actualizas nada. Solo abres, te pones, y el mundo te ve diferente. Zero fricción. Máxima recompensa.",
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
  cities: ["San José", "Alajuela", "Cartago", "Heredia", "Liberia", "+ Más áreas"],
  faqs: [
    {
      category: "Sobre el producto",
      q: "¿Duele usarlos tanto tiempo?",
      a: "No. Y esa es la magia. Mariposa NO entra a tu oído. Se posa en el borde exterior con un clip ergonómico suave. Sin presión, sin calor, sin fatiga. Puedes usarlos 6 horas seguidas y olvidar que los traes. Tu oído descansa. Tú disfrutas.",
    },
    {
      category: "Sobre el producto",
      q: "¿Las alas de mariposa se pueden quitar?",
      a: "Sí. Y ese es el secreto. Con alas: eres la persona que recibe cumplidos. Sin alas: eres moderna, sutil, deportiva. Un solo Mariposa = múltiples versiones de ti. Las quitas en segundos. Las pones cuando quieras brillar.",
    },
    {
      category: "Sobre el producto",
      q: "¿Se caen cuando hago ejercicio?",
      a: "No. El clip de alta elasticidad se ajusta al borde de tu oreja y se queda ahí. Corre, salta, baila, haz burpees. Mariposa no se mueve. Y como es open-ear, sigues escuchando tu entorno. Más seguro. Más libre.",
    },
    {
      category: "Sobre el producto",
      q: "¿Cuánto dura la batería?",
      a: "6 horas de reproducción continua + 18 horas en el estuche. 24 horas totales. Desde tu café de la mañana hasta tu serie de la noche. Sin buscar enchufes.",
    },
    {
      category: "Sobre el producto",
      q: "¿Son resistentes al agua?",
      a: "IPX4. Resisten sudor del gym, salpicaduras de lluvia ligera, el movimiento intenso. No son para nadar, pero para vivir tu vida activa, sí.",
    },
    {
      category: "Sobre el producto",
      q: "¿Funcionan con iPhone y Android?",
      a: "Con cualquier dispositivo que tenga Bluetooth. iPhone, Android, tablets, laptops. Bluetooth 5.3: abres el estuche y ya están conectados. Sin apps. Sin configuración.",
    },
    {
      category: "Envío y pago",
      q: "¿Y si no me siento diferente con ellos?",
      a: "Tienes 30 días. Si no sientes que te ves mejor en el espejo. Si no olvidas que los traes puestos. Si no recibes al menos un '¿qué traes en las orejas?' que te haga sonreír... te devolvemos cada peso. Tu confianza es lo primero. O te transformas, o te devolvemos tu dinero.",
    },
    {
      category: "Envío y pago",
      q: "¿Cuánto tarda el envío?",
      a: "3 a 5 días hábiles en San José, Alajuela, Cartago y Heredia. 5 a 7 días para el resto del país. Siempre gratis. Siempre COD. Pagas cuando lo tienes en tus manos. Cero riesgo. Máximo estilo.",
    },
  ],
  crossSell: [
    {
      slug: "vazlina-brisa",
      angle: "Confort Portátil · Vazlina Flow",
      name: "Frescura que te sigue a donde vayas",
      desc: "El calor ya no decide cómo te sientes. Silencioso, ligero y con batería para todo el día.",
      price: 1199,
      reviews: "(287 evaluaciones)",
      image: "/images/products/brisa-hero.jpg",
    },
    {
      slug: "vazlina-guardian",
      angle: "Protección Inteligente · Vazlina Guard",
      name: "Protección que nunca duerme",
      desc: "Se desconecta solo cuando tu celular está lleno. Tú descansas, tu familia está segura.",
      price: 1249,
      reviews: "(156 evaluaciones)",
      image: "/images/products/guardian-hero.jpg",
    },
  ],
};

export const metadata = {
  title: "Vazlina Mariposa | El accesorio que cambia cómo te sientes",
  description:
    "Mariposa no entra a tu oído: se posa como joyería. Alas de cristal desmontables. Open-ear, sin dolor, sin cables. 24h batería. Bluetooth 5.3. Elige quién eres hoy.",
};

export default function MariposaPage() {
  return <ProductPageTemplate data={mariposaData} />;
}
