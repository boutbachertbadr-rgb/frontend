import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro } from "next/font/google";
import "./globals.css";
import PixelScripts from "@/components/PixelScripts";
import { SiteChromeTop, SiteChromeBottom } from "@/components/SiteChrome";

const fontHeading = Playfair_Display({ subsets: ["latin"], weight: ['700'], variable: "--font-heading", display: "swap" });
const fontBody = Crimson_Pro({ subsets: ["latin"], weight: ['400', '500', '600'], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Vazlina | Tecnología curada para tu día a día",
  description:
    "Productos de tecnología premium seleccionados para Costa Rica. Paga al recibir. Envío rápido.",
  icons: {
    icon: "/favicon.svg?v=2",
  },
  openGraph: {
    siteName: "Vazlina",
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CR" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <PixelScripts />
        <SiteChromeTop />
        <main>{children}</main>
        <SiteChromeBottom />
      </body>
    </html>
  );
}
