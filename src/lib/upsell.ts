import { CartItem } from "@/store/cart";

export interface UpsellProduct {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  image: string;
}

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const UPSELL_PRODUCTS: UpsellProduct[] = [
  {
    id: "vazlina-guardian-1",
    name: "Vazlina Guardián",
    description: "Protege tu batería con auto-desconexión inteligente.",
    originalPrice: 17997,
    discountPrice: 15997,
    image: "/images/products/guardian-hero.jpg",
  },
  {
    id: "vazlina-brisa-1",
    name: "Vazlina Brisa",
    description: "Tu alivio personal contra el calor, a donde vayas.",
    originalPrice: 18451,
    discountPrice: 16451,
    image: "/images/products/brisa-hero.jpg",
  },
  {
    id: "vazlina-mariposa-1",
    name: "Vazlina Mariposa",
    description: "Auriculares tipo mariposa con sonido sólido y estilo.",
    originalPrice: 19358,
    discountPrice: 17358,
    image: "/images/products/mariposa-hero.jpg",
  },
];

export function pickUpsell(cartItems: CartItem[]): UpsellProduct {
  const ids = cartItems.map((i) => i.id);
  const hasGuardian = ids.some((id) => id.includes("guardian"));
  const hasBrisa = ids.some((id) => id.includes("brisa"));

  if (!hasGuardian) return UPSELL_PRODUCTS[0];
  if (!hasBrisa) return UPSELL_PRODUCTS[1];
  return UPSELL_PRODUCTS[2];
}

export function getAvailableUpsells(cartItems: CartItem[]): UpsellProduct[] {
  const ids = cartItems.map((i) => i.id);
  const hasGuardian = ids.some((id) => id.includes("guardian"));
  const hasBrisa = ids.some((id) => id.includes("brisa"));
  const hasMariposa = ids.some((id) => id.includes("mariposa"));

  return UPSELL_PRODUCTS.filter((p) => {
    if (p.id.includes("guardian") && hasGuardian) return false;
    if (p.id.includes("brisa") && hasBrisa) return false;
    if (p.id.includes("mariposa") && hasMariposa) return false;
    return true;
  });
}
