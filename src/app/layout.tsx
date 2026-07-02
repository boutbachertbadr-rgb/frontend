import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import UpsellOverlay from "@/components/UpsellOverlay";
import PixelScripts from "@/components/PixelScripts";

const fontHeading = Playfair_Display({ subsets: ["latin"], weight: ['700'], variable: "--font-heading", display: "swap" });
const fontBody = Crimson_Pro({ subsets: ["latin"], weight: ['400', '500', '600'], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Vazlina | Tecnología curada para tu día a día",
  description:
    "Productos de tecnología premium seleccionados para México. Paga al recibir. Envío rápido.",
  icons: {
    icon: "/favicon.svg?v=2",
  },
  openGraph: {
    siteName: "Vazlina",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <PixelScripts />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
        <UpsellOverlay />
      </body>
    </html>
  );
}
