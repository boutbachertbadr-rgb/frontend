import ProductPageTemplate, { ProductData } from "@/components/ProductPageTemplate";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const guardianData: ProductData = {
  id: "vazlina-guardian",
  name: "Vazlina Guardián",
  angle: "Protección Inteligente · Vazlina Guard",
  h1: "Duerme tranquilo. Guardián vigila lo que tú no puedes.",
  subheadline: "Desconexión física real al 100%. No es software. No es promesa. Es una protección tangible que ves y sientes. Mientras tú duermes, Guardián desconecta tu dispositivo al llenarse, y protege a tu familia de lo que nunca debió pasar.",
  urgencyText: "Envío gratis esta semana a todo Costa Rica",
  rating: 4.8,
  reviewCount: 1247,
  ratingBreakdown: [
    { stars: 5, count: 1060 },
    { stars: 4, count: 187 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  priceFrom: 1249,
  heroImage: "/images/products/guardian-hero.jpg",
  offers: [
    { qty: 1, price: 1249, label: "1 Vazlina Guardián" },
    { qty: 2, price: 2099, label: "2 Vazlina Guardián", badge: "Más popular", savings: 399 },
    { qty: 3, price: 2699, label: "3 Vazlina Guardián", badge: "Máximo ahorro", savings: 1048 },
  ],
  statPills: [
    { icon: "Shield", label: "Auto-desconexión" },
    { icon: "Zap", label: "Protección sobrecarga" },
    { icon: "Usb", label: "USB-C universal" },
    { icon: "BatteryCharging", label: "LED inteligente" },
    { icon: "Scale", label: "Compacto" },
  ],
  thumbnails: [
    "/images/products/guardian-thumb-1.jpg",
    "/images/products/guardian-thumb-2.jpg",
    "/images/products/guardian-thumb-3.jpg",
  ],
  problemStat: {
    number: "82%",
    text: "de los costarricenses cargan sus dispositivos toda la noche sin saber que están matando su batería gota a gota, y jugando con fuego al lado de su familia dormida.",
    source: "Fuente: estudios de degradación de baterías de litio, 2024",
  },
  problemSolution: [
    {
      problem: "Cada mañana despierto con la batería al 100%... pero cada mes dura menos. A los 8 meses mi dispositivo nuevo ya no llega a mediodía. ¿Por qué se destruye si lo cuido?",
      solution: {
        title: "Tu batería ya no muere mientras duermes. Guardián la protege.",
        desc: "Imagina despertar cada mañana sabiendo que tu dispositivo descansó toda la noche. No luchó contra la carga. Eso es lo que Guardián hace por ti. Tú duermes. Tu batería respira. Y tu dispositivo nuevo sigue siendo nuevo por años, no meses."
      },
    },
    {
      problem: "Las 3 de la mañana. Toqué mi dispositivo para ver la hora y está CALIENTE. Mi estómago se hace nudo. ¿Y si se sobrecalienta? ¿Y si pasa algo mientras duermo?",
      solution: {
        title: "A las 3am, Guardián está despierto para que tú no tengas que estarlo",
        desc: "Te acuestas con miedo. Despiertas con frío. Esa es la diferencia. Guardián vigila temperatura, voltaje y corriente sin descanso, y si algo huele mal, actúa antes de que tú te des cuenta. Tú sigues durmiendo. Tu familia nunca sabe que hubo peligro.",
      },
    },
    {
      problem: "Mi hijo de 15 años deja su iPad cargando desde el viernes hasta el lunes. Le hablé mil veces. A las 2am me despierto pensando en su cuarto. No puedo controlarlo todo...",
      solution: {
        title: "Incluso si olvidas, Guardián recuerda por ti",
        desc: "Tu hijo deja su tablet conectada desde el viernes. Tú estás de viaje. Tu esposo no sabe qué es un voltaje. No importa. Guardián protege cada dispositivo USB-C en tu casa: celulares, tablets, laptops, cámaras, power banks. Sin que nadie tenga que acordarse de nada.",
      },
    },
    {
      problem: "Compré un cargador 'de marca' por ₡22,400 CRC y mi batería sigue muriendo. Pagé por un logo, no por protección. Dinero tirado. Confianza rota.",
      solution: {
        title: "Pagaste por promesas. Guardián te da PRUEBAS.",
        desc: "Marcas caras te venden logos. Nosotros te vendemos velocidad que puedes medir: hasta 140W de carga rápida, con dos modos inteligentes que se adaptan a lo que cargas. El LED te muestra en tiempo real que la protección está trabajando. No es marketing. Es física.",
      },
    },
  ],
  problemImage: "/images/products/guardian-problem.jpg",
  features: [
    {
      name: "Desconexión física real. No software, no promesas",
      desc: "Cuando tu batería llega al 100%, Guardián ROMPE el circuito físicamente. No reduce corriente. No 'optimiza'. Desconecta de verdad. El LED cambia de color y tú lo ves con tus propios ojos. Esta es la única protección que no requiere fe. Requiere mirar.",
      result: "Primera noche de paz profunda. Despiertas, ves el LED azul, y sabes: estuviste protegido todo el tiempo.",
      icon: "Shield",
    },
    {
      name: "140W de velocidad + protección total. Sin compromiso.",
      desc: "Bypass inteligente de 80W+ para carga rápida sin sacrificar seguridad. Soporta hasta 140W PD. Carga tu laptop, tablet y celular a máxima velocidad, con la misma protección física que se desconecta al 100%.",
      result: "Rapidez sin miedo. Carga todo lo que tienes. Duerme igual de tranquilo.",
      icon: "Zap",
    },
    {
      name: "Dos modos. Todo protegido. Nadie afuera.",
      desc: "Modo Blanco: pantallas inteligentes (celulares, tablets, laptops) con gestión de energía optimizada. Modo Azul: dispositivos sin pantalla (power banks, lámparas, drones) con protección pura de potencia. Toda tu casa. Un Guardián.",
      result: "Desde tu teléfono hasta tu power bank. Todo lo que cargas, está protegido.",
      icon: "Usb",
    },
  ],
  featureImage: "/images/products/guardian-features.jpg",
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
    text: "Probamos 18 dispositivos en Costa Rica. 17 prometen 'auto-stop' pero nunca desconectan de verdad. Solo Guardián tiene un mecanismo interno que corta la corriente al 100%, y un LED que lo confirma visualmente. Por eso es el único que dejamos conectado cerca de donde duermen nuestros hijos.",
    author: "Equipo Vazlina · San José · Ingeniería de producto",
  },
  timeline: [
    {
      week: "Primera noche",
      title: "La primera vez que duermes sin miedo",
      desc: "Conectas tu dispositivo. El LED se pone verde. Te acuestas. A las 3am, ojeas el reloj... y por primera vez en meses, no sientes el impulso de tocar tu dispositivo para ver si está caliente. Duermes hasta el despertador.",
    },
    {
      week: "Semana 2",
      title: "Olvidas que existía un problema",
      desc: "Ya no guardas el cargador 'por si acaso'. Ya no le dices a tu hijo 'desconecta tu tablet'. Ya no te despiertas a las 2am con ansiedad. Tu cerebro finalmente dejó de vigilar algo que Guardián vigila por ti."
    },
    {
      week: "Día 30",
      title: "Tu batería te lo agradece",
      desc: "Revisas la salud de tu batería y sigue al 100%. Tu dispositivo amanece frío cada mañana. Y cuando vas a la casa de tu mamá, le llevas un Guardián, porque ahora entiendes que dormir tranquilo no tiene precio, pero sí tiene una solución."
    },
  ],
  timelineSummary:
    "Una unidad protege tu dispositivo. Dos o tres protegen a toda tu familia, y ahorras hasta ₡29,344 CRC.",
  reviews: [
    {
      name: "Roberto Méndez",
      age: 28,
      city: "Cartago",
      image: "/images/products/review-roberto.jpg",
      quote:
        "Mi iPhone 15 tenía 6 meses y la batería ya estaba al 89%. Me quería morir. Con Guardián noté la diferencia en SEMANAS. Mi iPhone ya no amanece caliente. El LED azul a las 3am es la prueba de que la desconexión física SÍ funciona. No es marketing. Es real.",
      rating: 5,
    },
    {
      name: "Carmen Flores",
      age: 35,
      city: "San José",
      image: "/images/products/review-carmen.jpg",
      quote:
        "A las 2am me despertaba para revisar los cuartos de mis hijos. Imaginate: 35 años, dos adolescentes, y yo vigilando cargadores como si fuera guardia de seguridad. Guardián me devolvió el sueño. Literalmente. Ahora duermo 8 horas y mi ansiedad de mamá bajó un 90%.",
      rating: 5,
    },
    {
      name: "Miguel Torres",
      age: 42,
      city: "Liberia",
      image: "/images/products/review-miguel.jpg",
      quote:
        "Soy ingeniero. No confío en promesas de software. Medí la corriente con mi multímetro: al 100%, Guardián corta el flujo completamente. Cero amperios. Lo confirmé yo mismo. Compré tres. Mi familia carga todo. Yo duermo tranquilo. Datos sobre marketing.",
      rating: 5,
    },
  ],
  comparisons: [
    {
      name: "Cargadores genéricos",
      priceRange: "₡1,400-₡4,200 CRC",
      problems: [
        "Se calientan peligrosamente al lado de tu cama",
        "'Auto-stop' de mentira. Sigue cargando al 100%",
        "Se rompen en semanas, compras otro, repites",
        "Sin garantía. Sin respaldo. Sin paz.",
      ],
    },
    {
      name: "Cargadores de marca",
      priceRange: "₡22,400-₡42,000 CRC",
      problems: [
        "Pagas ₡42,000 por un logo. Sin desconexión física real.",
        "Tu batería sigue muriendo. Tu dinero sigue yendo a la basura.",
        "3x más caro. 0x más protección.",
        "Marca famosa ≠ familia protegida",
      ],
    },
    {
      name: "Multicontactos / regletas",
      priceRange: "₡5,600-₡16,800 CRC",
      problems: [
        "Ocupan espacio. Estorban. Feos.",
        "No detectan temperatura. No se desconectan.",
        "Cables enredados = cables peligrosos",
        "Tu power bank sigue cargando 48 horas. Incógnito.",
      ],
    },
    {
      name: "Seguir como estás. Sin protección.",
      priceRange: "Tu dispositivo nuevo muerto en 8 meses",
      problems: [
        "Batería al 85% en 6 meses. Al 70% en un año. Irreversible.",
        "Sobrecalentamiento silencioso a las 3am. Cada noche.",
        "Batería hinchada = dispositivo inservible. Tu inversión a la basura.",
        "Elegir no protegerse cuesta 30x más que Guardián.",
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
      title: "Conectas. Ves el LED. Duermes.",
      desc: "No hay paso 2. Enchufas tu cable entre el cargador y tu dispositivo. El LED se enciende. Eso es todo. La protección física más avanzada del mundo, reducida a 'conectar y dormir'.",
    },
    {
      icon: "Shield",
      title: "El LED nunca miente",
      desc: "Verde: todo bien, sigue protegiendo. Azul: cortó la corriente, tu batería descansa. Rojo: detectó algo raro y ya actuó. Tres colores. Cero dudas. Cero configuraciones.",
    },
    {
      icon: "Zap",
      title: "5 guardianes. 0 trabajo para ti.",
      desc: "Sobrecorriente, sobrevoltaje, sobrecalentamiento, cortocircuito, auto-desconexión física. Cinco protecciones trabajando mientras tú roncas. No tocas nada. No configuras nada. No piensas en ello.",
    },
    {
      icon: "Phone",
      title: "Ni app. Ni bluetooth. Ni wifi. Ni problema.",
      desc: "No descargas nada. No emparejas nada. No actualizas nada. No le enseñas a tu mamá a usar 'otra app'. Conectas. Listo. La tecnología buena es la que desaparece.",
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
  cities: ["San José", "Alajuela", "Cartago", "Heredia", "Liberia", "+ Más áreas"],
  faqs: [
    {
      category: "Sobre el producto",
      q: "¿Es una desconexión REAL o solo software que 'dice' que se desconecta?",
      a: "Es física. Dentro de Guardián hay un mecanismo que corta el paso de la corriente cuando tu batería está llena. No es una señal de software. Es una interrupción real del flujo eléctrico. El LED azul te lo confirma: cuando se enciende, la corriente está cortada. Lo puedes ver con tus ojos. No requiere confianza ciega.",
    },
    {
      category: "Sobre el producto",
      q: "¿Funciona con iPhone, Android, tablets, laptops?",
      a: "Todo lo que cargue por USB-C: iPhone 15+, Samsung Galaxy, Xiaomi, tablets, laptops Mac y Windows, power banks, audífonos, lámparas de escritorio, drones. Dos modos: Blanco para pantallas (celulares, tablets, laptops), Azul para dispositivos sin pantalla (power banks, lámparas, baterías). Toda tu casa. Un Guardián.",
    },
    {
      category: "Sobre el producto",
      q: "¿El LED de verdad me dice que está protegido?",
      a: "Sí. Verde = carga activa, todo controlado. Azul = cortó la corriente, tu dispositivo ya no recibe carga. Rojo = detectó calor, voltaje o corriente fuera de lo normal y ya detuvo todo. Es información viva, no una luz de adorno.",
    },
    {
      category: "Sobre el producto",
      q: "¿Puedo dejarlo conectado desde el viernes hasta el lunes?",
      a: "Sí. Eso es EXACTAMENTE para lo que fue diseñado. Conectas el viernes, corta la carga al 100% esa misma noche, y tu dispositivo permanece protegido el resto del fin de semana. No importa si nadie desconecta nada. Guardián sigue ahí.",
    },
    {
      category: "Sobre el producto",
      q: "¿Qué hay en la caja?",
      a: "1 Vazlina Guardián (dispositivo de protección USB-C), cable USB-C de 1.5m para conectar a tu cargador existente, manual rápido en español. NO incluye el cargador de pared. Guardián protege el que ya tienes.",
    },
    {
      category: "Sobre el producto",
      q: "¿Qué pasa si se daña?",
      a: "1 año de garantía. Si deja de proteger, deja de mostrar el LED correctamente, o tiene cualquier falla, lo reemplazamos sin costo. Y si dentro de los primeros 30 días sientes que no te dio la paz que prometimos, te devolvemos cada peso. Sin preguntas. Tu familia merece confianza, no excusas.",
    },
    {
      category: "Envío y pago",
      q: "¿Y si no me gusta? ¿Pierdo mi dinero?",
      a: "No pagas nada hasta que lo tienes en tus manos. Y si después de 30 días no sientes que duermes más tranquilo, que tu dispositivo amanece más frío, o que tu familia está más protegida, te devolvemos TODO. El riesgo es nuestro. La tranquilidad es tuya."
    },
    {
      category: "Envío y pago",
      q: "¿Cuándo llega?",
      a: "3 a 5 días hábiles en San José, Alajuela, Cartago y Heredia. 5 a 7 días para el resto del país. Siempre gratis. Y cuando llegue, conectas, ves el LED azul, y esa misma noche duermes diferente.",
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
      slug: "vazlina-mariposa",
      angle: "Estilo Inalámbrico · Vazlina Wings",
      name: "El accesorio que completa tu look",
      desc: "Diseño único que te hace sentir elegante y confiada. Música que suena bien y te hace ver mejor.",
      price: 1299,
      reviews: "(412 evaluaciones)",
      image: "/images/products/mariposa-hero.jpg",
    },
  ],
};

export const metadata = {
  title: "Vazlina Guardián | Duerme tranquilo. Guardián vigila lo que tú no puedes.",
  description:
    "Desconexión física real al 100%. No es software. Rompe el circuito cuando tu dispositivo se llena. Protege a tu familia, tu batería y tu inversión mientras tú descansas. Compatible con todos los USB-C."
};

export default function GuardianPage() {
  return <ProductPageTemplate data={guardianData} />;
}
