import ProductPageTemplate, { ProductData } from "@/components/ProductPageTemplate";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const brisaData: ProductData = {
  id: "vazlina-brisa",
  name: "Vazlina Brisa",
  angle: "Confort Portátil · Vazlina Flow",
  h1: "Fresca a donde vayas. Sin cargar nada.",
  subheadline: "Se clip a tu ropa y olvidas que está ahí. Tus manos libres en el metro, la oficina o la carriola. Aire fresco en tu cara. Tú decides dónde, tú decides cuándo.",
  urgencyText: "Envío gratis esta semana a todo Costa Rica",
  rating: 4.9,
  reviewCount: 2847,
  ratingBreakdown: [
    { stars: 5, count: 2580 },
    { stars: 4, count: 267 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  priceFrom: 18451,
  heroImage: "/images/products/brisa-hero.jpg",
  offers: [
    { qty: 1, price: 18451, label: "1 Vazlina Brisa" },
    { qty: 2, price: 33950, label: "2 Vazlina Brisa", badge: "Más popular", savings: 2952 },
    { qty: 3, price: 47032, label: "3 Vazlina Brisa", badge: "Máximo ahorro", savings: 8321 },
  ],
  statPills: [
    { icon: "Battery", label: "Batería 8 horas" },
    { icon: "Wind", label: "Motor sin escobillas" },
    { icon: "Usb", label: "USB-C" },
    { icon: "Volume2", label: "25dB Silencioso" },
    { icon: "Scale", label: "160g" },
  ],
  thumbnails: [
    "/images/products/brisa-thumb-1.png",
    "/images/products/brisa-thumb-2.jpg",
    "/images/products/brisa-thumb-3.jpg",
  ],
  problemStat: {
    number: "76%",
    text: "de los costarricenses llegan sudados, agotados e irritados a su destino, y el calor les roba energía, paciencia y concentración durante todo el día.",
    source: "Fuente: estudios de confort térmico en Costa Rica, 2024",
  },
  problemSolution: [
    {
      problem: "El calor en Costa Rica es sofocante. El sudor en la espalda, el olor cerrado, la gente pegada, y tú llegando a tu reunión sin energía y con la ropa húmeda...",
      solution: {
        title: "Llegas fresca, en control, como si el calor no existiera",
        desc: "Brisa se clip a tu ropa y apunta el aire exactamente a tu cara o cuello con rotación 360°. Tus manos libres, tu mente enfocada, tu cuerpo fresco. Nadie a tu alrededor lo escucha. 25dB, más silencioso que un susurro.",
      },
    },
    {
      problem: "Los ventiladores baratos del tianguis se rompen en semanas, hacen ruido de licuadora, terminan en la basura, y encima tienes que cargarlo todo el tiempo con la mano...",
      solution: {
        title: "Un alivio que se queda contigo, sin que tengas que cargarlo",
        desc: "Brisa no lo cargas, lo usas. Se clip solo y se olvida de que existe. Motor sin escobillas diseñado para durar 500+ ciclos. Sin ruido, sin vibración, sin decepciones.",
      },
    },
    {
      problem: "La batería de esos ventiladores muere a las 2 horas, justo cuando más lo necesitas, a media mañana, en el metro de regreso, en el parque con tus hijos...",
      solution: {
        title: "Todo el día fresca, de casa a casa, sin buscar enchufe",
        desc: "8 horas de frescura continua con una sola carga. Sale contigo en la mañana y regresa contigo en la noche. Carga completa en 2.5 horas con el mismo cable de tu celular.",
      },
    },
    {
      problem: "Mi bebé llora de calor en la carriola y yo llego agotada a todos lados, y los ventiladores con aspas me dan miedo cerca de sus dedos, su cabello, su carita...",
      solution: {
        title: "Frescura para tu bebé. 100% segura, sin aspas, sin miedo",
        desc: "Tecnología sin aspas expuestas: no jala cabello, no lastima dedos, no causa miedo. Se clip a la carriola, apunta el aire hacia tu bebé con rotación 360°, y tú empujas con las manos libres y la mente tranquila.",
      },
    },
  ],
  problemImage: "/images/products/brisa-problem.jpg",
  features: [
    {
      name: "Tu zona de confort personal. Tú decides dónde",
      desc: "Sin aspas expuestas. Rotación 360°. Apunta el aire exactamente a tu cara, cuello o bebé. No es un ventilador que enfría el cuarto. Es tu microclima personal que va contigo a cualquier lugar.",
      result: "Frescura segura y personalizada. Tú en control, no el calor.",
      icon: "Zap",
    },
    {
      name: "Todo el día sin preocuparte por la batería",
      desc: "8 horas de frescura continua con una sola carga. Sale de tu casa en la mañana y regresa contigo en la noche. Cuando necesite carga, el mismo cable de tu celular basta. 2.5 horas y listo para otro día.",
      result: "De la mañana a la noche, fresca. Sin buscar enchufes, sin interrupciones.",
      icon: "Battery",
    },
    {
      name: "Se clip a ti. Tus manos libres para vivir",
      desc: "Esta es la diferencia real: Brisa no lo cargas, lo usas. Se fija a tu cuello, bolsa, carriola o mochila en un segundo. Olvidas que está ahí. Solo sientes la frescura. Tus manos libres. Tu mente enfocada. Tu cuerpo cómodo.",
      result: "Clip. Girar. Encender. Listo. Tu vida sigue, el calor se queda atrás.",
      icon: "Wind",
    },
  ],
  featureImage: "/images/products/brisa-features.jpg",
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
    text: "Evaluamos 12 modelos disponibles en Costa Rica antes de elegir Brisa. Ganó en batería real (no la cifra del empaque, la real), en silencio medido a 25dB, y en durabilidad probada. Pero lo que nos convenció fue algo que no esperábamos: olvidamos que lo traíamos puesto. Eso no lo logra ningún otro. Por eso lo ofrecemos.",
    author: "Equipo Vazlina · San José · Ingeniería de producto",
  },
  timeline: [
    {
      week: "Semana 1",
      title: "El momento que lo cambia todo",
      desc: "Lo clip a tu ropa por primera vez y piensas: '¿Eso es todo?'. Y entonces sientes el aire fresco en tu cuello. Llegas a tu destino sin sudor, sin irritación. Alguien te pregunta por qué se te ve tan tranquila. No sabes cómo explicarlo.",
    },
    {
      week: "Semana 2",
      title: "Ya no puedes imaginarte sin él",
      desc: "Metro, parque, oficina, carriola. Brisa va contigo a todos lados sin que lo notes. Tus manos libres. Tu bebé fresco. Tú en control. Un día sin él y ya te sientes diferente.",
    },
    {
      week: "Día 30",
      title: "El calor ya no te roba nada",
      desc: "Energía que antes perdías en el calor, ahora la tienes para lo que importa. Tu familia está cómoda. Tú estás en control. No recuerdas cómo vivías antes, y no quieres volver.",
    },
  ],
  timelineSummary:
    "Una unidad transforma tu día. Dos o tres protegen a toda tu familia del calor, y ahorras hasta ₡8,321 CRC.",
  reviews: [
    {
      name: "María González",
      age: 32,
      city: "San José",
      quote:
        "El metro Línea 3 en julio era literalmente un infierno. Llegaba al trabajo con la blusa pegada, irritada, sin ganas de nada. Ahora lo clip al cuello, giro el aire hacia mi cara y llego fresca como si nada. Mis compañeras me preguntaron qué hice diferente. Pagué al recibir. Ni un peso de riesgo.",
      rating: 5,
      image: "/images/products/review-maria.jpg",
    },
    {
      name: "Laura Hernández",
      age: 29,
      city: "Heredia",
      quote:
        "Mi bebé sudaba y lloraba en la carriola y yo moría de culpa y agotamiento. Los ventiladores con aspas me daban pánico cerca de sus dedos. Brisa no tiene aspas. Lo clip a la carriola, apunto el aire hacia él y duerme tranquilo. Yo por fin puedo caminar con las manos libres y sin miedo. Valió cada peso.",
      rating: 5,
      image: "/images/products/review-laura.jpg",
    },
    {
      name: "Javier López",
      age: 26,
      city: "Alajuela",
      quote:
        "Soy repartidor y el calor de Alajuela me destruía a mediodía. Ya no podía más. Ahora clip Brisa al bolsillo de la playera, meto las manos al manubrio y siento el aire fresco todo el tiempo. Es tan silencioso que mis clientes ni lo notan. Me devolvió la energía y las ganas de trabajar.",
      rating: 5,
      image: "/images/products/review-javier.jpg",
    },
  ],
  comparisons: [
    {
      name: "Ventiladores tianguis",
      priceRange: "₡1,400-₡4,200 CRC",
      problems: [
        "Los tienes que cargar con la mano. Una mano menos para todo lo demás",
        "Aspas expuestas: peligrosas cerca de bebés, niños y cabello",
        "Batería muere en 2 horas, justo cuando más lo necesitas",
        "Se rompen en semanas. Terminas comprando otro. Y otro. Y otro.",
      ],
    },
    {
      name: "Ventiladores escritorio",
      priceRange: "₡8,400-₡16,800 CRC",
      problems: [
        "Solo funcionan enchufados. No te siguen al metro ni al parque",
        "Ocupan espacio, necesitan cable, enredan todo",
        "Aspas que giran cerca de tus dedos y los de tu bebé",
        "Pagas ₡11,200+ CRC por algo que solo sirve en un cuarto",
      ],
    },
    {
      name: "Aire acondicionado",
      priceRange: "Recibo alto",
      problems: [
        "Tu recibo de luz se dispara. Pagas calor todo el año",
        "Solo enfría una habitación. Tú sufres en el resto del mundo",
        "No te acompaña al metro, al trabajo, al parque, a ningún lado",
        "Instalación cara, permanente, y aún así no resuelve tu vida",
      ],
    },
    {
      name: "Ventiladores portátiles genéricos",
      priceRange: "₡22,400-₡42,000 CRC",
      problems: [
        "Sigues cargándolo con la mano. Nada de manos libres",
        "Aspas expuestas que no puedes usar cerca de tu bebé sin miedo",
        "Pagas por el logo. Las funciones son exactamente las mismas.",
        "Sin soporte en Costa Rica. Sin garantía real. Sin nadie que responda.",
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
      icon: "Usb",
      title: "Clip. Girar. Encender. Listo.",
      desc: "Tres pasos y tu vida cambia. Sin manual, sin configuración, sin apps. Solo clip a tu ropa, apunta el aire donde lo necesitas, enciende. Eso es todo.",
    },
    {
      icon: "Wind",
      title: "Tú controlas tu frescura",
      desc: "3 velocidades según tu momento: suave para la oficina o junto al bebé, fuerte para el metro o el calor de afuera. Tú decides cómo te sientes, no el clima.",
    },
    {
      icon: "Scale",
      title: "160g que olvidas que existen",
      desc: "Más ligero que tu celular. Clip y desaparece de tu mente. Solo sientes el alivio, no el peso.",
    },
    {
      icon: "Phone",
      title: "El mismo cable de tu celular",
      desc: "USB-C. Sin adaptadores, sin sorpresas. 2.5 horas de carga y listo para otro día completo. Tan fácil que no hay excusa.",
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
  cities: ["San José", "Alajuela", "Cartago", "Heredia", "Liberia", "+ Más áreas"],
  faqs: [
    {
      category: "Sobre el producto",
      q: "¿Cuánto dura la batería de verdad, no la del empaque?",
      a: "Entre 6 y 8 horas reales según la velocidad que uses. Lo probamos nosotros mismos. En velocidad media, 8 horas completas. Se carga con cualquier cable USB-C, igual que tu celular. Nada nuevo que comprar.",
    },
    {
      category: "Sobre el producto",
      q: "¿Puedo usarlo mientras carga?",
      a: "Sí, sin ningún problema. Si lo necesitas enchufado en casa o en la oficina, funciona igual. La frescura no para.",
    },
    {
      category: "Sobre el producto",
      q: "¿El clip se queda fijo o se cae?",
      a: "Se queda. Lo diseñamos para eso. Collar, bolsillo, correa de mochila, carriola, cabecera. Un clip firme que no molesta y no se mueve. No tienes que estar ajustándolo cada rato.",
    },
    {
      category: "Sobre el producto",
      q: "¿Hace ruido? ¿Lo puedo usar en la oficina o en junta?",
      a: "25 decibeles. Para que te des una idea: eso es menos ruido que el silencio de una biblioteca. Nadie a tu lado lo escucha. Lo usamos en juntas, en salas de espera, junto a bebés dormidos. Cero problema.",
    },
    {
      category: "Sobre el producto",
      q: "¿Es seguro usarlo junto a mi bebé? ¿Tiene aspas?",
      a: "No tiene aspas expuestas. Esa fue una decisión de diseño intencional. No jala cabello, no lastima dedos, no causa ningún peligro. Puedes clip a la carriola y apuntar el aire directo a tu bebé sin ningún miedo. Muchas mamás lo usan exactamente así. Tu bebé fresco, tú tranquila.",
    },
    {
      category: "Sobre el producto",
      q: "¿Qué incluye la caja?",
      a: "1 Brisa, 1 cable USB-C, y manual en español. Sin sorpresas, sin piezas que ensamblar. Lo sacas, lo cargas una vez, y ya está listo.",
    },
    {
      category: "Envío y pago",
      q: "¿Y si lo recibo y no me convence?",
      a: "Tienes 30 días completos para probarlo en el metro, en la oficina, con tu bebé, donde quieras. Si no sientes que el calor dejó de controlarte, te devolvemos cada peso sin preguntas. No te vamos a pedir que expliques nada. Te lo prometemos.",
    },
    {
      category: "Envío y pago",
      q: "¿Cuánto tarda en llegar?",
      a: "3 a 5 días hábiles en San José, Alajuela, Cartago y Heredia. 5 a 7 días para el resto del país. Siempre gratis. Te avisamos cuando sale.",
    },
  ],
  crossSell: [
    {
      slug: "vazlina-guardian",
      angle: "Protección Inteligente · Vazlina Guard",
      name: "Protección que nunca duerme",
      desc: "Se desconecta solo cuando tu celular está lleno. Tú descansas, tu familia está segura.",
      price: 17997,
      reviews: "(156 evaluaciones)",
      image: "/images/products/guardian-hero.jpg",
    },
    {
      slug: "vazlina-mariposa",
      angle: "Estilo Inalámbrico · Vazlina Wings",
      name: "El accesorio que completa tu look",
      desc: "Diseño único que te hace sentir elegante y confiada. Música que suena bien y te hace ver mejor.",
      price: 19358,
      reviews: "(412 evaluaciones)",
      image: "/images/products/mariposa-hero.jpg",
    },
  ],
};

export const metadata = {
  title: "Vazlina Brisa | Tus manos libres. Tu cuerpo fresco.",
  description:
    "No es un ventilador que cargas. Se clip a ti. Sin aspas, seguro para bebés, 360° de rotación, 8 horas de batería. Para el metro, la oficina y la carriola. Paga al recibir.",
};

export default function BrisaPage() {
  return <ProductPageTemplate data={brisaData} />;
}
