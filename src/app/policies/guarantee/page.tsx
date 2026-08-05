export const metadata = { title: "Garantía | Vazlina" };

export default function GuaranteePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-gray">
      <h1 className="font-heading font-bold text-3xl">Garantía de Calidad Vazlina</h1>
      <p className="text-gray-500">Última actualización: junio 2025</p>
      <h2 className="font-heading font-semibold text-xl mt-8">Nuestra promesa</h2>
      <p>Cada producto Vazlina está respaldado por nuestra Garantía de Calidad. Si tu producto presenta defectos de fabricación, lo reemplazamos sin costo adicional.</p>
      <h2 className="font-heading font-semibold text-xl mt-6">¿Qué cubre?</h2>
      <ul>
        <li>Defectos de fabricación comprobados</li>
        <li>Fallas de funcionamiento en condiciones normales de uso</li>
        <li>Piezas o componentes defectuosos desde fábrica</li>
      </ul>
      <h2 className="font-heading font-semibold text-xl mt-6">¿Qué no cubre?</h2>
      <ul>
        <li>Daños por mal uso o accidentes</li>
        <li>Desgaste normal del producto</li>
        <li>Daños por líquidos o impactos externos</li>
      </ul>
      <h2 className="font-heading font-semibold text-xl mt-6">Cómo reclamar</h2>
      <p>Contáctanos a través de nuestra página de contacto con tu número de pedido y una descripción del problema. Nuestro equipo te responderá en menos de 24 horas.</p>
    </div>
  );
}
