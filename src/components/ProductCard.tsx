import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";

interface Props {
  name: string;
  slug: string;
  image: string;
  priceFrom: number;
  tagline: string;
}

export default function ProductCard({ name, slug, image, priceFrom, tagline }: Props) {
  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="relative aspect-3/4 bg-subtle rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="mt-3 text-center">
        <h3 className="font-heading font-bold text-lg text-text-primary">{name}</h3>
        <p className="text-sm text-text-secondary mt-1">{tagline}</p>
        <p className="text-sm font-bold text-brand mt-2">Desde ₡{priceFrom.toLocaleString("es-CR")} CRC</p>
      </div>
    </Link>
  );
}
